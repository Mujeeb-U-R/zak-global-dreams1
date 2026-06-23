import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, MessageCircle, Send } from "lucide-react";
import { Layout } from "@/components/site/Layout";
import { SectionHeading } from "@/components/site/SectionHeading";
import { SITE } from "@/lib/site";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import contactHero from "@/assets/contact-hero.jpg.asset.json";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — ZAK Consultants, Peshawar" },
      { name: "description", content: `Visit our office at ${SITE.address}. Daily 12:30 PM – 11:30 PM. WhatsApp ${SITE.phoneDisplay}.` },
      { property: "og:title", content: "Contact ZAK Consultants" },
      { property: "og:description", content: "Office in GS Tower, Ring Road, Peshawar." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [msg, setMsg] = useState("");

  const send = (e: React.FormEvent) => {
    e.preventDefault();
    const url = buildWhatsAppUrl({
      fullName: name || "Quick Inquiry",
      phone: phone || "—",
      destination: "—",
      category: "General Inquiry",
      employment: "—",
      bankStatement: "No",
    });
    const intro = encodeURIComponent(`\n\n*Message:* ${msg || "(no message)"}`);
    window.open(url + intro, "_blank", "noopener,noreferrer");
  };

  return (
    <Layout>
      <section className="relative overflow-hidden pb-12">
        <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[520px]">
          <img
            src={contactHero.url}
            alt=""
            aria-hidden="true"
            width={1920}
            height={1080}
            fetchPriority="high"
            decoding="async"
            className="h-full w-full object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-slate-950/80 to-slate-950" />
        </div>
        <div className="mx-auto max-w-7xl px-6 pt-12">
          <SectionHeading
            eyebrow="Get in touch"
            title={<>Visit us in <span className="text-gold-gradient italic">Peshawar</span></>}
            intro="Walk in, dial in, or message us on WhatsApp. A senior consultant will respond personally."
          />
        </div>
      </section>

      <section className="pb-28">
        <div className="mx-auto grid max-w-7xl gap-6 px-6 lg:grid-cols-[1.1fr_1fr]">
          {/* Map + details */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="overflow-hidden rounded-3xl border border-white/5"
            >
              <iframe
                title="ZAK Consultants Office Map"
                src="https://www.google.com/maps?q=Ring+Road+Hayatabad+Toll+Plaza+Peshawar&output=embed"
                className="h-[380px] w-full grayscale-[40%]"
                loading="lazy"
              />
            </motion.div>

            <div className="grid gap-px overflow-hidden rounded-3xl border border-white/5 sm:grid-cols-2">
              <Info icon={MapPin} title="Office" lines={[SITE.address]} />
              <Info icon={Clock} title="Hours" lines={[SITE.hours, "Open every day"]} />
              <Info icon={Phone} title="WhatsApp & Call" lines={[SITE.phoneDisplay]} href={`tel:+${SITE.whatsappNumber}`} />
              <Info icon={Mail} title="Email" lines={[SITE.email]} href={`mailto:${SITE.email}`} />
            </div>
          </div>

          {/* Quick inquiry */}
          <motion.form
            onSubmit={send}
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="h-fit rounded-3xl border border-white/5 glass-panel-strong p-8 sm:p-10"
          >
            <div className="flex items-center gap-3">
              <MessageCircle className="h-5 w-5 text-gold" />
              <h3 className="font-display text-2xl text-foreground">Quick inquiry</h3>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">Sends directly to our WhatsApp.</p>

            <div className="mt-7 grid gap-5">
              <label className="flex flex-col gap-2">
                <span className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Your Name</span>
                <input value={name} onChange={(e) => setName(e.target.value)} className="input-base" placeholder="Full name" />
              </label>
              <label className="flex flex-col gap-2">
                <span className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Phone</span>
                <input value={phone} onChange={(e) => setPhone(e.target.value)} className="input-base" placeholder="+92 3xx xxxxxxx" />
              </label>
              <label className="flex flex-col gap-2">
                <span className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Message</span>
                <textarea value={msg} onChange={(e) => setMsg(e.target.value)} rows={4} className="input-base resize-none" placeholder="Tell us where you'd like to travel..." />
              </label>
              <button type="submit" className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-amber-300 via-amber-400 to-amber-600 px-6 py-3.5 text-sm font-semibold uppercase tracking-[0.18em] text-slate-950 gold-glow gold-glow-hover transition-transform hover:scale-[1.02]">
                <Send className="h-4 w-4" /> Send via WhatsApp
              </button>
            </div>
          </motion.form>
        </div>
      </section>
    </Layout>
  );
}

function Info({
  icon: Icon, title, lines, href,
}: { icon: typeof MapPin; title: string; lines: string[]; href?: string }) {
  const Tag: any = href ? "a" : "div";
  return (
    <Tag href={href} className="block bg-slate-950/40 p-7 transition hover:bg-slate-900/60">
      <Icon className="h-5 w-5 text-gold" />
      <div className="mt-4 text-[10px] uppercase tracking-[0.25em] text-muted-foreground">{title}</div>
      {lines.map((l, i) => (<p key={i} className="mt-1 text-sm text-foreground">{l}</p>))}
    </Tag>
  );
}
