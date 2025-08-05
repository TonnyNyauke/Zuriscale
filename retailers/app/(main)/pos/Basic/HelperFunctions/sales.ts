'use server';

import { createClient } from "@/utils/supabase/server";


const supabase = await createClient();

interface BasicSaleRequest {
  customer_name: string;
  customer_phone: string;
  items: Array<{
    item_name: string;
    quantity: number;
    unit_price: number;
  }>;
  discount?: number;
}

export class BasicSalesService {
  async createSale(retailerId: string, saleData: BasicSaleRequest) {
    // Calculate total
    const total = saleData.items.reduce((sum, item) => 
      sum + (item.unit_price * item.quantity), 0
    ) - (saleData.discount || 0);

    try {
      // 1. First, create or get customer
      let customerId = null;
      if (saleData.customer_name && saleData.customer_phone) {
        const { data: existingCustomer } = await supabase
          .from('customers')
          .select('id')
          .eq('retailer_id', retailerId)
          .eq('phone_number', saleData.customer_phone)
          .single();

        if (existingCustomer) {
          customerId = existingCustomer.id;
        } else {
          const { data: newCustomer } = await supabase
            .from('customers')
            .insert({
              retailer_id: retailerId,
              phone_number: saleData.customer_phone,
              name: saleData.customer_name,
              first_purchase_date: new Date().toISOString()
            })
            .select('id')
            .single();
          
          customerId = newCustomer?.id;
        }
      }

      // 2. Create sale using your existing sales table
      const { data: sale, error: saleError } = await supabase
        .from('sales')
        .insert({
          retailer_id: retailerId,
          customer_id: customerId,
          total_amount: total,
          discount: saleData.discount || 0,
          currency: 'KES'
        })
        .select()
        .single();

      if (saleError) throw saleError;

      // 3. Create sale items using your existing sale_items table
      // For basic tier: product_id = null, item_name filled, buy_price = unit_price
      const saleItems = saleData.items.map(item => ({
        sale_id: sale.id,
        product_id: null, // Basic tier - no inventory tracking
        item_name: item.item_name, // New column we added
        quantity: item.quantity,
        unit_price: item.unit_price,
        buy_price: item.unit_price, // Basic tier - assume no profit tracking
        discount: 0
      }));

      const { error: itemsError } = await supabase
        .from('sale_items')
        .insert(saleItems);

      if (itemsError) throw itemsError;

      return sale;
    } catch (error) {
      console.error('Failed to create sale:', error);
      throw new Error('Failed to create sale');
    }
  }

  async getRecentSales(retailerId: string, limit = 10) {
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

  async getTodayStats(retailerId: string) {
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
}