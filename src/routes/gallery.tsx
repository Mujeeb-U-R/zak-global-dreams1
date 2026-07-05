import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote, X, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { Layout } from "@/components/site/Layout";
import { SectionHeading } from "@/components/site/SectionHeading";

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
  { src: "/opening_ceremony/ceremony1.jpeg", label: "Opening Ceremony — Moment 01" },
  { src: "/opening_ceremony/ceremony2.jpeg", label: "Opening Ceremony — Moment 02" },
  { src: "/opening_ceremony/ceremony3.jpeg", label: "Opening Ceremony — Moment 03" },
  { src: "/opening_ceremony/ceremony4.jpeg", label: "Opening Ceremony — Moment 04" },
  { src: "/opening_ceremony/ceremony5.jpeg", label: "Opening Ceremony — Moment 05" },
  { src: "/opening_ceremony/ceremony6.jpeg", label: "Opening Ceremony — Moment 06" },
  { src: "/opening_ceremony/ceremony7.jpeg", label: "Opening Ceremony — Moment 07" },
  { src: "/opening_ceremony/ceremony8.jpeg", label: "Opening Ceremony — Moment 08" },
  { src: "/opening_ceremony/ceremony9.jpeg", label: "Opening Ceremony — Moment 09" },
  { src: "/opening_ceremony/ceremony10.jpeg", label: "Opening Ceremony — Moment 10" },
];

const REVIEWS = [
  { name: "Hamza R.", route: "Turkey Work Permit", text: "From profiling to embassy submission, every step felt deliberate. Approval came within the timeline they predicted." },
  { name: "Sana A.", route: "U.K Student Visa", text: "They restructured my SOP and financials in two evenings. The visa landed first attempt." },
  { name: "Bilal K.", route: "Schengen Visit Visa", text: "Calm, professional, and brutally precise with documentation. Worth every minute of the consultation." },
  { name: "Zainab M.", route: "Canada Student Route", text: "The cross-checking system they used for my study gap explanation made all the difference. Outstanding communication." },
  { name: "Asif J.", route: "Kyrgyzstan Work permit", text: "They cleared up all the regulatory confusion regarding our corporate group paperwork. Highly transparent and reliable." },
  { name: "Maryam N.", route: "Schengen Tourist Visa", text: "Honest advice on bank statement timelines. They won't file unless they know your matrix meets the threshold." },
];

