"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { projects } from "@/lib/constants";
import { ProjectCard } from "@/components/ui/ProjectCard";

export function ProjectsSection() {
  const railRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollButtons = useCallback(() => {
    if (!railRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = railRef.current;
    setCanScrollLeft(scrollLeft > 5);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 5);
  }, []);

  useEffect(() => {
    const el = railRef.current;
    if (!el) return;
    checkScrollButtons();
    el.addEventListener("scroll", checkScrollButtons, { passive: true });
    window.addEventListener("resize", checkScrollButtons);
    return () => {
      el.removeEventListener("scroll", checkScrollButtons);
      window.removeEventListener("resize", checkScrollButtons);
    };
  }, [checkScrollButtons]);

  const handleScroll = (direction: "left" | "right") => {
    if (!railRef.current) return;
    const card = railRef.current.querySelector<HTMLElement>(".project-card");
    const cardWidth = card ? card.offsetWidth + 16 : 340;
    railRef.current.scrollBy({
      left: direction === "left" ? -cardWidth : cardWidth,
      behavior: "smooth"
    });
  };

  return (
    <section id="projects" className="section section-rule projects-section">
      <div className="projects-header">
        <div className="section-label">
          <span>(03)</span>
          <p>// PROJETS SÉLECTIONNÉS</p>
        </div>
        <div className="project-rail-nav">
          <button
            type="button"
            onClick={() => handleScroll("left")}
            disabled={!canScrollLeft}
            className="project-nav-btn"
            aria-label="Projet précédent"
            title="Projet précédent"
          >
            <ArrowLeft size={18} />
          </button>
          <button
            type="button"
            onClick={() => handleScroll("right")}
            disabled={!canScrollRight}
            className="project-nav-btn"
            aria-label="Projet suivant"
            title="Projet suivant"
          >
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
      <div ref={railRef} className="project-rail is-scrollable">
        {projects.map((p, i) => (
          <ProjectCard project={p} index={i} key={p.id} />
        ))}
      </div>
    </section>
  );
}