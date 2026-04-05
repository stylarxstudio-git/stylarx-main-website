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

export const assets: Asset[] = []