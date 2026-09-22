"use client";

import { useState } from "react";

type ProjectImageProps = {
  alt: string;
  src: string;
  variant: "project" | "case";
};

export function ProjectImage({ alt, src, variant }: ProjectImageProps) {
  const [isPhoneImage, setIsPhoneImage] = useState(false);
  const imageClass = variant === "project" ? "project-image" : "case-image";

  return (
    <a
      className={`image-frame${isPhoneImage ? " is-phone-image" : ""}`}
      href={src}
      target="_blank"
      rel="noreferrer"
      aria-label={`Open full-size ${alt || "project image"}`}
    >
      <img
        className={imageClass}
        src={src}
        alt={alt}
        onLoad={(event) => {
          const { naturalHeight, naturalWidth } = event.currentTarget;
          setIsPhoneImage(naturalHeight / naturalWidth >= 1.25);
        }}
      />
    </a>
  );
}