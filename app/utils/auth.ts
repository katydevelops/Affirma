import { supabase } from './supabaseClient';

// Sign Up Function
export async function signUp(email: string, password: string, additionalData: any) {
  const { user, error } = await supabase.auth.signUp({ email, password });

  if (error) {
    throw error;
  }

  if (user) {
    // Store additional data in the database
    const { error: updateError } = await supabase
      .from('users')
      .update(additionalData)
      .eq('id', user.id);

    if (updateError) {
      throw updateError;
    }
  }

  return user;
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
