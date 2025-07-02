'use server';

import { createClient } from '@/utils/supabase/server';
import { createRetailerAction } from './create-retailer';

interface SignupFormProps {
    businessName: string,
    phone: string,
    email: string,
    password: string,
}

export async function signupAction(businessName: string, email: string, phone: string, password: string) {
  const supabase = createClient();
  
  try {
    // Create auth user only (no metadata yet)
    const { data, error } = await (await supabase).auth.signUp({
      phone: `+254${phone}`,
      password: password,
      email: email
    });

    if (error) throw error;
    if (!data.user) throw new Error('User creation failed');

    const userId = data.user.id;

    //Create retailer
    await createRetailerAction(
      userId,
      businessName,
      phone,
      email
    )

    // Return only the essential data
    return { 
      userId: data.user.id,
      email: data.user.email!
    };
  } catch (error) {
    console.error('Signup error:', error);
    throw new Error('Failed to initiate signup process');
  }
}