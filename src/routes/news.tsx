import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Layout } from "@/components/site/Layout";
import { SectionHeading } from "@/components/site/SectionHeading";

export const Route = createFileRoute("/news")({
  head: () => ({
    meta: [
      { title: "Latest News and Visual Updates — ZAK Consultants" },
      { name: "description", content: "Stay updated with recent visual logs and operational photo releases processed through our Peshawar office." },
    ],
  }),
  component: NewsPage,
});

// --- PURE CASE-SENSITIVE PATHS MATCHING YOUR FILENAMES ---
const NEWS_IMAGES = [
  "/news/News1.jpeg",
  "/news/News2.jpeg",
  "/news/News3.jpeg",
  "/news/News4.jpeg",
  "/news/News5.jpeg",
  "/news/News6.jpeg",
  "/news/News7.jpeg"
];

function NewsPage() {
  return (
    <Layout>
      <section className="relative overflow-hidden py-12">
        <div className="mx-auto max-w-7xl px-6 relative">
          <SectionHeading
            eyebrow="Media Center"
            title={<>Latest <span className="text-gold-gradient italic">News</span> and Updates</>}
            intro="Explore our recent visual logs and operational photo releases below."
          />
        </div>
      </section>

      <section className="pb-28">
        <div className="mx-auto max-w-7xl px-6">
          {/* UPDATED: Displays a 2-column layout on larger screens to maximize space and significantly increase picture size */}
          <div className="grid gap-8 md:grid-cols-2">
            {NEWS_IMAGES.map((imgSrc, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: index * 0.05, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="group relative overflow-hidden rounded-2xl border border-stone-200/80 bg-white p-4 shadow-[0_15px_40px_rgba(27,24,17,0.05)] transition-all duration-300 hover:shadow-[0_25px_50px_rgba(27,24,17,0.1)] hover:border-amber-500/30"
              >
                {/* --- FIXED IMAGE WRAPPER --- */}
                {/* 
                  Removed aspect-[4/3] constraint so tall or wide images flow normally.
                  Using a spacious min-h-[400px] block to make the presentation much larger.
                */}
                <div className="relative w-full min-h-[400px] max-h-[600px] flex items-center justify-center bg-stone-50 rounded-xl overflow-hidden p-2">
                  <img
                    src={imgSrc}
                    alt={`ZAK News Bulletin Asset ${index + 1}`}
                    /* 
                      FIXED: Swapped 'object-cover' to 'object-contain' 
                      This prevents any text, stamp, or edge from being clipped or hidden!
                    */
                    className="max-h-[580px] w-full object-contain transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                    loading="lazy"
                  />
                  
                  {/* Elegant soft hover contrast filter */}
                  <div className="absolute inset-0 bg-stone-950/0 transition-colors duration-300 group-hover:bg-stone-950/[0.02] pointer-events-none" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}