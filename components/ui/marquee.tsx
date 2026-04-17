"use client";

import React from "react";

interface MarqueeProps {
  className?: string;
  reverse?: boolean;
  pauseOnHover?: boolean;
  children?: React.ReactNode;
  vertical?: boolean;
  repeat?: number;
}

export function Marquee({
  className = "",
  reverse = false,
  pauseOnHover = false,
  children,
  vertical = false,
  repeat = 4,
}: MarqueeProps) {
  return (
    <div
      className={`marquee-container ${vertical ? "marquee-vertical-dir" : "marquee-horizontal-dir"} ${className}`}
      style={{ ["--gap" as string]: "1.5rem" }}
    >
      {Array.from({ length: repeat }).map((_, i) => (
        <div
          key={i}
          className={[
            "marquee-scroll-group",
            vertical ? "marquee-scroll-vertical" : "marquee-scroll-horizontal",
            reverse ? "marquee-reverse" : "",
            pauseOnHover ? "marquee-pause-hover" : "",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          {children}
        </div>
      ))}
    </div>
  );
}
