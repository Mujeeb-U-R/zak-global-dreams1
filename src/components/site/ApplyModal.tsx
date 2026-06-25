import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Send, Loader2 } from "lucide-react";
import { z } from "zod";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { VISA_CATALOG } from "@/lib/site";

const schema = z.object({
  firstName: z.string().trim().min(2, "Please enter your first name").max(50),
  lastName: z.string().trim().min(2, "Please enter your last name").max(50),
  phone: z.string().trim().min(7, "Enter a valid phone number").max(20),
  destination: z.string().trim().min(2).max(60),
  category: z.enum(["Work Permit", "Visit Visa", "Group Tour + Visit Visa", "Student Visa"]),
  employment: z.enum(["Employed", "Business Owner", "Student"]),
  bankStatement: z.enum(["Yes", "No"]),
});

const CATEGORIES = ["Work Permit", "Visit Visa", "Group Tour + Visit Visa", "Student Visa"] as const;
const EMPLOYMENT = ["Employed", "Business Owner", "Student"] as const;

interface Props {
  isOpen: boolean;
  onClose: () => void;
  preset?: { destination?: string; category?: string };
}

export function ApplyModal({ isOpen, onClose, preset }: Props) {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    destination: "",
    category: "Visit Visa" as (typeof CATEGORIES)[number],
    employment: "Employed" as (typeof EMPLOYMENT)[number],
    bankStatement: "Yes" as "Yes" | "No",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen && preset) {
      setForm((f) => ({
        ...f,
        destination: preset.destination ?? f.destination,
        category:
          (CATEGORIES as readonly string[]).includes(preset.category ?? "")
            ? (preset.category as (typeof CATEGORIES)[number])
            : f.category,
      }));
    }
  }, [isOpen, preset]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const update = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = schema.safeParse(form);
    if (!result.success) {
      const errs: Record<string, string> = {};
      for (const issue of result.error.issues) {
        errs[issue.path.join(".")] = issue.message;
      }
      setErrors(errs);
      return;
    }
    setErrors({});
    setSubmitting(true);

    const { firstName, lastName, ...rest } = result.data;
    const computedFullName = `${firstName} ${lastName}`.trim();

    const url = buildWhatsAppUrl({
      fullName: computedFullName,
      ...rest,
    });

    setTimeout(() => {
      window.open(url, "_blank", "noopener,noreferrer");
      setSubmitting(false);
      onClose();
    }, 500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto p-4"
        >
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-md" onClick={onClose} />

          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="relative my-12 w-full max-w-2xl glass-panel-strong rounded-3xl p-6 sm:p-10 shadow-[0_40px_120px_-20px_rgba(0,0,0,0.8)]"
          >
            {/* FIXED: Shifted padding bounding region, added background colors, and set explicit top/right constraints for crisp mobile visibility */}
            <motion.button
              whileTap={{ scale: 0.90 }}
              onClick={onClose}
              className="absolute right-4 top-4 z-50 p-2.5 rounded-full border border-white/10 bg-slate-900/90 text-gold shadow-md backdrop-blur-sm transition-colors hover:border-gold/40 hover:text-foreground active:bg-slate-800 flex items-center justify-center"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </motion.button>

            <header className="mb-8 pr-8">
              <p className="text-[10px] uppercase tracking-[0.4em] text-gold">Visa Assessment</p>
              <h2 className="mt-3 font-display text-3xl text-foreground sm:text-4xl">
                Begin your <span className="text-gold-gradient">journey</span>
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Share a few details. We'll route you directly to a senior consultant on WhatsApp.
              </p>
            </header>

            <form onSubmit={onSubmit} className="grid gap-5 sm:grid-cols-2">
              
              <Field label="First Name" error={errors.firstName}>
                <input
                  value={form.firstName}
                  onChange={(e) => update("firstName", e.target.value)}
                  placeholder="Enter your first name"
                  className="input-base text-base"
                />
              </Field>

              <Field label="Last Name" error={errors.lastName}>
                <input
                  value={form.lastName}
                  onChange={(e) => update("lastName", e.target.value)}
                  placeholder="Enter your last name"
                  className="input-base text-base"
                />
              </Field>

              <Field label="Phone Number" error={errors.phone}>
                <input
                  value={form.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  type="tel"
                  placeholder="+92 3xx xxxxxxx"
                  className="input-base text-base"
                />
              </Field>

              <Field label="Destination Country" error={errors.destination}>
                <input
                  value={form.destination}
                  onChange={(e) => update("destination", e.target.value)}
                  list="dest-list"
                  placeholder="e.g. Turkey"
                  className="input-base text-base"
                />
                <datalist id="dest-list">
                  {VISA_CATALOG.flatMap((c) => c.countries).map((c) => (
                    <option key={c} value={c} />
                  ))}
                </datalist>
              </Field>

              <Field label="Visa Category">
                <select 
                  value={form.category} 
                  onChange={(e) => update("category", e.target.value as (typeof CATEGORIES)[number])} 
                  className="input-base text-base bg-slate-900"
                >
                  {CATEGORIES.map((c) => <option key={c} className="bg-slate-900">{c}</option>)}
                </select>
              </Field>

              <Field label="Employment Status">
                <select 
                  value={form.employment} 
                  onChange={(e) => update("employment", e.target.value as (typeof EMPLOYMENT)[number])} 
                  className="input-base text-base bg-slate-900"
                >
                  {EMPLOYMENT.map((c) => <option key={c} className="bg-slate-900">{c}</option>)}
                </select>
              </Field>

              <Field label="6-Month Bank Statement Available?" className="sm:col-span-2">
                <div className="flex gap-3">
                  {(["Yes", "No"] as const).map((v) => (
                    <motion.button
                      whileTap={{ scale: 0.98 }}
                      key={v}
                      type="button"
                      onClick={() => update("bankStatement", v)}
                      className={`flex-1 rounded-lg border px-4 py-3 text-sm font-medium transition active:scale-[0.99] ${
                        form.bankStatement === v
                          ? "border-gold/60 bg-gold/10 text-gold"
                          : "border-white/10 text-muted-foreground active:bg-white/5 active:border-white/20"
                      }`}
                    >
                      {v}
                    </motion.button>
                  ))}
                </div>
              </Field>

              <div className="sm:col-span-2 mt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/5 pt-6">
                <p className="text-xs text-muted-foreground text-center sm:text-left">
                  Opens WhatsApp with your details pre-filled.
                </p>
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  type="submit"
                  disabled={submitting}
                  className="w-full sm:w-auto group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-amber-300 via-amber-400 to-amber-600 px-6 py-3.5 text-sm font-semibold uppercase tracking-[0.18em] text-slate-950 gold-glow gold-glow-hover transition-transform disabled:opacity-60"
                >
                  {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                  Send via WhatsApp
                </motion.button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Field({
  label, error, className, children,
}: { label: string; error?: string; className?: string; children: React.ReactNode }) {
  return (
    <label className={`flex flex-col gap-2 w-full ${className ?? ""}`}>
      <span className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">{label}</span>
      {children}
      {error && <span className="text-xs text-destructive font-medium mt-0.5">{error}</span>}
    </label>
  );
}