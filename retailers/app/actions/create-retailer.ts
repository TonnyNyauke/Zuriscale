'use server';

import { createClient } from '@/utils/supabase/server';

export async function createRetailerAction(
userId: string, businessName: string, email: string, phone: string) {
  const supabase = createClient();
  
  try {
    // Verify user exists and is authenticated
    const { data: { user }, error: authError } = await (await supabase).auth.getUser();
    
    if (authError || !user || user.id !== userId) {
      throw new Error('User authentication failed');
    }

    // Create retailer record
    const { error } = await (await supabase)
      .from('retailers')
      .insert({
        retailer_id: userId,
        business_name: businessName,
        email: email,
        phone: phone,
        is_verified: true // Only set after verification
      })
      .eq('retailer_id', userId);

    if (error) throw error;
    
    return { success: true };
  } catch (error) {
    
    // Clean up auth user if retailer creation fails
    await (await supabase).auth.admin.deleteUser(userId);
    throw new Error('Failed to create business profile');
  }
}