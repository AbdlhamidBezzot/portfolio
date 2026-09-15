import "server-only";
import { unstable_noStore as noStore } from "next/cache";
import { prisma } from "@/lib/db";

export type Locale = "en" | "fr";
export async function getPublicContent() {
  noStore();
  const [settings, marquee, stack, process, links, projects] = await Promise.all([
    prisma.siteSettings.findUniqueOrThrow({ where: { id: "main" } }),
    prisma.marqueeItem.findMany({ orderBy: { order: "asc" } }),
    prisma.stackCategory.findMany({ orderBy: { order: "asc" }, include: { techs: { orderBy: { order: "asc" } } } }),
    prisma.processStep.findMany({ orderBy: { order: "asc" } }),
    prisma.contactLink.findMany({ orderBy: { order: "asc" } }),
    prisma.project.findMany({ where: { published: true }, orderBy: { order: "asc" } })
  ]);
  return { settings, marquee, stack, process, links, projects };
}
export async function getProject(slug: string) { noStore(); return prisma.project.findFirst({ where: { slug, published: true } }); }