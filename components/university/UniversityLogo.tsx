"use client";

import { useState } from "react";
import Image from "next/image";

function initials(name: string) {
  return name
    .split(" ")
    .filter((w) => w[0] === w[0]?.toUpperCase())
    .slice(0, 2)
    .map((w) => w[0])
    .join("");
}

export function UniversityLogo({
  slug,
  name,
  className,
  imgClassName,
}: {
  slug: string;
  name: string;
  className?: string;
  imgClassName?: string;
}) {
  const [failed, setFailed] = useState(false);
  const logoPath = `/logos/${slug}.webp`;

  if (failed) {
    return (
      <span
        className={`flex shrink-0 items-center justify-center rounded-md border border-line text-xs text-muted ${className ?? ""}`}
      >
        {initials(name)}
      </span>
    );
  }

  return (
    <span
      className={`flex shrink-0 items-center justify-center overflow-hidden rounded-md border border-line bg-paper ${className ?? ""}`}
    >
      <Image
        src={logoPath}
        alt={`${name} logo`}
        width={96}
        height={96}
        onError={() => setFailed(true)}
        className={`h-full w-full object-contain ${imgClassName ?? ""}`}
      />
    </span>
  );
}