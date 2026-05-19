"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties, PointerEvent as ReactPointerEvent } from "react";
import Image from "next/image";
import { UserCheck, X, ArrowRight } from "lucide-react";

// Custom Brand Icons as SVGs for maximum compatibility and beauty
const InstagramIcon = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const GithubIcon = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

const teamMembers = [
  {
    image: "/no.jpeg",
    name: "Arlecchino",
    role: "Creative Director",
    description: "The visionary architect behind our aesthetic direction. Arlecchino blends classical art principles with modern kinetic design to create breathtaking visual identities.",
    instagram: "https://instagram.com",
    github: "https://github.com",
  },
  {
    image: "/chatte.jpg",
    name: "Usamah Hasanz",
    role: "Motion Director",
    description: "Specializing in the fluid physics of digital movement. Usamah ensures every transition and animation feels natural yet mathematically precise.",
    instagram: "https://instagram.com",
    github: "https://github.com",
  },
  {
    image: "/suf.jpg",
    name: "Yusuf Izzat",
    role: "VFX Artist",
    description: "A master of particle systems and compositing. Yusuf bridges the gap between reality and the digital realm with seamless visual effects.",
    instagram: "https://instagram.com",
    github: "https://github.com",
  },
  {
    image: "/pid.jpg",
    name: "Roofid Rizqu",
    role: "3D Designer",
    description: "Crafting depth and dimension in every frame. Roofid specializes in high-fidelity 3D modeling and lighting that brings static concepts to life.",
    instagram: "https://instagram.com",
    github: "https://github.com",
  },
  {
    image: "/raka.jpg",
    name: "Raka Adrel",
    role: "Video Editor",
    description: "Pacing and narrative are Raka's playground. He transforms raw sequences into compelling cinematic stories with precision and rhythm.",
    instagram: "https://instagram.com",
    github: "https://github.com",
  },
  {
    image: "/acel.jpg",
    name: "Marcelino",
    role: "Compositor",
    description: "The final touch of perfection. Marcelino excels at color grading and multi-layer integration to ensure a cohesive and polished final product.",
    instagram: "https://instagram.com",
    github: "https://github.com",
  },
];

type TeamMember = (typeof teamMembers)[number];

const TEAM_AUTO_SPEED = -0.035;
const TEAM_DRAG_SENSITIVITY = 0.13;
const TEAM_VELOCITY_SENSITIVITY = 0.075;

