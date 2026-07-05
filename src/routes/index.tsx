"use client";

import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Plane, ShieldCheck, Award, ArrowRight, Star, Quote, Shield, X } from "lucide-react";
import { Layout } from "@/components/site/Layout";
import { ApplyButton } from "@/components/site/ApplyButton";
import { SectionHeading } from "@/components/site/SectionHeading";
import { SITE, VISA_CATALOG } from "@/lib/site";
import heroPoster from "@/assets/hero-poster.jpg";
import ctaBg from "@/assets/cta-bg.jpg.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ZAK Consultants — Global Visa Solutions" },
      { property: "og:image", content: SITE.logo },
      { name: "description", content: SITE.tagline + " Work permits, visit, student and group tour visas processed from Peshawar." },
      { property: "og:title", content: "ZAK Consultants — Global Visa Solutions" },
      { property: "og:description", content: SITE.tagline },
    ],
  }),
  component: HomePage,
});

const TITLE_WORDS = ["Your", "Trusted", "Partner", "for", "Global", "Visa", "Solutions"];

const HOMEPAGE_REVIEWS = [
  { name: "Hamza R.", route: "Turkey Work Permit", text: "From profiling to embassy submission, every step felt deliberate. Approval came within the timeline they predicted. Their precision-engineered case strategy saved us months of rework." },
  { name: "Sana A.", route: "U.K Student Visa", text: "They restructured my SOP and financials in two evenings. The visa landed first attempt. Exceptional attention to small documentation metrics." },
  { name: "Bilal K.", route: "Schengen Visit Visa", text: "Calm, professional, and brutally precise with documentation. Worth every minute of the consultation. They won't file unless your metrics clear the core threshold safely." },
  { name: "Zainab M.", route: "Canada Student Route", text: "The cross-checking system they used for my study gap explanation made all the difference. Outstanding communication loops from start to finish." },
  { name: "Asif J.", route: "Kyrgyzstan Work permit", text: "They cleared up all the regulatory confusion regarding our corporate group paperwork. Highly transparent and reliable asset tracking." },
  { name: "Maryam N.", route: "Schengen Tourist Visa", text: "Honest advice on bank statement timelines. They won't file unless they know your matrix matches the required embassy thresholds perfectly." },
];

const HOME_NEWS_IMAGES = [
  "/news/News8.jpeg",
  "/news/News9.jpeg",
  "/news/News1.jpeg",
  "/news/News2.jpeg",
  "/news/News3.jpeg",
  "/news/News4.jpeg",
  "/news/News5.jpeg",
  "/news/News6.jpeg",
  "/news/News7.jpeg"
  
];

function HomePage() {
  return (
    <Layout>
      <div className="relative min-h-screen w-full overflow-hidden">
        <Hero />
        <Metrics />
        <CompanyVision />
        <NewsSlideshow />
        <Categories />
        <CEOQuote />
        <ClientTicker />
        <ClosingCTA />
      </div>
    </Layout>
  );
}

