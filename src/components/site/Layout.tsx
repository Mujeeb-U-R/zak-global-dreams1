import type { ReactNode } from "react";
import { SiteNav } from "./SiteNav";
import { SiteFooter } from "./SiteFooter";
import { WhatsAppFloat } from "./WhatsAppFloat";
import AnnouncementBar from "./AnnouncementBar";

export function Layout({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`relative min-h-screen ${className}`}>
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 left-1/2 h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-amber-500/[0.05] blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-amber-700/[0.04] blur-[140px]" />
      </div>

      {/* Wrapping both in a fixed container */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <AnnouncementBar />
        <SiteNav />
      </div>
      
      {/* 
        Adjust pt-[120px] to match the exact combined height 
        of your AnnouncementBar and SiteNav.
      */}
      <main className="pt-[140px]">
        {children}
      </main>
      
      <SiteFooter />

      <WhatsAppFloat />
    </div>
  );
}