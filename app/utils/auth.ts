import { supabase } from './supabaseClient';

// Sign Up Function
export async function signUp(email: string, password: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) throw error;
  return data;
}

// Login Function
export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;
  return data;
}

// Logout Function
export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

// Get Current User Session
export async function getCurrentUser() {
  const user = supabase.auth.getUser();
  return user;
}
