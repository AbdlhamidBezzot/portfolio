"use client";

import { ArrowUpRight } from "lucide-react";

interface ContactViewProps {
  locale: "en" | "fr";
}

export function ContactView({ locale }: ContactViewProps) {
  return (
    <section className="w-full max-w-7xl mx-auto px-6 md:px-12 py-12">
      {/* Giant Banner Box */}
      <div className="w-full p-8 md:p-16 rounded-[20px] bg-[#D2D2D2] text-[#363636] mb-16">
        <h1 className="display-xxl tracking-tighter text-[#363636] leading-[0.8] select-none">
          CONTACT
        </h1>
        <p className="font-display font-bold text-sm md:text-base uppercase tracking-widest text-[#363636]/70 mt-6 max-w-xl">
          {locale === "en"
            ? "HAVE A PROJECT, AN AI IDEA, OR WANT TO CONNECT? GET IN TOUCH DIRECTLY."
            : "UN PROJET, UNE IDÉE EN IA OU ENVIE D'ÉCHANGER ? CONTACTEZ-MOI DIRECTEMENT."}
        </p>
      </div>

      {/* Direct Contact Cards Container */}
      <div className="flex flex-col gap-8 my-12">
        {/* Direct Email High-Impact Card */}
        <div className="spencer-card bg-[#DBF505] p-8 sm:p-12">
          <span className="font-display font-bold text-xs uppercase tracking-widest text-[#363636]/60">
            {locale === "en" ? "DIRECT EMAIL" : "EMAIL DIRECT"}
          </span>
          <a
            href="mailto:abdelhamid.bezzot374@gmail.com"
            className="display-link text-xl sm:text-3xl md:text-5xl block mt-4 text-[#363636] hover:text-[#06BC65] break-all leading-tight"
          >
            ABDELHAMID.BEZZOT374@GMAIL.COM
          </a>
        </div>

        {/* Social / Network Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <a
            href="https://github.com/AbdlhamidBezzot"
            target="_blank"
            rel="noopener noreferrer"
            className="spencer-card bg-[#FFBDF7] p-8 sm:p-10 group flex justify-between items-center"
          >
            <div>
              <span className="font-display font-bold text-xs uppercase tracking-widest opacity-60">
                CODE REPOS
              </span>
              <div className="font-display font-black text-3xl sm:text-4xl uppercase mt-2">
                GITHUB
              </div>
            </div>
            <div className="w-12 h-12 rounded-full bg-black/10 flex items-center justify-center group-hover:bg-[#06BC65] group-hover:text-white transition-colors">
              <ArrowUpRight className="w-6 h-6" />
            </div>
          </a>

          <a
            href="https://linkedin.com/in/abdelhamidbezzot"
            target="_blank"
            rel="noopener noreferrer"
            className="spencer-card bg-[#245767] text-white p-8 sm:p-10 group flex justify-between items-center"
          >
            <div>
              <span className="font-display font-bold text-xs uppercase tracking-widest opacity-60">
                NETWORK
              </span>
              <div className="font-display font-black text-3xl sm:text-4xl uppercase mt-2">
                LINKEDIN
              </div>
            </div>
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-[#06BC65] group-hover:text-white transition-colors">
              <ArrowUpRight className="w-6 h-6" />
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
