// @/actions/create-retailer.ts
'use server';

import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';

export async function createRetailerAction(
  userId: string,
  businessName: string,
  phone: string,
  email: string
) {
  const supabase = createClient();
  
  try {
    // 1. Create retailer record
    const { error } = await (await supabase)
      .from('retailers')
      .insert({
        user_id: userId,
        business_name: businessName,
        email: email,
        phone: phone
      });

    if (error) throw error;
    
    return { success: true };
  } catch (error) {
    console.error('Retailer creation error:', error);
    
    // Clean up auth user if retailer creation fails
    await (await supabase).auth.admin.deleteUser(userId);
    throw new Error('Failed to create business profile');
  }
}