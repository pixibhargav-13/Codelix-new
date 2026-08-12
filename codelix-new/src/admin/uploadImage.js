import { supabase } from "../lib/supabaseClient";

/* uploads a file to the public "media" bucket (created by supabase/schema.sql)
   under a folder per content type, returns the public URL */
export async function uploadImage(file, folder) {
  const ext = file.name.split(".").pop();
  const uuid = typeof crypto !== 'undefined' && crypto.randomUUID 
    ? crypto.randomUUID() 
    : Date.now().toString(36) + Math.random().toString(36).substring(2);
  const path = `${folder}/${uuid}.${ext}`;

  const { error } = await supabase.storage.from("media").upload(path, file, {
    cacheControl: "3600",
    upsert: false,
  });
  if (error) throw error;

  const { data } = supabase.storage.from("media").getPublicUrl(path);
  return data.publicUrl;
}
