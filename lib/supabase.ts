import { createClient } from "@supabase/supabase-js"
import type { Category } from "@/lib/assets"
import type { Asset } from "@/lib/assets"

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
    formats: p.formats ?? [],
    free: p.free,
    isNew: p.is_new,
    description: p.description ?? "",
    meta: p.meta ?? "",
    disclaimer: p.disclaimer ?? undefined,
    whatYouGet: p.what_you_will_get ?? undefined,
    image_url: p.image_url,
    lemonsqueezy_url: p.lemonsqueezy_url,
    required_plan_uid: p.required_plan_uid,
  }
}
