import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey)

export const signInWithGitHub = async() => {
    const {data, error} = await supabase.auth.signInWithOAuth({
        provider: 'github'
    })
}

export const getStateUser = supabase.auth.onAuthStateChange((event, session) => {
    console.log(event, session)
    return {event, session}
})

export const getGitHubUser = supabase.auth.getUser().then(({error, data}) => {
    if (error) return null
    const {user} = data
    const {user_metadata} = user
    const {user_name, avatar_url, email} = user_metadata
    return {
        avatar: avatar_url,
        username: user_name,
        email
    }
})

export const signout = async() => {
    const {error} = supabase.auth.signOut()
}