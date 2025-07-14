"use server"

import { createClient } from "@/utils/supabase/server";

export async function addProspect(formData: {
    name: string,
    phone: string,
    inquiry: string,
    budget: number
}) {
    const supabase = await createClient();
    const { data: { session } } = await supabase.auth.getSession();
    
    try {
        // Get retailer ID from session
        const retailerId = session?.user?.id;
        if (!retailerId) throw new Error('User not authenticated');

        const phone_number = formData.phone.replace(/^0/, '')
        
        // Insert prospect with retailer_id
        const { error } = await supabase.from('prospect').insert({
            name: formData.name,
            phone: `+254${phone_number}`,
            inquiry: formData.inquiry,
            budget: formData.budget,
            retailer_id: retailerId
        });
        
        if (error) throw error;
    } catch (error) {
        throw error;
    }
}