import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface FooterProps {
  locale: "en" | "fr";
}

export function Footer({ locale }: FooterProps) {
  return (
    <footer className="w-full bg-[#D2D2D2] text-[#363636] py-12 sm:py-16 px-5 sm:px-8 md:px-12 border-t border-[#000000]/10 mt-16 sm:mt-24">
      <div className="max-w-7xl mx-auto">
        {/* Top row: name/role + links */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 sm:gap-8">
          {/* Brand */}
          <div className="min-w-0">
            <div className="font-display font-black text-xl sm:text-2xl tracking-tight mb-1 truncate">
              ABDELHAMID BEZZOT
            </div>
            <p className="font-display text-[10px] sm:text-xs text-[#363636]/70 uppercase tracking-widest">
              {locale === "en"
                ? "FULL-STACK DEVELOPER & AI ENGINEER"
                : "DÉVELOPPEUR FULL-STACK & AI ENGINEER"}
            </p>
          </div>

          {/* Social Links */}
          <div className="flex flex-wrap gap-4 sm:gap-6 font-display font-bold text-[11px] sm:text-xs uppercase tracking-wider">
            <a
              href="mailto:abdelhamid.bezzot374@gmail.com"
              className="flex items-center gap-1 hover:text-[#06BC65] transition-colors whitespace-nowrap"
            >
              EMAIL <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://github.com/AbdlhamidBezzot"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-[#06BC65] transition-colors whitespace-nowrap"
            >
              GITHUB <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://linkedin.com/in/abdelhamidbezzot"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-[#06BC65] transition-colors whitespace-nowrap"
            >
              LINKEDIN <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-8 sm:mt-10 border-t border-[#363636]/10" />

        {/* Bottom row: copyright + nav */}
        <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] sm:text-xs font-display font-bold tracking-widest text-[#363636]/60">
          <div className="order-2 sm:order-1">AB ©</div>
          <div className="order-1 sm:order-2 flex flex-wrap justify-center sm:justify-end gap-4 sm:gap-6">
            <Link href={`/${locale}`} className="hover:text-[#363636] transition-colors">
              {locale === "en" ? "HOME" : "ACCUEIL"}
            </Link>
            <Link href={`/${locale}/work`} className="hover:text-[#363636] transition-colors">
              {locale === "en" ? "WORK" : "PROJETS"}
            </Link>
            <Link href={`/${locale}/about`} className="hover:text-[#363636] transition-colors">
              {locale === "en" ? "ABOUT" : "À PROPOS"}
            </Link>
            <Link href={`/${locale}/contact`} className="hover:text-[#363636] transition-colors">
              CONTACT
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
