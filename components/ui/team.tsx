"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties, PointerEvent as ReactPointerEvent } from "react";
import Image from "next/image";
import { UserCheck, X, ArrowRight, Mail, Phone, MapPin } from "lucide-react";

// Custom Brand Icons as SVGs
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

const teamMembers = [
  {
    image: "/no.jpeg",
    name: "Arlecchino",
    role: "Creative Director",
    description: "I am a creative director with a strong passion for visual storytelling. I'm especially interested in graphic design, film, and digital media. I enjoy creating meaningful visuals that connect with people and communicate ideas clearly. I'm also adaptable, eager to learn new skills, and comfortable collaborating with different kinds of people in any creative environment.",
    email: "arlecchino@metamo.com",
    phone: "+62 812 3456 7890",
    location: "Jakarta, Indonesia",
    instagram: "https://instagram.com/arlecchino",
    github: "https://github.com",
    education: [
      { school: "Institut Kesenian Jakarta", degree: "Bachelor of Arts in Visual Communication Design", years: "2018 - 2022" },
      { school: "SMK Negeri 1 Jakarta", degree: "Multimedia Track", years: "2015 - 2018" }
    ],
    projectExperience: [
      { title: "Neon City Intro", role: "Creative Director, Producer", detail: "Best in Cinematography Award" },
      { title: "Brand Identity Reel | Commercial", role: "Lead Designer, Researcher", detail: "" }
    ],
    softSkills: ["Collaborative team player", "Fast learner & adaptable", "Attention to detail", "Visual communicator"],
    technicalSkills: ["Graphic Design", "Video Production", "3D Design", "UI/UX"],
    software: ["Ps", "Ai", "Pr", "Ae", "Blender"],
    languages: [{ name: "English", level: 90 }, { name: "Indonesian", level: 100 }]
  },
  {
    image: "/chatte.jpg",
    name: "Usamah Hasanz",
    role: "Motion Director",
    description: "Specializing in the fluid physics of digital movement. Usamah ensures every transition and animation feels natural yet mathematically precise. I thrive in fast-paced environments and love pushing the boundaries of what's possible in motion design.",
    email: "usamah@metamo.com",
    phone: "+62 812 3456 7891",
    location: "Bandung, Indonesia",
    instagram: "https://instagram.com/usamah",
    github: "https://github.com",
    education: [
      { school: "Institut Teknologi Bandung", degree: "Bachelor of Design", years: "2019 - 2023" }
    ],
    projectExperience: [
      { title: "Kinetic Typography Vol.1", role: "Motion Designer", detail: "Featured on Behance" },
      { title: "Tech Startup Explainer", role: "Lead Animator", detail: "" }
    ],
    softSkills: ["Problem solver", "Creative thinker", "Time management", "Leadership"],
    technicalSkills: ["Motion Graphics", "Animation", "Typography", "Compositing"],
    software: ["Ae", "C4D", "Pr", "Figma"],
    languages: [{ name: "English", level: 85 }, { name: "Indonesian", level: 100 }]
  },
  {
    image: "/suf.jpg",
    name: "Yusuf Izzat",
    role: "VFX Artist",
    description: "A master of particle systems and compositing. Yusuf bridges the gap between reality and the digital realm with seamless visual effects. Dedicated to crafting hyper-realistic simulations and mind-bending visual phenomena.",
    email: "yusuf@metamo.com",
    phone: "+62 812 3456 7892",
    location: "Surabaya, Indonesia",
    instagram: "https://instagram.com/yusufizzat",
    github: "https://github.com",
    education: [
      { school: "Bina Nusantara University", degree: "Computer Science", years: "2017 - 2021" }
    ],
    projectExperience: [
      { title: "Sci-Fi Short Film", role: "VFX Supervisor", detail: "Award Winning VFX" },
      { title: "Product Launch Commercial", role: "Compositor", detail: "" }
    ],
    softSkills: ["Analytical thinking", "Patience", "Team collaboration", "Adaptability"],
    technicalSkills: ["Particle Simulation", "Rotoscoping", "Matchmoving", "Color Science"],
    software: ["Nuke", "Houdini", "Maya", "Ae"],
    languages: [{ name: "English", level: 80 }, { name: "Indonesian", level: 100 }]
  },
  {
    image: "/pid.jpg",
    name: "Roofid Rizqu",
    role: "3D Designer",
    description: "Crafting depth and dimension in every frame. Roofid specializes in high-fidelity 3D modeling and lighting that brings static concepts to life. Passionate about procedural generation and rendering optimization.",
    email: "roofid@metamo.com",
    phone: "+62 812 3456 7893",
    location: "Yogyakarta, Indonesia",
    instagram: "https://instagram.com/roofid",
    github: "https://github.com",
    education: [
      { school: "Institut Seni Indonesia", degree: "Fine Arts", years: "2018 - 2022" }
    ],
    projectExperience: [
      { title: "Architectural Viz", role: "3D Generalist", detail: "Client: Grand Estate" },
      { title: "Mascot Character Design", role: "Lead 3D Artist", detail: "" }
    ],
    softSkills: ["Spatial awareness", "Creativity", "Dedication", "Self-motivated"],
    technicalSkills: ["3D Modeling", "Texturing", "Lighting", "Rendering"],
    software: ["Blender", "ZBrush", "Substance", "Unreal"],
    languages: [{ name: "English", level: 75 }, { name: "Indonesian", level: 100 }]
  },
  {
    image: "/raka.jpg",
    name: "Raka Adrel",
    role: "Video Editor",
    description: "Pacing and narrative are Raka's playground. He transforms raw sequences into compelling cinematic stories with precision and rhythm. Experienced in cutting documentaries, music videos, and high-end commercials.",
    email: "raka@metamo.com",
    phone: "+62 812 3456 7894",
    location: "Bali, Indonesia",
    instagram: "https://instagram.com/rakaadrel",
    github: "https://github.com",
    education: [
      { school: "Jakarta Institute of Arts", degree: "Film and Television", years: "2016 - 2020" }
    ],
    projectExperience: [
      { title: "Summer Music Festival", role: "Lead Editor", detail: "2M+ Views on YouTube" },
      { title: "Automotive Brand Campaign", role: "Editor", detail: "" }
    ],
    softSkills: ["Storytelling", "Rhythm & Pacing", "Communication", "Work under pressure"],
    technicalSkills: ["Offline Editing", "Online Editing", "Sound Design", "Color Grading"],
    software: ["Pr", "DaVinci", "FCPX", "Au"],
    languages: [{ name: "English", level: 85 }, { name: "Indonesian", level: 100 }]
  },
  {
    image: "/acel.jpg",
    name: "Marcelino",
    role: "Compositor",
    description: "The final touch of perfection. Marcelino excels at color grading and multi-layer integration to ensure a cohesive and polished final product. His keen eye for detail ensures that every pixel serves the overall vision.",
    email: "marcelino@metamo.com",
    phone: "+62 812 3456 7895",
    location: "Jakarta, Indonesia",
    instagram: "https://instagram.com/marcel",
    github: "https://github.com",
    education: [
      { school: "Universitas Multimedia Nusantara", degree: "Film & Animation", years: "2019 - 2023" }
    ],
    projectExperience: [
      { title: "Cosmetics TVC", role: "Senior Compositor", detail: "National Broadcast" },
      { title: "Music Video - 'Neon'", role: "Colorist", detail: "" }
    ],
    softSkills: ["Critical observation", "Efficiency", "Team player", "Technical troubleshooting"],
    technicalSkills: ["Compositing", "Color Grading", "Keying", "Tracking"],
    software: ["Nuke", "DaVinci", "Ae", "Mocha"],
    languages: [{ name: "English", level: 80 }, { name: "Indonesian", level: 100 }]
  }
];

