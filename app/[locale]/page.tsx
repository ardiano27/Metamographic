"use client";

import { renderCanvas } from "@/components/ui/canvas";
import { useState, useEffect, useRef } from "react";
import { Typewriter } from "@/components/ui/typewriter";
import TeamSection from "@/components/ui/team";
import ReactLogo3D from "@/components/ui/ReactLogo3D";
import { useRouter, usePathname } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';

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
import { t } from "i18next";

/* ─────────────────────────────────────────
   LOGO — simpan file logo di: public/logo.png
───────────────────────────────────────── */
const LOGO_SRC = "/logo.png";

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
function Navbar({ scrolled, onContact }: { scrolled: boolean; onContact: () => void }) {
  const t = useTranslations('nav'); // ← tambah ini
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (newLocale: string) => {
  const newPath = pathname.replace(/^\/(id|en)/, `/${newLocale}`);
  router.push(newPath);
};


  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <nav className={`navbar${scrolled ? " scrolled" : ""}`}>
      <img src={LOGO_SRC} alt="Metamographic" style={{ height: 40, objectFit: "contain", cursor: "pointer" }}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} />
      <ul className="nav-links">
        {(
          [
            [t('home'), "hero"],       // ← ganti hardcode jadi t(...)
            [t('works'), "works"],
            [t('service'), "service"],
            [t('about'), "philosophy"],
            [t('contact'), "contact"],
          ] as [string, string][]
        ).map(([label, id]) => (
          <li key={label}>
            <a className="nav-link" onClick={() => scrollTo(id)}>{label}</a>
          </li>
        ))}
      </ul>
      <button className="cta-btn" onClick={onContact}>Let's Create</button>
      <div style={{ display: 'flex', gap: '0.5rem' }}>
  <button
    onClick={() => switchLocale('id')}
    style={{ opacity: locale === 'id' ? 1 : 0.4, background: 'none', border: 'none', color: '#F8FAFC', cursor: 'pointer', fontWeight: 700 }}
  >
    🇮🇩
  </button>
  <button
    onClick={() => switchLocale('en')}
    style={{ opacity: locale === 'en' ? 1 : 0.4, background: 'none', border: 'none', color: '#F8FAFC', cursor: 'pointer', fontWeight: 700 }}
  >
    🇬🇧
  </button>
