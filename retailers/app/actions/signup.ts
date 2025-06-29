'use server';

import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function signup(formData: {
  businessName: string;
  phone: string;
  email: string;
  password: string;
}) {
  const supabase = await createClient();
  
  try {
    // 1. Create auth user
    const { data, error: authError } = await supabase.auth.signUp({
      phone: `+254${formData.phone}`,
      password: formData.password,
      options: {
        data: {
          business_name: formData.businessName,
          email: formData.email
        }
      }
    });

    if (authError) throw authError;
    if (!data.user) throw new Error('User creation failed');

    // 2. Insert into retailers table
    const { error: retailerError } = await supabase
      .from('retailers')
      .insert({
        retaile_id: data.user.id,
        business_name: formData.businessName,
        email: formData.email,
        phone: formData.phone
      });

    if (retailerError) {
      // Rollback user if retailer fails
      await supabase.auth.admin.deleteUser(data.user.id);
      throw retailerError;
    }

    return data.user;
  } catch (error) {
    console.error('Signup error:', error);
    throw error;
  }
}