function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((err) => {
        console.log("Autoplay optimization caught restriction:", err);
      });
    }
  }, []);

  return (
    <section className="relative -mt-24 flex min-h-[100svh] items-center justify-center overflow-hidden bg-[#030712]">
      <div className="absolute inset-0 z-0 select-none pointer-events-none">
        <video
          ref={videoRef}
          src="/hero-video.mp4"
          poster={heroPoster}
          autoPlay
          muted
          loop
          playsInline
          className="h-full w-full object-cover scale-[1.02] brightness-[0.7]"
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(3,7,18,0.35)_0%,rgba(3,7,18,0.85)_85%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/20 via-slate-950/40 to-[#030712]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-5xl px-6 pt-36 pb-28 text-center flex flex-col items-center justify-between min-h-[100svh]">
        <div className="hidden md:block h-2" />

        <div className="flex flex-col items-center w-full mt-auto mb-auto">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md text-[10px] font-medium tracking-[0.35em] uppercase text-amber-400/90 shadow-[0_4px_20px_rgba(0,0,0,0.4)] mb-8"
          >
            <Shield className="h-3.5 w-3.5 text-amber-400 fill-amber-400/10 stroke-[1.8]" />
            <span>{SITE.legal}</span>
          </motion.div>

          <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.05] text-white max-w-4xl">
            {TITLE_WORDS.map((w, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ delay: 0.15 + i * 0.06, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                className="mr-3 inline-block"
              >
                {w === "Global" || w === "Visa" || w === "Solutions" ? (
                  <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500 bg-clip-text text-transparent italic font-serif font-normal tracking-normal drop-shadow-sm px-0.5">
                    {w}
                  </span>
                ) : w}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 max-w-2xl font-sans text-base sm:text-lg text-slate-300 leading-relaxed font-light"
          >
            A registered Peshawar-based consultancy delivering meticulous case preparation, legal
            documentation and personal advisory for clients pursuing life beyond borders.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 w-full sm:w-auto"
          >
            <ApplyButton label="Get Started" />
            
            <div className="flex items-center justify-center gap-6 sm:pl-2 w-full sm:w-auto">
              <a
                href="/portfolio"
                className="group inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-slate-300 hover:text-white transition-colors duration-300 whitespace-nowrap"
              >
                Explore Routes
                <ArrowRight className="h-4 w-4 text-amber-400 transition-transform duration-300 transform group-hover:translate-x-1" />
              </a>

              <span className="h-4 w-px bg-white/10 hidden sm:inline" />

              <a
                href="/faq"
                className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-400/80 hover:text-amber-400 hover:underline underline-offset-4 transition-all duration-300 whitespace-nowrap"
              >
                Read FAQs
              </a>
            </div>
          </motion.div>
        </div>

        {/* Dynamic Spacing Configuration for Desktop and Phone Viewports */}
        <div className="w-full mt-16 sm:mt-20 flex flex-col items-center gap-3 pointer-events-none select-none">
          <span className="text-[9px] font-mono tracking-[0.4em] uppercase text-slate-500">Scroll</span>
          <div className="h-12 w-px bg-gradient-to-b from-white/30 via-white/10 to-transparent" />
        </div>
      </div>
    </section>
  );
}

{/* --- INTERACTIVE PAPUP SLIDESHOW MODULE --- */}
function NewsSlideshow() {
  const [activeImage, setActiveImage] = useState<string | null>(null);

  // Freeze device background document layers when lightbox mounts
  useEffect(() => {
    if (activeImage) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [activeImage]);

  return (
    <section className="relative py-16 bg-transparent overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 relative z-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-10">
          <div>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl font-bold text-stone-900">
              Latest <span className="text-gold-gradient italic font-normal">Updates</span> and News
            </h2>
          </div>
          
          <Link
            to="/news"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-400 to-amber-600 px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-slate-950 shadow-md transition-transform hover:scale-[1.03] active:scale-[0.98]"
          >
            Explore All News
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="relative w-full overflow-hidden py-4 select-none">
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#fdfbf7] via-[#fdfbf7]/40 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#fdfbf7] via-[#fdfbf7]/40 to-transparent z-10 pointer-events-none" />

          {/* 🛠️ ANIMATION CHANGER: Injected activeImage parameter toggle to pause marquee animation runtime gracefully */}
          <div 
            className={`flex w-max gap-6 animate-marquee ${
              activeImage ? "animate-play-paused" : "animate-play-running"
            }`}
          >
            {[...HOME_NEWS_IMAGES, ...HOME_NEWS_IMAGES].map((imgSrc, index) => (
              <div
                key={index}
                onClick={() => setActiveImage(imgSrc)}
                className="w-[280px] sm:w-[360px] h-[240px] sm:h-[300px] bg-white rounded-2xl border border-stone-200/80 p-3 shadow-[0_10px_30px_rgba(27,24,17,0.03)] flex items-center justify-center overflow-hidden cursor-zoom-in active:scale-[0.98] transition-transform duration-200"
              >
                <img
                  src={imgSrc}
                  alt={`ZAK News Flash Asset ${index + 1}`}
                  className="max-h-full max-w-full object-contain rounded-lg transition-transform duration-300 hover:scale-[1.02]"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* --- PREMIUM FULLSCREEN LIGHTBOX LIGHTBOX FOR MOBILE AND DESKTOP --- */}
      <AnimatePresence>
        {activeImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveImage(null)}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950/95 p-4 backdrop-blur-sm cursor-zoom-out select-none"
          >
            {/* Top Close Control Rim */}
            <div className="absolute top-6 right-6 z-50">
              <button 
                onClick={(e) => { e.stopPropagation(); setActiveImage(null); }}
                className="p-3 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:text-gold transition-all duration-300 shadow-xl"
              >
                <X className="h-5 w-5 stroke-[2]" />
              </button>
            </div>

            {/* Img Graphic Content Panel Frame */}
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-3xl max-h-[80vh] overflow-hidden rounded-2xl border border-white/10 bg-slate-900 shadow-[0_25px_70px_-15px_rgba(0,0,0,0.9)] flex items-center justify-center cursor-default"
            >
              <img
                src={activeImage}
                alt="Fullscreen News Update Banner"
                className="max-w-full max-h-[80vh] object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function Metrics() {
  const items = [
    { icon: Award, value: 99, suffix: "%", label: "Visa Approval Rate" },
    { icon: Plane, value: 2000, suffix: "+", label: "Successful Applications" },
    { icon: ShieldCheck, value: 1, suffix: "", label: "Registered Pvt. Ltd. Firm" },
  ];
  return (
    <section className="relative py-28 overflow-hidden bg-transparent pb-12">
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#b8893903_1px,transparent_1px),linear-gradient(to_bottom,#b8893903_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
      <div className="absolute -left-20 top-1/2 -translate-y-1/2 w-96 h-96 bg-[#b88939]/[0.03] rounded-full filter blur-3xl z-0 pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="grid gap-px overflow-hidden rounded-3xl border border-white/5 glass-panel sm:grid-cols-3"
        >
          {items.map((it, i) => (
            <div
              key={i}
              className="group relative bg-slate-950/40 p-10 transition hover:bg-slate-900/60"
            >
              <it.icon className="h-7 w-7 text-gold transition-transform duration-500 group-hover:scale-110" />
              <div className="mt-6 flex items-baseline gap-1 font-display text-6xl text-gold-gradient">
                <Counter target={it.value} />
                <span>{it.suffix}</span>
              </div>
              <p className="mt-3 text-sm uppercase tracking-[0.2em] text-muted-foreground">{it.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function Counter({ target }: { target: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let raf = 0;
    const start = performance.now();
    const dur = 1600;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(eased * target));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [isInView, target]);

  return <span ref={ref}>{n.toLocaleString()}</span>;
}

function CompanyVision() {
  return (
    <section className="relative py-20 overflow-hidden bg-transparent">
      <div className="mx-auto max-w-5xl px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center"
        >
          <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-gold mb-4">Our Vision</span>
          <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-gold max-w-3xl leading-tight">
            Architecting flawless pathways for <span className="text-gold-gradient italic font-normal">global mobility</span>.
          </h2>
          <p className="mt-6 max-w-2xl font-sans text-base sm:text-lg text-slate-800 leading-relaxed font-dark">
            At ZAK Consultants, our vision is to simplify international exploration through peerless compliance modeling and strategic asset assembly. We map legal ecosystems deliberately, ensuring your visa frameworks process safely through every global border threshold.
          </p>
          <div className="mt-10">
            <Link
              to="/about"
              className="group inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-amber-400 to-amber-600 px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] text-slate-950 shadow-md transition-transform hover:scale-[1.03] active:scale-[0.98]"
            >
              Learn more about us
              <ArrowRight className="h-4 w-4 text-slate-950 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Categories() {
  return (
    <section className="relative py-28 overflow-hidden bg-transparent pb-16">
      <div className="absolute inset-x-0 top-0 -z-10 h-[600px] w-full opacity-20 pointer-events-none">
        <svg width="100%" height="100%" viewBox="0 0 1440 600" fill="none" className="w-full h-full" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M-100 150C300 450 650 -50 1100 250C1350 400 1500 200 1600 100" stroke="#b88939" strokeWidth="1.2" strokeDasharray="6 6" />
          <path d="M-50 220C350 520 700 20 1150 320C1400 470 1550 270 1650 170" stroke="#b88939" strokeWidth="0.5" opacity="0.4" />
        </svg>
      </div>

      <div className="absolute right-[-10%] bottom-[5%] w-[400px] h-[400px] rounded-full border border-[#b88939]/[0.05] pointer-events-none -z-10" />

      <div className="mx-auto max-w-7xl px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
        >
          <SectionHeading
            eyebrow="Our Practice"
            title={
              <span 
                className="block bg-cover bg-center bg-no-repeat rounded-2xl px-6 py-4 border border-slate-200/60 shadow-md overflow-hidden my-2 bg-white/40 backdrop-blur-sm"
                style={{ backgroundImage: "url('/title_bg.jpg')" }}
              >
                <span className="block text-slate-900 text-3xl md:text-5xl font-light tracking-tight leading-tight">
                  Four <span className="text-[#b88939] italic font-normal">disciplined</span> routes to the world
                </span>
              </span>
            }
            intro="Every case is structured, profiled and prepared to embassy-grade standards by our consultancy team."
          />
        </motion.div>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {VISA_CATALOG.map((c, i) => {
            const localBgImages = [
              "/Work_Permit_pic.jpg", 
              "/Visit_Visa_pic.jpg", 
              "/Group_Tour_pic.jpg", 
              "/Student_Visa_pic.jpg",  
            ];

            const currentBg = localBgImages[i] || localBgImages[0];

            return (
              <motion.a
                key={c.category}
                href="/portfolio"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: i * 0.1, duration: 0.7, ease: "easeOut" }}
                
                whileHover={{ y: -4, scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                
                className="group relative overflow-hidden rounded-[28px] border border-white/10 p-8 transition-all duration-500 ease-out hover:shadow-[0_20px_50px_rgba(184,137,57,0.15)] flex flex-col justify-between min-h-[260px]"
              >
                <div className="absolute inset-0 -z-20 h-full w-full overflow-hidden">
                  <img 
                    src={currentBg} 
                    alt="" 
                    style={{ opacity: 0.65 }}
                    className="h-full w-full object-cover transition-opacity duration-500 group-hover:!opacity-85 transform scale-100 group-hover:scale-105 duration-700" 
                  />
                </div>
                
                <div className="absolute inset-0 -z-10 bg-gradient-to-br from-slate-950/70 via-slate-950/30 to-slate-950/90 transition-colors duration-500 group-hover:from-slate-950/60 group-hover:via-slate-950/20 group-hover:to-slate-950/85" />

                <div>
                  <div className="flex items-center justify-between">
                    <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-slate-400 group-hover:text-white/70 transition-colors duration-300">
                      0{i + 1}
                    </p>
                    <div className="p-2 rounded-full border border-white/10 bg-slate-900/40 text-gold transition-all duration-500 transform group-hover:rotate-45 group-hover:bg-gold group-hover:text-slate-950 group-hover:border-transparent">
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </div>
                  
                  <h3 className="mt-6 font-display text-4xl font-bold text-gold drop-shadow-[0_2px_5px_rgba(0,0,0,0.7)]">
                    {c.category}
                  </h3>
                  <p className="mt-3 font-serif italic text-base font-normal text-slate-100 group-hover:text-white transition-colors duration-300 leading-relaxed drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)]">
                    {c.tagline}
                  </p>
                </div>

                <div className="mt-8 flex flex-wrap gap-2 items-center pt-4 border-t border-white/10">
                  {c.countries.slice(0, 5).map((co) => (
                    <span 
                      key={co} 
                      className="rounded-full bg-slate-950/80 text-slate-300 border border-white/5 px-3 py-1 text-xs group-hover:bg-slate-900 group-hover:text-white group-hover:border-white/10 transition-all duration-300"
                    >
                      {co}
                    </span>
                  ))}
                  {c.countries.length > 5 && (
                    <span className="rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 px-3 py-1 text-xs font-medium group-hover:bg-gold group-hover:text-slate-950 transition-all duration-300">
                      +{c.countries.length - 5} more
                    </span>
                  )}
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function CEOQuote() {
  return (
    <section className="relative py-16 bg-transparent">
      <div className="mx-auto max-w-4xl px-6 pt-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-[32px] border border-stone-200/80 bg-[#fdfbf7] p-8 sm:p-14 pt-36 md:pt-14 shadow-[0_20px_50px_rgba(27,24,17,0.06)] flex flex-col md:flex-row items-start gap-8 overflow-visible min-h-[260px] transition-shadow duration-300 hover:shadow-[0_30px_60px_rgba(27,24,17,0.1)]"
        >
          <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-amber-500/[0.02] rounded-full filter blur-2xl pointer-events-none" />
          
          <div className="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none select-none perspective-1000">
            <motion.div 
              transition={{ 
                rotateY: { duration: 25, ease: "linear", repeat: Infinity }
              }}
              className="w-36 h-36 flex items-center justify-center transform-gpu preserve-3d"
            >
              <div className="relative w-full h-full flex items-center justify-center bg-transparent p-2">
                <img 
                  src={SITE.logo}
                  alt="ZAK Consultants Large Transparent Logo"
                  className="max-h-full max-w-full object-contain filter drop-shadow-[0_10px_15px_rgba(0,0,0,0.25)]"
                />
              </div>
            </motion.div>
          </div>

          <div className="shrink-0 w-2 md:w-4 h-px" />

          <div className="flex-1 text-center md:text-left relative z-10 pl-6 md:pl-10 mt-6 md:mt-0">
            <p className="font-serif text-lg sm:text-xl md:text-2xl italic leading-relaxed text-stone-800 whitespace-normal">
              "Borders aren't barriers; they are structural thresholds waiting for precise preparation. Legitimate global mapping is built on legal precision, not loose chance."
            </p>
            
            <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-center md:justify-start gap-2 text-sm border-t border-stone-200/60 pt-4">
              <span className="text-amber-700 font-display font-bold text-base tracking-wide">
                Ziyad Khan
              </span>
              <span className="text-stone-400 hidden sm:inline">•</span>
              <span className="text-xs font-mono uppercase tracking-[0.15em] text-stone-500 font-medium">
                Chief Executive Officer
              </span>
            </div>
          </div>

          <div className="absolute top-6 right-6 h-7 w-7 bg-amber-600/10 text-amber-700 rounded-full flex items-center justify-center pointer-events-none select-none">
            <Quote className="h-3.5 w-3.5 fill-current" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ClientTicker() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const isMobile = window.matchMedia("(max-w: 640px)").matches;
    const speedTimeout = isMobile ? 3500 : 6000;

    const timer = setInterval(() => {
      next();
    }, speedTimeout);
    return () => clearInterval(timer);
  }, [index]);

  const next = () => {
    setIndex((prev) => (prev + 1) % HOMEPAGE_REVIEWS.length);
  };

  const prev = () => {
    setIndex((prev) => (prev - 1 + HOMEPAGE_REVIEWS.length) % HOMEPAGE_REVIEWS.length);
  };

  return (
    <section className="relative py-24 bg-transparent border-t border-b border-white/5">
      <div className="mx-auto max-w-7xl px-6 mb-12">
        <SectionHeading
          eyebrow="Reviews"
          title={<>Client <span className="text-gold-gradient italic">Trust</span></>}
        />
      </div>

      <div className="relative w-full px-6 overflow-visible">
        <div className="mx-auto max-w-7xl overflow-visible">
          <div className="relative w-full overflow-visible">
            <motion.div
              animate={{ x: `-${index * 100}%` }}
              transition={{ type: "spring", stiffness: 220, damping: 26 }}
              className="flex w-full will-change-transform overflow-visible"
            >
              {HOMEPAGE_REVIEWS.map((r, i) => (
                <div
                  key={i}
                  className="w-full shrink-0 pr-4 sm:pr-8 overflow-visible"
                >
                  <div className="w-full max-w-4xl mx-auto rounded-3xl bg-[#fdfbf7] border border-stone-200/80 p-8 sm:p-14 shadow-[0_20px_50px_rgba(27,24,17,0.08)] flex flex-col justify-between min-h-[280px] text-slate-900 select-none transition-shadow duration-300 hover:shadow-[0_30px_60px_rgba(27,24,17,0.12)]">
                    <div>
                      <Quote className="h-9 w-9 text-amber-600/15 stroke-[1.2]" />
                      <p className="mt-5 font-serif text-base sm:text-lg leading-relaxed italic text-stone-800 whitespace-normal">
                        "{r.text}"
                      </p>
                    </div>
                    
                    <div className="mt-10 flex flex-col sm:flex-row sm:items-center justify-between gap-5 pt-8 border-t border-stone-200/60 text-sm">
                      <div>
                        <div className="text-stone-900 font-display font-bold text-base tracking-tight">{r.name}</div>
                        <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-amber-700 font-medium mt-1">{r.route}</div>
                      </div>
                      <div className="flex gap-0.5 shrink-0 bg-stone-100 p-2 rounded-full border border-stone-200/50 self-start sm:self-auto shadow-inner">
                        {Array.from({ length: 5 }).map((_, j) => (
                          <Star key={j} className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 max-w-7xl mx-auto px-6 z-20 relative">
        <div className="flex items-center gap-3 select-none">
          <motion.button
            whileHover={{ scale: 1.05, borderColor: "rgba(180, 83, 9, 0.4)" }}
            whileTap={{ scale: 0.95 }}
            onClick={prev}
            className="h-11 w-11 rounded-full border border-stone-300/80 bg-stone-100/20 text-stone-700 hover:text-amber-700 hover:bg-[#fdfbf7] flex items-center justify-center transition-all duration-300 shadow-[0_2px_10px_rgba(0,0,0,0.02)]"
            aria-label="Previous review"
          >
            <ArrowRight className="h-4 w-4 rotate-180 stroke-[1.3]" />
          </motion.button>

          <div className="flex gap-2 px-2">
            {HOMEPAGE_REVIEWS.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`h-1.5 transition-all duration-300 rounded-full ${
                  index === i ? "w-6 bg-amber-600" : "w-1.5 bg-stone-300 hover:bg-stone-400"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.05, borderColor: "rgba(180, 83, 9, 0.4)" }}
            whileTap={{ scale: 0.95 }}
            onClick={next}
            className="h-11 w-11 rounded-full border border-stone-300/80 bg-stone-100/20 text-stone-700 hover:text-amber-700 hover:bg-[#fdfbf7] flex items-center justify-center transition-all duration-300 shadow-[0_2px_10px_rgba(0,0,0,0.02)]"
            aria-label="Next review"
          >
            <ArrowRight className="h-4 w-4 stroke-[1.3]" />
          </motion.button>
        </div>
      </div>
    </section>
  );
}

function ClosingCTA() {
  const bgUrl = (ctaBg as any)?.url || "";
  
  return (
    <section className="relative py-28">
      <div className="mx-auto max-w-5xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.8 }}
          className="relative overflow-hidden rounded-3xl border border-gold/20 glass-panel-strong p-12 text-center sm:p-20"
        >
          {bgUrl && (
            <img
              src={bgUrl}
              alt=""
              aria-hidden="true"
              width={1920}
              height={1080}
              loading="lazy"
              className="absolute inset-0 -z-10 h-full w-full object-cover opacity-25"
            />
          )}
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-slate-950/70 via-slate-950/80 to-slate-950/90" />
          <div className="absolute inset-x-0 top-0 hairline" />
          <p className="text-[10px] uppercase tracking-[0.4em] text-gold">Begin Today</p>
          <h2 className="mt-5 font-display text-4xl text-foreground sm:text-6xl">
            Your <span className="text-gold-gradient italic">passport</span>, our craft.
          </h2>
          <p className="mx-auto mt-5 max-w-xl font-serif text-lg italic text-muted-foreground">
            A single conversation. A senior consultant. A clear path forward.
          </p>
          
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <ApplyButton />
            <a
              href="/faq"
              className="rounded-full border border-white/10 bg-white/[0.02] hover:bg-white/[0.06] hover:border-white/20 px-6 py-3.5 text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-all duration-300"
            >
              Read Portal FAQs
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}