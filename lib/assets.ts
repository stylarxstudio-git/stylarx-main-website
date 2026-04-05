export type Category = "ALL" | "SCENE" | "MODEL" | "MOCKUP" | "GOBO" | "ADDON" | "GEO NODE"


export interface CategoryMeta {
  label: string
  total: number
}


export const categoryMeta: Record<Category, CategoryMeta> = {
  ALL:        { label: "All Assets",    total: 147 },
  SCENE:      { label: "Scenes",        total: 7   },
  MODEL:      { label: "3D Models",     total: 51  },
  MOCKUP:     { label: "Mockups",       total: 30  },
  GOBO:       { label: "Gobo Textures", total: 50  },
  ADDON:      { label: "Add-ons",       total: 4   },
  "GEO NODE": { label: "Geo Nodes",     total: 5   },
}


export const categoryOrder: Category[] = ["ALL", "SCENE", "MODEL", "MOCKUP", "GOBO", "ADDON", "GEO NODE"]


export interface Asset {
  id: number
  name: string
  slug: string
  category: Exclude<Category, "ALL">
  formats: string[]
  free: boolean
  isNew: boolean
  description: string
  meta: string
  disclaimer?: string
  whatYouGet?: string[]
}


export const formatColor: Record<string, string> = {
  ".blend": "bg-orange-500/10 text-orange-500/80 border-orange-500/20",
  ".fbx":   "bg-blue-500/10 text-blue-500/80 border-blue-500/20",
  ".obj":   "bg-purple-500/10 text-purple-500/80 border-purple-500/20",
  ".exr":   "bg-cyan-500/10 text-cyan-500/80 border-cyan-500/20",
  ".png":   "bg-green-500/10 text-green-500/80 border-green-500/20",
  ".py":    "bg-yellow-500/10 text-yellow-500/80 border-yellow-500/20",
  ".usdz":  "bg-pink-500/10 text-pink-500/80 border-pink-500/20",
}


export const assets: Asset[] = []



