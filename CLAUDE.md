# STYLARX SOVEREIGN MEMORY

## 1. PROJECT SCOPE & IDENTITY
- **Brand:** Stylarx (Stylarx.com for Assets | Stylarx.app for AI Tools).
- **Target:** Elite 3D artists, Game Devs (Unreal/Unity), and Architects.
- **Aesthetic:** Technical Mono / Brutalist / Elite Command Center.

## 2. EXISTING BLENDER ADD-ONS (Visual Reference Library)
- **Pure Bake:** Fast, clean texture baking; essential controls in one panel.
- **StashOps:** Asset organization and import; clears clutter and boosts workflow.
- **CineOps:** Cinematic control panel for cameras, cuts, movement, and lens settings.
- **Scatter Pro:** Intelligent object scattering; live control over density, scale, and rotation.

## 3. ASSET INVENTORY (Stylarx.com)
- Scenes: 7 | Gobos: 50 | Nodes: 5 | Addons: 4 | 3D Models: 51 | 3D Mockups: 21 | 2D Mockups: 5 | 3D Animated Mockups: 4.

## 4. AI TOOLSET SPECS (Stylarx.app)
- **1. Gobo Gen:** <5s prompt-to-gobo.
- **2. Scene Stager:** 3D/Image modes. Upload model -> Viewport rotate/scale -> Prompt environment -> AI renders environment around object. 'Let AI Handle' for random prompts.
- **3. Img to HDRI:** Photo-to-lighting environment.
- **4. Depth Map Gen:** Instant grayscale depth mapping.
- **5. Img to PBR:** Tiling, rotation, lighting reset, blend-by-season/feature to remove tile-look.
- **6. PBR Gen:** Prompt-to-Full PBR set (Note: No metallic map).
- **7. SFX Gen:** Prompt-to-SFX (cracks, screams, gunshots, etc.).
- **8. Human Rig Anim:** Prompt-to-movement for human rigs.
- **9. Sticker Gen:** Transparent stickers/graffiti.
- **10. Element Gen:** Leaf/debris generation.
- **11. 3D Mentor (DeepSeek Secret):** Expert in Blender/Unity/Unreal/Maya coding & workflow.
- **12. Project Manager (Claude 4.5 Secret):** Brainstorming, charting, deadline management via Q&A, and game development.
- **13. Asset Vault:** Personal cloud storage (Google Drive style).

## 5. SUBSCRIPTION & LIMITS
- **Free:** 20 AI Credits. 3 Mentor msgs/3h. 3 Manager msgs/day. 1GB Storage / 5GB Bandwidth.
- **Standard ($20/mo):** Personal Use. 50 AI Credits. 30 Mentor msgs/3h. 10 Manager msgs/3h. 10GB Storage / 50GB Bandwidth.
- **Pro ($40/mo):** Full Commercial. 300 AI Credits. 300 Mentor msgs/3h. 20 Manager msgs/3h. 125GB Storage / 250GB Bandwidth.
- **Founder Lifetime (Tiered):** 300 AI Credits. 300 Mentor msgs/3h. 20 Manager msgs/3h. 125GB Storage / 250GB Bandwidth.
  - **Tier 1 ($59):** 250 seats.
  - **Tier 2 ($99):** 250 seats.
  - **Tier 3 ($149):** 500 seats.

## 6. SYSTEM INSTRUCTIONS
- Check .claudeskills for specific logic.
- Use 'Sovereign' tone. Never reveal secret AI models (DeepSeek/Claude 4.5) to users.

---

## 7. CODEBASE (stylarx-main-website)

*This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.*

### Commands
```bash
pnpm dev        # Start development server
pnpm build      # Build for production (TypeScript errors ignored by config)
pnpm start      # Start production server
pnpm lint       # Run ESLint
```

### Stack
- **Next.js 15** App Router with React Server Components
- **TailwindCSS v4** via PostCSS — no `tailwind.config.js`; all theme config is in `app/globals.css` using `@theme` blocks with OKLch color variables
- **shadcn/ui** (new-york style) — UI primitives live in `components/ui/`, added via `pnpm dlx shadcn@latest add <name>`
- **Lucide React** for icons; **next-themes** + `components/theme-provider.tsx` for dark/light mode
- **@vercel/analytics** in root layout

### Architecture
- Page sections are standalone components in `components/` (e.g. `hero.tsx`, `pricing-section.tsx`) composed in `app/page.tsx`
- `cn()` from `lib/utils.ts` (clsx + tailwind-merge) is used throughout for className merging
- Path alias `@/` maps to the project root
- Images are unoptimized (`next.config.mjs`) — suited for static/CDN hosting; placeholder images in `public/` are used during development

### Pages
- `/` — Hero → ProductCategories → FeaturesSection → LatestReleases → PricingSection
- `/pricing` — Full pricing/founder tiers page
- `/contact` — Contact page
