import type { MetadataRoute } from "next";
import { prisma } from "@/lib/db";

// Excluded paths (never appear in sitemap):
//   /admin*, /api/*, /opengraph-image

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = (
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.abdelhamidbezzot.tech"
  ).replace(/\/$/, ""); // strip trailing slash

  let projects: { slug: string; updatedAt: Date }[] = [];
  try {
    projects = await prisma.project.findMany({
      where: { published: true },
      select: { slug: true, updatedAt: true },
      orderBy: { order: "asc" }
    });
  } catch (e) {
    console.error("Sitemap: db error fetching projects:", e);
  }

  const now = new Date();

  /** Static public routes — one entry per locale */
  const staticRoutes: MetadataRoute.Sitemap = [
    // Root (redirects to /en, included for crawlers)
    { url: `${baseUrl}/`,          lastModified: now },
    // English pages
    { url: `${baseUrl}/en`,        lastModified: now },
    { url: `${baseUrl}/en/projects`, lastModified: now },
    // French pages
    { url: `${baseUrl}/fr`,        lastModified: now },
    { url: `${baseUrl}/fr/projects`, lastModified: now },
  ];

  /** Dynamic project case-study pages */
  const projectRoutes: MetadataRoute.Sitemap = projects.flatMap((p) => [
    { url: `${baseUrl}/en/projects/${p.slug}`, lastModified: p.updatedAt ?? now },
    { url: `${baseUrl}/fr/projects/${p.slug}`, lastModified: p.updatedAt ?? now },
  ]);

  return [...staticRoutes, ...projectRoutes];
}