function GalleryPage() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    if (activeIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "Escape") setActiveIndex(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex]);

  useEffect(() => {
    if (activeIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [activeIndex]);

  const handleNext = () => {
    if (activeIndex !== null) {
      setActiveIndex((activeIndex + 1) % GRID.length);
    }
  };

  const handlePrev = () => {
    if (activeIndex !== null) {
      setActiveIndex((activeIndex - 1 + GRID.length) % GRID.length);
    }
  };

  return (
    <Layout>
      <section className="relative pb-16">
        <div className="mx-auto max-w-7xl px-6 pt-12">
          <SectionHeading
            
            title={<>Outcomes that <span className="text-gold-gradient italic">travel</span> with you</>}
            intro="A curated look at approved files and the journeys they unlocked. Personal data is obscured for privacy."
          />
        </div>
      </section>

      {/* --- EXECUTIVE EDITORIAL MASONRY GRID --- */}
      <section className="pb-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="columns-1 gap-6 sm:columns-2 lg:columns-3 space-y-6">
            {GRID.map((it, i) => (
              <motion.figure
                key={i}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.04, duration: 0.6 }}
                onClick={() => setActiveIndex(i)}
                className="break-inside-avoid group relative overflow-hidden rounded-2xl border border-stone-200 bg-[#fdfbf7] p-2.5 cursor-zoom-in shadow-xl hover:shadow-2xl hover:border-amber-500/40 transition-all duration-500"
              >
                <div className="relative overflow-hidden rounded-xl bg-stone-950">
                  {/* Subtle warm tint and slight desaturation that transitions smoothly on hover */}
                  <img 
                    src={it.src} 
                    alt={it.label} 
                    className="w-full h-auto object-cover grayscale-[15%] sepia-[10%] brightness-[96%] transition-all duration-700 ease-out group-hover:scale-[1.03] group-hover:grayscale-0 group-hover:sepia-0 group-hover:brightness-100" 
                  />
                  
                  {/* Internal ambient dark frame rim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent opacity-60 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none" />
                </div>
                
                {/* Premium Corporate metadata label line */}
                <div className="mt-3 px-2 pb-1 flex items-center justify-between">
                  <figcaption className="text-[10px] font-mono uppercase tracking-[0.18em] text-stone-500 group-hover:text-amber-700 transition-colors duration-300 font-semibold">
                    {it.label}
                  </figcaption>
                  <span className="text-[10px] font-serif text-stone-400 italic group-hover:translate-x-1 transition-transform duration-300">View →</span>
                </div>
              </motion.figure>
            ))}
          </div>
        </div>
      </section>

      {/* --- LIGHTBOX MODAL --- */}
      <AnimatePresence>
        {activeIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveIndex(null)}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950/95 p-4 backdrop-blur-sm select-none"
          >
            <div className="absolute top-6 right-6 z-50">
              <button 
                onClick={(e) => { e.stopPropagation(); setActiveIndex(null); }}
                className="p-3 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:text-gold transition-all duration-300 shadow-xl"
              >
                <X className="h-5 w-5 stroke-[2]" />
              </button>
            </div>

            <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex items-center justify-between z-40 pointer-events-none">
              <button
                onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                className="p-4 rounded-full bg-slate-900/60 border border-white/10 text-white hover:bg-slate-900 hover:text-gold transition-all duration-300 pointer-events-auto"
              >
                <ChevronLeft className="h-6 w-6 stroke-[2]" />
              </button>

              <button
                onClick={(e) => { e.stopPropagation(); handleNext(); }}
                className="p-4 rounded-full bg-slate-900/60 border border-white/10 text-white hover:bg-slate-900 hover:text-gold transition-all duration-300 pointer-events-auto"
              >
                <ChevronRight className="h-6 w-6 stroke-[2]" />
              </button>
            </div>

            <motion.div
              key={activeIndex}
              initial={{ scale: 0.97, opacity: 0.8 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.97, opacity: 0.8 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl max-h-[85vh] overflow-hidden rounded-2xl border border-white/10 bg-slate-900 shadow-[0_25px_70px_-15px_rgba(0,0,0,0.9)] flex items-center justify-center"
            >
              <img
                src={GRID[activeIndex].src}
                alt={GRID[activeIndex].label}
                className="max-w-full max-h-[85vh] object-contain"
              />
            </motion.div>

            <motion.div 
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="mt-6 flex items-center gap-4 text-xs font-mono uppercase tracking-[0.2em] bg-slate-900/80 border border-white/5 backdrop-blur-md px-6 py-2.5 rounded-full shadow-lg"
            >
              <span className="text-amber-500 font-bold">{activeIndex + 1} / {GRID.length}</span>
              <span className="w-px h-3 bg-white/20" />
              <span className="text-slate-300">{GRID[activeIndex].label}</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- REVIEWS BLOCK --- */}
      <section className="pb-28">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading
            eyebrow="Client Voices"
            title={<>Words from <span className="text-gold-gradient italic">travelers</span></>}
          />
          
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {REVIEWS.map((r, i) => (
              <motion.blockquote
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.7 }}
                className="relative rounded-[32px] bg-[#fdfbf7] border border-stone-200 p-8 shadow-2xl flex flex-col justify-between text-slate-900 select-none min-h-[240px]"
              >
                <div>
                  <Quote className="h-7 w-7 text-amber-600/20 stroke-[1.5]" />
                  <p className="mt-4 font-serif text-base leading-relaxed italic text-stone-800">"{r.text}"</p>
                </div>
                
                <footer className="mt-7 flex items-center justify-between border-t border-stone-200 pt-5 text-sm">
                  <div>
                    <div className="text-stone-900 font-display font-semibold">{r.name}</div>
                    <div className="text-[11px] font-mono uppercase tracking-wider text-amber-700/80 mt-0.5 font-medium">{r.route}</div>
                  </div>
                  <div className="flex gap-0.5 shrink-0 bg-stone-100 px-3 py-1.5 rounded-full border border-stone-200/60">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star key={j} className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
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