import { type ReactNode, useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { SiteNav } from "./SiteNav";
import { SiteFooter } from "./SiteFooter";
import { WhatsAppFloat } from "./WhatsAppFloat";
import AnnouncementBar from "./AnnouncementBar";

export function Layout({ children, className = "" }: { children: ReactNode; className?: string }) {
  const { scrollY } = useScroll();
  const [hideAnnouncement, setHideAnnouncement] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    // Hide announcement only after scrolling past 150px
    if (latest > previous && latest > 150) {
      setHideAnnouncement(true);
    } else {
      setHideAnnouncement(false);
    }
  });

  return (
    <div className={`relative min-h-screen ${className}`}>
      {/* --- HEADER STACK --- */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <motion.div
          variants={{
            visible: { height: "auto", opacity: 1 },
            hidden: { height: 0, opacity: 0, overflow: "hidden" },
          }}
          animate={hideAnnouncement ? "hidden" : "visible"}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <AnnouncementBar />
        </motion.div>
        
        {/* SiteNav stays fixed at the top always */}
        <SiteNav />
      </div>
      
      {/* 
        Note: The top padding here should match the height of 
        the Nav only, since the AnnouncementBar disappears.
      */}
      <main className="pt-[80px]">
        {children}
      </main>
      
      <SiteFooter />
      <WhatsAppFloat />
    </div>
  );
}