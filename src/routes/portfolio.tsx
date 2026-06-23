import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, CalendarDays, ArrowUpRight } from "lucide-react";
import { Layout } from "@/components/site/Layout";
import { SectionHeading } from "@/components/site/SectionHeading";
import { useApplyModal } from "@/components/site/ApplyModalProvider";
import { VISA_CATALOG, COUNTRY_FLAG } from "@/lib/site";
import portfolioHero from "@/assets/portfolio-hero.jpg.asset.json";

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title: "Visa Portfolio & Routes — ZAK Consultants" },
      { name: "description", content: "Explore work permits, visit visas, group tours and student visa routes across Kyrgyzstan, Turkey, Schengen, U.S.A, Canada, U.K and more." },
      { property: "og:title", content: "Visa Portfolio & Routes" },
      { property: "og:description", content: "Filterable directory of every visa route we process." },
    ],
  }),
  component: PortfolioPage,
});

const TABS = ["All", ...VISA_CATALOG.map((c) => c.category)] as const;

function PortfolioPage() {
  const [active, setActive] = useState<(typeof TABS)[number]>("All");
  const { open } = useApplyModal();

  const cards = (active === "All" ? VISA_CATALOG : VISA_CATALOG.filter((c) => c.category === active))
    .flatMap((cat) =>
      cat.countries.map((country) => ({
        country,
        category: cat.category,
        processing: cat.processing,
        duration: cat.duration,
      })),
    );

  return (
    <Layout>
      <section className="relative overflow-hidden pb-12">
        <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[560px]">
          <img
            src={portfolioHero.url}
            alt=""
            aria-hidden="true"
            width={1920}
            height={1080}
            fetchPriority="high"
            decoding="async"
            className="h-full w-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-slate-950/80 to-slate-950" />
        </div>
        <div className="mx-auto max-w-7xl px-6 pt-12">
          <SectionHeading
            eyebrow="Visa Portfolio"
            title={<>Every <span className="text-gold-gradient italic">route</span> we file, in one place</>}
            intro="Filter by category to see the destinations we actively process. Each card opens a tailored assessment."
          />

          <div className="mt-12 flex flex-wrap gap-2">
            {TABS.map((t) => (
              <button
                key={t}
                onClick={() => setActive(t)}
                className={`relative rounded-full border px-5 py-2.5 text-xs uppercase tracking-[0.18em] transition ${
                  active === t
                    ? "border-gold/60 bg-gold/10 text-gold gold-glow"
                    : "border-white/10 text-muted-foreground hover:border-white/30 hover:text-foreground"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-28">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div layout className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {cards.map((c) => (
                <motion.article
                  key={`${c.category}-${c.country}`}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="group relative overflow-hidden rounded-2xl border border-white/5 glass-panel p-7 transition-all duration-500 hover:-translate-y-1 gold-glow-hover"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-4xl">{COUNTRY_FLAG[c.country] ?? "🌐"}</span>
                    <span className="text-[10px] uppercase tracking-[0.25em] text-gold">{c.category}</span>
                  </div>
                  <h3 className="mt-6 font-display text-2xl text-foreground">{c.country}</h3>
                  <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-white/5 pt-5 text-xs">
                    <div>
                      <dt className="flex items-center gap-1.5 text-muted-foreground"><Clock className="h-3 w-3 text-gold" />Processing</dt>
                      <dd className="mt-1 text-foreground">{c.processing}</dd>
                    </div>
                    <div>
                      <dt className="flex items-center gap-1.5 text-muted-foreground"><CalendarDays className="h-3 w-3 text-gold" />Duration</dt>
                      <dd className="mt-1 text-foreground">{c.duration}</dd>
                    </div>
                  </dl>

                  <button
                    onClick={() => open({ destination: c.country, category: c.category })}
                    className="mt-7 inline-flex w-full items-center justify-between rounded-full border border-gold/40 bg-gold/5 px-5 py-2.5 text-xs uppercase tracking-[0.2em] text-gold transition hover:bg-gold/15"
                  >
                    Check Eligibility
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </button>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
