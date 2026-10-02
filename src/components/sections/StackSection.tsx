"use client";
import { motion } from "framer-motion";

const blocks = [
  [
    "01",
    "INTERFACES",
    "HTML · CSS · JavaScript · TypeScript · PHP · React · Next.js · NestJS · Tailwind CSS · Node.js · Vite",
    "Des interfaces rapides et pensées pour donner une forme claire à des systèmes complexes."
  ],
  [
    "02",
    "SYSTÈMES & DONNÉES",
    "PostgreSQL · MySQL · Redis · PL/SQL · T-SQL · API REST · Prisma · Docker · Git & GitHub · Linux · Nginx · Vercel",
    "Des API et des couches de données conçues pour être simples à maintenir et faire évoluer."
  ],
  [
    "03",
    "IA APPLIQUÉE",
    "Python · Scikit-Learn · TensorFlow · KNIME · Pandas · NumPy · Matplotlib · Jupyter · Talend",
    "Des modèles utiles, intégrés au produit plutôt que laissés dans un notebook."
  ]
];

export function StackSection() {
  return (
    <section className="section section-rule">
      <div className="section-label">
        <span>(02)</span>
        <p>// STACK</p>
      </div>
      <div className="stack-grid">
        {blocks.map(([n, title, tools, text], i) => (
          <motion.article
            key={n}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="stack-card"
          >
            <span className="mono text-xs text-lime-200">{n}</span>
            <h2>{title}</h2>
            <p className="stack-tools">{tools}</p>
            <p className="text-sm leading-6 text-zinc-500">{text}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}