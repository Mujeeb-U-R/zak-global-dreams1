import { Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Mail, MapPin, Facebook, Instagram } from "lucide-react";
import { ApplyButton } from "./ApplyButton";
import { SITE } from "@/lib/site";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/portfolio", label: "Visa Routes" },
  { to: "/news", label: "News" },
  { to: "/gallery", label: "Gallery" },
  { to: "/faq", label: "FAQ" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 w-full flex flex-col"
    >
      <div className="w-full bg-slate-950 text-slate-400 border-b border-white/5 text-[11px] font-medium tracking-wide">
        <div className="mx-auto max-w-7xl h-9 px-6 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <a 
              href={`mailto:${SITE.email}`} 
              className="flex items-center gap-2 hover:text-white transition-colors"
            >
              <Mail className="h-3.5 w-3.5 text-gold" />
              <span>{SITE.email}</span>
            </a>
            <div className="hidden lg:flex items-center gap-2">
              <MapPin className="h-3.5 w-3.5 text-gold" />
              <span>{SITE.address}</span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-4 text-slate-400 border-l border-r border-white/10 px-6 h-full">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              <Facebook className="h-3.5 w-3.5" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              <Instagram className="h-3.5 w-3.5" />
            </a>
            <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.01.08 1.53.63 3.02 1.6 4.17 1.12 1.32 2.75 2.15 4.43 2.3v3.83c-1.7-.06-3.38-.63-4.74-1.68-.26-.2-.5-.42-.73-.65v6.43c.02 3.8-2.5 7.42-6.25 8.16-3.88.87-8.12-1.2-9.45-4.96C-.2 13.56 1.42 8.91 5.4 7.74c1.4-.43 2.9-.38 4.25.18v3.91c-1.12-.54-2.46-.53-3.55.07-1.37.72-2.13 2.27-1.89 3.82.3 1.83 2.05 3.16 3.89 2.87 1.48-.2 2.63-1.42 2.76-2.92.01-1.83.01-11.66.01-15.61h1.65z"/>
              </svg>
            </a>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <Link to="/faq" className="hover:text-white transition-colors">Support</Link>
            <span className="text-white/10">|</span>
            <Link to="/contact" className="hover:text-white transition-colors">Location Map</Link>
          </div>
        </div>
      </div>

      <div 
        className={`w-full transition-all duration-300 bg-[#0f172b] border-b border-slate-800/60 backdrop-blur-md flex items-center ${
          scrolled ? "h-16" : "h-20"
        }`}
      >
        <div className="mx-auto w-full max-w-7xl px-6 flex items-center justify-between">
          
          {/* UPDATED: Branding block wrapped in Link component to navigate to Home */}
          <Link to="/" className="group flex items-center gap-3">
            <img
              src={SITE.logo}
              alt="ZAK Consultants logo"
              className="h-10 w-10 rounded-full border-2 border-gold/40 object-contain bg-transparent p-1 transition-transform group-hover:scale-105"
              width={40}
              height={40}
            />
            <span className="flex flex-col leading-tight">
              <span className="font-display text-base font-semibold tracking-wide text-white group-hover:text-gold transition-colors">
                ZAK Consultants
              </span>
              <span className="text-[10px] uppercase tracking-[0.3em] text-slate-400">
                Pvt. Ltd.
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="relative text-sm font-medium text-slate-300 transition-colors hover:text-gold-deep nav-link-no-lift"
                activeProps={{ className: "!text-gold" }}
              >
                {({ isActive }) => (
                  <>
                    {item.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute -bottom-1.5 left-0 right-0 h-px bg-gold"
                      />
                    )}
                  </>
                )}
              </Link>
            ))}
          </nav>

          <div className="hidden md:block">
            <ApplyButton size="sm" />
          </div>

          <motion.button
            type="button"
            onClick={() => setOpen((s) => !s)}
            whileTap={{ scale: 0.92 }}
            className="md:hidden text-white p-2 -mr-2 flex items-center justify-center rounded-lg active:bg-white/5 transition-colors"
            aria-label="Menu"
          >
            {open ? <X className="h-5 w-5 text-gold" /> : <Menu className="h-5 w-5" />}
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="absolute left-0 right-0 border-b border-slate-800/60 bg-[#0f172b]/95 backdrop-blur-xl p-6 md:hidden shadow-2xl z-40"
            style={{ top: scrolled ? "calc(36px + 4rem)" : "calc(36px + 5rem)" }}
          >
            <div className="flex flex-col gap-1.5">
              {NAV.map((item) => (
                <motion.div 
                  key={item.to}
                  whileTap={{ scale: 0.98 }}
                  className="w-full"
                >
                  <Link
                    to={item.to}
                    onClick={() => setOpen(false)}
                    className="block rounded-xl px-4 py-3 text-sm text-slate-300 font-medium active:bg-white/10 active:text-gold transition-all"
                    activeProps={{ className: "!text-gold bg-white/[0.03]" }}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <div className="mt-4 pt-4 border-t border-white/5">
                <ApplyButton size="sm" full />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}