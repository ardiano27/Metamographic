"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";

interface SocialLinks {
  instagram?: string;
  linkedin?: string;
}

interface MarqueeCardProps {
  children: React.ReactNode;
  socialLinks?: SocialLinks;
  personName?: string;
  personRole?: string;
  personImage?: string;
}

interface MarqueeProps {
  className?: string;
  reverse?: boolean;
  pauseOnHover?: boolean;
  children?: React.ReactNode;
  vertical?: boolean;
  repeat?: number;
}

function SocialPopup({
  isOpen,
  onClose,
  socialLinks,
  personName,
  personRole,
  personImage,
}: {
  isOpen: boolean;
  onClose: () => void;
  socialLinks?: SocialLinks;
  personName?: string;
  personRole?: string;
  personImage?: string;
}) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  if (!isOpen) return null;

  // ✅ Portal: render langsung ke body, bebas dari overflow hidden marquee
  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="relative w-80 overflow-hidden rounded-2xl border border-white/10 bg-[#111] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-3 top-3 z-10 flex h-7 w-7 items-center justify-center
                     rounded-full bg-white/10 text-white/60 hover:bg-white/20 hover:text-white transition"
        >
          ✕
        </button>

        {/* Foto + info */}
        <div className="relative h-48 w-full">
          {personImage && (
            <Image
              src={personImage}
              alt={personName ?? ""}
              fill
              className="object-cover"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-[#111]/40 to-transparent" />
          <div className="absolute bottom-4 left-4">
            <p className="text-lg font-semibold text-white">{personName}</p>
            <p className="text-sm text-white/60">{personRole}</p>
          </div>
        </div>

        {/* Tombol sosial */}
        <div className="flex flex-col gap-2 p-4">
          {socialLinks?.instagram && (
            <a
              href={`https://instagram.com/${socialLinks.instagram}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-xl bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045]
                         px-4 py-3 text-sm font-medium text-white transition hover:opacity-90 active:scale-[0.98]"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <rect x="2" y="2" width="20" height="20" rx="5" stroke="white" strokeWidth="1.5"/>
                <circle cx="12" cy="12" r="4" stroke="white" strokeWidth="1.5"/>
                <circle cx="17.5" cy="6.5" r="1" fill="white"/>
              </svg>
              Instagram
            </a>
          )}

          {socialLinks?.linkedin && (
            <a
              href={`https://linkedin.com/in/${socialLinks.linkedin}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-xl bg-[#0077b5] px-4 py-3 text-sm font-medium
                         text-white transition hover:bg-[#006399] active:scale-[0.98]"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <rect x="2" y="2" width="20" height="20" rx="3" stroke="white" strokeWidth="1.5"/>
                <path d="M7 10v7M7 7v.5" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M11 17v-4c0-1.1.9-2 2-2s2 .9 2 2v4" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M11 10v7" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              LinkedIn
            </a>
          )}
        </div>
      </div>
    </div>,
    document.body // ✅ render di luar tree marquee
  );
}

export function MarqueeCard({ children, socialLinks, personName, personRole, personImage }: MarqueeCardProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div onClick={() => setOpen(true)} className="cursor-pointer">
        {children}
      </div>
      <SocialPopup
        isOpen={open}
        onClose={() => setOpen(false)}
        socialLinks={socialLinks}
        personName={personName}
        personRole={personRole}
        personImage={personImage}
      />
    </>
  );
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