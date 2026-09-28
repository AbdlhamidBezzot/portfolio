"use client";

import { useEffect, useRef, useState } from "react";

type ProjectImageProps = {
  alt: string;
  src: string;
  variant: "project" | "case";
};

export function ProjectImage({ alt, src, variant }: ProjectImageProps) {
  const [isPhoneImage, setIsPhoneImage] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);
  const imageClass = variant === "project" ? "project-image" : "case-image";
  const updateImageType = (image: HTMLImageElement) => {
    setIsPhoneImage(image.naturalWidth > 0 && image.naturalHeight / image.naturalWidth >= 1.25);
  };

  useEffect(() => {
    if (imageRef.current?.complete) updateImageType(imageRef.current);
  }, [src]);

  return (
    <div className={`image-frame${isPhoneImage ? " is-phone-image" : ""}`}>
      <img
        ref={imageRef}
        className={imageClass}
        src={src}
        alt={alt}
        onLoad={(event) => updateImageType(event.currentTarget)}
      />
    </div>
  );
}