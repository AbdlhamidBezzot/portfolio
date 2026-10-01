"use client";

import { useState } from "react";

type Project = any;

const blankProject = {
  slug: "",
  titleEn: "",
  titleFr: "",
  summaryEn: "",
  summaryFr: "",
  descriptionEn: "",
  descriptionFr: "",
  deviceType: "laptop",
  tags: [],
  published: true,
  order: 0,
};

export function ProjectEditor({ projects }: { projects: Project[] }) {
  const [items, setItems] = useState<Project[]>(projects);
  const [selected, setSelected] = useState<Project>(projects[0] || blankProject);
  const [message, setMessage] = useState("");
  const [uploading, setUploading] = useState(false);

  const edit = (k: string, v: any) => setSelected({ ...selected, [k]: v });

  const upload = async (file?: File) => {
    if (!file) return;
    setUploading(true);
    setMessage("Uploading image...");
    const form = new FormData();
    form.append("image", file);

    const r = await fetch("/api/admin/uploads", { method: "POST", body: form });
    const x = await r.json();
    setUploading(false);

    if (!r.ok) return setMessage(x.error || "Upload failed.");
    edit("imageUrl", x.url);
    setMessage("Image uploaded. Save the project to persist it.");
  };

  const save = async () => {
    const r = await fetch("/api/admin/projects", {
      method: selected.id ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(selected),
    });
    const b = await r.json().catch(() => null);
    if (!r.ok) return setMessage(b?.error || "Save failed.");

    setItems(selected.id ? items.map((x) => (x.id === b.id ? b : x)) : [...items, b]);
    setSelected(b);
    new BroadcastChannel("portfolio-content").postMessage("updated");
    setMessage("Saved to Neon database.");
  };

  const del = async () => {
    if (!selected.id) return;
    const r = await fetch("/api/admin/projects", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: selected.id }),
    });

    if (r.ok) {
      const n = items.filter((x) => x.id !== selected.id);
      setItems(n);
      setSelected(n[0] || blankProject);
      new BroadcastChannel("portfolio-content").postMessage("updated");
      setMessage("Project deleted.");
    }
  };

  const fields = [
    ["slug", "Slug (URL identifier)"],
    ["titleEn", "Title — English"],
    ["titleFr", "Title — Français"],
    ["summaryEn", "Summary — English"],
    ["summaryFr", "Summary — Français"],
    ["descriptionEn", "Description — English"],
    ["descriptionFr", "Description — Français"],
    ["eyebrowEn", "Eyebrow / Subtitle — English"],
    ["eyebrowFr", "Eyebrow / Subtitle — Français"],
    ["problemEn", "Problem — English"],
    ["problemFr", "Problem — Français"],
    ["solutionEn", "Solution — English"],
    ["solutionFr", "Solution — Français"],
    ["roleEn", "My Role — English"],
    ["roleFr", "Mon Rôle — Français"],
    ["statusEn", "Status Badge — English"],
    ["statusFr", "Status Badge — Français"],
    ["liveUrl", "Website Link (Visit Website)"],
    ["githubUrl", "GitHub Repository Link"],
  ] as const;

  return (
    <div className="admin-project-grid">
      <aside className="space-y-2">
        {items.map((x) => (
          <button
            key={x.id}
            onClick={() => setSelected(x)}
            className={`w-full text-left px-4 py-3 rounded-lg flex items-center justify-between font-display font-bold text-sm ${
              selected.id === x.id ? "bg-[#363636] text-white" : "bg-[#D2D2D2]/30 hover:bg-[#D2D2D2]"
            }`}
          >
            <span>{x.titleEn}</span>
            <span className="text-[10px] uppercase px-2 py-0.5 rounded bg-black/10">
              {x.deviceType === "phone" ? "📱 Phone View" : "💻 Laptop View"}
            </span>
          </button>
        ))}

        <button
          onClick={() => setSelected(blankProject)}
          className="w-full py-3 rounded-lg border-2 border-dashed border-[#363636]/30 font-display font-bold text-xs uppercase hover:bg-[#DBF505] transition-colors"
        >
          + Add New Project
        </button>
      </aside>

      <section className="admin-project-editor">
        <div className="mb-6 p-4 rounded-xl bg-[#DBF505]/20 border border-[#DBF505]">
          <label className="font-display font-bold text-xs uppercase block mb-2 text-[#363636]">
            Device View Frame (Controls how mockups are rendered)
          </label>
          <select
            value={selected.deviceType || "laptop"}
            onChange={(e) => edit("deviceType", e.target.value)}
            className="w-full p-3 rounded-lg border border-[#363636]/20 bg-white font-display font-bold text-sm uppercase"
          >
            <option value="laptop">💻 Laptop View (Desktop Mockup Frame)</option>
            <option value="phone">📱 Phone View (Smartphone Mockup Frame)</option>
          </select>
        </div>

        {fields.map(([k, label]) => (
          <label key={k}>
            {label}
            <textarea
              rows={k.includes("Description") || k.includes("summary") ? 3 : 1}
              value={selected[k] || ""}
              onChange={(e) => edit(k, e.target.value)}
            />
          </label>
        ))}

        <label>
          Project image
          {selected.imageUrl && (
            <div className="my-2">
              <img
                className="admin-image-preview max-h-48 rounded-lg object-contain bg-black/5 p-2"
                src={selected.imageUrl}
                alt="Current project image"
              />
              <button
                type="button"
                className="mt-2 text-xs text-red-600 underline font-bold"
                onClick={() => edit("imageUrl", "")}
              >
                Remove image
              </button>
            </div>
          )}
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            disabled={uploading}
            onChange={(e) => upload(e.target.files?.[0])}
          />
          <small>
            {selected.imageUrl
              ? "Choose an image to replace the current one."
              : "JPG, PNG, WEBP, or GIF. Maximum 5 MB."}
          </small>
        </label>

        <label>
          Tags (comma-separated)
          <input
            value={(selected.tags || []).join(", ")}
            onChange={(e) =>
              edit(
                "tags",
                e.target.value.split(",").map((x) => x.trim()).filter(Boolean)
              )
            }
          />
        </label>

        <div className="flex gap-4 pt-4">
          <button
            disabled={uploading}
            onClick={save}
            className="pill-button !bg-[#DBF505] !text-[#363636]"
          >
            {uploading ? "Uploading…" : "Save project"}
          </button>
          {selected.id && (
            <button
              onClick={del}
              className="pill-button !bg-red-600 !text-white"
            >
              Delete project
            </button>
          )}
        </div>

        {message && <p className="font-body text-xs font-bold text-[#06BC65] mt-2">{message}</p>}
      </section>
    </div>
  );
}