</div>
    </nav>
  );
}
/* ─────────────────────────────────────────
   HERO
───────────────────────────────────────── */
function Hero({ onContact }: { onContact: () => void }) {
  const t = useTranslations('hero'); // ← tambah ini
  // ← TAMBAHKAN useEffect ini
  useEffect(() => {
    renderCanvas();
    // Cleanup: stop canvas saat component unmount
    return () => {
      const canvas = document.getElementById("canvas") as HTMLCanvasElement;
      if (canvas) {
        const ctx = canvas.getContext("2d") as any;
        if (ctx) ctx.running = false;
      }
    };
  }, []);

  return (
  <div className="hero-section" id="hero">
    <div className="orb orb1" />
    <div className="orb orb2" />
    <div className="orb orb3" />

    <div
      style={{
        position: "relative",
        zIndex: 1,
        maxWidth: 1300,
        margin: "0 auto",
        width: "100%",
        display: "flex",          
        alignItems: "center",     
        justifyContent: "space-between", 
      }}
    >
      {}
      <div style={{ flex: 1 }}>
        <div className="hero-badge">
          <Sparkles size={12} style={{ color: "#A78BFA" }} />
          ✦ {t('badge')}
        </div>

        <h1 className="hero-title">
           <span className="hero-t1">{t('t1')}</span>   {/* ← ganti */}
            <span className="hero-t2">{t('t2')}</span>
            <span className="hero-t3">{t('t3')}</span>
        </h1>

           <p className="hero-body">{t('body')}
          {/* Elevating brands through high-end motion graphics, kinetic design,
          and precision video editing. We turn static ideas into fluid cinematic
          experiences. */}
        </p>

        <div className="hero-btns">
          <button
            className="btn-primary"
            onClick={() =>
              document.getElementById("works")?.scrollIntoView({ behavior: "smooth" })
            }
          >
            {t('btnWork')}{" "}
            <ArrowRight size={16} style={{ marginLeft: 6, display: "inline", verticalAlign: "middle" }} />
          </button>
          <button className="btn-ghost" onClick={onContact}>
            {t('btnStart')} 
          </button>
        </div>
      </div>

      {/* Kolom kanan — logo React 3D ← TAMBAHAN BARU */}
      <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
        <ReactLogo3D size={650} />
      </div>
    </div>

    {/* Scroll indicator — tetap sama */}
    <div
      style={{
        position: "absolute",
        bottom: "2rem",
        left: "50%",
        transform: "translateX(-50%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        opacity: 0.4,
        animation: "float 2s ease-in-out infinite",
      }}
    >
      <div
        style={{
          width: 1,
          height: 40,
          background: "linear-gradient(transparent, rgba(139,92,246,0.8))",
          borderRadius: 50,
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
  const t = useTranslations('portofolio');
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
         {t('heading1')} <span className="gradient-text">{t('heading2')}</span>
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
                <option>{t('longshoot')}</option>
                <option>{t('shortshoot')}</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">{t('videofile')}</label>
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
  const t = useTranslations('services');
  const cards = [
    {
      num: "01",
      icon: <Film size={22} />,
      name: "2D/3D Motion Design",
      body: t('bdy1'),
    },
    {
      num: "02",
      icon: <Layers size={22} />,
      name: "Visual Effects (VFX)",
      body: t('bdy2'),
    },
    {
      num: "03",
      icon: <Scissors size={22} />,
      name: "Advanced Video Editing",
      body: t('bdy3'),
    },
  ];

  return (
    <section id="service" ref={ref as React.RefObject<HTMLElement>}>
      <div
        className={`fade-up ${visible ? "visible" : ""}`}
        style={{ marginBottom: "3rem", textAlign: "center" }}
      >
        <div className="section-label">{t('label')}</div>
        <h2 className="section-title">
          {t('title')} <span className="gradient-text"> {t('title2')} </span>
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
         {t('text')}
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
  const t = useTranslations('philosophy');
  const words = t.raw('words') as string[];

  return (
    <div className="philosophy-wrap section-full" id="philosophy">
      <div className="philosophy-bg" />
      <div className="philosophy-vert"> {t('philotext')} </div>

      <div
        ref={ref as React.RefObject<HTMLDivElement>}
        style={{ position: "relative", zIndex: 1, textAlign: "center" }}
      >
        <div className={`fade-up ${visible ? "visible" : ""}`}>
          <p className="philosophy-quote">
            <Typewriter
              words={words}
              speed={55}
              delayBetweenWords={2800}
              cursor={true}
              cursorChar="|"
            />
          </p>
        </div>
        <p
          className={`philosophy-body fade-up ${visible ? "visible" : ""}`}
          style={{ transitionDelay: "0.2s" }}
        >
          {t('t1')}
        </p>
      </div>
    </div>
  );
}

/* Team section is now imported from @/components/ui/team */

/* ─────────────────────────────────────────
   CONTACT SECTION
───────────────────────────────────────── */
type FormState = { name: string; email: string; service: string; message: string };

function Contact() {
  const [ref, visible] = useInView();
  const [form, setForm] = useState<FormState>({ name: "", email: "", service: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const t = useTranslations('contact');

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
          <div className="section-label"> {t('label')} </div>
          <h2
            className="section-title"
            style={{ fontSize: "clamp(40px,6vw,72px)" }}
          >
            {t('section-title')}
            <br />
            <span className="gradient-text"> {t('something-epic')} </span>
          </h2>

          <div className="contact-info-item">
            <div className="contact-icon"><Mail size={18} /></div>
            <span>hello@metamographic.studio</span>
          </div>
          <div className="contact-info-item">
            <div className="contact-icon"><MapPin size={18} /></div>
            <span>{t('loc')}</span>
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
                  {t('message-sent')}
                </h3>
                <p style={{ color: "rgba(248,250,252,0.5)" }}>
                  {t('notif')}
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
                    <label className="form-label">{t('form-label-name')}</label>
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
                  <label className="form-label">{t('service')}</label>
                  <select
                    className="form-input"
                    value={form.service}
                    onChange={(e) => update("service", e.target.value)}
                  >
                    <option value="">{t('service-selection')}</option>
                    <option>2D/3D Motion Design</option>
                    <option>Visual Effects (VFX)</option>
                    <option>Advanced Video Editing</option>
                    <option>Brand Identity</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">{t('messages')}</label>
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
  const [scrolled, setScrolled]       = useState(false);
  const [contactModal, setContactModal] = useState(false);
  const t = useTranslations('footer');

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
      <Hero   onContact={() => setContactModal(true)} />
      <Works />
      <Services />
      <Philosophy />
      <TeamSection />
      <Contact />
      <Footer />

      {contactModal && (
        <ContactModal onClose={() => setContactModal(false)} />
      )}

      {/* ← TAMBAHKAN INI — Canvas cursor trail, full screen fixed */}
      <canvas
        id="canvas"
        aria-hidden="true"
      />
    </div>
  );
}
