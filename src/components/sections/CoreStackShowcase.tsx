"use client";

import { motion } from "framer-motion";

interface CoreStackShowcaseProps {
  locale: "en" | "fr";
}

export function CoreStackShowcase({ locale }: CoreStackShowcaseProps) {
  const stackCategories = [
    {
      num: "01",
      titleEn: "INTERFACES",
      titleFr: "INTERFACES",
      color: "bg-[#DBF505] text-[#363636]",
      items: [
        "HTML",
        "CSS",
        "JavaScript",
        "TypeScript",
        "PHP",
        "React",
        "Next.js",
        "NestJS",
        "Tailwind CSS",
        "Node.js",
        "Vite",
      ],
    },
    {
      num: "02",
      titleEn: "SYSTEMS & DATA",
      titleFr: "SYSTÈMES & DONNÉES",
      color: "bg-[#FFBDF7] text-[#363636]",
      items: [
        "PostgreSQL",
        "MySQL",
        "Redis",
        "PL/SQL",
        "T-SQL",
        "API REST",
        "Prisma",
        "Docker",
        "Git & GitHub",
        "Linux",
        "Nginx",
        "Vercel",
      ],
    },
    {
      num: "03",
      titleEn: "AI ENGINEER",
      titleFr: "AI ENGINEER",
      color: "bg-[#F05626] text-white",
      items: [
        "Python",
        "Scikit-Learn",
        "TensorFlow",
        "KNIME",
        "Pandas",
        "NumPy",
        "Matplotlib",
        "Jupyter",
        "Talend",
        "LLM APIs (Claude)",
        "Prompt engineering",
      ],
    },
  ];

  return (
    <section className="w-full max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24">
      {/* Section Header */}
      <div className="text-center mb-16 select-none">
        <h2 className="display-xl text-[#363636] mb-3">CORE STACK</h2>
        <p className="font-display font-bold text-xs uppercase tracking-widest text-[#363636]/60">
          {locale === "en"
            ? "// TECHNOLOGIES & TOOLS I MASTER"
            : "// TECHNOLOGIES ET OUTILS MAÎTRISÉS"}
        </p>
      </div>

      {/* Grid of 3 Categories: 01, 02, 03 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {stackCategories.map((cat, idx) => (
          <motion.div
            key={cat.num}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.15 }}
            className={`p-6 sm:p-8 rounded-[24px] ${cat.color} shadow-[0_12px_30px_rgba(0,0,0,0.08)] flex flex-col justify-between transition-transform hover:-translate-y-2 duration-300`}
          >
            <div>
              {/* Category Number & Title */}
              <div className="flex items-center justify-between border-b border-current/20 pb-4 mb-6">
                <span className="font-display font-black text-4xl sm:text-5xl opacity-40">
                  {cat.num}
                </span>
                <h3 className="font-display font-black text-xl sm:text-2xl tracking-tight uppercase">
                  {locale === "en" ? cat.titleEn : cat.titleFr}
                </h3>
              </div>

              {/* Items List */}
              <div className="flex flex-wrap gap-2 pt-2">
                {cat.items.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 rounded-full bg-black/10 text-xs sm:text-sm font-display font-bold uppercase tracking-wider backdrop-blur-sm hover:scale-105 transition-transform"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
