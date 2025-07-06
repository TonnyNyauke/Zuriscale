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
        
        // Insert prospect with retailer_id
        const { error } = await supabase.from('prospect').insert({
            name: formData.name,
            phone: formData.phone,
            inquiry: formData.inquiry,
            budget: formData.budget,
            retailer_id: retailerId
        });
        
        if (error) throw error;
    } catch (error) {
        console.error(error);
        throw error;
    }
}