export default function TeamSection() {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const interactionRef = useRef({
    dragged: false,
    dragging: false,
    lastX: 0,
    pointerId: -1,
    rotation: -14,
    startX: 0,
    velocity: TEAM_AUTO_SPEED,
  });

  useEffect(() => {
    let frameId = 0;
    const interaction = interactionRef.current;

    const spin = () => {
      if (!interaction.dragging) {
        interaction.rotation += interaction.velocity;
        interaction.velocity =
          interaction.velocity * 0.965 + TEAM_AUTO_SPEED * 0.035;
      }

      ringRef.current?.style.setProperty(
        "--team-rotation",
        `${interaction.rotation}deg`,
      );
      frameId = window.requestAnimationFrame(spin);
    };

    spin();

    return () => window.cancelAnimationFrame(frameId);
  }, []);

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    const interaction = interactionRef.current;
    interaction.dragged = false;
    interaction.dragging = true;
    interaction.lastX = event.clientX;
    interaction.pointerId = event.pointerId;
    interaction.startX = event.clientX;
    interaction.velocity = 0;

    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const interaction = interactionRef.current;
    if (!interaction.dragging || interaction.pointerId !== event.pointerId) {
      return;
    }

    const deltaX = event.clientX - interaction.lastX;
    interaction.lastX = event.clientX;
    interaction.rotation += deltaX * TEAM_DRAG_SENSITIVITY;
    interaction.velocity = deltaX * TEAM_VELOCITY_SENSITIVITY;
    interaction.dragged =
      interaction.dragged || Math.abs(event.clientX - interaction.startX) > 6;
  };

  const handlePointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    const interaction = interactionRef.current;
    if (interaction.pointerId !== event.pointerId) return;

    interaction.dragging = false;
    interaction.pointerId = -1;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  const handleCardClick = (member: TeamMember) => {
    if (interactionRef.current.dragged) {
      interactionRef.current.dragged = false;
      return;
    }

    setSelectedMember(member);
  };

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
            Meet The <span className="gradient-text">Team</span>
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
            The creative minds behind METAMOGRAPHIC - crafting motion, design,
            and cinematic experiences together.
          </p>
        </div>

        <div
          className="team-marquee-track"
          onPointerCancel={handlePointerUp}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
        >
          <div className="team-marquee-fade-left" />
          <div className="team-marquee-fade-right" />

          <div className="team-carousel-stage">
            <div
              className="team-carousel-ring"
              ref={ringRef}
              style={
                {
                  "--team-rotation": "-14deg",
                } as CSSProperties
              }
            >
              {teamMembers.map((member, index) => (
                <button
                  className="team-marquee-card"
                  key={member.name}
                  onClick={() => handleCardClick(member)}
                  style={
                    {
                      "--team-angle": `${(360 / teamMembers.length) * index}deg`,
                    } as CSSProperties
                  }
                  type="button"
                >
                  <div className="team-marquee-img-wrap">
                    <Image
                      alt={member.name}
                      className="team-marquee-img"
                      fill
                      sizes="(max-width: 640px) 62vw, (max-width: 1024px) 38vw, 330px"
                      src={member.image}
                    />
                    <div className="team-card-shade" />
                    <div className="team-profile-hover">
                      <span>See full profile</span>
                      <ArrowRight size={15} />
                    </div>
                    <div className="team-marquee-label">
                      <h3 className="team-marquee-name">{member.name}</h3>
                      <p className="team-marquee-role">{member.role}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      {selectedMember && (
        <div 
          className="fixed inset-0 z-[3000] flex items-center justify-center p-4 sm:p-6"
          onClick={() => setSelectedMember(null)}
        >
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md animate-in fade-in duration-300" />
          
          <div 
            className="relative w-full max-w-4xl bg-bg2/90 border border-glass-border rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row animate-in zoom-in-95 fade-in duration-500 ease-out"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Left: Image Section */}
            <div className="w-full md:w-1/2 relative aspect-[4/5] md:aspect-auto h-[400px] md:h-auto overflow-hidden">
               <Image 
                src={selectedMember.image} 
                alt={selectedMember.name} 
                fill 
                className="object-cover"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-bg2 via-transparent to-transparent" />
               <div className="absolute bottom-0 left-0 p-8">
                  <div className="inline-block px-3 py-1 bg-accent/20 border border-accent/40 rounded-full text-accent text-xs font-bold tracking-widest uppercase mb-3">
                    {selectedMember.role}
                  </div>
                  <h2 className="text-4xl md:text-5xl font-black text-white font-heading tracking-tighter leading-none mb-1">
                    {selectedMember.name.split(' ')[0]}<br/>
                    <span className="text-accent">{selectedMember.name.split(' ')[1] || ''}</span>
                  </h2>
               </div>
            </div>

            {/* Right: Content Section */}
            <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center relative bg-bg2">
              <button 
                className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-white/50 hover:text-white hover:bg-white/10 transition-all"
                onClick={() => setSelectedMember(null)}
              >
                <X size={20} />
              </button>

              <div className="mb-8">
                <h4 className="text-white/30 text-xs font-bold tracking-widest uppercase mb-4">Biography</h4>
                <p className="text-white/70 text-lg leading-relaxed font-light italic">
                  &ldquo;{selectedMember.description}&rdquo;
                </p>
              </div>

              <div className="flex flex-col gap-6">
                 <div>
                   <h4 className="text-white/30 text-xs font-bold tracking-widest uppercase mb-4">Connect</h4>
                   <div className="flex gap-4">
                      <a 
                        href={selectedMember.instagram} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 px-5 py-3 bg-white/5 border border-white/10 rounded-xl text-white hover:bg-accent/20 hover:border-accent/40 transition-all group"
                      >
                        <InstagramIcon className="w-[18px] h-[18px] group-hover:scale-110 transition-transform" />
                        <span className="text-sm font-semibold">Instagram</span>
                      </a>
                      <a 
                        href={selectedMember.github} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 px-5 py-3 bg-white/5 border border-white/10 rounded-xl text-white hover:bg-white/10 transition-all group"
                      >
                        <GithubIcon className="w-[18px] h-[18px] group-hover:scale-110 transition-transform" />
                        <span className="text-sm font-semibold">GitHub</span>
                      </a>
                   </div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
