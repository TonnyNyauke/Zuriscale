import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

export async function getCustomers() {

    const { data: { session } } = await supabase.auth.getSession();
    const { data, error } = await supabase
    .from('customers')
    .select('*')
    .eq('retailer_id', session?.user?.id);
    if (error) throw error;
    return data;
}