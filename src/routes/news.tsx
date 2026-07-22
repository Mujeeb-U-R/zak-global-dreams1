import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Layout } from "@/components/site/Layout";
import { SectionHeading } from "@/components/site/SectionHeading";
import { 
  SPECIAL_OFFERS_IMAGES, 
  GROUP_TOURS_IMAGES, 
  WORK_PERMIT_IMAGES,
  STUDY_VISA_IMAGES, 
  ALL_NEWS_IMAGES 
} from "@/lib/newsData";

export const Route = createFileRoute("/news")({
  head: () => ({
    meta: [
      { title: "Latest News and Visual Updates — ZAK Consultants" },
      { name: "description", content: "Stay updated with recent visual logs and operational photo releases processed through our Peshawar office." },
    ],
  }),
  component: NewsPage,
});

function NewsPage() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // Keyboard navigation routing
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

  // Lock framework viewport scrolling properties when modal is open
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
      setActiveIndex((activeIndex + 1) % ALL_NEWS_IMAGES.length);
    }
  };

  const handlePrev = () => {
    if (activeIndex !== null) {
      setActiveIndex((activeIndex - 1 + ALL_NEWS_IMAGES.length) % ALL_NEWS_IMAGES.length);
    }
  };

  // Helper function to render a grid section
  const renderSection = (title: string, eyebrow: string, images: string[], startIndex: number) => (
    <div className="mb-24 last:mb-12">
      <div className="mb-10 border-b border-stone-200/80 pb-4">
        <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-amber-600 block mb-1">{eyebrow}</span>
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900">
          {title}
        </h2>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {images.map((imgSrc, idx) => {
          const globalIndex = startIndex + idx;
          return (
            <motion.div
              key={globalIndex}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: idx * 0.05, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              onClick={() => setActiveIndex(globalIndex)}
              className="group relative overflow-hidden rounded-2xl border border-stone-200/80 bg-white p-4 shadow-[0_15px_40px_rgba(27,24,17,0.05)] transition-all duration-300 hover:shadow-[0_25px_50px_rgba(27,24,17,0.1)] hover:border-amber-500/30 cursor-zoom-in active:scale-[0.98]"
            >
              <div className="relative w-full min-h-[400px] max-h-[600px] flex items-center justify-center bg-stone-50 rounded-xl overflow-hidden p-2">
                <img
                  src={imgSrc}
                  alt={`${title} Asset ${idx + 1}`}
                  className="max-h-[580px] w-full object-contain transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-stone-950/0 transition-colors duration-300 group-hover:bg-stone-950/[0.02] pointer-events-none" />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );

  return (
    <Layout>
      <section className="relative overflow-hidden py-12">
        <div className="mx-auto max-w-7xl px-6 relative">
          <SectionHeading
            eyebrow="Media Center"
            title={<>News, <span className="text-gold-gradient italic">Offers</span> & Updates</>}
            intro="Explore our categorized visual logs, promotional packages, and operational updates below."
          />
        </div>
      </section>

      <section className="pb-28">
        <div className="mx-auto max-w-7xl px-6">
          {/* Section 1: Special Offers */}
          {renderSection("Special Offers & Packages", "Featured Deals", SPECIAL_OFFERS_IMAGES, 0)}

          {/* Section 2: Group Tours */}
          {renderSection("Group Tours", "Global Expeditions", GROUP_TOURS_IMAGES, SPECIAL_OFFERS_IMAGES.length)}

          {/* Section 3: Work Permit */}
          {renderSection("Work Permit Updates", "Employment Visas", WORK_PERMIT_IMAGES, SPECIAL_OFFERS_IMAGES.length + GROUP_TOURS_IMAGES.length)}

          {/* Section 4: Study Visa */}
          {renderSection("Study Visa Updates", "Educational Opportunities", STUDY_VISA_IMAGES, SPECIAL_OFFERS_IMAGES.length + GROUP_TOURS_IMAGES.length + WORK_PERMIT_IMAGES.length)}
        </div>
      </section>

      {/* --- PREMIUM LIGHTBOX MODAL WITH ARROW SLIDER CONTROLS --- */}
      <AnimatePresence>
        {activeIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveIndex(null)}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950/95 p-4 backdrop-blur-sm select-none"
          >
            {/* Top Close Button */}
            <div className="absolute top-5 right-5 sm:top-6 sm:right-6 z-50">
              <button 
                onClick={(e) => { e.stopPropagation(); setActiveIndex(null); }}
                className="p-3 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:text-gold transition-all duration-300 shadow-xl"
                aria-label="Close fullscreen view"
              >
                <X className="h-5 w-5 stroke-[2]" />
              </button>
            </div>

            {/* Navigation Control Modules */}
            <div className="absolute inset-x-2 sm:inset-x-4 top-1/2 -translate-y-1/2 flex items-center justify-between z-40 pointer-events-none">
              <button
                onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                className="p-3 sm:p-4 rounded-full bg-slate-900/60 border border-white/10 text-white hover:bg-slate-900 hover:text-gold transition-all duration-300 shadow-2xl pointer-events-auto active:scale-95"
                aria-label="Previous Image"
              >
                <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6 stroke-[2]" />
              </button>

              <button
                onClick={(e) => { e.stopPropagation(); handleNext(); }}
                className="p-3 sm:p-4 rounded-full bg-slate-900/60 border border-white/10 text-white hover:bg-slate-900 hover:text-gold transition-all duration-300 shadow-2xl pointer-events-auto active:scale-95"
                aria-label="Next Image"
              >
                <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6 stroke-[2]" />
              </button>
            </div>

            {/* Fullscreen Image Container */}
            <motion.div
              key={activeIndex} 
              initial={{ scale: 0.97, opacity: 0.8 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.97, opacity: 0.8 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              className="relative flex items-center justify-center cursor-default w-full px-16 sm:px-24"
            >
              <img
                src={ALL_NEWS_IMAGES[activeIndex]}
                alt={`News Update ${activeIndex + 1}`}
                className="max-w-full max-h-[75vh] sm:max-h-[80vh] object-contain rounded-lg shadow-[0_25px_70px_-15px_rgba(0,0,0,0.9)]"
              />
            </motion.div>

            {/* Bottom Counter */}
            <motion.div 
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="mt-5 sm:mt-6 flex items-center gap-4 text-xs font-mono uppercase tracking-[0.2em] bg-slate-900/80 border border-white/5 backdrop-blur-md px-6 py-2.5 rounded-full shadow-lg"
            >
              <span className="text-amber-500 font-bold">{activeIndex + 1} / {ALL_NEWS_IMAGES.length}</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
}