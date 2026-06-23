import { Link } from "@tanstack/react-router";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { SITE } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="relative mt-32 border-t border-white/5">
      <div className="hairline absolute inset-x-0 top-0" />
      <div className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-lg border border-gold/40 bg-gold/5 font-display text-xl text-gold-gradient">
                Z
              </span>
              <div className="flex flex-col leading-tight">
                <span className="font-display text-lg text-foreground">ZAK Consultants</span>
                <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                  Pvt. Ltd.
                </span>
              </div>
            </div>
            <p className="mt-6 max-w-sm font-serif text-lg italic text-muted-foreground">
              “{SITE.tagline}”
            </p>
            <p className="mt-6 text-xs uppercase tracking-[0.25em] text-gold/80">
              {SITE.legal}
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-xs uppercase tracking-[0.25em] text-gold">Navigate</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/" className="hover:text-foreground">Home</Link></li>
              <li><Link to="/about" className="hover:text-foreground">About</Link></li>
              <li><Link to="/portfolio" className="hover:text-foreground">Visa Routes</Link></li>
              <li><Link to="/gallery" className="hover:text-foreground">Success Gallery</Link></li>
              <li><Link to="/contact" className="hover:text-foreground">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-xs uppercase tracking-[0.25em] text-gold">Office</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex gap-3"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" /><span>{SITE.address}</span></li>
              <li className="flex gap-3"><Clock className="mt-0.5 h-4 w-4 shrink-0 text-gold" /><span>{SITE.hours}</span></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-xs uppercase tracking-[0.25em] text-gold">Connect</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex gap-3"><Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold" /><a href={`tel:+${SITE.whatsappNumber}`} className="hover:text-foreground">{SITE.phoneDisplay}</a></li>
              <li className="flex gap-3"><Mail className="mt-0.5 h-4 w-4 shrink-0 text-gold" /><a href={`mailto:${SITE.email}`} className="hover:text-foreground">{SITE.email}</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-3 border-t border-white/5 pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <span>© {new Date().getFullYear()} ZAK Consultants (Pvt.) Ltd. All rights reserved.</span>
          <span>Crafted with precision in Peshawar, Pakistan.</span>
        </div>
      </div>
    </footer>
  );
}
