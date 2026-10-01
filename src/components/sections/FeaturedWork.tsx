"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

import { DeviceFrame } from "../ui/DeviceFrame";

interface ProjectItem {
  id: string;
  slug: string;
  titleEn: string;
  titleFr: string;
  summaryEn: string;
  summaryFr: string;
  tags: string[];
  imageUrl?: string | null;
  deviceType?: string | null;
  statusEn?: string;
  statusFr?: string;
}

interface FeaturedWorkProps {
  locale: "en" | "fr";
  projects: ProjectItem[];
}

export function FeaturedWork({ locale, projects }: FeaturedWorkProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!projects || projects.length === 0) return null;

  const currentProject = projects[activeIndex % projects.length];
  const total = projects.length;

  const prevProject = () => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  };

  const nextProject = () => {
    setActiveIndex((prev) => (prev + 1) % total);
  };

  const colors = [
    "bg-[#DBF505] text-[#363636]",
    "bg-[#FFBDF7] text-[#363636]",
    "bg-[#F05626] text-white",
    "bg-[#245767] text-white",
  ];

  return (
    <section className="w-full max-w-7xl mx-auto px-6 md:px-12 py-20">
      {/* Centered Header */}
      <div className="text-center mb-16">
        <h2 className="display-xl text-[#363636] mb-3">FEATURED WORK</h2>
        <p className="font-display font-bold text-xs uppercase tracking-widest text-[#363636]/60">
          {locale === "en" ? "SELECT PROJECTS" : "PROJETS SÉLECTIONNÉS"}
        </p>
      </div>

      {/* Staggered Rotated Cards Showcase */}
      <div className="relative flex flex-col items-center">
        <div className="relative w-full max-w-4xl h-[420px] sm:h-[480px] md:h-[540px] flex items-center justify-center">
          {projects.map((proj, idx) => {
            const isCenter = idx === activeIndex;
            const leftIdx = (activeIndex - 1 + total) % total;
            const rightIdx = (activeIndex + 1) % total;
            const isLeft = !isCenter && idx === leftIdx;
            const isRight = !isCenter && idx === rightIdx;

            let positionClasses = "opacity-0 pointer-events-none scale-75";
            let zIndex = 10;
            let rotate = "rotate-0";

            if (isCenter) {
              positionClasses = "opacity-100 scale-100 translate-x-0";
              zIndex = 30;
              rotate = "rotate-0";
            } else if (isLeft) {
              positionClasses = "opacity-70 scale-90 -translate-x-36 md:-translate-x-48";
              zIndex = 20;
              rotate = "-rotate-6";
            } else if (isRight) {
              positionClasses = "opacity-70 scale-90 translate-x-36 md:translate-x-48";
              zIndex = 20;
              rotate = "rotate-6";
            }

            const cardColor = colors[idx % colors.length];
            const title = locale === "en" ? proj.titleEn : proj.titleFr;
            const summary = locale === "en" ? proj.summaryEn : proj.summaryFr;
            const deviceType = proj.deviceType || (proj.slug === "cinenight" ? "phone" : "laptop");

            return (
              <motion.div
                key={proj.id || proj.slug}
                className={`absolute w-[250px] xs:w-[290px] sm:w-[380px] md:w-[460px] max-w-[92vw] p-3 sm:p-4 rounded-[16px] ${cardColor} ${positionClasses} ${rotate} transition-all duration-500 ease-out`}
                style={{ zIndex }}
                onClick={() => setActiveIndex(idx)}
              >
                <div className="relative w-full h-[200px] sm:h-[250px] md:h-[290px] rounded-[12px] overflow-hidden bg-black/10 mb-4 p-2 flex items-center justify-center">
                  {deviceType === "phone" ? (
                    <div className="h-full aspect-[9/19.5] relative flex-shrink-0">
                      <DeviceFrame
                        deviceType="phone"
                        imageUrl={proj.imageUrl}
                        title={title}
                        className="!h-full !w-full"
                      />
                    </div>
                  ) : (
                    <DeviceFrame
                      deviceType="laptop"
                      imageUrl={proj.imageUrl}
                      title={title}
                      className="w-full h-full"
                    />
                  )}
                </div>

                <div className="p-2">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-display font-black text-2xl sm:text-3xl tracking-tight leading-none uppercase">
                      {title}
                    </h3>
                    <span className="status-badge">
                      {proj.statusEn || "LIVE"}
                    </span>
                  </div>
                  <p className="font-body text-xs sm:text-sm opacity-90 line-clamp-2 mb-4">
                    {summary}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {proj.tags?.slice(0, 4).map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-full bg-black/10 text-[11px] font-display font-bold uppercase tracking-wider"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Carousel Navigation Buttons */}
        <div className="flex items-center gap-4 mt-8">
          <button
            onClick={prevProject}
            aria-label="Previous project"
            className="icon-button-round"
          >
            <ChevronLeft className="w-5 h-5 text-[#363636]" />
          </button>

          {/* Active Project Pill Badge */}
          <Link
            href={`/${locale}/work/${currentProject.slug}`}
            className="pill-button flex items-center gap-2 text-base"
          >
            <span>{currentProject.titleEn.toUpperCase()}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <button
            onClick={nextProject}
            aria-label="Next project"
            className="icon-button-round"
          >
            <ChevronRight className="w-5 h-5 text-[#363636]" />
          </button>
        </div>
      </div>
    </section>
  );
}
