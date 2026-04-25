"use client";

import Image from "next/image";
import { UserCheck } from "lucide-react";
import { useTranslations, useLocale } from 'next-intl';
import { Marquee, MarqueeCard } from "@/components/ui/marquee"; // tambah MarqueeCard

const teamMembers = [
  {
    image: "/no.jpeg",
    name: "Arlecchino",
    role: "Creative Director",
    instagram: "arlecchino",   // ganti dengan username asli
    linkedin: "arlecchino",    // ganti dengan username asli
  },
  {
    image: "/chatte.jpg",
    name: "Usamah Hasanz",
    role: "Motion Director",
    instagram: "usamahhasanz",
    linkedin: "usamahhasanz",
  },
  {
    image: "/suf.jpg",
    name: "Yusuf izzat",
    role: "VFX Artist",
    instagram: "yusufizzat",
    linkedin: "yusufizzat",
  },
  {
    image: "/pid.jpg",
    name: "Roofid Rizqu",
    role: "3D Designer",
    instagram: "roofidrizqu",
    linkedin: "roofidrizqu",
  },
  {
    image: "/raka.jpg",
    name: "Raka Adrel",
    role: "Video Editor",
    instagram: "raka.adrel",
    linkedin: "raka-adrel",
  },
  {
    image: "/acel.jpg",
    name: "Marcelino",
    role: "Compositor",
    instagram: "marcelino",
    linkedin: "marcelino",
  },
];

export default function TeamSection() {
  const t = useTranslations('team');
  return (
    <section id="team" className="team-marquee-section">
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
            {t('marquee-title')}{" "}
            <span className="gradient-text"> {t('marquee-title2')} </span>
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
            {t('team-marquee-subtitle')}
          </p>
        </div>

        {/* Marquee */}
        <div className="team-marquee-track">
          <div className="team-marquee-fade-left" />
          <div className="team-marquee-fade-right" />

          <Marquee className="[--gap:1.5rem]" pauseOnHover>
            {teamMembers.map((member) => (
              // Bungkus card dengan MarqueeCard, tambah socialLinks & personName
              <MarqueeCard
                key={member.name}
                personName={member.name}
                 personRole={member.role}    // ← tambah
                 personImage={member.image}
                socialLinks={{
                  instagram: member.instagram,
                  linkedin: member.linkedin,
                }}
              >
                <div className="team-marquee-card">
                  <div className="team-marquee-img-wrap">
                    <Image
                      alt={member.name}
                      className="team-marquee-img"
                      fill
                      src={member.image}
                    />
                    <div className="team-marquee-label">
                      <h3 className="team-marquee-name">{member.name}</h3>
                      <p className="team-marquee-role">{member.role}</p>
                    </div>
                  </div>
                </div>
              </MarqueeCard>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
}