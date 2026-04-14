"use client";

import { useState, useEffect, useRef } from "react";
import {
  Film,
  Layers,
  Scissors,
  Mail,
  MapPin,
  Phone,
  Play,
  Plus,
  X,
  Upload,
  CheckCircle,

  ArrowRight,
  Sparkles,
} from "lucide-react";

/* ─────────────────────────────────────────
   LOGO (base64 inline — no external fetch)
───────────────────────────────────────── */
const LOGO_SRC =
  "data:image/jpeg;base64,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AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/9k=";

/* ─────────────────────────────────────────
   Scroll-reveal hook
───────────────────────────────────────── */
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return [ref, visible] as const;
}

/* ─────────────────────────────────────────
   NAVBAR
───────────────────────────────────────── */
function Navbar({
  scrolled,
  onContact,
}: {
  scrolled: boolean;
  onContact: () => void;
}) {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <nav className={`navbar${scrolled ? " scrolled" : ""}`}>
      <img
        src={LOGO_SRC}
        alt="Metamographic"
        style={{ height: 40, objectFit: "contain", cursor: "pointer" }}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      />
      <ul className="nav-links">
        {(
          [
            ["Home", "hero"],
            ["Our Works", "works"],
            ["Service", "service"],
            ["About", "philosophy"],
            ["Contact", "contact"],
          ] as [string, string][]
        ).map(([label, id]) => (
          <li key={label}>
            <a className="nav-link" onClick={() => scrollTo(id)}>
              {label}
            </a>
          </li>
        ))}
      </ul>
      <button className="cta-btn" onClick={onContact}>
        Let's Create
      </button>
    </nav>
  );
}

