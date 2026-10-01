"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowUpRight } from "lucide-react";

interface FloatingControlsProps {
  locale: "en" | "fr";
}

export function FloatingControls({ locale }: FloatingControlsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Helper to dispatch global preview close event
  const closeAllPreviews = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("portfolio-close-previews"));
    }
  };

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
    closeAllPreviews();
  }, [pathname]);

  // Lock scroll when overlay menu is open
  useEffect(() => {
    if (isOpen) {
      closeAllPreviews();
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const navLinks = [
    { label: locale === "en" ? "HOME" : "ACCUEIL", path: `/${locale}` },
    { label: locale === "en" ? "WORK" : "PROJETS", path: `/${locale}/work` },
    { label: locale === "en" ? "ABOUT" : "À PROPOS", path: `/${locale}/about` },
    { label: locale === "en" ? "CONTACT" : "CONTACT", path: `/${locale}/contact` },
  ];

  // Helper to switch language while staying on equivalent route
  const getLanguagePath = (targetLocale: "en" | "fr") => {
    if (!pathname) return `/${targetLocale}`;
    const segments = pathname.split("/").filter(Boolean);
    if (segments.length === 0) return `/${targetLocale}`;
    segments[0] = targetLocale;
    return `/${segments.join("/")}`;
  };

  return (
    <>
      {/* Floating Centered Pill Navigation Bar */}
      <div className="fixed top-4 sm:top-6 left-1/2 -translate-x-1/2 z-[210] max-w-[96vw] sm:max-w-max select-none">
        <div className="flex items-center gap-1.5 sm:gap-3 md:gap-5 bg-[#363636] text-white p-1.5 sm:p-2 pl-2 sm:pl-3 pr-1.5 sm:pr-2 rounded-full shadow-[0_12px_32px_rgba(0,0,0,0.25)] border border-white/10 backdrop-blur-md">
          {/* Left: Monogram Circle AB_ */}
          <Link
            href={`/${locale}`}
            onClick={closeAllPreviews}
            aria-label="Home"
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/15 hover:bg-[#DBF505] hover:text-[#363636] text-white flex items-center justify-center font-display font-black text-xs sm:text-sm transition-all duration-200 flex-shrink-0"
          >
            AB_
          </Link>

          {/* Center: Nav links WORK / ABOUT / CONTACT */}
          <nav className="flex items-center gap-1.5 sm:gap-4 md:gap-6 px-1 sm:px-2">
            <Link
              href={`/${locale}/work`}
              onClick={closeAllPreviews}
              className={`font-display font-extrabold text-[11px] sm:text-xs md:text-sm tracking-wider uppercase transition-colors px-1.5 sm:px-2 py-1 ${
                pathname === `/${locale}/work` ? "text-[#DBF505]" : "text-white/80 hover:text-white"
              }`}
            >
              {locale === "en" ? "WORK" : "PROJETS"}
            </Link>

            <Link
              href={`/${locale}/about`}
              onClick={closeAllPreviews}
              className={`font-display font-extrabold text-[11px] sm:text-xs md:text-sm tracking-wider uppercase transition-colors px-1.5 sm:px-2 py-1 ${
                pathname === `/${locale}/about` ? "text-[#DBF505]" : "text-white/80 hover:text-white"
              }`}
            >
              {locale === "en" ? "ABOUT" : "À PROPOS"}
            </Link>

            <Link
              href={`/${locale}/contact`}
              onClick={closeAllPreviews}
              className={`font-display font-extrabold text-[11px] sm:text-xs md:text-sm tracking-wider uppercase transition-colors px-1.5 sm:px-2 py-1 ${
                pathname === `/${locale}/contact` ? "text-[#DBF505]" : "text-white/80 hover:text-white"
              }`}
            >
              CONTACT
            </Link>
          </nav>

          {/* Language switch EN / FR */}
          <div className="hidden xs:flex items-center gap-1 text-[10px] sm:text-xs font-display font-bold px-1 sm:px-2 text-white/50 border-l border-white/15">
            <Link
              href={getLanguagePath("en")}
              className={`px-1.5 py-0.5 rounded-full transition-colors ${
                locale === "en" ? "text-white font-black bg-white/20" : "hover:text-white"
              }`}
            >
              EN
            </Link>
            <span>/</span>
            <Link
              href={getLanguagePath("fr")}
              className={`px-1.5 py-0.5 rounded-full transition-colors ${
                locale === "fr" ? "text-white font-black bg-white/20" : "hover:text-white"
              }`}
            >
              FR
            </Link>
          </div>

          {/* Right: White Pill Button with Contact Email */}
          <a
            href="mailto:abdelhamid.bezzot374@gmail.com"
            className="hidden lg:inline-flex items-center justify-center bg-white text-[#363636] hover:bg-[#DBF505] text-[11px] font-display font-black tracking-wider uppercase py-2 px-4 rounded-full transition-all duration-200 flex-shrink-0 shadow-sm"
          >
            ABDELHAMID.BEZZOT374@GMAIL.COM
          </a>

          {/* Mobile White Pill Button */}
          <a
            href={`/${locale}/contact`}
            onClick={closeAllPreviews}
            className="inline-flex lg:hidden items-center justify-center bg-white text-[#363636] hover:bg-[#DBF505] text-[10px] sm:text-[11px] font-display font-black tracking-wider uppercase py-1.5 sm:py-2 px-2.5 sm:px-3.5 rounded-full transition-all duration-200 flex-shrink-0 shadow-sm"
          >
            CONTACT
          </a>
        </div>
      </div>
    </>
  );
}
