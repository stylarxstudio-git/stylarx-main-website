"use client"
export const dynamic = "force-dynamic";

import { useState, useEffect, useCallback } from "react"
import { supabase } from "@/lib/supabase"
import type { Product } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Plus, Pencil, Trash2, X, LogOut, Save, Loader2 } from "lucide-react"

const ADMIN_PASSWORD = "NevanSamra0214"
const CATEGORIES = ["SCENE", "MODEL", "MOCKUP", "GOBO", "ADDON", "GEO NODE"]
const FORMAT_OPTIONS = [".blend", ".fbx", ".obj", ".exr", ".png", ".py", ".usdz", ".mp4", ".zip"]

const emptyForm: Omit<Product, "id" | "created_at"> = {
  name: "",
  slug: "",
  description: "",
  image_url: "",
  category: "MODEL",
  formats: [],
  meta: "",
  is_new: false,
  free: false,
  required_plan_uid: "",
  lemonsqueezy_url: "",
  disclaimer: "",
  what_you_will_get: [],
}

export default function AdminPage() {
  const [authed, setAuthed] = useState(false)
  const [password, setPassword] = useState("")
  const [passwordError, setPasswordError] = useState(false)

  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState<number | null>(null)

  const [modalOpen, setModalOpen] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [form, setForm] = useState<Omit<Product, "id" | "created_at">>(emptyForm)
  const [whatYouGetInput, setWhatYouGetInput] = useState("")
  const [formError, setFormError] = useState("")

  // Check localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("stylarx_admin_authed")
      if (stored === "true") setAuthed(true)
    }
  }, [])

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      localStorage.setItem("stylarx_admin_authed", "true")
      setAuthed(true)
      setPasswordError(false)
    } else {
      setPasswordError(true)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("stylarx_admin_authed")
    setAuthed(false)
  }

  const fetchProducts = useCallback(async () => {
    setLoading(true)
    const { data } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false })
    setProducts(data ?? [])
    setLoading(false)
  }, [])

  useEffect(() => {
    if (authed) fetchProducts()
  }, [authed, fetchProducts])

  function openAdd() {
    setEditingId(null)
    setForm(emptyForm)
    setWhatYouGetInput("")
    setFormError("")
    setModalOpen(true)
  }

  function openEdit(product: Product) {
    setEditingId(product.id)
    setForm({
      name: product.name,
      slug: product.slug,
      description: product.description ?? "",
      image_url: product.image_url ?? "",
      category: product.category,
      formats: product.formats ?? [],
      meta: product.meta ?? "",
      is_new: product.is_new,
      free: product.free,
      required_plan_uid: product.required_plan_uid ?? "",
      lemonsqueezy_url: product.lemonsqueezy_url ?? "",
      disclaimer: product.disclaimer ?? "",
      what_you_will_get: product.what_you_will_get ?? [],
    })
    setWhatYouGetInput((product.what_you_will_get ?? []).join("\n"))
    setFormError("")
    setModalOpen(true)
  }

  function closeModal() {
    setModalOpen(false)
    setEditingId(null)
    setFormError("")
  }

  
  function handleFormatToggle(fmt: string) {
    setForm((prev) => ({
      ...prev,
      formats: prev.formats.includes(fmt)
        ? prev.formats.filter((f) => f !== fmt)
        : [...prev.formats, fmt],
    }))
  }

  async function handleSave() {
    if (!form.name.trim() || !form.slug.trim()) {
      setFormError("Name and slug are required.")
      return
    }
    setSaving(true)
    setFormError("")

    const payload = {
      ...form,
      image_url: form.image_url || null,
      required_plan_uid: form.required_plan_uid || null,
      lemonsqueezy_url: form.lemonsqueezy_url || null,
      disclaimer: form.disclaimer || null,
      what_you_will_get: whatYouGetInput
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean),
    }

    let error
    if (editingId !== null) {
      ;({ error } = await supabase.from("products").update(payload).eq("id", editingId))
    } else {
      ;({ error } = await supabase.from("products").insert([payload]))
    }

    setSaving(false)
    if (error) {
      setFormError(error.message)
    } else {
      closeModal()
      fetchProducts()
    }
  }

  async function handleDelete(id: number) {
    if (!confirm("Delete this product? This cannot be undone.")) return
    setDeleting(id)
    await supabase.from("products").delete().eq("id", id)
    setDeleting(null)
    fetchProducts()
  }

  // ── Login screen ──────────────────────────────────────────────────────────
  if (!authed) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4">
        <div className="w-full max-w-sm rounded-2xl border border-border bg-card p-8">
          <p className="mb-1 font-mono text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            — STYLARX
          </p>
          <h1 className="mb-6 text-2xl font-bold text-foreground">Admin Access</h1>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            className="mb-2 w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground outline-none focus:border-foreground/40"
          />
          {passwordError && (
            <p className="mb-3 font-mono text-xs text-red-500">Incorrect password.</p>
          )}
          <Button className="w-full" onClick={handleLogin}>
            Enter
          </Button>
        </div>
      </div>
    )
  }

  // ── Admin dashboard ───────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <div className="sticky top-0 z-40 border-b border-border/40 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div>
            <p className="font-mono text-xs text-muted-foreground">STYLARX</p>
            <h1 className="text-lg font-bold text-foreground">Product Manager</h1>
          </div>
          <div className="flex items-center gap-3">
            <Button size="sm" onClick={openAdd}>
              <Plus className="mr-1.5 h-3.5 w-3.5" />
              Add Product
            </Button>
            <Button size="sm" variant="ghost" onClick={handleLogout}>
              <LogOut className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-8">
        {loading ? (
          <div className="flex items-center justify-center py-24">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : products.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border p-16 text-center">
            <p className="text-muted-foreground">No products yet.</p>
            <Button className="mt-4" onClick={openAdd}>
              <Plus className="mr-1.5 h-4 w-4" />
              Add First Product
            </Button>
          </div>
        ) : (
          <div className="overflow-hidden rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-secondary/30">
                  <th className="px-4 py-3 text-left font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Name
                  </th>
                  <th className="px-4 py-3 text-left font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Category
                  </th>
                  <th className="px-4 py-3 text-left font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Slug
                  </th>
                  <th className="px-4 py-3 text-center font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Free
                  </th>
                  <th className="px-4 py-3 text-center font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    New
                  </th>
                  <th className="px-4 py-3 text-right font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, i) => (
                  <tr
                    key={product.id}
                    className={`border-b border-border/50 transition-colors hover:bg-secondary/20 ${
                      i === products.length - 1 ? "border-b-0" : ""
                    }`}
                  >
                    <td className="px-4 py-3 font-medium text-foreground">{product.name}</td>
                    <td className="px-4 py-3">
                      <span className="rounded border border-border px-2 py-0.5 font-mono text-xs text-muted-foreground">
                        {product.category}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                      {product.slug}
                    </td>
                    <td className="px-4 py-3 text-center">
                      {product.free ? (
                        <span className="rounded bg-emerald-500/10 px-2 py-0.5 font-mono text-xs text-emerald-500">
                          FREE
                        </span>
                      ) : (
                        <span className="font-mono text-xs text-muted-foreground/40">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-center">
                      {product.is_new ? (
                        <span className="rounded bg-foreground/10 px-2 py-0.5 font-mono text-xs text-foreground">
                          NEW
                        </span>
                      ) : (
                        <span className="font-mono text-xs text-muted-foreground/40">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEdit(product)}
                          className="flex h-7 w-7 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                        >
                          <Pencil className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          disabled={deleting === product.id}
                          className="flex h-7 w-7 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-red-500/10 hover:text-red-500"
                        >
                          {deleting === product.id ? (
                            <Loader2 className="h-3.5 w-3.5 animate-spin" />
                          ) : (
                            <Trash2 className="h-3.5 w-3.5" />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add / Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/60 px-4 py-8 backdrop-blur-sm">
          <div className="w-full max-w-2xl rounded-2xl border border-border bg-background shadow-2xl">
            {/* Modal header */}
            <div className="flex items-center justify-between border-b border-border px-6 py-4">
              <h2 className="font-semibold text-foreground">
                {editingId !== null ? "Edit Product" : "Add Product"}
              </h2>
              <button
                onClick={closeModal}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Modal body */}
            <div className="space-y-5 px-6 py-6">
              {/* Name + Slug */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block font-mono text-xs text-muted-foreground">
                    Name *
                  </label>
                  <input
                    value={form.name}
                    onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-foreground/40"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block font-mono text-xs text-muted-foreground">
                    Slug *
                  </label>
                  <input
                    value={form.slug}
                    onChange={(e) => setForm((p) => ({ ...p, slug: e.target.value }))}
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 font-mono text-sm text-foreground outline-none focus:border-foreground/40"
                    placeholder="my-product-slug"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="mb-1.5 block font-mono text-xs text-muted-foreground">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={form.description ?? ""}
                  onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-foreground/40 resize-none"
                />
              </div>

              {/* Image URL + Meta */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block font-mono text-xs text-muted-foreground">
                    Image URL
                  </label>
                  <input
                    value={form.image_url ?? ""}
                    onChange={(e) => setForm((p) => ({ ...p, image_url: e.target.value }))}
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-foreground/40"
                    placeholder="https://..."
                  />
                </div>
                <div>
                  <label className="mb-1.5 block font-mono text-xs text-muted-foreground">
                    Meta
                  </label>
                  <input
                    value={form.meta ?? ""}
                    onChange={(e) => setForm((p) => ({ ...p, meta: e.target.value }))}
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-foreground/40"
                    placeholder="e.g. 42K polys · PBR"
                  />
                </div>
              </div>

              {/* Category */}
              <div>
                <label className="mb-1.5 block font-mono text-xs text-muted-foreground">
                  Category
                </label>
                <select
                  value={form.category}
                  onChange={(e) => setForm((p) => ({ ...p, category: e.target.value }))}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-foreground/40"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              {/* Formats */}
              <div>
                <label className="mb-2 block font-mono text-xs text-muted-foreground">
                  File Formats
                </label>
                <div className="flex flex-wrap gap-2">
                  {FORMAT_OPTIONS.map((fmt) => (
                    <button
                      key={fmt}
                      type="button"
                      onClick={() => handleFormatToggle(fmt)}
                      className={`rounded border px-2.5 py-1 font-mono text-xs transition-colors ${
                        form.formats.includes(fmt)
                          ? "border-foreground bg-foreground text-background"
                          : "border-border text-muted-foreground hover:border-foreground/40 hover:text-foreground"
                      }`}
                    >
                      {fmt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Required Plan UID + LemonSqueezy URL */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block font-mono text-xs text-muted-foreground">
                    Required Plan UID
                  </label>
                  <input
                    value={form.required_plan_uid ?? ""}
                    onChange={(e) => setForm((p) => ({ ...p, required_plan_uid: e.target.value }))}
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 font-mono text-sm text-foreground outline-none focus:border-foreground/40"
                    placeholder="e.g. 7ma2MXQE"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block font-mono text-xs text-muted-foreground">
                    LemonSqueezy / Download URL
                  </label>
                  <input
                    value={form.lemonsqueezy_url ?? ""}
                    onChange={(e) => setForm((p) => ({ ...p, lemonsqueezy_url: e.target.value }))}
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-foreground/40"
                    placeholder="https://..."
                  />
                </div>
              </div>

              {/* Disclaimer */}
              <div>
                <label className="mb-1.5 block font-mono text-xs text-muted-foreground">
                  Disclaimer
                </label>
                <textarea
                  rows={2}
                  value={form.disclaimer ?? ""}
                  onChange={(e) => setForm((p) => ({ ...p, disclaimer: e.target.value }))}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-foreground/40 resize-none"
                />
              </div>

              {/* What You Will Get */}
              <div>
                <label className="mb-1.5 block font-mono text-xs text-muted-foreground">
                  What You Will Get{" "}
                  <span className="text-muted-foreground/50">(one item per line)</span>
                </label>
                <textarea
                  rows={4}
                  value={whatYouGetInput}
                  onChange={(e) => setWhatYouGetInput(e.target.value)}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-foreground/40 resize-none"
                  placeholder={"1 .blend file\n4K textures included\nBlender 4.0+"}
                />
              </div>

              {/* Booleans */}
              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.free}
                    onChange={(e) => setForm((p) => ({ ...p, free: e.target.checked }))}
                    className="h-4 w-4 rounded border-border accent-foreground"
                  />
                  <span className="font-mono text-xs text-muted-foreground">Free asset</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.is_new}
                    onChange={(e) => setForm((p) => ({ ...p, is_new: e.target.checked }))}
                    className="h-4 w-4 rounded border-border accent-foreground"
                  />
                  <span className="font-mono text-xs text-muted-foreground">Mark as NEW</span>
                </label>
              </div>

              {formError && (
                <p className="rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-2 font-mono text-xs text-red-500">
                  {formError}
                </p>
              )}
            </div>

            {/* Modal footer */}
            <div className="flex items-center justify-end gap-3 border-t border-border px-6 py-4">
              <Button variant="ghost" size="sm" onClick={closeModal}>
                Cancel
              </Button>
              <Button size="sm" onClick={handleSave} disabled={saving}>
                {saving ? (
                  <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />
                ) : (
                  <Save className="mr-1.5 h-3.5 w-3.5" />
                )}
                {editingId !== null ? "Save Changes" : "Add Product"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
