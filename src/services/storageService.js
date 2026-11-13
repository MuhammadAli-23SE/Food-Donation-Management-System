import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';

/**
 * Uploads a food photo to the Supabase Storage 'food-donations' bucket.
 * Returns { publicUrl, error }.
 */
export const uploadFoodImage = async (file, pathPrefix = 'listings') => {
  if (!file) return { publicUrl: null, error: 'No file provided' };

  // Validate file type
  if (!file.type.startsWith('image/')) {
    return { publicUrl: null, error: 'Please select a valid image file (JPEG, PNG, WEBP).' };
  }

  // Max 5MB
  if (file.size > 5 * 1024 * 1024) {
    return { publicUrl: null, error: 'Image size exceeds the 5MB limit.' };
  }

  if (isSupabaseConfigured) {
    try {
      const cleanFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
      const filePath = `${pathPrefix}/${Date.now()}_${cleanFileName}`;

      const { data, error } = await supabase.storage
        .from('food-donations')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false,
        });

      if (error) {
        console.warn('[Storage] Upload error:', error.message);
        // Fallback to local object URL if bucket does not exist yet
        const objectUrl = URL.createObjectURL(file);
        return { publicUrl: objectUrl, error: null };
      }

      const { data: urlData } = supabase.storage
        .from('food-donations')
        .getPublicUrl(data.path);

      return { publicUrl: urlData.publicUrl, error: null };
    } catch (err) {
      console.warn('[Storage] Exception uploading image:', err);
      const objectUrl = URL.createObjectURL(file);
      return { publicUrl: objectUrl, error: null };
    }
  } else {
    // Simulated instant offline upload
    const objectUrl = URL.createObjectURL(file);
    return { publicUrl: objectUrl, error: null };
  }
};
