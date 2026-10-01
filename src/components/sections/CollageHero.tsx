"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowDownRight } from "lucide-react";
import { ModalProject, ProjectDetailModal } from "../ui/ProjectDetailModal";
import { DeviceFrame } from "../ui/DeviceFrame";

interface CollageHeroProps {
  locale: "en" | "fr";
  roleText?: string;
  name?: string;
  projects?: Array<{
    slug: string;
    titleEn: string;
    titleFr: string;
    eyebrowEn?: string | null;
    eyebrowFr?: string | null;
    summaryEn?: string | null;
    summaryFr?: string | null;
    descriptionEn?: string | null;
    descriptionFr?: string | null;
    problemEn?: string | null;
    problemFr?: string | null;
    solutionEn?: string | null;
    solutionFr?: string | null;
    roleEn?: string | null;
    roleFr?: string | null;
    statusEn?: string | null;
    statusFr?: string | null;
    tags: string[];
    imageUrl?: string | null;
    deviceType?: string | null;
    liveUrl?: string | null;
    githubUrl?: string | null;
  }>;
}

export function CollageHero({
  locale,
  name = "ABDELHAMID BEZZOT",
  roleText,
  projects = [],
}: CollageHeroProps) {
  const [selectedProject, setSelectedProject] = useState<ModalProject | null>(null);

  const displayRole =
    (roleText && !roleText.toLowerCase().includes("applied ai") && !roleText.toLowerCase().includes("appliquée")
      ? roleText
      : locale === "en"
      ? "FULL-STACK DEVELOPER & AI ENGINEER"
      : "DÉVELOPPEUR FULL-STACK & AI ENGINEER").toUpperCase();

  // Fallback visual definitions for the 4 fridge magnet cards (Apollo, Bloom, ZAZA, CineNight)
  const cardConfigs = [
    {
      slug: "apollo",
      title: "APOLLO",
      subtitle: locale === "en" ? "CINEMA AI OS" : "OS CINÉMA IA",
      bgColor: "bg-[#DBF505]", // Lime
      textColor: "text-[#363636]",
      rotateValue: -12,
      zIndex: 10,
      image: "/projects/apollo.png",
      deviceType: "laptop",
    },
    {
      slug: "bloom",
      title: "BLOOM",
      subtitle: locale === "en" ? "TIME EXCHANGE" : "TROC DE TEMPS",
      bgColor: "bg-[#FFBDF7]", // Pink
      textColor: "text-[#363636]",
      rotateValue: -4,
      zIndex: 20,
      image: "/projects/bloom.png",
      deviceType: "laptop",
    },
    {
      slug: "zaza",
      title: "ZAZA",
      subtitle: locale === "en" ? "AI STYLIST COMMERCE" : "E-COMMERCE MODE IA",
      bgColor: "bg-[#F05626]", // Orange
      textColor: "text-white",
      rotateValue: 3,
      zIndex: 30,
      image: "/projects/zaza.png",
      deviceType: "laptop",
    },
    {
      slug: "cinenight",
      title: "CINENIGHT",
      subtitle: locale === "en" ? "MOVIE NIGHT APP" : "SOIRÉE CINÉMA APP",
      bgColor: "bg-[#245767]", // Teal
      textColor: "text-white",
      rotateValue: 12,
      zIndex: 40,
      image: "/projects/cinenight.png",
      deviceType: "phone",
    },
  ];

  const handleCardClick = (slug: string) => {
    const foundProject = projects.find((p) => p.slug.toLowerCase() === slug.toLowerCase());
    if (foundProject) {
      setSelectedProject(foundProject);
    } else {
      const cfg = cardConfigs.find((c) => c.slug === slug);
      if (cfg) {
        setSelectedProject({
          slug: cfg.slug,
          titleEn: cfg.title,
          titleFr: cfg.title,
          eyebrowEn: cfg.subtitle,
          eyebrowFr: cfg.subtitle,
          summaryEn: "A full-stack product engineered with cutting-edge stack.",
          summaryFr: "Un produit full-stack conçu avec des technologies de pointe.",
          tags: ["Next.js", "AI", "TypeScript"],
          imageUrl: cfg.image,
        });
      }
    }
  };

  return (
    <>
      <section className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-12 pt-4 pb-16 overflow-hidden flex flex-col items-center">
        {/* Name Display positioned closer to cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full text-center mb-2 md:mb-4 select-none z-10"
        >
          <h1 className="display-xxl tracking-tighter text-[#363636] leading-[0.82]">
            {name}
          </h1>
        </motion.div>

        {/* Scattered Collage Row (Spencer Gabor Style) */}
        <div className="relative w-full my-4 sm:my-10 min-h-[360px] sm:min-h-[460px] md:min-h-[500px] flex items-center justify-center py-2 sm:py-4">
          <div className="relative w-full max-w-5xl flex flex-wrap md:flex-nowrap items-center justify-center gap-3 sm:gap-6 md:gap-0 px-2">
            {cardConfigs.map((cfg, idx) => {
              const dbProj = projects.find((p) => p.slug.toLowerCase() === cfg.slug.toLowerCase());
              const imageUrl = dbProj?.imageUrl || cfg.image;
              const deviceType = dbProj?.deviceType || cfg.deviceType;

              return (
                <motion.div
                  key={cfg.slug}
                  initial={{ opacity: 0, y: 30, rotate: cfg.rotateValue }}
                  animate={{ opacity: 1, y: 0, rotate: cfg.rotateValue }}
                  whileHover={{ scale: 1.08, rotate: 0, zIndex: 60, cursor: "pointer" }}
                  transition={{ duration: 0.35, delay: 0.08 * idx }}
                  onClick={() => handleCardClick(cfg.slug)}
                  className={`relative w-[150px] xs:w-[190px] sm:w-[250px] md:w-[280px] p-2.5 sm:p-4 rounded-[18px] sm:rounded-[22px] ${cfg.bgColor} ${cfg.textColor} shadow-[0_12px_32px_rgba(0,0,0,0.18)] transition-all duration-300 mx-0 md:-mx-6 lg:-mx-8 select-none group cursor-pointer`}
                  style={{ zIndex: cfg.zIndex }}
                >
                  {/* Photo area with DeviceFrame */}
                  <div className="relative w-full h-[120px] xs:h-[150px] sm:h-[200px] md:h-[230px] rounded-[14px] overflow-hidden bg-black/10 mb-2 sm:mb-3 border border-black/5 flex items-center justify-center p-1.5 sm:p-2">
                    <DeviceFrame
                      deviceType={deviceType}
                      imageUrl={imageUrl}
                      title={cfg.title}
                    />
                  </div>

                  {/* Card Bottom Label */}
                  <div className="flex justify-between items-center px-1 pt-0.5">
                    <div>
                      <div className="font-display font-black text-sm xs:text-base sm:text-xl md:text-2xl tracking-tight leading-none">
                        {cfg.title}
                      </div>
                      <div className="font-display font-bold text-[9px] sm:text-[11px] opacity-80 mt-0.5 sm:mt-1 uppercase truncate max-w-[100px] sm:max-w-none">
                        {cfg.subtitle}
                      </div>
                    </div>
                    <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-black/10 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors">
                      <ArrowDownRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Ghost Role Text Display */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="w-full text-center mt-6 mb-10 select-none"
        >
          <p className="ghost-text text-3xl sm:text-5xl md:text-7xl lg:text-8xl tracking-tight">
            {displayRole}
          </p>
        </motion.div>
      </section>

      {/* Project Detail Modal Overlay */}
      <ProjectDetailModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        locale={locale}
      />
    </>
  );
}
