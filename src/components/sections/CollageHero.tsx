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
  // Official React state position — synchronized ONLY at pointerup when dragged >= 5px
  const [pos, setPos] = useState({ x: 0, y: 0 });

  // State to control idle float animation on outer wrapper
  const [isDragging, setIsDragging] = useState(false);

  // Gesture tracking refs
  const posRef = useRef({ x: 0, y: 0 });
  const offsetRef = useRef({ x: 0, y: 0 });
  const startPointerRef = useRef({ x: 0, y: 0 });
  const maxDistanceRef = useRef(0);
  const boundsRef = useRef<{ minX: number; maxX: number; minY: number; maxY: number } | null>(null);
  const isDraggingRef = useRef(false);
  const activePointerIdRef = useRef<number | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  // Guaranteed cleanup helper for ending gesture state
  const stopDrag = useCallback(() => {
    isDraggingRef.current = false;
    setIsDragging(false);

    // Safely release pointer capture (Point 2)
    if (activePointerIdRef.current !== null && cardRef.current) {
      try {
        if (cardRef.current.hasPointerCapture(activePointerIdRef.current)) {
          cardRef.current.releasePointerCapture(activePointerIdRef.current);
        }
      } catch (_) {}
      activePointerIdRef.current = null;
    }
  }, []);

  // Global window safety net for pointerup/pointercancel/blur (Point 1, 2, 3)
  useEffect(() => {
    const handleGlobalPointerUp = () => {
      if (isDraggingRef.current) {
        stopDrag();
        // Restore card transform cleanly if aborted off-screen
        if (cardRef.current) {
          cardRef.current.style.transition = "transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)";
          cardRef.current.style.transform = `translate3d(${posRef.current.x}px, ${posRef.current.y}px, 0px) rotate(${cfg.rotateValue}deg) scale(1)`;
        }
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
  }, [stopDrag, cfg.rotateValue]);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0 && e.pointerType === "mouse") return;

    bringToFront(cfg.slug);

    // Reset distance tracker and gesture flag
    maxDistanceRef.current = 0;
    isDraggingRef.current = true;
    setIsDragging(true);

    const pointerX = e.clientX;
    const pointerY = e.clientY;
    startPointerRef.current = { x: pointerX, y: pointerY };

    // Calculate exact cursor offset from current card position (NO JUMP ON CLICK!)
    offsetRef.current = {
      x: pointerX - posRef.current.x,
      y: pointerY - posRef.current.y,
    };

    // Pre-calculate container bounds ONCE at pointerdown
    if (heroRef.current && cardRef.current) {
      const heroRect = heroRef.current.getBoundingClientRect();
      const cardRect = cardRef.current.getBoundingClientRect();

      const curX = posRef.current.x;
      const curY = posRef.current.y;

      const baseLeft = cardRect.left - curX;
      const baseRight = cardRect.right - curX;
      const baseTop = cardRect.top - curY;
      const baseBottom = cardRect.bottom - curY;

      boundsRef.current = {
        minX: heroRect.left - baseLeft + 8,
        maxX: heroRect.right - baseRight - 8,
        minY: heroRect.top - baseTop - 20,
        maxY: heroRect.bottom - baseBottom + 20,
      };
    } else {
      boundsRef.current = null;
    }

    // Disable CSS transition during active drag & apply scale(1.08)
    if (cardRef.current) {
      cardRef.current.style.transition = "none";
      cardRef.current.style.willChange = "transform";
      cardRef.current.style.pointerEvents = "auto";
      cardRef.current.style.transform = `translate3d(${posRef.current.x}px, ${posRef.current.y}px, 0px) rotate(${cfg.rotateValue}deg) scale(1.08)`;
    }

    try {
      e.currentTarget.setPointerCapture(e.pointerId);
      activePointerIdRef.current = e.pointerId;
    } catch (_) {
      activePointerIdRef.current = null;
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;

    if (activePointerIdRef.current !== null && e.pointerId !== activePointerIdRef.current) {
      return;
    }

    const currentDist = Math.hypot(
      e.clientX - startPointerRef.current.x,
      e.clientY - startPointerRef.current.y
    );
    if (currentDist > maxDistanceRef.current) {
      maxDistanceRef.current = currentDist;
    }

    // New position = cursor position - initial offset
    let newX = e.clientX - offsetRef.current.x;
    let newY = e.clientY - offsetRef.current.y;

    // Apply pre-calculated boundary clamps
    if (boundsRef.current) {
      newX = Math.max(boundsRef.current.minX, Math.min(boundsRef.current.maxX, newX));
      newY = Math.max(boundsRef.current.minY, Math.min(boundsRef.current.maxY, newY));
    }

    posRef.current = { x: newX, y: newY };

    // Update DOM transform directly without React re-render per pixel
    if (cardRef.current) {
      cardRef.current.style.transform = `translate3d(${newX}px, ${newY}px, 0px) rotate(${cfg.rotateValue}deg) scale(1.08)`;
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;

    const endDist = Math.hypot(
      e.clientX - startPointerRef.current.x,
      e.clientY - startPointerRef.current.y
    );
    const totalDist = Math.max(maxDistanceRef.current, endDist);

    stopDrag();

    // Point 4: Clear distinction between click (< 5px) and drag (>= 5px)
    if (totalDist < 5) {
      // User tapped / clicked without dragging -> trigger project detail view
      if (cardRef.current) {
        cardRef.current.style.transition = "transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)";
        cardRef.current.style.transform = `translate3d(${posRef.current.x}px, ${posRef.current.y}px, 0px) rotate(${cfg.rotateValue}deg) scale(1)`;
      }
      handleCardClick(cfg.slug);
    } else {
      // User dragged card -> commit new resting position to React state ONCE
      const finalX = posRef.current.x;
      const finalY = posRef.current.y;
      setPos({ x: finalX, y: finalY });

      if (cardRef.current) {
        cardRef.current.style.transition = "transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)";
        cardRef.current.style.transform = `translate3d(${finalX}px, ${finalY}px, 0px) rotate(${cfg.rotateValue}deg) scale(1)`;
      }
    }
  };

  const handlePointerCancel = () => {
    stopDrag();
    if (cardRef.current) {
      cardRef.current.style.transition = "transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)";
      cardRef.current.style.transform = `translate3d(${posRef.current.x}px, ${posRef.current.y}px, 0px) rotate(${cfg.rotateValue}deg) scale(1)`;
    }
  };

  const handleLostPointerCapture = () => {
    if (isDraggingRef.current) {
      stopDrag();
      if (cardRef.current) {
        cardRef.current.style.transition = "transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)";
        cardRef.current.style.transform = `translate3d(${posRef.current.x}px, ${posRef.current.y}px, 0px) rotate(${cfg.rotateValue}deg) scale(1)`;
      }
    }
  };

  const handleMouseEnter = () => {
    if (!isDraggingRef.current && cardRef.current) {
      cardRef.current.style.transition = "transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)";
      cardRef.current.style.transform = `translate3d(${posRef.current.x}px, ${posRef.current.y}px, 0px) rotate(${cfg.rotateValue}deg) scale(1.05)`;
    }
  };

  const handleMouseLeave = () => {
    if (!isDraggingRef.current && cardRef.current) {
      cardRef.current.style.transition = "transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)";
      cardRef.current.style.transform = `translate3d(${posRef.current.x}px, ${posRef.current.y}px, 0px) rotate(${cfg.rotateValue}deg) scale(1)`;
    }
  };

  return (
    /*
     * IMBRICATED ARCHITECTURE:
     *   Outer <div>: Carries CSS @keyframes idle float animation ONLY.
     *                Pauses animation when isDragging is true.
     *   Inner <div>: Carries JS-managed drag transform ONLY.
     */
    <div
      className={`card-float-idle card-float-idle-${idx} mx-0 md:-mx-3 lg:-mx-5 xl:-mx-6`}
      style={{
        zIndex: currentZIndex,
        position: "relative",
        animationPlayState: isDragging ? "paused" : "running",
      }}
    >
      <div
        ref={cardRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
        onLostPointerCapture={handleLostPointerCapture}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`relative w-[130px] xs:w-[155px] sm:w-[190px] md:w-[200px] lg:w-[230px] xl:w-[250px] max-w-[42vw] md:max-w-none p-2.5 sm:p-4 rounded-[18px] sm:rounded-[22px] ${cfg.bgColor} ${cfg.textColor} shadow-[0_12px_32px_rgba(0,0,0,0.18)] select-none group cursor-grab active:cursor-grabbing touch-none pointer-events-auto`}
        style={{
          willChange: "transform",
          transform: `translate3d(${pos.x}px, ${pos.y}px, 0px) rotate(${cfg.rotateValue}deg)`,
          transition: "transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
          pointerEvents: "auto",
        }}
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
      </div>
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
          className="w-full text-center mt-2 sm:mt-4 mb-2 md:mb-4 select-none z-10 px-2 max-w-full overflow-hidden"
        >
          <h1 className="display-xxl tracking-tighter text-[#363636] leading-[0.82] max-w-full break-normal">
            {name}
          </h1>
        </motion.div>

        {/* Scattered Collage Row (Spencer Gabor Style — Draggable Fridge Magnets) */}
        <div className="relative w-full my-4 sm:my-10 min-h-[360px] sm:min-h-[460px] md:min-h-[500px] flex items-center justify-center py-2 sm:py-4 max-w-full">
          <div className="relative w-full max-w-6xl flex flex-wrap md:flex-nowrap items-center justify-center gap-3 sm:gap-6 md:gap-0 px-2">
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

