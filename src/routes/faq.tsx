import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle, MessageSquare, ShieldCheck, FileText } from "lucide-react";
import { Layout } from "@/components/site/Layout";
import { SectionHeading } from "@/components/site/SectionHeading";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "Frequently Asked Questions — ZAK Consultants" },
      { name: "description", content: "Find answers about visa processing times, required documentation, work permit registration, and legal compliance at ZAK Consultants." },
      { property: "og:title", content: "Frequently Asked Questions" },
      { property: "og:description", content: "Clear, transparent answers to your immigration and travel queries." },
    ],
  }),
  component: FAQPage,
});

const CATEGORIES = ["All", "Process", "Documentation", "Work Permits", "Compliance"] as const;

const FAQ_DATA = [
  {
    category: "Process",
    question: "What is your average processing timeline for a visit or work visa?",
    answer: "Timelines vary heavily by destination. For instance, Turkey and Kyrgyzstan work permits typically take between 45 to 90 days for complete profiling, verification, and government issuance. Standard visit visas or tourist routes can range from 2 to 6 weeks depending on embassy appointment queues.",
  },
  {
    category: "Documentation",
    question: "What financial documents do I need to prepare for a student or visit route?",
    answer: "Most jurisdictions require a closing bank statement covering the last 3 to 6 months alongside an account maintenance certificate. The required closing balance depends strictly on your destination country's baseline living expense index. Our consultants cross-check your statement thresholds before finalizing embassy files.",
  },
  {
    category: "Work Permits",
    question: "Are your corporate group or individual work permits legally registered?",
    answer: "Absolutely. ZAK Consultants is a registered Private Limited firm in Pakistan. Every work permit route we file undergoes strict regulatory screening, legal employer verification in the host country, and complete compliance profiling before embassy submission.",
  },
  {
    category: "Compliance",
    question: "Do you guarantee visa approval?",
    answer: "No legitimate consultancy can guarantee a visa, as final approval rests solely with the respective country's consular officers. However, we maintain a 99% approval track record by implementing rigorous pre-screening metrics; if your legal profiling or financial matrix doesn't safely meet embassy thresholds, we will advise restructuring your case before filing.",
  },
  {
    category: "Documentation",
    question: "Can you help me structure my Statement of Purpose (SOP) for student paths?",
    answer: "Yes. Our senior consultants review and structure study gap explanations, statements of purpose, and source-of-income document trails to optimize your evaluation layout for first-attempt success.",
  },
  {
    category: "Process",
    question: "How do I begin my assessment path with ZAK Consultants?",
    answer: "You can initiate your process by clicking any 'Check Eligibility' button across our portal to open a tailored assessment window. Alternatively, you can drop a quick inquiry that goes directly to our team via WhatsApp, or visit our central office in Peshawar for a full, physical case consultation.",
  },
  {
    category: "Process",
    question: "How long does the complete document profiling and case structure process take?",
    answer: "On average, thorough case profiling and document engineering take 7 to 14 business days. This precise preparation timeline ensures all bank statements, sponsorship matrices, and legal declarations are perfectly cross-checked against strict embassy thresholds before official filing.",
  },
  {
    category: "Documentation",
    question: "What happens if my financial documentation does not meet current embassy thresholds?",
    answer: "If your financial metrics or bank statement timelines fall short of current regulatory requirements, our consultancy team will immediately notify you. We will advise you on structural adjustments rather than submitting a weak file, ensuring your application is only submitted when it safely clears all compliance benchmarks.",
  },
  {
    category: "Process",
    question: "Can I track the real-time operational status of my visa application route?",
    answer: "Yes. Our compliance desk maintains transparent milestone logs for every active case file. Clients receive direct operational telemetry updates at critical intervals, including document attestation clearances, appointment scheduling confirmation, and final submission updates.",
  },
  {
    category: "Compliance",
    question: "Does your team provide one-on-one preparation sessions for embassy interviews?",
    answer: "Absolutely. For routes requiring a personal embassy appearance or visa officer interview, we conduct rigorous mock sessions based on real historical criteria. We evaluate communication loops, document navigation, and profiling parameters to ensure absolute confidence.",
  }
];

