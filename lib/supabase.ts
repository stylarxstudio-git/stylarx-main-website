import { createClient } from "@supabase/supabase-js"
import type { Category, Asset } from "@/lib/assets"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export interface Product {
  id: number
  created_at: string
  name: string
  slug: string
  description: string | null
  image_url: string | null
  extra_images: string[] | null
  category: string
  formats: string[] | null
  meta: string | null
  is_new: boolean
  free: boolean
  required_plan_uid: string | null
  lemonsqueezy_url: string | null
  disclaimer: string | null
  what_you_will_get: string[] | null
}

export function mapProductToAsset(p: Product): Asset {
  return {
    id: p.id,
    name: p.name,
    slug: p.slug,
    category: p.category as Exclude<Category, "ALL">,
    formats: Array.isArray(p.formats) ? p.formats : [],
    free: p.free,
    isNew: p.is_new,
    description: p.description ?? "",
    meta: p.meta ?? "",
    disclaimer: p.disclaimer ?? undefined,
    whatYouGet: Array.isArray(p.what_you_will_get) ? p.what_you_will_get : undefined,
    image_url: p.image_url,
    extra_images: Array.isArray(p.extra_images) ? p.extra_images : null,
    lemonsqueezy_url: p.lemonsqueezy_url,
    required_plan_uid: p.required_plan_uid,
  }
}

export async function uploadProductImage(file: File, folder = "main"): Promise<string | null> {
  const ext = file.name.split(".").pop() ?? "jpg"
  const path = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`

  const { data, error } = await supabase.storage
    .from("product-images")
    .upload(path, file, { upsert: true, contentType: file.type })

  if (error || !data) return null

  const { data: { publicUrl } } = supabase.storage
    .from("product-images")
    .getPublicUrl(data.path)

  return publicUrl
}
