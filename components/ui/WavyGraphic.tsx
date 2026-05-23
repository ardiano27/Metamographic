"use client";

import React from "react";

export const WavyGraphic = () => {
  return (
    <span className="wavy-graphic-container">
      <span className="wavy-text-main">GRAPHIC</span>
      <svg className="wavy-svg" viewBox="0 0 100 20" preserveAspectRatio="none">
        <defs>
          <linearGradient id="wave-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="15%" stopColor="var(--accent)" stopOpacity="0.6" />
            <stop offset="50%" stopColor="var(--glow)" stopOpacity="0.8" />
            <stop offset="85%" stopColor="var(--accent)" stopOpacity="0.6" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
          
          <filter id="blur-glow">
            <feGaussianBlur stdDeviation="1.2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <mask id="fade-mask">
            <linearGradient id="mask-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="white" stopOpacity="0" />
              <stop offset="50%" stopColor="white" stopOpacity="1" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </linearGradient>
            <rect x="0" y="0" width="100" height="20" fill="url(#mask-grad)" />
          </mask>
        </defs>
        
        {/* Perfectly repeating paths for seamless animation */}
        <g mask="url(#fade-mask)" filter="url(#blur-glow)">
          <path 
            className="wave-line-main wave-1" 
            d="M -100 10 C -87.5 0, -62.5 20, -50 10 C -37.5 0, -12.5 20, 0 10 C 12.5 0, 37.5 20, 50 10 C 62.5 0, 87.5 20, 100 10 C 112.5 0, 137.5 20, 150 10 C 162.5 0, 187.5 20, 200 10" 
            fill="none" 
            stroke="url(#wave-grad)" 
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path 
            className="wave-line-main wave-2" 
            d="M -100 12 C -87.5 22, -62.5 2, -50 12 C -37.5 22, -12.5 2, 0 12 C 12.5 22, 37.5 2, 50 12 C 62.5 22, 87.5 2, 100 12 C 112.5 22, 137.5 2, 150 12 C 162.5 22, 187.5 2, 200 12" 
            fill="none" 
            stroke="url(#wave-grad)" 
            strokeWidth="1.8"
            strokeLinecap="round"
            opacity="0.6"
          />
          <path 
            className="wave-line-main wave-3" 
            d="M -100 8 C -87.5 -2, -62.5 18, -50 8 C -37.5 -2, -12.5 18, 0 8 C 12.5 -2, 37.5 18, 50 8 C 62.5 -2, 87.5 18, 100 8 C 112.5 -2, 137.5 18, 150 8 C 162.5 -2, 187.5 18, 200 8" 
            fill="none" 
            stroke="url(#wave-grad)" 
            strokeWidth="1.2"
            strokeLinecap="round"
            opacity="0.4"
          />
        </g>
      </svg>
    </span>
  );
};
