import { supabase } from "../lib/supabaseClient";

/* photos and screenshots are re-encoded in the browser as WebP, at most
   1600px wide, so the site never serves a multi-megabyte PNG or JPG.
   SVGs (vector) and GIFs (may be animated) are uploaded as they are, and so
   is anything the browser cannot encode as WebP. */
const MAX_W = 1600;
const CONVERT = /^image\/(png|jpe?g|webp|bmp)$/;

async function toWebp(file) {
  if (!CONVERT.test(file.type)) return file;
  try {
    const bitmap = await createImageBitmap(file);
    const scale = Math.min(1, MAX_W / bitmap.width);
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(bitmap.width * scale);
    canvas.height = Math.round(bitmap.height * scale);
    canvas.getContext("2d").drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    bitmap.close?.();
    const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/webp", 0.85));
    /* keep the original when the browser can't make WebP, or when the WebP
       came out bigger (an already small, already compressed file) */
    if (!blob || blob.type !== "image/webp" || blob.size >= file.size) return file;
    return new File([blob], file.name.replace(/\.[^.]+$/, "") + ".webp", { type: "image/webp" });
  } catch {
    return file;
  }
}

/* uploads a file to the public "media" bucket (created by supabase/schema.sql)
   under a folder per content type, returns the public URL */
export async function uploadImage(original, folder) {
  const file = await toWebp(original);
  const ext = file.name.split(".").pop();
  const uuid = typeof crypto !== 'undefined' && crypto.randomUUID
    ? crypto.randomUUID()
    : Date.now().toString(36) + Math.random().toString(36).substring(2);
  const path = `${folder}/${uuid}.${ext}`;

  /* every upload gets a new name, so browsers may keep it for a year */
  const { error } = await supabase.storage.from("media").upload(path, file, {
    cacheControl: "31536000",
    contentType: file.type || undefined,
    upsert: false,
  });
  if (error) throw error;

  const { data } = supabase.storage.from("media").getPublicUrl(path);
  return data.publicUrl;
}
