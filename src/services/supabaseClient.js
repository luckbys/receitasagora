let supabase;

async function initSupabase() {
  if (!supabase) {
    const { createClient } = await import('@supabase/supabase-js');
    supabase = createClient(
      'https://zsiiurkaiyvvcexpcuay.supabase.co',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpzaWl1cmthaXl2dmNleHBjdWF5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTA5NTAwMTUsImV4cCI6MjAyNjUyNjAxNX0.vkXanB4YJlirK21eYXVf2L04BgTn9QUB_5-A24YMtQU'
    );
  }
  return supabase;
}

// Funções auxiliares para operações comuns
export const auth = {
  signIn: async (email, password) => {
    const client = await initSupabase();
    const { data, error } = await client.auth.signInWithPassword({
      email,
      password
    });
    if (error) throw error;
    return data;
  },

  signUp: async (email, password) => {
    const client = await initSupabase();
    const { data, error } = await client.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: window.location.origin
      }
    });
    if (error) throw error;
    return data;
  },

  signOut: async () => {
    const client = await initSupabase();
    const { error } = await client.auth.signOut();
    if (error) throw error;
  },

  getSession: async () => {
    const client = await initSupabase();
    const { data: { session }, error } = await client.auth.getSession();
    if (error) throw error;
    return session;
  },

  getUser: async () => {
    const client = await initSupabase();
    const { data: { user }, error } = await client.auth.getUser();
    if (error) throw error;
    return user;
  }
};

// Funções para manipulação de dados
export const db = {
  // Salvar receita favorita
  saveFavorite: async (userId, recipeId) => {
    const { error } = await supabase
      .from('favorites')
      .insert([{ user_id: userId, recipe_id: recipeId }]);
    if (error) throw error;
  },

  // Remover receita favorita
  removeFavorite: async (userId, recipeId) => {
    const { error } = await supabase
      .from('favorites')
      .delete()
      .match({ user_id: userId, recipe_id: recipeId });
    if (error) throw error;
  },

  // Buscar favoritos do usuário
  getFavorites: async (userId) => {
    const { data, error } = await supabase
      .from('favorites')
      .select('recipe_id')
      .eq('user_id', userId);
    if (error) throw error;
    return data.map(fav => fav.recipe_id);
  },

  // Salvar foto de receita
  saveRecipePhoto: async (userId, recipeId, photoUrl) => {
    const { error } = await supabase
      .from('recipe_photos')
      .insert([{
        user_id: userId,
        recipe_id: recipeId,
        photo_url: photoUrl,
        created_at: new Date()
      }]);
    if (error) throw error;
  },

  // Buscar fotos de uma receita
  getRecipePhotos: async (recipeId) => {
    const { data, error } = await supabase
      .from('recipe_photos')
      .select(`
        *,
        profiles:user_id (
          email,
          full_name
        )
      `)
      .eq('recipe_id', recipeId);
    if (error) throw error;
    return data;
  }
};

// Funções para upload de arquivos
export const storage = {
  uploadPhoto: async (file, path) => {
    const { data, error } = await supabase.storage
      .from('recipe-photos')
      .upload(path, file);
    if (error) throw error;
    return data;
  },

  getPhotoUrl: (path) => {
    return supabase.storage
      .from('recipe-photos')
      .getPublicUrl(path).data.publicUrl;
  }
};

export default initSupabase; 