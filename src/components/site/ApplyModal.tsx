import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Send, Loader2, CheckCircle } from "lucide-react";
import { z } from "zod";
import { VISA_CATALOG } from "@/lib/site";

const schema = z.object({
  firstName: z.string().trim().min(2, "Please enter your first name").max(50),
  lastName: z.string().trim().min(2, "Please enter your last name").max(50),
  phone: z.string().trim().min(7, "Enter a valid phone number").max(20),
  destination: z.string().trim().min(2).max(60),
  category: z.enum(["Work Permit", "Visit Visa", "Group Tour + Visit Visa", "Student Visa"]),
  employment: z.enum(["Employed", "Unemployed", "Business Owner", "Student", "other"]),
  bankStatement: z.enum(["Yes", "No"]),
});

const CATEGORIES = ["Work Permit", "Visit Visa", "Group Tour", "Student Visa"] as const;
const EMPLOYMENT = ["Employed", "Unemployed", "Business Owner", "Student", "other"] as const;

interface Props {
  isOpen: boolean;
  onClose: () => void;
  preset?: { destination?: string; category?: string };
}

export function ApplyModal({ isOpen, onClose, preset }: Props) {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    Phone: "",
    Destination: "",
    Category: "Visit Visa" as (typeof CATEGORIES)[number],
    Employment: "Employed" as (typeof EMPLOYMENT)[number],
    BankStatement: "Yes" as "Yes" | "No",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formStatus, setFormStatus] = useState<"IDLE" | "SUBMITTING" | "SUCCESS" | "ERROR">("IDLE");

  useEffect(() => {
    if (isOpen && preset) {
      setForm((f) => ({
        ...f,
        destination: preset.destination ?? f.destination,
        category: (CATEGORIES as readonly string[]).includes(preset.category ?? "")
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

  const handleFormspreeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Adjust category payload mapping context if validation requires strict sync with schema
    const computedPayload = {
      ...form,
      category: form.category === "Group Tour" ? "Group Tour + Visit Visa" : form.category
    };

    const result = schema.safeParse(computedPayload);
    
    if (!result.success) {
      const errs: Record<string, string> = {};
      for (const issue of result.error.issues) {
        errs[issue.path.join(".")] = issue.message;
      }
      setErrors(errs);
      return;
    }
    
    setErrors({});
    setFormStatus("SUBMITTING");

    const { firstName, lastName, ...rest } = result.data;
    const computedFullName = `${firstName} ${lastName}`.trim();

    try {
      const response = await fetch("https://formspree.io/f/mjgqoevn", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          FullName: computedFullName,
          ...rest
        }),
      });

      if (response.ok) {
        setFormStatus("SUCCESS");
        setForm({
          firstName: "",
          lastName: "",
          phone: "",
          destination: "",
          category: "Visit Visa",
          employment: "Employed",
          bankStatement: "Yes",
        });
        
        setTimeout(() => {
          setFormStatus("IDLE");
          onClose();
        }, 2500);
      } else {
        setFormStatus("ERROR");
      }
    } catch (err) {
      console.error("Formspree data transmission failed:", err);
      setFormStatus("ERROR");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-hidden bg-slate-950/60 backdrop-blur-md"
        >
          <div className="absolute inset-0" onClick={onClose} />

          {/* FIXED: Form popup layout constrained cleanly to max-h-[90vh] across all screens */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-2xl max-h-[90vh] bg-[#f2f2f4] border border-stone-200/60 rounded-3xl p-6 sm:p-10 shadow-[0_30px_100px_-15px_rgba(0,0,0,0.35)] flex flex-col overflow-hidden"
          >
            {/* Close Button Trigger */}
            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={onClose}
              className="absolute right-4 top-4 z-50 p-2.5 rounded-full border border-stone-200 bg-white text-stone-700 shadow-sm transition-colors hover:bg-stone-50 hover:text-amber-800 flex items-center justify-center"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </motion.button>

            {/* FIXED ACCESSIBILITY VIEWPORT POPUP OVERLAY */}
            <AnimatePresence>
              {formStatus === "SUCCESS" && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  className="absolute inset-0 z-[60] bg-white/95 backdrop-blur-md flex flex-col items-center justify-center text-center p-8"
                >
                  <motion.div
                    initial={{ scale: 0.6, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.1, type: "spring", stiffness: 200, damping: 15 }}
                    className="h-16 w-16 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center text-emerald-600 mb-5 shadow-sm"
                  >
                    <CheckCircle className="h-8 w-8 stroke-[1.8]" />
                  </motion.div>
                  
                  <h3 className="font-display text-2xl sm:text-3xl text-stone-900 font-bold tracking-tight">
                    Form sent successfully!
                  </h3>
                  <p className="mt-3 text-base text-stone-600 max-w-sm font-normal leading-relaxed">
                    Your assessment portfolio has been routed to our compliance desk. A senior consultant will follow up shortly.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Inner Scroll Wrapper: Houses inner content comfortably to prevent top/bottom cutoff */}
            <div className="overflow-y-auto pr-1 sm:pr-2 scrollbar-thin flex-1 w-full">
              <header className="mb-6 pr-12">
                <p className="text-xs uppercase tracking-[0.3em] font-semibold text-amber-800">Visa Assessment</p>
                <h2 className="mt-2 font-display text-3xl sm:text-4xl font-bold text-stone-900 leading-tight">
                  Begin your <span className="text-gold-gradient italic font-normal">journey</span>
                </h2>
                <p className="mt-2 text-sm sm:text-base text-stone-600">
                  Share your background metrics. Our compliance unit will assess your credentials and dispatch strategy data straight to you.
                </p>
              </header>

              <form onSubmit={handleFormspreeSubmit} className="grid gap-5 sm:grid-cols-2">
                <Field label="First Name" error={errors.firstName}>
                  <input
                    value={form.firstName}
                    onChange={(e) => update("firstName", e.target.value)}
                    placeholder="Enter your first name"
                    className="input-base text-base bg-white border-stone-300 text-stone-900 placeholder-stone-400 focus:border-amber-600"
                  />
                </Field>

                <Field label="Last Name" error={errors.lastName}>
                  <input
                    value={form.lastName}
                    onChange={(e) => update("lastName", e.target.value)}
                    placeholder="Enter your last name"
                    className="input-base text-base bg-white border-stone-300 text-stone-900 placeholder-stone-400 focus:border-amber-600"
                  />
                </Field>

                <Field label="Phone Number" error={errors.phone}>
                  <input
                    value={form.phone}
                    onChange={(e) => update("phone", e.target.value)}
                    type="tel"
                    placeholder="+92 3xx xxxxxxx"
                    className="input-base text-base bg-white border-stone-300 text-stone-900 placeholder-stone-400 focus:border-amber-600"
                  />
                </Field>

                <Field label="Destination Country" error={errors.destination}>
                  <input
                    value={form.destination}
                    onChange={(e) => update("destination", e.target.value)}
                    list="modal-dest-list"
                    placeholder="e.g. Turkey"
                    className="input-base text-base bg-white border-stone-300 text-stone-900 placeholder-stone-400 focus:border-amber-600"
                  />
                  <datalist id="modal-dest-list">
                    {VISA_CATALOG.flatMap((c) => c.countries).map((c) => (
                      <option key={c} value={c} />
                    ))}
                  </datalist>
                </Field>

                <Field label="Visa Category">
                  <select 
                    value={form.category} 
                    onChange={(e) => update("category", e.target.value as (typeof CATEGORIES)[number])} 
                    className="input-base text-base bg-white border-stone-300 text-stone-900 focus:border-amber-600"
                  >
                    {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </Field>

                <Field label="Employment Status">
                  <select 
                    value={form.employment} 
                    onChange={(e) => update("employment", e.target.value as (typeof EMPLOYMENT)[number])} 
                    className="input-base text-base bg-white border-stone-300 text-stone-900 focus:border-amber-600"
                  >
                    {EMPLOYMENT.map((c) => <option key={c} value={c}>{c}</option>)}
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
                        className={`flex-1 rounded-xl border px-4 py-3.5 text-base font-semibold transition shadow-sm ${
                          form.bankStatement === v
                            ? "border-amber-600 bg-amber-500/10 text-amber-800"
                            : "border-stone-300 bg-white text-stone-600 hover:bg-stone-50"
                        }`}
                      >
                        {v}
                      </motion.button>
                    ))}
                  </div>
                </Field>

                <div className="sm:col-span-2 mt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-stone-200 pt-6 pb-2">
                  <div className="text-center sm:text-left min-h-[32px] flex items-center">
                    {formStatus === "ERROR" && (
                      <p className="text-sm text-rose-600 font-semibold">
                        Transmission error. Please verify fields and try again.
                      </p>
                    )}
                    {formStatus === "SUBMITTING" && (
                      <p className="text-sm text-amber-700 font-medium animate-pulse">
                        Encrypting portfolio records...
                      </p>
                    )}
                  </div>
                  
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    type="submit"
                    disabled={formStatus === "SUBMITTING"}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 px-8 py-3.5 text-base font-bold uppercase tracking-[0.15em] text-slate-950 shadow-md transition-all disabled:opacity-50"
                  >
                    {formStatus === "SUBMITTING" ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      <Send className="h-4 w-4" />
                    )}
                    Submit Profile
                  </motion.button>
                </div>
              </form>
            </div>
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
    <label className={`flex flex-col gap-1.5 w-full ${className ?? ""}`}>
      {/* FIXED: Upgraded layout typography sizing parameters and contrast colors */}
      <span className="text-xs sm:text-sm uppercase tracking-[0.15em] font-semibold text-amber-900">{label}</span>
      {children}
      {error && <span className="text-xs text-rose-600 font-semibold mt-0.5">{error}</span>}
    </label>
  );
}