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
      {/* Top-Right Floating Avatar & Menu Trigger */}
      <div className="floating-top-right">
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close Menu" : "Open Menu"}
          className="icon-button-round group relative font-display font-black text-sm tracking-tighter"
        >
          {isOpen ? (
            <X className="w-5 h-5 transition-transform group-hover:rotate-90" />
          ) : (
            <span className="flex items-center justify-center font-black text-xs">
              AB
            </span>
          )}
        </button>
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
