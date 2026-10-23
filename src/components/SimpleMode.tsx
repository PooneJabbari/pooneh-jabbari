"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import HeroSection from "./HeroSection";
import AboutSection from "./AboutSection";
import ExperienceSection from "./ExperienceSection";
import SkillsSection from "./SkillsSection";
import EducationSection from "./EducationSection";
import ContactSection from "./ContactSection";
import Footer from "./Footer";
import content from "@/data/content.json";
import { Gamepad2 } from "lucide-react";
import { useGamification } from "@/contexts/GamificationContext";

const CustomCursor = dynamic(() => import("./CustomCursor"), {
  ssr: false,
});

const InteractiveBackground = dynamic(
  () =>
    import("./Scene3D").then((mod) => ({ default: mod.InteractiveBackground })),
  { ssr: false }
);

export default function SimpleMode() {
  const router = useRouter();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDesktop, setIsDesktop] = useState(false);
  const { completeAction } = useGamification();

  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    checkDesktop();
    window.addEventListener("resize", checkDesktop);
    return () => window.removeEventListener("resize", checkDesktop);
  }, []);

  useEffect(() => {
    // Listen for 3D scene interaction
    const handleScene3DInteraction = () => {
      completeAction("action_3");
    };

    window.addEventListener("scene3d-interaction", handleScene3DInteraction);
    return () =>
      window.removeEventListener(
        "scene3d-interaction",
        handleScene3DInteraction
      );
  }, [completeAction]);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const handleScroll = () => {
      if (
        scrollContainer.scrollTop + scrollContainer.clientHeight >=
        scrollContainer.scrollHeight - 100
      ) {
        completeAction("action_5");
        scrollContainer.removeEventListener("scroll", handleScroll);
      }
    };

    scrollContainer.addEventListener("scroll", handleScroll, { passive: true });
    return () => scrollContainer.removeEventListener("scroll", handleScroll);
  }, [completeAction]);

  return (
    <div
      ref={scrollRef}
      className="relative snap-y snap-proximity h-screen overflow-y-scroll cursor-none simple-mode-container"
    >
      {/* Custom Cursor */}
      <CustomCursor />

      {/* Static Interactive Glassmorphic Background - Full Page */}
      <div className="fixed inset-0 -z-20 pointer-events-none">
        <InteractiveBackground />
      </div>

      {/* Switch to Game Mode button (desktop only) */}
      {isDesktop && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.3 }}
          onClick={() => {
            completeAction("action_7");
            router.push("/");
          }}
          className="fixed top-6 right-6 z-50 flex items-center gap-2 px-3 py-2 text-foreground/55 hover:text-foreground/75 transition-colors pointer-events-auto"
        >
          <Gamepad2 size={14} />
          <span className="text-xs">
            {content.gameMode.buttons.switchToGame}
          </span>
        </motion.button>
      )}

      {/* Traditional Scrolling Sections */}
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <SkillsSection />
      <EducationSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
