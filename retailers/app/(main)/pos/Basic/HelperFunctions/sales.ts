'use server';

import { CustomerData, SaleItem } from "@/app/types/pos";
import { createClient } from "@/utils/supabase/server";
import { SupabaseClient } from "@supabase/supabase-js";

interface UpdateDate {
  first_purchase_date?: string,
  last_purchase_date: string,
  total_spent: number
}

export async function createSale(saleData: CustomerData, total: number) {
  const supabase = await createClient();

  try {
    // 1. Get authenticated user
    const { data: sessionData } = await supabase.auth.getSession();
    const retailerId = sessionData.session?.user?.id;

    if (!retailerId) {
      throw new Error('User not authenticated');
    }

    // 2. Validate input data
    if (!saleData.items || saleData.items.length === 0) {
      throw new Error('No sale items provided');
    }

    if (!saleData.customer_name?.trim() || !saleData.customer_phone?.trim()) {
      throw new Error('Customer name and phone are required');
    }

    // 3. Find or create customer
    const customerId = await findOrCreateCustomer(supabase, saleData, retailerId);

    // 4. Create sale record
    const sale = await createSaleRecord(supabase, {
      retailerId,
      customerId,
      total: Number(total),
      discount: Number(saleData.discount || 0)
    });

    // 5. Create sale items
    await createSaleItems(supabase, sale.id, saleData.items);

    // 6. Update customer stats after successful sale
    await updateCustomerStats(supabase, customerId, Number(total));

    return sale;

  } catch (error) {
    console.error('Sale creation failed:', error);
    throw error;
  }
}

// Helper function to find or create customer
async function findOrCreateCustomer(supabase: SupabaseClient, saleData: CustomerData, retailerId: string) {
  // Check if customer exists
  const { data: existingCustomer, error: searchError } = await supabase
    .from('customers')
    .select('id, name')
    .eq('retailer_id', retailerId)
    .eq('phone_number', saleData.customer_phone)
    .single();

  // If search failed with error other than "no rows found"
  if (searchError && searchError.code !== 'PGRST116') {
    throw new Error(`Customer search failed: ${searchError.message}`);
  }

  // Return existing customer ID if found
  if (existingCustomer) {
    // Update customer name if it has changed (optional enhancement)
    if (existingCustomer.name !== saleData.customer_name) {
      await supabase
        .from('customers')
        .update({ name: saleData.customer_name })
        .eq('id', existingCustomer.id);
    }
    return existingCustomer.id;
  }

  // Create new customer
  const { data: newCustomer, error: createError } = await supabase
    .from('customers')
    .insert({
      retailer_id: retailerId,
      phone_number: saleData.customer_phone,
      name: saleData.customer_name,
      first_purchase_date: new Date().toISOString()
    })
    .select('id')
    .single();

  if (createError) {
    throw new Error(`Customer creation failed: ${createError.message}`);
  }

  return newCustomer.id;
}

// Helper function to create sale record
async function createSaleRecord(supabase: SupabaseClient, saleData: {
  retailerId: string;
  customerId: string;
  total: number;
  discount: number;
}) {
  const { data: sale, error } = await supabase
    .from('sales')
    .insert({
      retailer_id: saleData.retailerId,
      customer_id: saleData.customerId,
      total_amount: saleData.total,
      discount: saleData.discount,
      currency: 'KES'
    })
    .select()
    .single();

  if (error) {
    throw new Error(`Sale creation failed: ${error.message}`);
  }

  return sale;
}

// Helper function to create sale items
async function createSaleItems(supabase: SupabaseClient, saleId: string, items: SaleItem[]) {
  const saleItemsData = items.map(item => ({
    sale_id: saleId,
    product_id: null, // Basic tier
    item_name: String(item.item_name || ''),
    quantity: Number(item.quantity || 0),
    unit_price: Number(item.unit_price || 0),
    buy_price: Number(item.unit_price || 0), // Basic tier - no profit tracking
    discount: 0
  }));

  const { error } = await supabase
    .from('sale_items')
    .insert(saleItemsData);

  if (error) {
    throw new Error(`Sale items creation failed: ${error.message}`);
  }
}

