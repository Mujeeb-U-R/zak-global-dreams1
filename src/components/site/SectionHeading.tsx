import { motion } from "framer-motion";

interface Props {
  eyebrow?: string;
  title: React.ReactNode;
  intro?: string;
  align?: "left" | "center";
}

export function SectionHeading({ eyebrow, title, intro, align = "left" }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`max-w-3xl ${align === "center" ? "mx-auto text-center" : ""}`}
    >
      {eyebrow && (
        <p className="text-[10px] uppercase tracking-[0.4em] text-gold">{eyebrow}</p>
      )}
      <h2 className="mt-4 font-display text-4xl leading-[1.05] text-foreground sm:text-5xl md:text-6xl">
        {title}
      </h2>
      {intro && (
        <p className="mt-5 max-w-2xl font-serif text-lg italic leading-relaxed text-muted-foreground">
          {intro}
        </p>
      )}
    </motion.div>
  );
}
