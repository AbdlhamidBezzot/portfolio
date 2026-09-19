import type { MetadataRoute } from "next";
import { prisma } from "@/lib/db";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = "https://abdelhamidbezzot.dev";
  let projects: { slug: string; updatedAt: Date }[] = [];
  try {
    projects = await prisma.project.findMany({
      where: { published: true },
      select: { slug: true, updatedAt: true }
    });
  } catch (e) {
    console.error("Sitemap generation database error", e);
  }
  return [
    { url: base + "/en", lastModified: new Date() },
    { url: base + "/fr", lastModified: new Date() },
    ...projects.flatMap(p => [
      { url: `${base}/en/projects/${p.slug}`, lastModified: p.updatedAt },
      { url: `${base}/fr/projects/${p.slug}`, lastModified: p.updatedAt }
    ])
  ];
}