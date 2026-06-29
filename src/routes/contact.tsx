import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Phone, Mail, Clock, MessageCircle, Send, Loader2, CheckCircle } from "lucide-react";
import { Layout } from "@/components/site/Layout";
import { SectionHeading } from "@/components/site/SectionHeading";
import { SITE } from "@/lib/site";
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
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [msg, setMsg] = useState("");
  const [formStatus, setFormStatus] = useState<"IDLE" | "SUBMITTING" | "SUCCESS" | "ERROR">("IDLE");

  const send = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!firstName.trim() || !lastName.trim() || !phone.trim() || !msg.trim()) {
      setFormStatus("ERROR");
      return;
    }

    setFormStatus("SUBMITTING");
    const computedFullName = `${firstName} ${lastName}`.trim();

    try {
      const response = await fetch("https://formspree.io/f/mjgqoevn", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: computedFullName,
          phone: phone,
          visaCategory: "General Inquiry",
          message: msg,
        }),
      });

      if (response.ok) {
        setFormStatus("SUCCESS");
        setFirstName("");
        setLastName("");
        setPhone("");
        setMsg("");
        
        setTimeout(() => {
          setFormStatus("IDLE");
        }, 3500);
      } else {
        setFormStatus("ERROR");
      }
    } catch (error) {
      console.error("Contact Formspree submission error context handler:", error);
      setFormStatus("ERROR");
    }
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
            className="h-full w-full object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-slate-950/80 to-slate-950" />
        </div>
        <div className="mx-auto max-w-7xl px-6 relative pt-12">
          <SectionHeading
            eyebrow="Get in touch"
            title={<>Visit us in <span className="text-gold-gradient italic">Peshawar</span></>}
            intro="Walk in, dial in, or securely deliver your case parameters online. A senior consultant will respond personally."
          />
        </div>
      </section>

      <section className="pb-28">
        <div className="mx-auto grid max-w-7xl gap-6 px-6 lg:grid-cols-[1.1fr_1fr]">
          {/* Map + details */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="overflow-hidden rounded-3xl border border-stone-200/60"
            >
              <iframe
                title="ZAK Consultants Office Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3308.7342963349092!2d71.45425507435851!3d33.97366822187761!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38d911d507fd6ddf%3A0x493a3de071281f6d!2sZAK%20Consultants%20(PVT.)%20LTD.!5e0!3m2!1sen!2sus!4v1782351036066!5m2!1sen!2sus"
                className="h-[380px] w-full grayscale-[40%]"
                loading="lazy"
                style={{ border: 0 }}
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </motion.div>

            {/* FIXED BACKGROUND: Info grid block wrapper updated with high-contrast lighter borders */}
            <div className="grid gap-px overflow-hidden rounded-3xl border border-stone-200/60 sm:grid-cols-2 bg-stone-200/50">
              <Info 
                icon={MapPin} 
                title="Office" 
                lines={[SITE.address]} 
                href="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3308.7342963349092!2d71.45425507435851!3d33.97366822187761!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38d911d507fd6ddf%3A0x493a3de071281f6d!2sZAK%20Consultants%20(PVT.)%20LTD.!5e0!3m2!1sen!2sus!4v1782351036066!5m2!1sen!2sus" 
              />
              <Info icon={Clock} title="Hours" lines={[SITE.hours, "Open every day"]} />
              <Info icon={Phone} title="WhatsApp & Call" lines={[SITE.phoneDisplay]} href={`tel:+${SITE.whatsappNumber}`} />
              <Info icon={Mail} title="Email" lines={[SITE.email]} href={`mailto:${SITE.email}`} />
            </div>
          </div>

          {/* Quick inquiry */}
          <motion.form
            onSubmit={send}
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="relative h-fit rounded-3xl border border-white/5 glass-panel-strong p-8 sm:p-10 overflow-hidden"
          >
            <AnimatePresence>
              {formStatus === "SUCCESS" && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="absolute fixed inset-0 z-[60] bg-slate-950/95 backdrop-blur-lg flex flex-col items-center justify-center text-center p-6"
                >
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.1, type: "spring", stiffness: 200, damping: 15 }}
                    className="h-14 w-14 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center text-emerald-400 mb-5 shadow-[0_0_30px_rgba(16,185,129,0.15)]"
                  >
                    <CheckCircle className="h-7 w-7 stroke-[1.5]" />
                  </motion.div>
                  
                  <h3 className="font-display text-2xl text-white font-medium tracking-tight px-4">
                    Form sent successfully!
                  </h3>
                  <p className="mt-3 text-sm text-slate-400 max-w-sm font-light leading-relaxed px-6">
                    Your inquiry has been safely channeled to our corporate intake desk. A senior case representative will contact you via email shortly.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex items-center gap-3">
              <MessageCircle className="h-5 w-5 text-gold" />
              <h3 className="font-display text-2xl text-foreground">Quick inquiry</h3>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">Dispatches instantly to our team.</p>

            <div className="mt-7 grid gap-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="flex flex-col gap-1.5">
                  <span className="text-xs sm:text-sm uppercase tracking-[0.15em] font-semibold text-amber-900">First Name</span>
                  <input required value={firstName} onChange={(e) => setFirstName(e.target.value)} className="input-base" placeholder="First name" disabled={formStatus === "SUBMITTING"} />
                </label>
                <label className="flex flex-col gap-1.5">
                  <span className="text-xs sm:text-sm uppercase tracking-[0.15em] font-semibold text-amber-900">Last Name</span>
                  <input required value={lastName} onChange={(e) => setLastName(e.target.value)} className="input-base" placeholder="Last name" disabled={formStatus === "SUBMITTING"} />
                </label>
              </div>

              <label className="flex flex-col gap-1.5">
                <span className="text-xs sm:text-sm uppercase tracking-[0.15em] font-semibold text-amber-900">Phone</span>
                <input required value={phone} onChange={(e) => setPhone(e.target.value)} className="input-base" placeholder="+92 3xx xxxxxxx" disabled={formStatus === "SUBMITTING"} />
              </label>
              
              <label className="flex flex-col gap-1.5">
                <span className="text-xs sm:text-sm uppercase tracking-[0.15em] font-semibold text-amber-900">Message</span>
                <textarea required value={msg} onChange={(e) => setMsg(e.target.value)} rows={4} className="input-base resize-none" placeholder="Tell us where you'd like to travel..." disabled={formStatus === "SUBMITTING"} />
              </label>

              <div className="min-h-[20px] mt-1">
                {formStatus === "ERROR" && (
                  <p className="text-sm text-rose-500 font-semibold">
                    Please fill out all fields completely before submitting.
                  </p>
                )}
                {formStatus === "SUBMITTING" && (
                  <p className="text-xs text-amber-400 font-medium animate-pulse">
                    Synchronizing case inquiry telemetry...
                  </p>
                )}
              </div>
              
              <button 
                type="submit" 
                disabled={formStatus === "SUBMITTING"}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-amber-300 via-amber-400 to-amber-600 px-6 py-3.5 text-sm font-semibold uppercase tracking-[0.18em] text-slate-950 gold-glow gold-glow-hover transition-transform hover:scale-[1.02] disabled:opacity-50"
              >
                {formStatus === "SUBMITTING" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                Submit Inquiry
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
    <Tag 
      href={href} 
      {...(href ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      /* FIXED BACKGROUND: Changed dark background classes to clean white/80 panels for maximum legibility */
      className="block bg-white/80 p-7 transition hover:bg-white group cursor-pointer"
    >
      {/* Deepened icon tone for premium layout structure */}
      <Icon className="h-5 w-5 text-amber-600 transition-transform group-hover:scale-110 duration-300" />
      <div className="mt-4 text-xs uppercase tracking-[0.15em] font-semibold text-amber-900 group-hover:text-amber-600 transition-colors duration-300">{title}</div>
      {/* FIXED CONTRAST: Shifted text color from light gray to deep text-stone-900 gray strings */}
      {lines.map((l, i) => (<p key={i} className="mt-1.5 text-base text-stone-900 font-normal leading-relaxed">{l}</p>))}
    </Tag>
  );
}