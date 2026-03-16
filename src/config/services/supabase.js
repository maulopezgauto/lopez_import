import { createClient } from "@supabase/supabase-js";

    /*process.env.VITE_SUPABASE_URL,
    process.env.VITE_SUPABASE_ANON_KEY*/

 // support both server (Node) and client (browser via Vite)
    const supabaseUrl =
    typeof window === "undefined"
        ? process.env.SUPABASE_URL
        : import.meta.env.VITE_SUPABASE_URL;

    const supabaseAnonKey =
    typeof window === "undefined"
        ? process.env.SUPABASE_ANON_KEY
        : import.meta.env.VITE_SUPABASE_ANON_KEY;

    export const supabase = createClient(supabaseUrl, supabaseAnonKey);

