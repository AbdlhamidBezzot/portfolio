"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import { DeviceFrame } from "../ui/DeviceFrame";

interface ProjectItem {
  id: string;
  slug: string;
  titleEn: string;
  titleFr: string;
  summaryEn: string;
  summaryFr: string;
  eyebrowEn?: string;
  eyebrowFr?: string;
  tags: string[];
  imageUrl?: string | null;
  deviceType?: string | null;
  statusEn?: string;
  statusFr?: string;
}

interface ProjectsListViewProps {
  locale: "en" | "fr";
  projects: ProjectItem[];
}

export function ProjectsListView({ locale, projects }: ProjectsListViewProps) {
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);

  const colors = ["bg-[#DBF505]", "bg-[#FFBDF7]", "bg-[#F05626]"];

  return (
    <section className="w-full max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-20 min-h-[70vh] flex flex-col justify-center">
      {/* Title */}
      <div className="mb-16">
        <h1 className="display-xl text-[#363636]">
          {locale === "en" ? "PROJECTS" : "PROJETS"}
        </h1>
        <p className="font-display font-bold text-xs uppercase tracking-widest text-[#363636]/60 mt-2">
          {locale === "en"
            ? "SELECTED FULL-STACK & AI ENGINEER SYSTEMS"
            : "PROJETS FULL-STACK & SYSTÈMES AI ENGINEER"}
        </p>
      </div>

      {/* Stacked Giant Ghost Titles with Floating Thumbnails */}
      <div className="flex flex-col gap-12 sm:gap-16 my-8">
        {projects.map((project, idx) => {
          const title = locale === "en" ? project.titleEn : project.titleFr;
          const eyebrow = locale === "en" ? project.eyebrowEn : project.eyebrowFr;
          const status = locale === "en" ? project.statusEn : project.statusFr;
          const isHovered = hoveredSlug === project.slug;
          const cardBg = colors[idx % colors.length];
          const deviceType = project.deviceType || (project.slug === "cinenight" ? "phone" : "laptop");

          return (
            <div
              key={project.id || project.slug}
              className="relative group border-b border-[#363636]/15 pb-10"
              onMouseEnter={() => setHoveredSlug(project.slug)}
              onMouseLeave={() => setHoveredSlug(null)}
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <Link
                  href={`/${locale}/work/${project.slug}`}
                  className="display-link flex items-baseline gap-6"
                >
                  <span className="text-[#363636] group-hover:text-[#06BC65] transition-colors">
                    {title.toUpperCase()}
                  </span>
                  <span className="text-sm sm:text-lg font-display font-bold text-[#363636]/50 no-underline">
                    0{idx + 1}
                  </span>
                </Link>

                <div className="flex items-center gap-4">
                  {status && (
                    <span className="status-badge">{status.toUpperCase()}</span>
                  )}

                  <Link
                    href={`/${locale}/work/${project.slug}`}
                    className="icon-button-round"
                    aria-label={`View ${title}`}
                  >
                    <ArrowUpRight className="w-5 h-5 text-[#363636]" />
                  </Link>
                </div>
              </div>

              {eyebrow && (
                <p className="font-body font-semibold text-sm text-[#363636]/70 mt-2 max-w-xl">
                  {eyebrow}
                </p>
              )}

              {/* Floating Thumbnail preview on hover */}
              <AnimatePresence>
                {isHovered && project.imageUrl && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, rotate: -4, y: 20 }}
                    animate={{ opacity: 1, scale: 1, rotate: 2, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, rotate: -4, y: 20 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className={`hidden lg:block absolute right-36 top-[-40px] z-30 w-72 p-2 rounded-[16px] ${cardBg} shadow-2xl pointer-events-none flex items-center justify-center`}
                  >
                    <div className="relative w-full h-44 rounded-[12px] overflow-hidden bg-black/10 p-1 flex items-center justify-center">
                      <DeviceFrame
                        deviceType={deviceType}
                        imageUrl={project.imageUrl}
                        title={title}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
