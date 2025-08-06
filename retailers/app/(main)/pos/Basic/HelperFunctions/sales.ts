'use server';

import { CustomerData } from "@/app/types/pos";
import { createClient } from "@/utils/supabase/server";

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

    return sale;

  } catch (error) {
    console.error('Sale creation failed:', error);
    throw error;
  }
}

// Helper function to find or create customer
async function findOrCreateCustomer(supabase: any, saleData: CustomerData, retailerId: string) {
  // Check if customer exists
  const { data: existingCustomer, error: searchError } = await supabase
    .from('customers')
    .select('id')
    .eq('retailer_id', retailerId)
    .eq('phone_number', saleData.customer_phone)
    .single();

  // If search failed with error other than "no rows found"
  if (searchError && searchError.code !== 'PGRST116') {
    throw new Error(`Customer search failed: ${searchError.message}`);
  }

  // Return existing customer ID if found
  if (existingCustomer) {
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
async function createSaleRecord(supabase: any, saleData: {
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
async function createSaleItems(supabase: any, saleId: string, items: any[]) {
  const saleItemsData = items.map(item => ({
    sale_id: saleId,
    product_id: null, // Basic tier
    item_name: String(item.item_name || ''),
    quantity: Number(item.quantity || 0),
    unit_price: Number(item.unit_price || 0),
    buy_price: Number(item.unit_price || 0), // Basic tier
    discount: 0
  }));

  const { error } = await supabase
    .from('sale_items')
    .insert(saleItemsData);

  if (error) {
    throw new Error(`Sale items creation failed: ${error.message}`);
  }
}

export async function getRecentSales(retailerId: string, limit = 10) {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from('sales')
    .select(`
      *,
      customers (name, phone_number),
      sale_items (item_name, quantity, unit_price)
    `)
    .eq('retailer_id', retailerId)
    .order('created_at', { ascending: false })
    .limit(limit);

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