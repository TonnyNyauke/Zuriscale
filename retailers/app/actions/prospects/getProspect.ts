import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

export async function getProspects() {

    const { data: { session } } = await supabase.auth.getSession();
    const { data, error } = await supabase
    .from('prospect')
    .select('*')
    .eq('retailer_id', session?.user?.id);
    if (error) throw error;
    console.log(data);
    return data;
}