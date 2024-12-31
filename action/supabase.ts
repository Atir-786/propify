import { supabase } from "@/lib/supabase";

const addImagesToSupabase = async (images) => {
  const uploadedImages: string[] = [];
  for (const image of images) {
    const { data, error } = await supabase.storage
      .from("propertyImages")
      .upload(`${Date.now()}_${image.name}`, image);
    if (error) {
      console.log(error.message);
      throw new Error("Image upload failed");
    }
    const publicUrl = supabase.storage
      .from("propertyImages")
      .getPublicUrl(data.path).data.publicUrl;
    uploadedImages.push(publicUrl);
  }
  return uploadedImages;
};
export { addImagesToSupabase };
