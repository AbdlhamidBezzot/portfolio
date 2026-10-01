"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ExternalLink, Github, Sparkles } from "lucide-react";

import { DeviceFrame } from "../ui/DeviceFrame";

interface ProjectDetailProps {
  locale: "en" | "fr";
  project: any;
}

export function ProjectDetailView({ locale, project }: ProjectDetailProps) {
  if (!project) return null;

  const title = (locale === "en" ? project.titleEn : project.titleFr) || project.slug;
  const eyebrow = locale === "en" ? project.eyebrowEn : project.eyebrowFr;
  const summary = locale === "en" ? project.summaryEn : project.summaryFr;
  const description = locale === "en" ? project.descriptionEn : project.descriptionFr;
  const problem = locale === "en" ? project.problemEn : project.problemFr;
  const solution = locale === "en" ? project.solutionEn : project.solutionFr;
  const role = locale === "en" ? project.roleEn : project.roleFr;
  const status = locale === "en" ? project.statusEn : project.statusFr;
  const deviceType = project.deviceType || (project.slug === "cinenight" ? "phone" : "laptop");

  return (
    <article className="w-full max-w-7xl mx-auto px-6 md:px-12 py-12">
      {/* Back Button */}
      <div className="mb-10">
        <Link
          href={`/${locale}/work`}
          className="pill-button inline-flex items-center gap-2 text-xs py-3 px-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{locale === "en" ? "BACK TO PROJECTS" : "RETOUR AUX PROJETS"}</span>
        </Link>
      </div>

      {/* Hero Header */}
      <div className="mb-12">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className="status-badge">{status || "LIVE"}</span>
          {eyebrow && (
            <span className="font-display font-bold text-xs uppercase tracking-widest text-[#363636]/60">
              {eyebrow}
            </span>
          )}
        </div>

        <h1 className="display-xxl text-[#363636] uppercase tracking-tighter mb-6">
          {title}
        </h1>

        <p className="font-body text-lg sm:text-xl text-[#363636]/90 max-w-3xl leading-relaxed">
          {summary || description}
        </p>

        {/* Stack Tags */}
        <div className="flex flex-wrap gap-2.5 mt-8">
          {project.tags?.map((tag: string) => (
            <span
              key={tag}
              className="px-4 py-2 rounded-full bg-[#DBF505] text-[#363636] font-display font-bold text-xs uppercase tracking-wider"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Main Image Mockup Showcase using DeviceFrame */}
      <div className="w-full p-4 sm:p-8 rounded-[24px] bg-[#DBF505] my-12 flex justify-center items-center">
        <div className="relative w-full max-w-4xl h-[320px] sm:h-[480px] md:h-[560px] flex items-center justify-center p-2">
          <DeviceFrame
            deviceType={deviceType}
            imageUrl={project.imageUrl}
            title={title}
          />
        </div>
      </div>

      {/* Structured Dossier Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 my-16 pt-12 border-t border-[#363636]/15">
        {/* Problem */}
        {problem && (
          <div className="spencer-card bg-[#FFBDF7] p-8">
            <h3 className="font-display font-black text-2xl uppercase mb-3 text-[#363636]">
              {locale === "en" ? "PROBLEM" : "PROBLÈME"}
            </h3>
            <p className="font-body text-base text-[#363636] leading-relaxed">
              {problem}
            </p>
          </div>
        )}

        {/* Solution */}
        {solution && (
          <div className="spencer-card bg-[#F05626] text-white p-8">
            <h3 className="font-display font-black text-2xl uppercase mb-3">
              {locale === "en" ? "SOLUTION" : "SOLUTION"}
            </h3>
            <p className="font-body text-base opacity-95 leading-relaxed">
              {solution}
            </p>
          </div>
        )}

        {/* Role */}
        {role && (
          <div className="spencer-card bg-[#245767] text-white p-8">
            <h3 className="font-display font-black text-2xl uppercase mb-3">
              {locale === "en" ? "MY ROLE" : "MON RÔLE"}
            </h3>
            <p className="font-body text-base opacity-95 leading-relaxed">
              {role}
            </p>
          </div>
        )}

        {/* Links & CTA */}
        <div className="spencer-card bg-[#D2D2D2] p-8 flex flex-col justify-between">
          <div>
            <h3 className="font-display font-black text-2xl uppercase mb-3 text-[#363636]">
              {locale === "en" ? "PROJECT LINKS" : "LIENS DU PROJET"}
            </h3>
            <p className="font-body text-sm text-[#363636]/80 mb-6">
              {locale === "en"
                ? "Explore the live product or source code repo."
                : "Explorez le produit en direct ou le dépôt de code source."}
            </p>
          </div>

          <div className="flex flex-wrap gap-4 mt-4">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="pill-button bg-[#DBF505] text-[#363636] py-3.5 px-6"
              >
                <span>{locale === "en" ? "Visit website" : "Visiter le site"}</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            )}

            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="pill-button bg-[#363636] text-white py-3.5 px-6"
              >
                <span>GITHUB</span>
                <Github className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
