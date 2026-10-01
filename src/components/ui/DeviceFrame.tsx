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
      <div
        className={`relative flex-shrink-0 h-full max-h-full mx-auto ${className}`}
        style={{ aspectRatio: "9/19.5", maxWidth: "100%", maxHeight: "100%" }}
      >
        {/* Phone outer shell */}
        <div
          className="relative w-full h-full rounded-[22px] sm:rounded-[28px] bg-[#1E1E1E] shadow-2xl overflow-hidden flex flex-col"
          style={{ border: "4px solid #1E1E1E" }}
        >
          {/* Dynamic Island */}
          <div className="relative z-20 flex justify-center pt-2 pb-1 flex-shrink-0">
            <div className="w-14 h-[11px] bg-[#0F0F0F] rounded-full flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-[#0A0A0A]" />
            </div>
          </div>

          {/* Screen Content */}
          <div className="relative flex-1 overflow-hidden bg-black min-h-0">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={title}
                fill
                className="object-cover object-top"
                unoptimized
                sizes="(max-width: 640px) 120px, 200px"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-[#141414] text-white/70 font-display font-black text-xs uppercase p-2 text-center">
                {title}
              </div>
            )}
          </div>

          {/* Home indicator */}
          <div className="relative z-20 flex justify-center py-1.5 flex-shrink-0 bg-black">
            <div className="w-16 h-1 bg-white/30 rounded-full" />
          </div>
        </div>
      </div>
    );
  }

  // Laptop View (Default)
  return (
    <div className={`relative w-full h-full flex flex-col items-center justify-center ${className}`}>
      {/* Laptop Screen Bezel */}
      <div className="relative w-full bg-[#1E1E1E] rounded-t-[10px] sm:rounded-t-[14px] border border-white/10 shadow-xl overflow-hidden flex flex-col"
        style={{ height: "88%" }}
      >
        {/* Top camera dot */}
        <div className="w-full flex justify-center py-[5px] flex-shrink-0">
          <div className="w-[5px] h-[5px] rounded-full bg-[#333333] border border-[#444444]" />
        </div>

        {/* Display Panel */}
        <div className="relative flex-1 overflow-hidden bg-[#0A0A0A] min-h-0">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={title}
              fill
              className="object-contain"
              unoptimized
              sizes="(max-width: 640px) 200px, (max-width: 1024px) 300px, 400px"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-white/50 font-display font-black text-sm uppercase">
              {title} MOCKUP
            </div>
          )}
        </div>
      </div>

      {/* Laptop Base Lip */}
      <div
        className="w-[104%] bg-[#2C2C2C] rounded-b-[6px] sm:rounded-b-[8px] border-t border-[#3D3D3D] shadow-md flex items-center justify-center relative z-10 flex-shrink-0"
        style={{ height: "12%" }}
      >
        {/* Notch */}
        <div className="w-10 h-[6px] bg-[#1E1E1E] rounded-b-sm" />
      </div>
    </div>
  );
}