/* ─────────────────────────────────────────
   HERO
───────────────────────────────────────── */
function Hero({ onContact }: { onContact: () => void }) {
  return (
    <div className="hero-section" id="hero">
      <div className="orb orb1" />
      <div className="orb orb2" />
      <div className="orb orb3" />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: 1200,
          margin: "0 auto",
          width: "100%",
        }}
      >
        <div className="hero-badge">
          <Sparkles size={12} style={{ color: "#A78BFA" }} />
          ✦ Motion · Design · Experience
        </div>

        <h1 className="hero-title">
          <span className="hero-t1">WE CRAFT</span>
          <span className="hero-t2">MOTION</span>
          <span className="hero-t3">that moves culture.</span>
        </h1>

        <p className="hero-body">
          Elevating brands through high-end motion graphics, kinetic design, and
          precision video editing. We turn static ideas into fluid cinematic
          experiences.
        </p>

        <div className="hero-btns">
          <button
            className="btn-primary"
            onClick={() =>
              document
                .getElementById("works")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            View Our Work{" "}
            <ArrowRight
              size={16}
              style={{ marginLeft: 6, display: "inline", verticalAlign: "middle" }}
            />
          </button>
          <button className="btn-ghost" onClick={onContact}>
            Start a Project
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        style={{
          position: "absolute",
          bottom: "2rem",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.5rem",
          opacity: 0.4,
          animation: "float 2s ease-in-out infinite",
        }}
      >
        <div
          style={{
            width: 1,
            height: 40,
            background: "linear-gradient(transparent, rgba(139,92,246,0.8))",
          }}
        />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   WORKS / PORTFOLIO
───────────────────────────────────────── */
type VideoItem = {
  id: number;
  title: string;
  category: "Long Shoot" | "Short Shoot";
  src: string | null;
};

const INITIAL_VIDEOS: VideoItem[] = [
  { id: 1, title: "Neon City Intro", category: "Long Shoot", src: null },
  { id: 2, title: "Brand Identity Reel", category: "Short Shoot", src: null },
  { id: 3, title: "Kinetic Typography Vol.1", category: "Long Shoot", src: null },
  { id: 4, title: "Product Launch VFX", category: "Short Shoot", src: null },
  { id: 5, title: "3D Logo Animation", category: "Long Shoot", src: null },
  { id: 6, title: "Cinematic Showreel", category: "Short Shoot", src: null },
];

function Works() {
  const [ref, visible] = useInView();
  const [filter, setFilter] = useState<"All" | "Long Shoot" | "Short Shoot">("All");
  const [videos, setVideos] = useState<VideoItem[]>(INITIAL_VIDEOS);
  const [modal, setModal] = useState(false);
  const [upload, setUpload] = useState<{
    title: string;
    category: "Long Shoot" | "Short Shoot";
    file: File | null;
  }>({ title: "", category: "Long Shoot", file: null });
  const fileRef = useRef<HTMLInputElement>(null);

  const filtered =
    filter === "All" ? videos : videos.filter((v) => v.category === filter);

  const handleUpload = () => {
    if (!upload.file || !upload.title) return;
    const src = URL.createObjectURL(upload.file);
    setVideos((v) => [
      ...v,
      { id: Date.now(), title: upload.title, category: upload.category, src },
    ]);
    setUpload({ title: "", category: "Long Shoot", file: null });
    setModal(false);
  };

  return (
    <section id="works" ref={ref as React.RefObject<HTMLElement>} style={{ paddingTop: "7rem" }}>
      <div className={`fade-up ${visible ? "visible" : ""}`}>
        <div className="section-label">Portfolio</div>
        <h2 className="section-title">
          Our <span className="gradient-text">Works</span>
        </h2>
      </div>

      <div
        className={`filter-tabs fade-up ${visible ? "visible" : ""}`}
        style={{ transitionDelay: "0.15s" }}
      >
        {(["All", "Long Shoot", "Short Shoot"] as const).map((f) => (
          <button
            key={f}
            className={`filter-tab${filter === f ? " active" : ""}`}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="video-grid">
        {filtered.map((v, i) => (
          <div
            key={v.id}
            className={`fade-up ${visible ? "visible" : ""}`}
            style={{ transitionDelay: `${i * 0.08}s` }}
          >
            <div className="video-card">
              <div className="video-thumb">
                {v.src ? (
                  <video
                    controls
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    src={v.src}
                  />
                ) : (
                  <>
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background: "linear-gradient(135deg,#0D1B2A,#1a0d2e)",
                      }}
                    />
                    <div style={{ position: "relative", zIndex: 1 }}>
                      <div className="play-icon">
                        <div className="pulse-ring" />
                        <Play
                          size={20}
                          fill="rgba(139,92,246,0.8)"
                          color="transparent"
                        />
                      </div>
                    </div>
                  </>
                )}
              </div>
              <div className="video-info">
                <div className="video-title">{v.title}</div>
                <div className="video-cat">{v.category}</div>
              </div>
            </div>
          </div>
        ))}

        {/* Add Video card */}
        <div
          className={`fade-up ${visible ? "visible" : ""}`}
          style={{ transitionDelay: `${filtered.length * 0.08}s` }}
        >
          <div className="add-card" onClick={() => setModal(true)}>
            <Plus size={28} />
            <span style={{ fontSize: "0.85rem", fontWeight: 600 }}>Add Video</span>
          </div>
        </div>
      </div>

      {/* Upload Modal */}
      {modal && (
        <div
          className="modal-overlay"
          onClick={(e) => e.target === e.currentTarget && setModal(false)}
        >
          <div className="modal-card">
            <button className="modal-close" onClick={() => setModal(false)}>
              <X size={18} />
            </button>
            <div className="modal-title">Upload Video</div>

            <div className="form-group">
              <label className="form-label">Title</label>
              <input
                className="form-input"
                placeholder="Video title..."
                value={upload.title}
                onChange={(e) =>
                  setUpload((u) => ({ ...u, title: e.target.value }))
                }
              />
            </div>

            <div className="form-group">
              <label className="form-label">Category</label>
              <select
                className="form-input"
                value={upload.category}
                onChange={(e) =>
                  setUpload((u) => ({
                    ...u,
                    category: e.target.value as "Long Shoot" | "Short Shoot",
                  }))
                }
              >
                <option>Long Shoot</option>
                <option>Short Shoot</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Video File</label>
              <input
                ref={fileRef}
                type="file"
                accept="video/*"
                style={{ display: "none" }}
                onChange={(e) =>
                  setUpload((u) => ({ ...u, file: e.target.files?.[0] ?? null }))
                }
              />
              <div
                onClick={() => fileRef.current?.click()}
                style={{
                  padding: "1.5rem",
                  border: "1px dashed rgba(139,92,246,0.4)",
                  borderRadius: 10,
                  textAlign: "center",
                  cursor: "pointer",
                  color: upload.file ? "#22D3EE" : "rgba(248,250,252,0.4)",
                  transition: "all 0.2s",
                }}
              >
                <Upload
                  size={20}
                  style={{ marginBottom: 6, display: "block", margin: "0 auto 6px" }}
                />
                {upload.file ? upload.file.name : "Click to select .mp4 / .webm"}
              </div>
            </div>

            <button
              className="btn-primary"
              style={{ width: "100%" }}
              onClick={handleUpload}
              disabled={!upload.file || !upload.title}
            >
              Upload
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

/* ─────────────────────────────────────────
   SERVICES
───────────────────────────────────────── */
function Services() {
  const [ref, visible] = useInView();

  const cards = [
    {
      num: "01",
      icon: <Film size={22} />,
      name: "2D/3D Motion Design",
      body: "From kinetic typography to complex 3D compositing, we create motion that transcends the ordinary.",
    },
    {
      num: "02",
      icon: <Layers size={22} />,
      name: "Visual Effects (VFX)",
      body: "Seamless compositing, particle systems, and real-time rendering that push the boundaries of digital reality.",
    },
    {
      num: "03",
      icon: <Scissors size={22} />,
      name: "Advanced Video Editing",
      body: "Precision cuts, color grading, and narrative pacing that transforms raw footage into cinematic gold.",
    },
  ];

  return (
    <section id="service" ref={ref as React.RefObject<HTMLElement>}>
      <div
        className={`fade-up ${visible ? "visible" : ""}`}
        style={{ marginBottom: "3rem", textAlign: "center" }}
      >
        <div className="section-label">What We Do</div>
        <h2 className="section-title">
          OUR <span className="gradient-text">EXPERTISE</span>
        </h2>
        <h3
          style={{
            fontFamily: "'Syne',sans-serif",
            fontSize: "clamp(22px,3vw,36px)",
            fontWeight: 700,
            marginBottom: "1rem",
            color: "#F8FAFC",
          }}
        >
          Motion Graphics
          <br />
          <span style={{ color: "rgba(248,250,252,0.5)", fontWeight: 400 }}>
            &amp; Creative Editing
          </span>
        </h3>
        <p
          style={{
            color: "rgba(248,250,252,0.5)",
            maxWidth: 600,
            margin: "0 auto",
            lineHeight: 1.7,
          }}
        >
          We specialize in the intersection of design and movement, creating
          seamless visual narratives through advanced post-production techniques.
        </p>
      </div>

      <div className="service-cards">
        {cards.map((c, i) => (
          <div
            key={c.num}
            className={`service-card fade-up ${visible ? "visible" : ""}`}
            style={{ transitionDelay: `${i * 0.15}s` }}
          >
            <div className="service-num">{c.num}</div>
            <div className="service-icon">{c.icon}</div>
            <div className="service-name">{c.name}</div>
            <div className="service-body">{c.body}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   PHILOSOPHY
───────────────────────────────────────── */
function Philosophy() {
  const [ref, visible] = useInView(0.2);

  return (
    <div className="philosophy-wrap section-full" id="philosophy">
      <div className="philosophy-bg" />
      <div className="philosophy-vert">PHILOSOPHY</div>

      <div
        ref={ref as React.RefObject<HTMLDivElement>}
        style={{ position: "relative", zIndex: 1, textAlign: "center" }}
      >
        <div className={`fade-up ${visible ? "visible" : ""}`}>
          <p className="philosophy-quote">
            "We believe that every pixel should
            <br />
            move with intent and rhythm."
          </p>
        </div>
        <p
          className={`philosophy-body fade-up ${visible ? "visible" : ""}`}
          style={{ transitionDelay: "0.2s" }}
        >
          METAMOGRAPHIC operates at the nexus of technical precision and
          artistic fluidity. We don't just edit clips; we architect motion that
          commands attention and defines modern digital aesthetic.
        </p>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   TEAM
───────────────────────────────────────── */
type TeamMember = {
  name: string;
  role: string;
  initial: string;
  grad: string;
};

const TEAM: TeamMember[] = [
  { name: "Arlecchino",  role: "Creative Director", initial: "A", grad: "linear-gradient(135deg,#7C3AED,#4C1D95)" },
  { name: "Mr. Zayn",   role: "Motion Director",   initial: "Z", grad: "linear-gradient(135deg,#0891B2,#164E63)" },
  { name: "Chatte",     role: "VFX Artist",         initial: "C", grad: "linear-gradient(135deg,#BE185D,#831843)" },
  { name: "Pid",        role: "3D Designer",        initial: "P", grad: "linear-gradient(135deg,#047857,#064E3B)" },
  { name: "Raka Adrel", role: "Video Editor",       initial: "R", grad: "linear-gradient(135deg,#B45309,#78350F)" },
  { name: "Cell's Here",role: "Compositor",         initial: "C", grad: "linear-gradient(135deg,#7C3AED,#0E7490)" },
];

function Team() {
  const [ref, visible] = useInView();
  const [photos, setPhotos] = useState<Record<string, string>>({});
  const inputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  const handlePhotoUpload = (name: string, file: File) => {
    const url = URL.createObjectURL(file);
    setPhotos((p) => ({ ...p, [name]: url }));
  };

  return (
    <section id="team" ref={ref as React.RefObject<HTMLElement>} style={{ paddingBottom: "7rem" }}>
      <div
        className={`fade-up ${visible ? "visible" : ""}`}
        style={{ textAlign: "center", marginBottom: "4rem" }}
      >
        <div className="section-label">The Crew</div>
        <h2 className="section-title">
          MEET THE <span className="gradient-text">TEAM</span>
        </h2>
      </div>

      <div className="team-grid">
        {TEAM.map((m, i) => (
          <div
            key={m.name}
            className={`team-card fade-up ${visible ? "visible" : ""}`}
            style={{ transitionDelay: `${i * 0.1}s` }}
            onClick={() => inputRefs.current[m.name]?.click()}
          >
            <input
              type="file"
              accept="image/*"
              ref={(el) => { inputRefs.current[m.name] = el; }}
              style={{ display: "none" }}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handlePhotoUpload(m.name, file);
              }}
            />
            <div className="team-avatar">
              <div className="team-img-wrap">
                {photos[m.name] ? (
                  <img
                    src={photos[m.name]}
                    alt={m.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                ) : (
                  <div
                    className="team-placeholder"
                    style={{ background: m.grad }}
                  >
                    {m.initial}
                  </div>
                )}
              </div>
              <div className="team-upload-hint">
                <Upload size={20} color="rgba(255,255,255,0.8)" />
              </div>
            </div>
            <div className="team-name">{m.name}</div>
            <div className="team-role">{m.role}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   CONTACT SECTION
───────────────────────────────────────── */
type FormState = { name: string; email: string; service: string; message: string };

function Contact() {
  const [ref, visible] = useInView();
  const [form, setForm] = useState<FormState>({ name: "", email: "", service: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const update = (k: keyof FormState, v: string) =>
    setForm((f) => ({ ...f, [k]: v }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSuccess(true); }, 1800);
  };

  return (
    <div className="contact-wrap" id="contact">
      <div className="contact-grid" ref={ref as React.RefObject<HTMLDivElement>}>
        {/* Left — info */}
        <div className={`fade-up ${visible ? "visible" : ""}`}>
          <div className="section-label">Get In Touch</div>
          <h2
            className="section-title"
            style={{ fontSize: "clamp(40px,6vw,72px)" }}
          >
            LET'S BUILD
            <br />
            <span className="gradient-text">SOMETHING EPIC.</span>
          </h2>

          <div className="contact-info-item">
            <div className="contact-icon"><Mail size={18} /></div>
            <span>hello@metamographic.studio</span>
          </div>
          <div className="contact-info-item">
            <div className="contact-icon"><MapPin size={18} /></div>
            <span>East Java, Indonesia</span>
          </div>
          <div className="contact-info-item">
            <div className="contact-icon"><Phone size={18} /></div>
            <span>+62 812 3456 7890</span>
          </div>

          <div className="social-row">
            {/* Instagram */}
            <button className="social-btn" aria-label="Instagram">
              <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <circle cx="12" cy="12" r="4"/>
                <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
              </svg>
            </button>
            {/* YouTube */}
            <button className="social-btn" aria-label="YouTube">
              <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <path d="M22.54 6.42A2.78 2.78 0 0 0 20.6 4.46C18.88 4 12 4 12 4s-6.88 0-8.6.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.4 19.54C5.12 20 12 20 12 20s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
                <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="currentColor" stroke="none"/>
              </svg>
            </button>
            {/* Behance */}
            <button
              className="social-btn"
              aria-label="Behance"
              style={{ fontSize: 14, fontWeight: 700 }}
            >
              Be
            </button>
          </div>
        </div>

        {/* Right — form */}
        <div
          className={`fade-up ${visible ? "visible" : ""}`}
          style={{ transitionDelay: "0.2s" }}
        >
          <div className="contact-form-card">
            {success ? (
              <div style={{ textAlign: "center", padding: "3rem 2rem" }}>
                <CheckCircle
                  size={56}
                  color="#22D3EE"
                  className="check-anim"
                  style={{ display: "block", margin: "0 auto 1rem" }}
                />
                <h3
                  style={{
                    fontFamily: "'Syne',sans-serif",
                    fontSize: "1.3rem",
                    marginBottom: "0.5rem",
                  }}
                >
                  Message Sent!
                </h3>
                <p style={{ color: "rgba(248,250,252,0.5)" }}>
                  We'll get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={submit}>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "1rem",
                  }}
                >
                  <div className="form-group">
                    <label className="form-label">Name</label>
                    <input
                      className="form-input"
                      placeholder="Your name"
                      value={form.name}
                      onChange={(e) => update("name", e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email</label>
                    <input
                      className="form-input"
                      type="email"
                      placeholder="your@email.com"
                      value={form.email}
                      onChange={(e) => update("email", e.target.value)}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Service</label>
                  <select
                    className="form-input"
                    value={form.service}
                    onChange={(e) => update("service", e.target.value)}
                  >
                    <option value="">Select a service...</option>
                    <option>2D/3D Motion Design</option>
                    <option>Visual Effects (VFX)</option>
                    <option>Advanced Video Editing</option>
                    <option>Brand Identity</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Message</label>
                  <textarea
                    className="form-input"
                    placeholder="Tell us about your project..."
                    value={form.message}
                    onChange={(e) => update("message", e.target.value)}
                  />
                </div>

                <button
                  type="submit"
                  className="btn-primary"
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.5rem",
                  }}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <div className="spinner" /> Sending...
                    </>
                  ) : (
                    <>
                      Send Message <ArrowRight size={16} />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   FOOTER
───────────────────────────────────────── */
function Footer() {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <footer className="footer-bar">
      <div className="footer-inner">
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <img
            src={LOGO_SRC}
            alt="Metamographic"
            style={{ height: 36, objectFit: "contain" }}
          />
          <div>
            <div
              style={{
                fontFamily: "'Syne',sans-serif",
                fontWeight: 800,
                fontSize: "1rem",
                letterSpacing: "0.05em",
              }}
            >
              METAMOGRAPHIC
            </div>
            <div
              style={{
                fontSize: "0.7rem",
                color: "rgba(248,250,252,0.4)",
                maxWidth: 200,
              }}
            >
              Elevating brands through motion.
            </div>
          </div>
        </div>

        <nav className="footer-nav">
          {(
            [
              ["Home", "hero"],
              ["Works", "works"],
              ["Service", "service"],
              ["Philosophy", "philosophy"],
              ["Contact", "contact"],
            ] as [string, string][]
          ).map(([label, id]) => (
            <a key={label} className="footer-link" onClick={() => scrollTo(id)}>
              {label}
            </a>
          ))}
        </nav>

        <p className="footer-copy">© 2025 METAMOGRAPHIC. All Rights Reserved.</p>
      </div>
    </footer>
  );
}

/* ─────────────────────────────────────────
   CONTACT MODAL
───────────────────────────────────────── */
function ContactModal({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState<FormState>({ name: "", email: "", service: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const update = (k: keyof FormState, v: string) =>
    setForm((f) => ({ ...f, [k]: v }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSuccess(true); }, 1500);
  };

  return (
    <div
      className="modal-overlay"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="modal-card" style={{ maxWidth: 560 }}>
        <button className="modal-close" onClick={onClose}>
          <X size={18} />
        </button>

        {success ? (
          <div style={{ textAlign: "center", padding: "2rem" }}>
            <CheckCircle
              size={56}
              color="#22D3EE"
              style={{ display: "block", margin: "0 auto 1rem" }}
            />
            <h3
              style={{
                fontFamily: "'Syne',sans-serif",
                fontSize: "1.3rem",
                marginBottom: "0.5rem",
                color: "#F8FAFC",
              }}
            >
              Message Sent!
            </h3>
            <p style={{ color: "rgba(248,250,252,0.5)" }}>
              We'll reach out shortly.
            </p>
          </div>
        ) : (
          <>
            <div style={{ marginBottom: "1.5rem" }}>
              <h2 className="modal-title" style={{ marginBottom: "0.25rem" }}>
                Start a Project
              </h2>
              <p style={{ color: "rgba(248,250,252,0.45)", fontSize: "0.9rem" }}>
                Tell us about your vision.
              </p>
            </div>

            <form onSubmit={submit}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "1rem",
                }}
              >
                <div className="form-group">
                  <label className="form-label">Name</label>
                  <input
                    className="form-input"
                    placeholder="Your name"
                    value={form.name}
                    onChange={(e) => update("name", e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Email</label>
                  <input
                    className="form-input"
                    type="email"
                    placeholder="your@email.com"
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Service</label>
                <select
                  className="form-input"
                  value={form.service}
                  onChange={(e) => update("service", e.target.value)}
                >
                  <option value="">Select a service...</option>
                  <option>2D/3D Motion Design</option>
                  <option>Visual Effects (VFX)</option>
                  <option>Advanced Video Editing</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Message</label>
                <textarea
                  className="form-input"
                  placeholder="Describe your project..."
                  value={form.message}
                  onChange={(e) => update("message", e.target.value)}
                />
              </div>

              <button
                type="submit"
                className="btn-primary"
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.5rem",
                }}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <div className="spinner" /> Sending...
                  </>
                ) : (
                  <>
                    Send Message <ArrowRight size={16} />
                  </>
                )}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   ROOT PAGE
───────────────────────────────────────── */
export default function Page() {
  const [scrolled, setScrolled] = useState(false);
  const [contactModal, setContactModal] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      style={{
        background: "#0F172A",
        color: "#F8FAFC",
        minHeight: "100vh",
        overflowX: "hidden",
      }}
    >
      <div className="grain-overlay" />
      <Navbar scrolled={scrolled} onContact={() => setContactModal(true)} />
      <Hero onContact={() => setContactModal(true)} />
      <Works />
      <Services />
      <Philosophy />
      <Team />
      <Contact />
      <Footer />
      {contactModal && (
        <ContactModal onClose={() => setContactModal(false)} />
      )}
    </div>
  );
}
