"use server"

import { createClient } from "@/utils/supabase/server"

export async function addProspect(formData:{
    name: string,
    phone: string,
    inquiry: string,
    budget: number
}){
    const supabase = createClient();

    try {
        const {error} = await (await supabase).from('prospect')
        .insert({
            name: formData.name,
            Phone: formData.phone,
            inquiry: formData.inquiry,
            budget: formData.budget
        })
        if(error) throw error;
    } catch (error) {
        console.error(error)
    }
}