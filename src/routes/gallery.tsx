import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { Layout } from "@/components/site/Layout";
import { SectionHeading } from "@/components/site/SectionHeading";
import g1 from "@/assets/gallery-1.jpg";
import g2 from "@/assets/gallery-2.jpg";
import g3 from "@/assets/gallery-3.jpg";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Success Gallery — ZAK Consultants" },
      { name: "description", content: "Approved visa stickers, client reviews and global travel moments from ZAK Consultants clients." },
      { property: "og:title", content: "Success Gallery" },
      { property: "og:description", content: "Real outcomes, real travelers." },
    ],
  }),
  component: GalleryPage,
});

const GRID = [
  { src: g1, h: "row-span-2", label: "Schengen Visa — Approved" },
  { src: g2, h: "", label: "Premium Lounge — Istanbul" },
  { src: g3, h: "", label: "Bosphorus — Türkiye Tour" },
  { src: g2, h: "row-span-2", label: "Business Travel — Singapore" },
  { src: g1, h: "", label: "U.K Student Visa — Granted" },
  { src: g3, h: "", label: "Group Tour — Morocco" },
];

const REVIEWS = [
  { name: "Hamza R.", route: "Turkey Work Permit", text: "From profiling to embassy submission, every step felt deliberate. Approval came within the timeline they predicted." },
  { name: "Sana A.", route: "U.K Student Visa", text: "They restructured my SOP and financials in two evenings. The visa landed first attempt." },
  { name: "Bilal K.", route: "Schengen Visit Visa", text: "Calm, professional, and brutally precise with documentation. Worth every minute of the consultation." },
];

function GalleryPage() {
  return (
    <Layout>
      <section className="relative pb-16">
        <div className="mx-auto max-w-7xl px-6 pt-12">
          <SectionHeading
            eyebrow="Success Gallery"
            title={<>Outcomes that <span className="text-gold-gradient italic">travel</span> with you</>}
            intro="A curated look at approved files and the journeys they unlocked. Personal data is obscured for privacy."
          />
        </div>
      </section>

      <section className="pb-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid auto-rows-[220px] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {GRID.map((it, i) => (
              <motion.figure
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.08, duration: 0.7 }}
                className={`group relative overflow-hidden rounded-2xl border border-white/5 ${it.h}`}
              >
                <img src={it.src} alt={it.label} className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />
                <figcaption className="absolute bottom-4 left-5 text-xs uppercase tracking-[0.2em] text-gold">{it.label}</figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-28">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading
            eyebrow="Client Voices"
            title={<>Words from <span className="text-gold-gradient italic">travelers</span></>}
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {REVIEWS.map((r, i) => (
              <motion.blockquote
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.7 }}
                className="relative rounded-2xl border border-white/5 glass-panel p-8 gold-glow-hover"
              >
                <Quote className="h-6 w-6 text-gold/60" />
                <p className="mt-5 font-serif text-lg leading-relaxed italic text-foreground">"{r.text}"</p>
                <footer className="mt-7 flex items-center justify-between border-t border-white/5 pt-5 text-sm">
                  <div>
                    <div className="text-foreground">{r.name}</div>
                    <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{r.route}</div>
                  </div>
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star key={j} className="h-3.5 w-3.5 fill-gold text-gold" />
                    ))}
                  </div>
                </footer>
              </motion.blockquote>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
