"use client";

import { useEffect, useRef, useState } from "react";

export default function ClientCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorFollowerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    // Sembunyikan cursor default di seluruh halaman
    document.body.style.cursor = "none";

    const handleMouseMove = (e: MouseEvent) => {
      if (!cursorRef.current || !cursorFollowerRef.current) return;

      // Cursor utama (lingkaran kecil) bergerak langsung
      cursorRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;

      // Follower (lingkaran besar) bergerak dengan sedikit delay (smooth)
      setTimeout(() => {
        if (cursorFollowerRef.current) {
          cursorFollowerRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
        }
      }, 30);
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    // Deteksi elemen yang memiliki kelas `cursor-pointer` atau tombol/link
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isClickable =
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("button") ||
        target.closest("a") ||
        target.classList.contains("cursor-pointer") ||
        target.classList.contains("nav-link") ||
        target.classList.contains("cta-btn") ||
        target.classList.contains("btn-primary") ||
        target.classList.contains("btn-ghost") ||
        target.classList.contains("filter-tab") ||
        target.classList.contains("video-card") ||
        target.classList.contains("service-card") ||
        target.classList.contains("team-card");

      setIsHovered(!!isClickable);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.body.addEventListener("mouseenter", handleMouseEnter);
    document.body.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      document.body.style.cursor = "";
      window.removeEventListener("mousemove", handleMouseMove);
      document.body.removeEventListener("mouseenter", handleMouseEnter);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      <div
        ref={cursorRef}
        className="custom-cursor"
        style={{
          transform: "translate(0, 0)",
          opacity: isVisible ? 1 : 0,
        }}
      >
        <div
          className={`cursor-dot ${isHovered ? "hover" : ""} ${
            isClicking ? "click" : ""
          }`}
        />
      </div>
      <div
        ref={cursorFollowerRef}
        className="custom-cursor-follower"
        style={{
          transform: "translate(0, 0)",
          opacity: isVisible ? 0.6 : 0,
        }}
      >
        <div
          className={`cursor-ring ${isHovered ? "hover" : ""} ${
            isClicking ? "click" : ""
          }`}
        />
      </div>
    </>
  );
}