import "server-only";
import { unstable_noStore as noStore } from "next/cache";
import { prisma } from "@/lib/db";

export type Locale = "en" | "fr";

const defaultSettings: any = {
  id: "main",
  defaultLocale: "en",
  brand: "AB",
  heroName: "Abdelhamid Bezzot",
  heroRoleEn: "Full Stack Developer",
  heroRoleFr: "Développeur Full Stack",
  heroKickerEn: "",
  heroKickerFr: "",
  heroProjectsCtaEn: "View Work",
  heroProjectsCtaFr: "Voir projets",
  heroProjectsTarget: "#projects",
  heroContactCtaEn: "Get in touch",
  heroContactCtaFr: "Contactez-moi",
  heroContactTarget: "#contact",
  manifestoEn: "",
  manifestoFr: "",
  manifestoNoteEn: "",
  manifestoNoteFr: "",
  contactEyebrowEn: "Contact",
  contactEyebrowFr: "Contact",
  contactTitleEn: "Let's build together",
  contactTitleFr: "Travaillons ensemble",
  contactChoiceEn: "",
  contactChoiceFr: "",
  location: "Morocco",
  footerEn: "© Abdelhamid Bezzot",
  footerFr: "© Abdelhamid Bezzot",
  seoTitleEn: "Abdelhamid Bezzot",
  seoTitleFr: "Abdelhamid Bezzot",
  seoDescriptionEn: "Portfolio",
  seoDescriptionFr: "Portfolio"
};

export async function getPublicContent() {
  noStore();
  try {
    const [settings, marquee, stack, process, links, projects] = await Promise.all([
      prisma.siteSettings.findUnique({ where: { id: "main" } }),
      prisma.marqueeItem.findMany({ orderBy: { order: "asc" } }),
      prisma.stackCategory.findMany({ orderBy: { order: "asc" }, include: { techs: { orderBy: { order: "asc" } } } }),
      prisma.processStep.findMany({ orderBy: { order: "asc" } }),
      prisma.contactLink.findMany({ orderBy: { order: "asc" } }),
      prisma.project.findMany({ where: { published: true }, orderBy: { order: "asc" } })
    ]);
    return {
      settings: settings || defaultSettings,
      marquee: marquee || [],
      stack: stack || [],
      process: process || [],
      links: links || [],
      projects: projects || []
    };
  } catch (error) {
    console.error("Failed to fetch public content from database:", error);
    return {
      settings: defaultSettings,
      marquee: [],
      stack: [],
      process: [],
      links: [],
      projects: []
    };
  }
}

export async function getProject(slug: string) {
  noStore();
  try {
    return await prisma.project.findFirst({ where: { slug, published: true } });
  } catch (error) {
    console.error(`Failed to fetch project ${slug} from database:`, error);
    return null;
  }
}