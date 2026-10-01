"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowUpRight, Menu } from "lucide-react";

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
      <div className="fixed top-3 sm:top-5 left-1/2 -translate-x-1/2 z-[210] max-w-[92vw] sm:max-w-max select-none">
        {/* MOBILE VERSION (< 640px): Ultra-compact pill (AB logo + EN/FR + Menu button) */}
        <div className="flex sm:hidden items-center gap-2 bg-[#363636] text-white p-1.5 pl-2.5 pr-1.5 rounded-full shadow-[0_12px_32px_rgba(0,0,0,0.25)] border border-white/10 backdrop-blur-md">
          {/* Left: AB Monogram Circle */}
          <Link
            href={`/${locale}`}
            onClick={closeAllPreviews}
            aria-label="Home"
            className="w-8 h-8 rounded-full bg-white/15 hover:bg-[#DBF505] hover:text-[#363636] text-white flex items-center justify-center font-display font-black text-xs transition-all duration-200 flex-shrink-0"
          >
            AB
          </Link>

          {/* Language Switcher */}
          <div className="flex items-center gap-1 text-[10px] font-display font-bold px-1.5 text-white/60 border-l border-r border-white/15">
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

          {/* Right: Hamburger Menu Toggle Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close Menu" : "Open Menu"}
            className="w-8 h-8 rounded-full bg-white/15 hover:bg-[#DBF505] hover:text-[#363636] text-white flex items-center justify-center transition-colors flex-shrink-0"
          >
            {isOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>

        {/* DESKTOP VERSION (>= 640px): Full horizontal pill navbar */}
        <div className="hidden sm:flex items-center gap-4 md:gap-6 bg-[#363636] text-white p-2 pl-3 pr-2 rounded-full shadow-[0_12px_32px_rgba(0,0,0,0.25)] border border-white/10 backdrop-blur-md">
          {/* Left: AB Monogram Circle */}
          <Link
            href={`/${locale}`}
            onClick={closeAllPreviews}
            aria-label="Home"
            className="w-9 h-9 rounded-full bg-white/15 hover:bg-[#DBF505] hover:text-[#363636] text-white flex items-center justify-center font-display font-black text-sm transition-all duration-200 flex-shrink-0"
          >
            AB
          </Link>

          {/* Center: Nav links WORK / ABOUT / CONTACT */}
          <nav className="flex items-center gap-4 md:gap-6 px-2">
            <Link
              href={`/${locale}/work`}
              onClick={closeAllPreviews}
              className={`font-display font-extrabold text-xs md:text-sm tracking-wider uppercase transition-colors px-2 py-1 ${
                pathname === `/${locale}/work` ? "text-[#DBF505]" : "text-white/80 hover:text-white"
              }`}
            >
              {locale === "en" ? "WORK" : "PROJETS"}
            </Link>

            <Link
              href={`/${locale}/about`}
              onClick={closeAllPreviews}
              className={`font-display font-extrabold text-xs md:text-sm tracking-wider uppercase transition-colors px-2 py-1 ${
                pathname === `/${locale}/about` ? "text-[#DBF505]" : "text-white/80 hover:text-white"
              }`}
            >
              {locale === "en" ? "ABOUT" : "À PROPOS"}
            </Link>

            <Link
              href={`/${locale}/contact`}
              onClick={closeAllPreviews}
              className={`font-display font-extrabold text-xs md:text-sm tracking-wider uppercase transition-colors px-2 py-1 ${
                pathname === `/${locale}/contact` ? "text-[#DBF505]" : "text-white/80 hover:text-white"
              }`}
            >
              CONTACT
            </Link>
          </nav>

          {/* Language Switcher */}
          <div className="flex items-center gap-1 text-xs font-display font-bold px-2 text-white/50 border-l border-white/15">
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

          {/* Menu Trigger Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close Menu" : "Open Menu"}
            className="w-9 h-9 rounded-full bg-white/15 hover:bg-[#DBF505] hover:text-[#363636] text-white flex items-center justify-center transition-colors flex-shrink-0"
          >
            {isOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Fullscreen Overlay Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="menu-overlay"
          >
            {/* Top Bar inside Overlay */}
            <div className="flex justify-between items-center w-full pb-8 border-b border-[#363636]/10">
              <div className="font-display font-black text-xl text-[#363636]">
                ABDELHAMID BEZZOT
              </div>
              <div className="flex items-center gap-4 text-sm font-display font-bold">
                <Link
                  href={getLanguagePath("en")}
                  className={`px-3 py-1 rounded-full transition-colors ${
                    locale === "en"
                      ? "bg-[#363636] text-white"
                      : "text-[#363636] hover:bg-[#D2D2D2]"
                  }`}
                >
                  EN
                </Link>
                <span className="text-[#D2D2D2]">/</span>
                <Link
                  href={getLanguagePath("fr")}
                  className={`px-3 py-1 rounded-full transition-colors ${
                    locale === "fr"
                      ? "bg-[#363636] text-white"
                      : "text-[#363636] hover:bg-[#D2D2D2]"
                  }`}
                >
                  FR
                </Link>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="my-auto py-12 flex flex-col items-start gap-4">
              {navLinks.map((link, idx) => {
                const isActive = pathname === link.path;
                return (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + idx * 0.08, duration: 0.3 }}
                  >
                    <Link
                      href={link.path}
                      onClick={() => {
                        setIsOpen(false);
                        closeAllPreviews();
                      }}
                      className={`display-link group flex items-center gap-4 ${
                        isActive ? "text-[#06BC65]" : ""
                      }`}
                    >
                      <span>{link.label}</span>
                      <ArrowUpRight className="w-10 h-10 opacity-0 group-hover:opacity-100 transition-opacity text-[#06BC65]" />
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            {/* Bottom Strip inside Overlay */}
            <div className="pt-8 border-t border-[#363636]/10 flex flex-wrap justify-between items-center gap-4 text-xs font-display font-bold tracking-widest text-[#363636]/70">
              <div>ABDELHAMID.BEZZOT374@GMAIL.COM</div>
              <div>AB ©</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
