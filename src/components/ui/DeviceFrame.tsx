"use client";

import Image from "next/image";

interface DeviceFrameProps {
  deviceType?: "laptop" | "phone" | string;
  imageUrl?: string | null;
  title: string;
  className?: string;
}

export function DeviceFrame({
  deviceType = "laptop",
  imageUrl,
  title,
  className = "",
}: DeviceFrameProps) {
  if (deviceType === "phone") {
    return (
      <div className={`relative h-full aspect-[9/18] rounded-[24px] sm:rounded-[30px] border-[5px] sm:border-[6px] border-[#222222] shadow-2xl bg-black overflow-hidden flex flex-col justify-between ${className}`}>
        {/* Top Notch / Island */}
        <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-16 h-3 bg-[#222222] rounded-full z-20 flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-black/60" />
        </div>

        {/* Screen Image */}
        <div className="relative w-full h-full">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={title}
              fill
              className="object-cover"
              unoptimized
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-[#181818] text-white font-display font-black text-xs">
              {title}
            </div>
          )}
        </div>
      </div>
    );
  }

  // Laptop View (Default)
  return (
    <div className={`relative w-full h-full flex flex-col items-center justify-center ${className}`}>
      {/* Laptop Screen Bezel */}
      <div className="relative w-full h-[90%] bg-[#1E1E1E] rounded-t-[14px] p-2 sm:p-2.5 pb-1 border border-white/10 shadow-xl overflow-hidden flex flex-col">
        {/* Top Camera Dot */}
        <div className="w-full flex justify-center pb-1.5 pt-0.5">
          <div className="w-1.5 h-1.5 rounded-full bg-[#333333] border border-[#444444]" />
        </div>

        {/* Display Panel */}
        <div className="relative w-full flex-1 rounded-[6px] overflow-hidden bg-[#0A0A0A]">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={title}
              fill
              className="object-cover object-top"
              unoptimized
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-white/50 font-display font-black text-sm uppercase">
              {title} MOCKUP
            </div>
          )}
        </div>
      </div>

      {/* Laptop Base Lip */}
      <div className="w-[104%] h-3 bg-[#2C2C2C] rounded-b-[8px] border-t border-[#3D3D3D] shadow-md flex items-center justify-center relative z-10">
        {/* Notch Opening Indentation */}
        <div className="w-12 h-1.5 bg-[#1E1E1E] rounded-b-md" />
      </div>
    </div>
  );
}
