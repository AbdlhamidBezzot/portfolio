"use client";

import { HeaderTopBar } from "@/components/ui/HeaderTopBar";
import { FloatingControls } from "@/components/ui/FloatingControls";
import { CollageHero } from "@/components/sections/CollageHero";
import { TechMarquee } from "@/components/sections/TechMarquee";
import { CoreStackShowcase } from "@/components/sections/CoreStackShowcase";
import { FeaturedWork } from "@/components/sections/FeaturedWork";
import { Footer } from "@/components/ui/Footer";

interface LocalizedHomeProps {
  locale: "en" | "fr";
  data: any;
}

export function LocalizedHome({ locale, data }: LocalizedHomeProps) {
  const { settings, projects, stack } = data || {};

  // Extract tech labels from database stack or default list
  const techList =
    stack && stack.length > 0
      ? stack.flatMap((cat: any) => cat.techs?.map((t: any) => t.label.toUpperCase()) || [])
      : undefined;

  const roleText = locale === "en" ? settings?.heroRoleEn : settings?.heroRoleFr;

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#363636] relative selection:bg-[#DBF505] selection:text-[#363636]">
      {/* Floating corner controls */}
      <FloatingControls locale={locale} />

      {/* Top Bar Header */}
      <HeaderTopBar />

      <main className="w-full">
        {/* Collage Hero Section */}
        <CollageHero
          locale={locale}
          name={settings?.heroName?.toUpperCase() || "ABDELHAMID BEZZOT"}
          roleText={roleText}
          projects={projects}
        />

        {/* Tech I Use Ticker */}
        <TechMarquee items={techList} />

        {/* Core Stack Section */}
        <CoreStackShowcase locale={locale} />

        {/* Featured Work Showcase */}
        <FeaturedWork locale={locale} projects={projects} />
      </main>

      {/* Footer */}
      <Footer locale={locale} />
    </div>
  );
}