"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
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

interface CardConfig {
  slug: string;
  title: string;
  subtitle: string;
  bgColor: string;
  textColor: string;
  rotateValue: number;
  zIndex: number;
  image: string;
  deviceType: string;
}

interface DraggableCardProps {
  cfg: CardConfig;
  idx: number;
  currentZIndex: number;
  imageUrl: string;
  deviceType: string;
  heroRef: React.RefObject<HTMLDivElement>;
  bringToFront: (slug: string) => void;
  handleCardClick: (slug: string) => void;
}

function DraggableCard({
  cfg,
  idx,
  currentZIndex,
  imageUrl,
  deviceType,
  heroRef,
  bringToFront,
  handleCardClick,
}: DraggableCardProps) {
  // 1. Current position stored in ref to prevent stale closures (Cause 4)
  const posRef = useRef({ x: 0, y: 0 });
  const [pos, setPos] = useState({ x: 0, y: 0 });

  // 2. Drag tracking state stored in refs
  const startPointerRef = useRef({ x: 0, y: 0 });
  const startPosRef = useRef({ x: 0, y: 0 });
  const isDraggingRef = useRef(false);
  const activePointerIdRef = useRef<number | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const hasDraggedRef = useRef(false);

  const [isDragging, setIsDragging] = useState(false);

  // Helper to reliably stop drag and release pointer capture in ALL scenarios (Causes 2 & 3)
  const stopDrag = useCallback((e?: React.PointerEvent | PointerEvent) => {
    if (!isDraggingRef.current && activePointerIdRef.current === null) return;

    isDraggingRef.current = false;
    setIsDragging(false);

    // Release pointer capture safely (Cause 2)
    if (activePointerIdRef.current !== null && cardRef.current) {
      try {
        if (cardRef.current.hasPointerCapture(activePointerIdRef.current)) {
          cardRef.current.releasePointerCapture(activePointerIdRef.current);
        }
      } catch (_) {
        // Safe fallback if pointer capture was automatically released
      }
      activePointerIdRef.current = null;
    }
  }, []);

  // Global event safety net for pointerup / pointercancel / blur outside window (Cause 3)
  useEffect(() => {
    const handleGlobalPointerUp = (e?: Event) => {
      if (isDraggingRef.current) {
        stopDrag(e as PointerEvent | undefined);
      }
    };

    window.addEventListener("pointerup", handleGlobalPointerUp);
    window.addEventListener("pointercancel", handleGlobalPointerUp);
    window.addEventListener("blur", handleGlobalPointerUp);

    return () => {
      window.removeEventListener("pointerup", handleGlobalPointerUp);
      window.removeEventListener("pointercancel", handleGlobalPointerUp);
      window.removeEventListener("blur", handleGlobalPointerUp);
    };
  }, [stopDrag]);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    // Only accept primary button (left mouse click or touch)
    if (e.button !== 0 && e.pointerType === "mouse") return;

    // Bring card to front immediately
    bringToFront(cfg.slug);

    hasDraggedRef.current = false;

    // Reset dragging flag cleanly before starting (Cause 3)
    isDraggingRef.current = true;
    setIsDragging(true);

    // Record initial pointer coordinates
    startPointerRef.current = { x: e.clientX, y: e.clientY };

    // Record reference position from current posRef (Cause 1 & Cause 4)
    startPosRef.current = { x: posRef.current.x, y: posRef.current.y };

    // Acquire pointer capture (Cause 2)
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
      activePointerIdRef.current = e.pointerId;
    } catch (_) {
      activePointerIdRef.current = null;
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;

    // Verify matching pointer ID if pointer capture is active
    if (activePointerIdRef.current !== null && e.pointerId !== activePointerIdRef.current) {
      return;
    }

    const deltaX = e.clientX - startPointerRef.current.x;
    const deltaY = e.clientY - startPointerRef.current.y;

    // Mark as drag if moved more than 3px
    if (Math.hypot(deltaX, deltaY) > 3) {
      hasDraggedRef.current = true;
    }

    let newX = startPosRef.current.x + deltaX;
    let newY = startPosRef.current.y + deltaY;

    // Boundary constraint relative to hero container
    if (heroRef.current && cardRef.current) {
      const heroRect = heroRef.current.getBoundingClientRect();
      const cardRect = cardRef.current.getBoundingClientRect();

      const currentOffsetX = posRef.current.x;
      const currentOffsetY = posRef.current.y;

      const baseLeft = cardRect.left - currentOffsetX;
      const baseRight = cardRect.right - currentOffsetX;
      const baseTop = cardRect.top - currentOffsetY;
      const baseBottom = cardRect.bottom - currentOffsetY;

      const cardWidth = cardRect.width;

      const minX = heroRect.left - baseLeft - cardWidth * 0.35;
      const maxX = heroRect.right - baseRight + cardWidth * 0.35;
      const minY = heroRect.top - baseTop - 30;
      const maxY = heroRect.bottom - baseBottom + 30;

      newX = Math.max(minX, Math.min(maxX, newX));
      newY = Math.max(minY, Math.min(maxY, newY));
    }

    // Immediately update position ref so subsequent pointerdown reads exact position (Cause 1)
    posRef.current = { x: newX, y: newY };
    setPos({ x: newX, y: newY });
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    stopDrag(e);
  };

  const handlePointerCancel = (e: React.PointerEvent<HTMLDivElement>) => {
    stopDrag(e);
  };

  const handleLostPointerCapture = (e: React.PointerEvent<HTMLDivElement>) => {
    stopDrag(e);
  };

  const handleCardClickEvent = (e: React.MouseEvent) => {
    if (hasDraggedRef.current) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    handleCardClick(cfg.slug);
  };

  return (
    <div
      className={`card-float-idle card-float-idle-${idx} mx-0 md:-mx-6 lg:-mx-8`}
      style={{ zIndex: currentZIndex, position: "relative" }}
    >
      <motion.div
        ref={cardRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
        onLostPointerCapture={handleLostPointerCapture}
        onClick={handleCardClickEvent}
        initial={{ opacity: 0, y: 30, rotate: cfg.rotateValue }}
        animate={{
          opacity: 1,
          x: pos.x,
          y: pos.y,
          rotate: cfg.rotateValue,
          scale: isDragging ? 1.08 : 1,
        }}
        transition={
          isDragging
            ? { type: "just" }
            : { type: "spring", stiffness: 400, damping: 28 }
        }
        whileHover={!isDragging ? { scale: 1.05 } : undefined}
        className={`relative w-[145px] xs:w-[185px] sm:w-[240px] md:w-[280px] max-w-[46vw] md:max-w-none p-2.5 sm:p-4 rounded-[18px] sm:rounded-[22px] ${cfg.bgColor} ${cfg.textColor} shadow-[0_12px_32px_rgba(0,0,0,0.18)] select-none group cursor-grab active:cursor-grabbing touch-none`}
        style={{ willChange: "transform" }}
      >
        {/* Photo area with DeviceFrame */}
        <div className="relative w-full h-[120px] xs:h-[150px] sm:h-[200px] md:h-[230px] rounded-[14px] overflow-hidden bg-black/10 mb-2 sm:mb-3 border border-black/5 flex items-center justify-center p-1.5 sm:p-2 pointer-events-none">
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
          <button
            type="button"
            onPointerDown={(e) => e.stopPropagation()}
            onClick={(e) => {
              e.stopPropagation();
              handleCardClick(cfg.slug);
            }}
            aria-label={`Open ${cfg.title} details`}
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black/10 flex items-center justify-center hover:bg-black hover:text-white transition-colors cursor-pointer z-10 pointer-events-auto"
          >
            <ArrowDownRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export function CollageHero({
  locale,
  name = "ABDELHAMID BEZZOT",
  roleText,
  projects = [],
}: CollageHeroProps) {
  const [selectedProject, setSelectedProject] = useState<ModalProject | null>(null);
  const [topZIndex, setTopZIndex] = useState(50);
  const [cardZIndexes, setCardZIndexes] = useState<{ [key: string]: number }>({});
  const heroRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const bringToFront = (slug: string) => {
    const nextZ = topZIndex + 1;
    setTopZIndex(nextZ);
    setCardZIndexes((prev) => ({ ...prev, [slug]: nextZ }));
  };

  // Close modal when route changes (e.g., user navigates while modal is open)
  useEffect(() => {
    setSelectedProject(null);
  }, [pathname]);

  // Close modal on global preview close event (menu open / navigation)
  useEffect(() => {
    const handleClose = () => setSelectedProject(null);
    window.addEventListener("portfolio-close-previews", handleClose);
    return () => window.removeEventListener("portfolio-close-previews", handleClose);
  }, []);

  const displayRole =
    (roleText && !roleText.toLowerCase().includes("applied ai") && !roleText.toLowerCase().includes("appliquée")
      ? roleText
      : locale === "en"
      ? "FULL-STACK DEVELOPER & AI ENGINEER"
      : "DÉVELOPPEUR FULL-STACK & AI ENGINEER").toUpperCase();

  // Fallback visual definitions for the 4 fridge magnet cards (Apollo, Bloom, ZAZA, CineNight)
  const cardConfigs: CardConfig[] = [
    {
      slug: "apollo",
      title: "APOLLO",
      subtitle: "STREAMING",
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
      subtitle: locale === "en" ? "SKILL EXCHANGE" : "ÉCHANGE DE COMPÉTENCES",
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
          deviceType: cfg.deviceType,
        });
      }
    }
  };

  return (
    <>
      <section
        ref={heroRef}
        className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-12 pt-16 sm:pt-20 md:pt-24 pb-16 overflow-hidden flex flex-col items-center"
      >
        {/* Name Display positioned closer to cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full text-center mt-2 sm:mt-4 mb-2 md:mb-4 select-none z-10"
        >
          <h1 className="display-xxl tracking-tighter text-[#363636] leading-[0.82]">
            {name}
          </h1>
        </motion.div>

        {/* Scattered Collage Row (Spencer Gabor Style — Draggable Fridge Magnets) */}
        <div className="relative w-full my-4 sm:my-10 min-h-[360px] sm:min-h-[460px] md:min-h-[500px] flex items-center justify-center py-2 sm:py-4">
          <div className="relative w-full max-w-5xl flex flex-wrap md:flex-nowrap items-center justify-center gap-3 sm:gap-6 md:gap-0 px-2">
            {cardConfigs.map((cfg, idx) => {
              const dbProj = projects.find((p) => p.slug.toLowerCase() === cfg.slug.toLowerCase());
              const imageUrl = dbProj?.imageUrl || cfg.image;
              const deviceType = dbProj?.deviceType || cfg.deviceType;
              const currentZIndex = cardZIndexes[cfg.slug] || cfg.zIndex;

              return (
                <DraggableCard
                  key={cfg.slug}
                  cfg={cfg}
                  idx={idx}
                  currentZIndex={currentZIndex}
                  imageUrl={imageUrl}
                  deviceType={deviceType}
                  heroRef={heroRef}
                  bringToFront={bringToFront}
                  handleCardClick={handleCardClick}
                />
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

