"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Github, ArrowUpRight, Sparkles } from "lucide-react";
import { DeviceFrame } from "./DeviceFrame";

export interface ModalProject {
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
  tags?: string[];
  imageUrl?: string | null;
  deviceType?: string | null;
  liveUrl?: string | null;
  githubUrl?: string | null;
}

interface ProjectDetailModalProps {
  project: ModalProject | null;
  isOpen: boolean;
  onClose: () => void;
  locale: "en" | "fr";
}

export function ProjectDetailModal({
  project,
  isOpen,
  onClose,
  locale,
}: ProjectDetailModalProps) {
  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!project) return null;

  const title = locale === "en" ? project.titleEn : project.titleFr;
  const eyebrow = (locale === "en" ? project.eyebrowEn : project.eyebrowFr) || project.tags?.join(" · ");
  const description =
    (locale === "en" ? project.descriptionEn || project.summaryEn : project.descriptionFr || project.summaryFr) || "";
  const role = (locale === "en" ? project.roleEn : project.roleFr) || "";
  const problem = (locale === "en" ? project.problemEn : project.problemFr) || "";
  const solution = (locale === "en" ? project.solutionEn : project.solutionFr) || "";
  const status = (locale === "en" ? project.statusEn : project.statusFr) || "";

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-10 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-4xl bg-[#FFFFFF] rounded-[28px] sm:rounded-[36px] shadow-2xl overflow-hidden z-10 my-auto p-6 sm:p-10 md:p-12 max-h-[90vh] overflow-y-auto border border-[#363636]/10"
          >
            {/* Top Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-[#D2D2D2]/50 hover:bg-[#363636] hover:text-white flex items-center justify-center transition-colors z-20"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header / Title Section (Spencer Gabor style centered title) */}
            <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12 pt-2">
              {eyebrow && (
                <div className="font-display font-bold text-xs sm:text-sm tracking-widest text-[#363636]/60 uppercase mb-3">
                  {eyebrow}
                </div>
              )}
              <h2 className="display-xl text-[#363636] tracking-tighter mb-4">
                {title}
              </h2>
              {description && (
                <p className="font-body text-sm sm:text-base md:text-lg text-[#363636]/80 leading-relaxed max-w-xl mx-auto">
                  {description}
                </p>
              )}
            </div>

            {/* Featured Hero Image / Device Frame Display */}
            {project.imageUrl && (
              <div className="relative w-full h-[260px] sm:h-[380px] md:h-[460px] rounded-[24px] overflow-hidden bg-[#D2D2D2]/20 mb-8 border border-[#363636]/10 flex items-center justify-center p-4">
                {(project.slug === "cinenight" || project.deviceType === "phone") ? (
                  <div className="h-full aspect-[9/19.5] relative flex-shrink-0">
                    <DeviceFrame
                      deviceType="phone"
                      imageUrl={project.imageUrl}
                      title={title}
                      className="!h-full !w-full"
                    />
                  </div>
                ) : (
                  <DeviceFrame
                    deviceType="laptop"
                    imageUrl={project.imageUrl}
                    title={title}
                    className="w-full h-full max-w-3xl"
                  />
                )}
              </div>
            )}

            {/* Tags & Action Buttons */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-8 mb-8 border-b border-[#363636]/10">
              <div className="flex flex-wrap gap-2">
                {project.tags?.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 rounded-full bg-[#D2D2D2]/50 text-[#363636] font-display font-bold text-xs uppercase"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-3">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="pill-button !bg-[#DBF505] !text-[#363636] text-xs py-2.5 px-5"
                  >
                    <span>{locale === "en" ? "Visit website" : "Visiter le site"}</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="pill-button text-xs py-2.5 px-5"
                  >
                    <Github className="w-4 h-4" />
                    <span>GitHub</span>
                  </a>
                )}
                <Link
                  href={`/${locale}/work/${project.slug}`}
                  onClick={onClose}
                  className="pill-button !bg-[#363636] !text-white text-xs py-2.5 px-5"
                >
                  <span>{locale === "en" ? "Full Dossier" : "Dossier Complet"}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Grid of Key Project Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-body text-sm">
              {role && (
                <div className="p-5 rounded-[20px] bg-[#D2D2D2]/20 border border-[#363636]/5">
                  <div className="font-display font-black text-xs uppercase tracking-wider text-[#363636]/60 mb-2">
                    {locale === "en" ? "Role & Scope" : "Rôle & Scope"}
                  </div>
                  <div className="text-[#363636] leading-relaxed">{role}</div>
                </div>
              )}

              {status && (
                <div className="p-5 rounded-[20px] bg-[#D2D2D2]/20 border border-[#363636]/5">
                  <div className="font-display font-black text-xs uppercase tracking-wider text-[#363636]/60 mb-2">
                    {locale === "en" ? "Current Status" : "Statut Actuel"}
                  </div>
                  <div className="text-[#363636] leading-relaxed">{status}</div>
                </div>
              )}

              {problem && (
                <div className="p-5 rounded-[20px] bg-[#D2D2D2]/20 border border-[#363636]/5">
                  <div className="font-display font-black text-xs uppercase tracking-wider text-[#363636]/60 mb-2">
                    {locale === "en" ? "Problem" : "Problématique"}
                  </div>
                  <div className="text-[#363636] leading-relaxed">{problem}</div>
                </div>
              )}

              {solution && (
                <div className="p-5 rounded-[20px] bg-[#D2D2D2]/20 border border-[#363636]/5">
                  <div className="font-display font-black text-xs uppercase tracking-wider text-[#363636]/60 mb-2">
                    {locale === "en" ? "Solution" : "Solution"}
                  </div>
                  <div className="text-[#363636] leading-relaxed">{solution}</div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
