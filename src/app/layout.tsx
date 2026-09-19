import type { Metadata } from "next";
import "./globals.css";
import { prisma } from "@/lib/db";

export async function generateMetadata(): Promise<Metadata> {
  let title = "Abdelhamid Bezzot";
  let description = "Portfolio";
  try {
    const s = await prisma.siteSettings.findUnique({ where: { id: "main" } });
    if (s?.seoTitleEn) title = s.seoTitleEn;
    if (s?.seoDescriptionEn) description = s.seoDescriptionEn;
  } catch (e) {
    console.error("Failed to load metadata from database", e);
  }
  return {
    title,
    description,
    metadataBase: new URL("https://abdelhamidbezzot.dev"),
    alternates: { languages: { en: "/en", fr: "/fr" } },
    openGraph: {
      title,
      description,
      images: [{ url: "/og-image.png", width: 1200, height: 630, alt: title }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og-image.png"],
    }
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body>{children}</body></html>;
}