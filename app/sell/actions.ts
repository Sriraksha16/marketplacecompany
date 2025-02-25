'use server';
import { supabase } from "@/lib/supabase/client";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(3),
  description: z.string().min(10),
  price: z.coerce.number().min(0),
  industry: z.string(),
  image_url: z.string().url()
});

export async function createListing(formData: FormData) {
  const { data: { user } } = await supabase.auth.getUser();
  
  const validated = schema.parse({
    name: formData.get('name'),
    description: formData.get('description'),
    price: formData.get('price'),
    industry: formData.get('industry'),
   // image_url: formData.get('image_url')
  });

  await supabase.from('companies').insert({
    ...validated,
    seller_id: user?.id
  });
}