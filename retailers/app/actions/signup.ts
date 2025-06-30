// @/actions/signup.ts
'use server';

import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';

export async function signupAction(formData: {
  businessName: string;
  phone: string;
  email: string;
  password: string;
}) {
  const supabase = createClient();
  
  try {
    // 1. Create auth user
    const { data, error: authError } = await (await supabase).auth.signUp({
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

    // Return user ID without creating retailer yet
    return { userId: data.user.id };
  } catch (error) {
    console.error('Signup error:', error);
    throw new Error('Failed to create user account');
  }
}