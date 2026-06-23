import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { FileText, ScrollText, UserCheck, Briefcase } from "lucide-react";
import { Layout } from "@/components/site/Layout";
import { SectionHeading } from "@/components/site/SectionHeading";
import { ApplyButton } from "@/components/site/ApplyButton";
import aboutHero from "@/assets/about-hero.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — ZAK Consultants (Pvt.) Ltd." },
      { name: "description", content: "A registered Peshawar-based consultancy delivering meticulous case preparation, legal documentation handling and structured client profiling." },
      { property: "og:title", content: "About ZAK Consultants" },
      { property: "og:description", content: "Meticulous case preparation, legal documentation and structured client profiling." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <Layout>
      <section className="relative">
        <div className="mx-auto max-w-7xl px-6 pt-20">
          <p className="text-[11px] uppercase tracking-[0.5em] text-gold">Our Practice</p>
          <h1 className="mt-6 max-w-4xl font-display text-5xl leading-[1.05] text-foreground sm:text-7xl">
            A discipline built on <span className="text-gold-gradient italic">trust</span>,
            evidence and precise paperwork.
          </h1>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-20 max-w-7xl px-6"
        >
          <div className="relative overflow-hidden rounded-3xl border border-white/5">
            <img src={aboutHero} alt="ZAK Consultants office interior" className="h-[520px] w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
          </div>
        </motion.div>
      </section>

      <section className="relative py-28">
        <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-[1fr_1.2fr]">
          <SectionHeading
            eyebrow="Who we are"
            title={<>Built for the modern <span className="text-gold-gradient italic">global citizen</span></>}
          />
          <div className="space-y-6 font-serif text-lg leading-relaxed text-muted-foreground">
            <p>
              ZAK Consultants (Pvt.) Ltd. is a registered private limited firm headquartered at GS Tower,
              Ring Road, Peshawar. We operate at the intersection of legal documentation, embassy
              procedure and personal advisory — turning ambiguous visa journeys into structured outcomes.
            </p>
            <p>
              Every client engagement begins with profiling, continues through evidence assembly,
              and is closed with a defensible submission. We do not promise miracles; we deliver
              the case your file always deserved.
            </p>
          </div>
        </div>
      </section>

      <section className="relative pb-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-px overflow-hidden rounded-3xl border border-white/5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: UserCheck, t: "Client Profiling", d: "Structured intake mapping background, intent and risk to the right route." },
              { icon: FileText, t: "Case Preparation", d: "Embassy-grade evidence packs and narrative letters drafted in-house." },
              { icon: ScrollText, t: "Legal Documentation", d: "Affidavits, attestations and translations handled end-to-end." },
              { icon: Briefcase, t: "Professional Advisory", d: "Senior consultants on call across the full lifecycle of your case." },
            ].map((c, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.7 }}
                className="bg-slate-950/40 p-8 transition hover:bg-slate-900/60"
              >
                <c.icon className="h-7 w-7 text-gold" />
                <h3 className="mt-5 font-display text-2xl text-foreground">{c.t}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{c.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-32">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="font-display text-3xl italic text-foreground sm:text-4xl">
            “Move with the confidence of having a senior advisor in your corner.”
          </p>
          <div className="mt-10 flex justify-center"><ApplyButton /></div>
        </div>
      </section>
    </Layout>
  );
}
