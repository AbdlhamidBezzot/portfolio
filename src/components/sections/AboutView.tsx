"use client";

import Link from "next/link";
import { ArrowRight, Code2, Cpu, Database } from "lucide-react";

interface AboutViewProps {
  locale: "en" | "fr";
  manifestoEn?: string;
  manifestoFr?: string;
}

export function AboutView({ locale, manifestoEn, manifestoFr }: AboutViewProps) {
  const bioText =
    locale === "en"
      ? manifestoEn ||
        "ABDELHAMID BEZZOT IS A FULL-STACK DEVELOPER & AI ENGINEER. BRIDGING PRODUCT DEVELOPMENT AND MACHINE LEARNING SYSTEMS TO BUILD REAL, HIGH-PERFORMANCE APPLICATIONS FROM FIRST IDEA TO WORKING SYSTEM."
      : manifestoFr ||
        "ABDELHAMID BEZZOT EST UN DÉVELOPPEUR FULL-STACK & AI ENGINEER. COMBINANT DÉVELOPPEMENT PRODUIT ET SYSTÈMES DE MACHINE LEARNING POUR CONSTRUIRE DES APPLICATIONS CONCRÈTES ET PERFORMANTES, DE LA PREMIÈRE IDÉE AU SYSTÈME OPÉRATIONNEL.";

  const stackCategories = [
    {
      title: "01 INTERFACES",
      icon: Code2,
      color: "bg-[#DBF505] text-[#363636]",
      items: ["HTML", "CSS", "JAVASCRIPT", "TYPESCRIPT", "PHP", "REACT", "NEXT.JS", "NESTJS", "TAILWIND CSS", "NODE.JS", "VITE"],
    },
    {
      title: "02 SYSTEMS & DATA",
      icon: Database,
      color: "bg-[#FFBDF7] text-[#363636]",
      items: ["POSTGRESQL", "MYSQL", "REDIS", "PL/SQL", "T-SQL", "API REST", "PRISMA", "DOCKER", "GIT & GITHUB", "LINUX", "NGINX", "VERCEL"],
    },
    {
      title: "03 AI ENGINEER",
      icon: Cpu,
      color: "bg-[#F05626] text-white",
      items: ["PYTHON", "SCIKIT-LEARN", "TENSORFLOW", "KNIME", "PANDAS", "NUMPY", "MATPLOTLIB", "JUPYTER", "TALEND"],
    },
  ];

  return (
    <section className="w-full max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-20">
      {/* Title */}
      <div className="mb-16">
        <h1 className="display-xl text-[#363636]">
          {locale === "en" ? "ABOUT" : "À PROPOS"}
        </h1>
        <p className="font-display font-bold text-xs uppercase tracking-widest text-[#363636]/60 mt-2">
          {locale === "en" ? "PRACTICE & STACK" : "PRATIQUE & COMPÉTENCES"}
        </p>
      </div>

      {/* Giant Ghost Text Bio Paragraph */}
      <div className="my-12 py-8 border-y border-[#363636]/15">
        <p className="ghost-text text-3xl sm:text-5xl md:text-6xl lg:text-7xl leading-[0.9] tracking-tight uppercase select-none">
          {bioText}
        </p>
      </div>

      {/* Stack Recall Grid */}
      <div className="my-20">
        <h2 className="display-lg text-[#363636] mb-8">
          {locale === "en" ? "CORE TECH STACK" : "STACK PRINCIPALE"}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stackCategories.map((cat) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.title}
                className={`spencer-card ${cat.color} p-8 flex flex-col justify-between`}
              >
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="font-display font-black text-2xl tracking-tight uppercase">
                      {cat.title}
                    </h3>
                    <div className="w-10 h-10 rounded-full bg-black/10 flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {cat.items.map((item) => (
                      <span
                        key={item}
                        className="px-3 py-1.5 rounded-full bg-black/10 font-display font-bold text-xs uppercase tracking-wider"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* CTA to Projects */}
      <div className="my-16 p-8 md:p-12 rounded-[20px] bg-[#D2D2D2] flex flex-col sm:flex-row justify-between items-center gap-6">
        <div>
          <h3 className="font-display font-black text-3xl sm:text-4xl text-[#363636] uppercase tracking-tight">
            {locale === "en" ? "EXPLORE THE WORK" : "DÉCOUVREZ LES PROJETS"}
          </h3>
          <p className="font-body text-sm text-[#363636]/80 mt-1">
            {locale === "en"
              ? "See Apollo, Bloom, and ZAZA in detail."
              : "Voir Apollo, Bloom et ZAZA en détail."}
          </p>
        </div>

        <Link
          href={`/${locale}/work`}
          className="pill-button bg-[#DBF505] text-[#363636] whitespace-nowrap"
        >
          <span>{locale === "en" ? "VIEW PROJECTS" : "VOIR LES PROJETS"}</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}