// Helper function to update customer statistics
async function updateCustomerStats(supabase: SupabaseClient, customerId: string, saleAmount: number) {
  try {
    // Get current customer data
    const { data: customer, error: fetchError } = await supabase
      .from('customers')
      .select('total_spent, first_purchase_date')
      .eq('id', customerId)
      .single();

    if (fetchError) {
      console.error('Failed to fetch customer for stats update:', fetchError);
      return;
    }

    const now = new Date().toISOString();
    const newTotalSpent = (customer.total_spent || 0) + saleAmount;
    
    // Prepare update data
    const updateData: UpdateDate = {
      last_purchase_date: now,
      total_spent: newTotalSpent
    };

    // If this is the first purchase, set first_purchase_date
    if (!customer.first_purchase_date) {
      updateData.first_purchase_date = now;
    }

    const { error: updateError } = await supabase
      .from('customers')
      .update(updateData)
      .eq('id', customerId);

    if (updateError) {
      console.error('Failed to update customer stats:', updateError);
    }

  } catch (error) {
    console.error('Unexpected error updating customer stats:', error);
  }
}

// NEW: Function to search customers by phone (for autocomplete)
export async function searchCustomersByPhone(phoneQuery: string) {
  const supabase = await createClient();
  
  // Get authenticated user
  const { data: sessionData } = await supabase.auth.getSession();
  const retailerId = sessionData.session?.user?.id;

  if (!retailerId || !phoneQuery.trim()) {
    return [];
  }

  const { data, error } = await supabase
    .from('customers')
    .select('id, name, phone_number, total_spent, last_purchase_date')
    .eq('retailer_id', retailerId)
    .ilike('phone_number', `%${phoneQuery}%`)
    .order('last_purchase_date', { ascending: false, nullsFirst: false })
    .limit(5);

  if (error) {
    console.error('Customer search failed:', error);
    return [];
  }

  return data || [];
}

// NEW: Function to get customer by exact phone match
export async function getCustomerByPhone(phone: string) {
  const supabase = await createClient();
  
  const { data: sessionData } = await supabase.auth.getSession();
  const retailerId = sessionData.session?.user?.id;

  if (!retailerId || !phone.trim()) {
    return null;
  }

  const { data, error } = await supabase
    .from('customers')
    .select('id, name, phone_number, total_spent, last_purchase_date')
    .eq('retailer_id', retailerId)
    .eq('phone_number', phone)
    .single();

  if (error && error.code !== 'PGRST116') {
    console.error('Customer lookup failed:', error);
    return null;
  }

  return data;
}

export async function getRecentSales() {
  const supabase = await createClient();

  // 1. Get authenticated user
  const { data: sessionData } = await supabase.auth.getSession();
  const retailerId = sessionData.session?.user?.id;
  
  const { data, error } = await supabase
    .from('sales')
    .select(`
      *,
      customers (name, phone_number),
      sale_items!sale_id (item_name, quantity, unit_price)
    `)
    .eq('retailer_id', retailerId)
    .order('created_at', { ascending: false })
    .limit(5);

  if (error) throw error;
  return data || [];
}

export async function getTodayStats(retailerId: string) {
  const supabase = await createClient();
  
  const today = new Date().toISOString().split('T')[0];
  
  const { data, error } = await supabase
    .from('sales')
    .select('total_amount')
    .eq('retailer_id', retailerId)
    .gte('created_at', `${today}T00:00:00.000Z`);

  if (error) throw error;

  const sales = data || [];
  return {
    count: sales.length,
    total: sales.reduce((sum, sale) => sum + Number(sale.total_amount), 0)
  };
}