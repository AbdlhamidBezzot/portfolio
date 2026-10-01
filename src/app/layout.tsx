import type { Metadata } from "next";
import "./globals.css";
import { prisma } from "@/lib/db";
import { Analytics } from "@vercel/analytics/next";

export async function generateMetadata(): Promise<Metadata> {
  let title = "Abdelhamid Bezzot — Full-Stack Developer & Applied AI";
  let description = "Portfolio of Abdelhamid Bezzot: full-stack products and applied AI systems.";
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
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://www.abdelhamidbezzot.tech"),
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
    },
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth antialiased">
      <head>
        {/* Preconnect to Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,400;0,14..32,600;0,14..32,700;0,14..32,800;0,14..32,900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}