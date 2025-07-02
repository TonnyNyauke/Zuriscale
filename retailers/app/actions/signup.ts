'use server';

import { createClient } from '@/utils/supabase/server';

export async function signupAction(phone: string, password: string) {
  const supabase = createClient();
  
  try {
    // Create auth user only (no metadata yet)
    const { data, error } = await (await supabase).auth.signUp({
      phone: `+254${phone}`,
      password: password,
    });

    if (error) throw error;
    if (!data.user) throw new Error('User creation failed');

    // Return only the essential data
    return { 
      userId: data.user.id,
      phone: data.user.phone! 
    };
  } catch (error) {
    console.error('Signup error:', error);
    throw new Error('Failed to initiate signup process');
  }
}