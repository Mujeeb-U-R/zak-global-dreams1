import { createFileRoute } from "@tanstack/react-router";
import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Plane, ShieldCheck, Award, ArrowRight } from "lucide-react";
import { Layout } from "@/components/site/Layout";
import { ApplyButton } from "@/components/site/ApplyButton";
import { SectionHeading } from "@/components/site/SectionHeading";
import { SITE, VISA_CATALOG } from "@/lib/site";
import heroPoster from "@/assets/hero-poster.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ZAK Consultants — Global Visa Solutions" },
      { name: "description", content: SITE.tagline + " Work permits, visit, student and group tour visas processed from Peshawar." },
      { property: "og:title", content: "ZAK Consultants — Global Visa Solutions" },
      { property: "og:description", content: SITE.tagline },
      { property: "og:image", content: "/og-home.jpg" },
    ],
  }),
  component: HomePage,
});

const HERO_VIDEO = "https://videos.pexels.com/video-files/2491284/2491284-uhd_2560_1440_24fps.mp4";

const TITLE_WORDS = ["Your", "Trusted", "Partner", "for", "Global", "Visa", "Solutions"];

function HomePage() {
  return (
    <Layout>
      <Hero />
      <Metrics />
      <Categories />
      <ClosingCTA />
    </Layout>
  );
}

function Hero() {
  return (
    <section className="relative -mt-24 flex min-h-[100svh] items-center overflow-hidden">
      {/* Cinematic video + image fallback */}
      <div className="absolute inset-0 -z-10">
        <img
          src={heroPoster}
          alt="Airplane over golden hour clouds"
          className="absolute inset-0 h-full w-full object-cover animate-ken-burns"
        />
        <video
          src={HERO_VIDEO}
          poster={heroPoster}
          autoPlay muted loop playsInline
          className="absolute inset-0 h-full w-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-950/60 to-slate-950" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-transparent to-slate-950/40" />
      </div>

      <div className="mx-auto w-full max-w-7xl px-6 py-32">
        <motion.p
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="text-[11px] uppercase tracking-[0.5em] text-gold"
        >
          {SITE.legal}
        </motion.p>

        <h1 className="mt-6 max-w-5xl font-display text-5xl leading-[1.02] text-foreground sm:text-7xl md:text-[5.5rem]">
          {TITLE_WORDS.map((w, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ delay: 0.25 + i * 0.08, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
              className="mr-3 inline-block"
            >
              {w === "Global" || w === "Visa" ? (
                <span className="text-gold-gradient italic">{w}</span>
              ) : w}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1, duration: 0.7 }}
          className="mt-8 max-w-2xl font-serif text-xl italic leading-relaxed text-muted-foreground"
        >
          A registered Peshawar-based consultancy delivering meticulous case preparation, legal
          documentation and personal advisory for clients pursuing life beyond borders.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.3, duration: 0.6 }}
          className="mt-10 flex flex-wrap items-center gap-5"
        >
          <ApplyButton label="Apply Now" />
          <a
            href="/portfolio"
            className="group inline-flex items-center gap-2 text-sm uppercase tracking-[0.25em] text-muted-foreground transition hover:text-foreground"
          >
            Explore Routes
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.4em] text-muted-foreground"
      >
        Scroll
      </motion.div>
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
    <section className="relative py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-px overflow-hidden rounded-3xl border border-white/5 glass-panel sm:grid-cols-3">
          {items.map((it, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.7 }}
              className="group relative bg-slate-950/40 p-10 transition hover:bg-slate-900/60"
            >
              <it.icon className="h-7 w-7 text-gold transition-transform duration-500 group-hover:scale-110" />
              <div className="mt-6 flex items-baseline gap-1 font-display text-6xl text-gold-gradient">
                <Counter target={it.value} />
                <span>{it.suffix}</span>
              </div>
              <p className="mt-3 text-sm uppercase tracking-[0.2em] text-muted-foreground">{it.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Counter({ target }: { target: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
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
  }, [inView, target]);
  return <span ref={ref}>{n.toLocaleString()}</span>;
}

function Categories() {
  return (
    <section className="relative py-28">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="Our Practice"
          title={<>Four <span className="text-gold-gradient italic">disciplined</span> routes to the world</>}
          intro="Every case is structured, profiled and prepared to embassy-grade standards by our consultancy team."
        />

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {VISA_CATALOG.map((c, i) => (
            <motion.a
              key={c.category}
              href="/portfolio"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.1, duration: 0.7 }}
              className="group relative overflow-hidden rounded-2xl border border-white/5 glass-panel p-8 transition-all duration-500 hover:-translate-y-1 gold-glow-hover"
            >
              <div className="flex items-center justify-between">
                <p className="text-[10px] uppercase tracking-[0.35em] text-gold">0{i + 1}</p>
                <ArrowRight className="h-5 w-5 text-muted-foreground transition-all duration-500 group-hover:translate-x-1 group-hover:text-gold" />
              </div>
              <h3 className="mt-6 font-display text-3xl text-foreground">{c.category}</h3>
              <p className="mt-3 font-serif italic text-muted-foreground">{c.tagline}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {c.countries.slice(0, 5).map((co) => (
                  <span key={co} className="rounded-full border border-white/10 px-3 py-1 text-xs text-muted-foreground">
                    {co}
                  </span>
                ))}
                {c.countries.length > 5 && (
                  <span className="rounded-full border border-gold/30 px-3 py-1 text-xs text-gold">
                    +{c.countries.length - 5} more
                  </span>
                )}
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

function ClosingCTA() {
  return (
    <section className="relative py-28">
      <div className="mx-auto max-w-5xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative overflow-hidden rounded-3xl border border-gold/20 glass-panel-strong p-12 text-center sm:p-20"
        >
          <div className="absolute inset-x-0 top-0 hairline" />
          <p className="text-[10px] uppercase tracking-[0.4em] text-gold">Begin Today</p>
          <h2 className="mt-5 font-display text-4xl text-foreground sm:text-6xl">
            Your <span className="text-gold-gradient italic">passport</span>, our craft.
          </h2>
          <p className="mx-auto mt-5 max-w-xl font-serif text-lg italic text-muted-foreground">
            A single conversation. A senior consultant. A clear path forward.
          </p>
          <div className="mt-10 flex justify-center"><ApplyButton /></div>
        </motion.div>
      </div>
    </section>
  );
}
