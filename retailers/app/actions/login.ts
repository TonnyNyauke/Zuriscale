//'use server'

import { createClient } from "@/utils/supabase/client"

const supabase = await createClient()

export async function loginAction(email: string, password: string) {
    try {
        const {data, error} = await (await supabase).auth
        .signInWithPassword({
            email: email,
            password: password
        })

        if(error) throw error;

        return data;
    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
}