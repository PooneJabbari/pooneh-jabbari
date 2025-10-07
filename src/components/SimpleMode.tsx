"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import HeroSection from "./HeroSection";
import AboutSection from "./AboutSection";
import ExperienceSection from "./ExperienceSection";
import SkillsSection from "./SkillsSection";
import EducationSection from "./EducationSection";
import ContactSection from "./ContactSection";
import Footer from "./Footer";
import CustomCursor from "./CustomCursor";
import { InteractiveBackground } from "./Scene3D";
import content from "@/data/content.json";
import { Gamepad2 } from "lucide-react";

export default function SimpleMode() {
  const router = useRouter();
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    checkDesktop();
    window.addEventListener("resize", checkDesktop);
    return () => window.removeEventListener("resize", checkDesktop);
  }, []);

  return (
    <div className="relative snap-y snap-proximity h-screen overflow-y-scroll cursor-none">
      {/* Custom Cursor */}
      <CustomCursor />

      {/* Static Interactive Glassmorphic Background - Full Page */}
      <div className="fixed inset-0 -z-20 pointer-events-none">
        <InteractiveBackground />
      </div>

      {/* Switch to Game Mode button (desktop only) */}
      {isDesktop && (
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1 }}
          onClick={() => router.push("/")}
          className="fixed top-6 right-6 z-50 glass-strong px-6 py-3 rounded-full hover:shadow-lg hover:shadow-primary-500/50 transition-all pointer-events-auto"
        >
          <span className="inline-flex items-center gap-2">
            <Gamepad2 size={16} className="text-primary-400" />
            <span className="text-sm font-semibold bg-gradient-to-r from-primary-400 to-primary-500 bg-clip-text text-transparent">
              {content.gameMode.buttons.switchToGame}
            </span>
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
