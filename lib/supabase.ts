import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://hrlcogckwevdseiwsaes.supabase.co";
// const supabaseKey = process.env.SUPABASE_KEY!;
const supabaseKey =
  "sb_publishable_o4ZEuPBARqvjOC0L_hmjIA_KsJxiQzD";

export const supabase = createClient(supabaseUrl, supabaseKey);