type TeamMember = (typeof teamMembers)[number];

const TEAM_AUTO_SPEED = -0.09;
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

  useEffect(() => {
    if (!selectedMember) return;

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedMember(null);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedMember]);

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
                  aria-label={`See full profile for ${member.name}`}
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

      {/* Detail Modal - Resume/Notebook Layout */}
      {selectedMember && (
        <div
          aria-modal="true"
          className="profile-modal-shell"
          onClick={() => setSelectedMember(null)}
          role="dialog"
        >
          <div className="profile-modal-backdrop" />

          <article
            aria-label={`${selectedMember.name} full profile`}
            className="profile-resume"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="profile-binder" aria-hidden="true">
              {[...Array(5)].map((_, i) => (
                <div className="profile-binder-hole" key={i}>
                  <span />
                </div>
              ))}
            </div>

            <button
              aria-label="Close full profile"
              className="profile-close"
              onClick={() => setSelectedMember(null)}
              type="button"
            >
              <X size={24} />
            </button>

            <div className="profile-resume-scroll">
              <div className="profile-resume-grid">
                <div className="profile-main-column">
                  <header className="profile-header">
                    <h2>
                      <mark>{selectedMember.name}</mark>
                    </h2>
                    <p>{selectedMember.role}</p>
                  </header>

                  <section className="profile-section">
                    <h3>About Me</h3>
                    <p className="profile-about-text">{selectedMember.description}</p>
                  </section>

                  <div className="profile-contact-strip">
                    <span>
                      <Mail size={15} />
                      {selectedMember.email}
                    </span>
                    <span>
                      <InstagramIcon className="profile-contact-icon" />
                      {selectedMember.instagram.replace("https://", "")}
                    </span>
                    <span>
                      <Phone size={15} />
                      {selectedMember.phone}
                    </span>
                    <span>
                      <MapPin size={15} />
                      {selectedMember.location}
                    </span>
                  </div>

                  <section className="profile-section">
                    <h3>Project Experience</h3>
                    <div className="profile-project-list">
                      {selectedMember.projectExperience.map((project) => (
                        <article className="profile-project" key={project.title}>
                          <h4>
                            <mark>{project.title}</mark>
                          </h4>
                          <div className="profile-bullet-row">
                            <span aria-hidden="true">*</span>
                            <p>
                              <strong>{project.role}</strong>
                              {project.detail ? <small>{project.detail}</small> : null}
                            </p>
                          </div>
                        </article>
                      ))}
                    </div>
                  </section>
                </div>

                <aside className="profile-side-column">
                  <div className="profile-polaroid">
                    <div className="profile-star-pin" aria-hidden="true">
                      <svg
                        fill="#f4f4f4"
                        height="42"
                        viewBox="0 0 24 24"
                        width="42"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                          stroke="#9b9b9b"
                          strokeWidth="1"
                        />
                      </svg>
                    </div>
                    <div className="profile-polaroid-image">
                      <Image
                        alt={selectedMember.name}
                        className="profile-image"
                        fill
                        sizes="(max-width: 768px) 62vw, 360px"
                        src={selectedMember.image}
                      />
                    </div>
                  </div>

                  <section className="profile-section profile-compact-section">
                    <h3>Soft Skills</h3>
                    <ul className="profile-skill-list">
                      {selectedMember.softSkills.map((skill) => (
                        <li key={skill}>
                          <span aria-hidden="true">*</span>
                          {skill}
                        </li>
                      ))}
                    </ul>
                  </section>

                  <section className="profile-section profile-compact-section">
                    <h3>Software</h3>
                    <div className="profile-software-grid">
                      {selectedMember.software.map((software) => (
                        <span key={software}>{software}</span>
                      ))}
                    </div>
                  </section>
                </aside>
              </div>
            </div>
          </article>
        </div>
      )}
    </section>
  );
}
