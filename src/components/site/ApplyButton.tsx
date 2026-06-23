import { ArrowUpRight } from "lucide-react";
import { useApplyModal } from "./ApplyModalProvider";

interface Props {
  size?: "sm" | "lg";
  full?: boolean;
  label?: string;
  preset?: { destination?: string; category?: string };
}

export function ApplyButton({ size = "lg", full, label = "Apply Now", preset }: Props) {
  const { open } = useApplyModal();
  const sizing =
    size === "sm" ? "h-9 px-4 text-xs" : "h-12 px-7 text-sm";
  return (
    <button
      type="button"
      onClick={() => open(preset)}
      className={`group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full border border-gold/50 bg-gradient-to-r from-amber-300 via-amber-400 to-amber-600 font-medium uppercase tracking-[0.18em] text-slate-950 gold-glow gold-glow-hover transition-transform duration-500 ease-out hover:scale-[1.03] ${sizing} ${full ? "w-full" : ""}`}
    >
      <span className="relative z-10">{label}</span>
      <ArrowUpRight className="relative z-10 h-4 w-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
    </button>
  );
}
