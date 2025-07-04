'use server';

import { createClient } from '@/utils/supabase/server';
import { createRetailerAction } from './create-retailer';

export async function signupAction(
  businessName: string,
  email: string,
  phone: string,
  password: string
): Promise<{ userId: string }> {
  const supabase = await createClient();
  
  try {
    // Create auth user only (no metadata yet)
    const { data, error } = await supabase.auth.signUp({
      password: password,
      email: email,
      options: {
        emailRedirectTo: 'http://localhost:3000/dashboard'
      }
    });

    console.log('Signup data:', data);
    console.log('Signup error:', error);

    if (error) throw error;
    if (!data.user) throw new Error('User creation failed');

    const userId = data.user.id;

    // Create retailer
    await createRetailerAction(
      userId,
      businessName,
      phone,
      email
    );

    // Return only the userId to match the expected interface
    return { 
      userId: data.user.id
    };
  } catch (error) {
    console.error('Signup error:', error);
    throw error; // Re-throw the error so the component can handle it
  }
}