function FAQPage() {
  const [activeTab, setActiveTab] = useState<(typeof CATEGORIES)[number]>("All");
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const filteredFaqs = FAQ_DATA.filter(
    (faq) => activeTab === "All" || faq.category === activeTab
  );

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const getIcon = (cat: string) => {
    switch (cat) {
      case "Process": return <MessageSquare className="h-4 w-4 text-[#b88939]" />;
      case "Documentation": return <FileText className="h-4 w-4 text-[#b88939]" />;
      case "Work Permits": return <ShieldCheck className="h-4 w-4 text-[#b88939]" />;
      default: return <HelpCircle className="h-4 w-4 text-[#b88939]" />;
    }
  };

  return (
    <div className="min-h-screen text-slate-800" style={{ backgroundColor: "#FAF7F2" }}>
      <Layout>
        {/* --- HERO SECTION --- */}
        <section className="relative overflow-hidden pb-12 pt-16">
          <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[480px]">
            <div className="absolute inset-0 bg-[radial-gradient(#b889390a_1px,transparent_1px)] [background-size:24px_24px]" />
            <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-[#FAF7F2]/80 to-[#FAF7F2]" />
          </div>
          
          <div className="mx-auto max-w-4xl px-6 pt-12 text-center">
            <SectionHeading
              eyebrow="Help Desk"
              title={<>Clear answers for your <span className="text-[#b88939] italic font-normal">global</span> journey</>}
              intro="Everything you need to know about documentation thresholds, legal processing, and case workflows."
            />

            {/* CATEGORY SELECTOR PILLS */}
            <div className="mt-12 flex flex-wrap justify-center gap-2 relative z-10">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setActiveTab(cat);
                    setExpandedIndex(null);
                  }}
                  className={`relative rounded-full border px-5 py-2.5 text-xs uppercase tracking-[0.18em] transition-all duration-300 font-medium ${
                    activeTab === cat
                      ? "border-[#b88939]/30 bg-[#b88939]/10 text-[#b88939] shadow-sm"
                      : "border-slate-200/80 bg-white text-slate-500 hover:border-[#b88939]/30 hover:text-slate-900 shadow-sm"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* --- FAQ ACCORDION CONSOLE --- */}
        <section className="pb-32 relative z-10">
          <div className="mx-auto max-w-3xl px-6">
            <div className="space-y-4">
              <AnimatePresence mode="popLayout">
                {filteredFaqs.map((faq, index) => {
                  const isExpanded = expandedIndex === index;

                  return (
                    <motion.div
                      key={faq.question}
                      layout
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-300 shadow-xl shadow-slate-900/[0.02]"
                    >
                      <button
                        onClick={() => toggleExpand(index)}
                        className="flex w-full items-center justify-between p-6 text-left transition-colors duration-300 hover:bg-[#FAF7F2]/50"
                      >
                        <div className="flex items-start gap-4 pr-4">
                          <div className="mt-1 shrink-0 rounded-lg bg-[#FAF7F2] p-2 border border-[#b88939]/10">
                            {getIcon(faq.category)}
                          </div>
                          <div>
                            <span className="text-[10px] font-mono uppercase tracking-widest text-[#b88939] block mb-1 font-semibold">
                              {faq.category}
                            </span>
                            <h3 className="font-display text-base md:text-lg text-slate-900 font-medium tracking-wide">
                              {faq.question}
                            </h3>
                          </div>
                        </div>
                        
                        <div className="shrink-0 rounded-full border border-slate-100 p-1.5 bg-slate-50/50 text-slate-400">
                          <ChevronDown 
                            className={`h-4 w-4 transition-transform duration-500 ease-out text-[#b88939] ${
                              isExpanded ? "rotate-180" : "rotate-0"
                            }`} 
                          />
                        </div>
                      </button>

                      {/* COLLAPSIBLE ACCORDION RESPONSE PANEL */}
                      <AnimatePresence initial={false}>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                          >
                            <div className="border-t border-slate-100 bg-[#FAF7F2]/40 px-6 pb-6 pt-4 ml-14 mr-6 mb-2 rounded-xl">
                              <p className="font-serif text-sm md:text-base leading-relaxed text-slate-600 italic">
                                "{faq.answer}"
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>
        </section>
      </Layout>
    </div>
  );
}