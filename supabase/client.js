import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey)

export const signInWithGitHub = async() => {
    const {data, error} = await supabase.auth.signInWithOAuth({
        provider: 'github'
    })
}

export const signout = async() => {
    const {error} = supabase.auth.signOut()
}