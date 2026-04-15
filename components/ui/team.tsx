"use client";

import Image from "next/image";
import { UserCheck } from "lucide-react";

import { Marquee } from "@/components/ui/marquee";

const teamMembers = [
  {
    image:
      "/no.jpeg",
    name: "Arlecchino",
    role: "Creative Director",
  },
  {
    image:
      "/chatte.jpg",
    name: "Usamah Hasanz",
    role: "Motion Director",
  },
  {
    image:
      "/suf.jpg",
    name: "Yusuf izzat",
    role: "VFX Artist",
  },
  {
    image:
      "/pid.jpg",
    name: "Roofid Rizqu",
    role: "3D Designer",
  },
  {
    image:
      "/raka.jpg",
    name: "Raka Adrel",
    role: "Video Editor",
  },
  {
    image:
      "/acel.jpg",
    name: "Marcelino",
    role: "Compositor",
  },
];

export default function TeamSection() {
  return (
    <section
      id="team"
      className="team-marquee-section"
    >
      {/* Decorative SVG */}
      <div>
        <svg
          className="team-deco-svg"
          fill="none"
          height="154"
          viewBox="0 0 460 154"
          width="460"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_team)">
            <path
              d="M-87.463 458.432C-102.118 348.092 -77.3418 238.841 -15.0744 188.274C57.4129 129.408 180.708 150.071 351.748 341.128C278.246 -374.233 633.954 380.602 548.123 42.7707"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="40"
            />
          </g>
          <defs>
            <clipPath id="clip0_team">
              <rect fill="white" height="154" width="460" />
            </clipPath>
          </defs>
        </svg>
      </div>

      <div className="team-marquee-inner">
        {/* Header */}
        <div className="team-marquee-header">
          <div className="team-marquee-icon">
            <UserCheck size={24} />
          </div>

          <h2 className="team-marquee-title">
            Meet The{" "}
            <span className="gradient-text">Team</span>
            <svg
              className="team-marquee-title-deco"
              fill="currentColor"
              height="86"
              viewBox="0 0 108 86"
              width="108"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M38.8484 16.236L15 43.5793L78.2688 15L18.1218 71L93 34.1172L70.2047 65.2739"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="28"
              />
            </svg>
          </h2>
          <p className="team-marquee-subtitle">
            The creative minds behind METAMOGRAPHIC — crafting motion, design,
            and cinematic experiences together.
          </p>
        </div>

        {/* Marquee */}
        <div className="team-marquee-track">
          <div className="team-marquee-fade-left" />
          <div className="team-marquee-fade-right" />

          <Marquee className="[--gap:1.5rem]" pauseOnHover>
            {teamMembers.map((member) => (
              <div
                className="team-marquee-card"
                key={member.name}
              >
                <div className="team-marquee-img-wrap">
                  <Image
                    alt={member.name}
                    className="team-marquee-img"
                    fill
                    src={member.image}
                  />
                  <div className="team-marquee-label">
                    <h3 className="team-marquee-name">
                      {member.name}
                    </h3>
                    <p className="team-marquee-role">
                      {member.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
}