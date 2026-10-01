import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface FooterProps {
  locale: "en" | "fr";
}

export function Footer({ locale }: FooterProps) {
  return (
    <footer className="w-full bg-[#D2D2D2] text-[#363636] py-16 px-6 md:px-12 border-t border-[#000000]/10 mt-24">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        <div>
          <div className="font-display font-black text-2xl tracking-tight mb-2">
            ABDELHAMID BEZZOT
          </div>
          <p className="font-display text-xs text-[#363636]/70 uppercase tracking-widest">
            {locale === "en"
              ? "FULL-STACK DEVELOPER & AI ENGINEER"
              : "DÉVELOPPEUR FULL-STACK & AI ENGINEER"}
          </p>
        </div>

        <div className="flex flex-wrap gap-6 font-display font-bold text-xs uppercase tracking-wider">
          <a
            href="mailto:abdelhamid.bezzot374@gmail.com"
            className="flex items-center gap-1 hover:text-[#06BC65] transition-colors"
          >
            EMAIL <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
          <a
            href="https://github.com/AbdlhamidBezzot"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:text-[#06BC65] transition-colors"
          >
            GITHUB <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
          <a
            href="https://linkedin.com/in/abdelhamidbezzot"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:text-[#06BC65] transition-colors"
          >
            LINKEDIN <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-[#363636]/10 flex flex-col sm:flex-row justify-between items-center text-xs font-display font-bold tracking-widest text-[#363636]/60 gap-4">
        <div>ALL RIGHTS RESERVED 2026 AB</div>
        <div className="flex gap-6">
          <Link href={`/${locale}`} className="hover:text-[#363636]">
            {locale === "en" ? "HOME" : "ACCUEIL"}
          </Link>
          <Link href={`/${locale}/work`} className="hover:text-[#363636]">
            {locale === "en" ? "WORK" : "PROJETS"}
          </Link>
          <Link href={`/${locale}/about`} className="hover:text-[#363636]">
            {locale === "en" ? "ABOUT" : "À PROPOS"}
          </Link>
          <Link href={`/${locale}/contact`} className="hover:text-[#363636]">
            {locale === "en" ? "CONTACT" : "CONTACT"}
          </Link>
        </div>
      </div>
    </footer>
  );
}
