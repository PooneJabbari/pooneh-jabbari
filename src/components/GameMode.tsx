"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence, useDragControls } from "framer-motion";
import {
  X,
  Minimize2,
  Maximize2,
  Mail,
  Phone,
  Linkedin,
  CodeXml,
  BriefcaseBusiness,
  Download,
  ScrollText,
} from "lucide-react";
import AboutSection from "./AboutSection";
import ExperienceSection from "./ExperienceSection";
import SkillsSection from "./SkillsSection";
import EducationSection from "./EducationSection";
import ContactSection from "./ContactSection";
import KeyboardHint from "./KeyboardHint";
import DraggableBubble from "./DraggableBubble";
import CustomCursor from "./CustomCursor";
import content from "@/data/content.json";

type SectionId = "about" | "experience" | "skills" | "education" | "contact";

interface SectionModal {
  id: SectionId;
  title: string;
  component: React.ReactNode;
  initialPosition: { x: number; y: number };
  isVisible: boolean;
  isMinimized: boolean;
}

export default function GameMode() {
  const router = useRouter();
  const [modals, setModals] = useState<Record<SectionId, SectionModal>>({
    about: {
      id: "about",
      title: "About Me",
      component: <AboutSection />,
      initialPosition: { x: 100, y: 100 },
      isVisible: false,
      isMinimized: false,
    },
    experience: {
      id: "experience",
      title: "Experience",
      component: <ExperienceSection />,
      initialPosition: { x: 150, y: 150 },
      isVisible: false,
      isMinimized: false,
    },
    skills: {
      id: "skills",
      title: "Skills",
      component: <SkillsSection />,
      initialPosition: { x: 200, y: 200 },
      isVisible: false,
      isMinimized: false,
    },
    education: {
      id: "education",
      title: "Education",
      component: <EducationSection />,
      initialPosition: { x: 250, y: 250 },
      isVisible: false,
      isMinimized: false,
    },
    contact: {
      id: "contact",
      title: "Contact",
      component: <ContactSection />,
      initialPosition: { x: 300, y: 300 },
      isVisible: false,
      isMinimized: false,
    },
  });

  const showModal = (id: SectionId) => {
    setModals((prev) => ({
      ...prev,
      [id]: { ...prev[id], isVisible: true, isMinimized: false },
    }));
  };

  const hideModal = (id: SectionId) => {
    setModals((prev) => ({
      ...prev,
      [id]: { ...prev[id], isVisible: false },
    }));
  };

  const toggleMinimize = (id: SectionId) => {
    setModals((prev) => ({
      ...prev,
      [id]: { ...prev[id], isMinimized: !prev[id].isMinimized },
    }));
  };

  return (
    <div className="fixed inset-0 overflow-hidden bg-background cursor-none">
      {/* Custom Cursor */}
      <CustomCursor />

      {/* Center Video with Name and Contact */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="relative flex flex-col items-center gap-6">
          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary-400 via-primary-500 to-primary-600 bg-clip-text text-transparent"
          >
            {content.personal.name}
          </motion.h1>

          {/* Video */}
          <div className="w-96 h-96 rounded-full border-2 border-primary-500/30 flex items-center justify-center">
            <video
              className="w-80 h-80 rounded-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              ref={(video) => {
                if (video) {
                  (video as HTMLVideoElement).playbackRate = 3;
                }
              }}
            >
              <source src="/model/blink.mp4" type="video/mp4" />
            </video>
          </div>

          {/* Quick Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-wrap items-center justify-center gap-4 pointer-events-auto"
          >
            <a
              href={`mailto:${content.contact.email}`}
              className="glass px-4 py-2 rounded-full text-sm hover:glass-strong transition-all hover:scale-105 flex items-center gap-2"
            >
              <Mail size={16} className="text-primary-400" />
              <span>Email</span>
            </a>
            <a
              href={`tel:${content.contact.phone}`}
              className="glass px-4 py-2 rounded-full text-sm hover:glass-strong transition-all hover:scale-105 flex items-center gap-2"
            >
              <Phone size={16} className="text-primary-400" />
              <span>Call</span>
            </a>
            <a
              href={content.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="glass px-4 py-2 rounded-full text-sm hover:glass-strong transition-all hover:scale-105 flex items-center gap-2"
            >
              <Linkedin size={16} className="text-primary-400" />
              <span>LinkedIn</span>
            </a>
            <a
              href="/resume/PoonehJabbariResume.pdf"
              download
              className="glass px-4 py-2 rounded-full text-sm hover:glass-strong transition-all hover:scale-105 flex items-center gap-2"
            >
              <Download size={16} className="text-primary-400" />
              <span>Resume</span>
            </a>
          </motion.div>
        </div>
      </div>

      {/* Switch to Simple Mode button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        onClick={() => router.push("/simple")}
        className="absolute top-8 left-8 flex items-center gap-2 px-3 py-2 text-foreground/55 hover:text-foreground/75 transition-colors pointer-events-auto"
      >
        <ScrollText size={14} />
        <span className="text-xs">
          {content.gameMode.buttons.switchToSimple}
        </span>
      </motion.button>

      {/* Draggable Bubble for Skills (Right - drag left) */}
      <DraggableBubble
        onReveal={() => showModal("skills")}
        direction="left"
        icon={<CodeXml size={32} className="text-primary-300" />}
        hint={content.gameMode.hints.skills}
      />

      {/* Draggable Bubble for Experience (Left - drag right) */}
      <DraggableBubble
        onReveal={() => showModal("experience")}
        direction="right"
        icon={<BriefcaseBusiness size={32} className="text-primary-300" />}
        hint={content.gameMode.hints.experience}
      />

      {/* Keyboard Hints: About, Education & Contact (Bottom Right) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.6 }}
        className="absolute bottom-24 right-24 flex flex-col gap-3"
      >
        <div className="flex items-center gap-3">
          <p className="text-sm text-foreground/70">press</p>
          <KeyboardHint
            keyLabel={content.gameMode.hints.aboutKey}
            onClick={() => showModal("about")}
          />
          <p className="text-sm text-foreground/70">
            {content.gameMode.hints.about}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <p className="text-sm text-foreground/70">press</p>
          <KeyboardHint
            keyLabel={content.gameMode.hints.educationKey}
            onClick={() => showModal("education")}
          />
          <p className="text-sm text-foreground/70">
            {content.gameMode.hints.education}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <p className="text-sm text-foreground/70">press</p>
          <KeyboardHint
            keyLabel={content.gameMode.hints.contactKey}
            onClick={() => showModal("contact")}
          />
          <p className="text-sm text-foreground/70">
            {content.gameMode.hints.contact}
          </p>
        </div>
      </motion.div>

      {/* Draggable Modals */}
      <AnimatePresence>
        {Object.values(modals).map((modal) =>
          modal.isVisible ? (
            <DraggableModal
              key={modal.id}
              modal={modal}
              onClose={() => hideModal(modal.id)}
              onToggleMinimize={() => toggleMinimize(modal.id)}
            />
          ) : null
        )}
      </AnimatePresence>

      {/* Keyboard Handler */}
      <KeyboardHandler
        onShowAbout={() => showModal("about")}
        onShowEducation={() => showModal("education")}
        onShowContact={() => showModal("contact")}
      />
    </div>
  );
}

function DraggableModal({
  modal,
  onClose,
  onToggleMinimize,
}: {
  modal: SectionModal;
  onClose: () => void;
  onToggleMinimize: () => void;
}) {
  const dragControls = useDragControls();

  return (
    <motion.div
      drag
      dragControls={dragControls}
      dragMomentum={false}
      initial={{
        x: modal.initialPosition.x,
        y: modal.initialPosition.y,
        scale: 0.8,
        opacity: 0,
      }}
      animate={{
        scale: modal.isMinimized ? 0.5 : 1,
        opacity: 1,
      }}
      exit={{ scale: 0.8, opacity: 0 }}
      className="fixed rounded-2xl shadow-2xl shadow-primary-500/30 z-50"
      style={{
        width: modal.isMinimized ? "300px" : "420px",
        maxWidth: "95vw",
        maxHeight: "80vh",
        background: "rgba(8, 12, 25, 0.85)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(83, 127, 231, 0.2)",
      }}
    >
      {/* Window Header */}
      <div
        className="flex items-center justify-between p-4 border-b border-primary-500/20 cursor-move"
        onPointerDown={(e) => dragControls.start(e)}
      >
        <h3 className="font-bold text-lg bg-gradient-to-r from-primary-400 to-primary-500 bg-clip-text text-transparent">
          {modal.title}
        </h3>
        <div className="flex items-center gap-2">
          <button
            onClick={onToggleMinimize}
            className="p-2 rounded-lg hover:bg-primary-500/20 transition-colors"
          >
            {modal.isMinimized ? (
              <Maximize2 size={16} className="text-foreground/70" />
            ) : (
              <Minimize2 size={16} className="text-foreground/70" />
            )}
          </button>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-red-500/20 transition-colors"
          >
            <X size={16} className="text-foreground/70" />
          </button>
        </div>
      </div>

      {/* Window Content */}
      {!modal.isMinimized && (
        <div className="overflow-y-auto max-h-[60vh]">
          <div className="modal-embed">{modal.component}</div>
        </div>
      )}
    </motion.div>
  );
}

function KeyboardHandler({
  onShowAbout,
  onShowEducation,
  onShowContact,
}: {
  onShowAbout: () => void;
  onShowEducation: () => void;
  onShowContact: () => void;
}) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      if (key === "a") onShowAbout();
      if (key === "e") onShowEducation();
      if (key === "c") onShowContact();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onShowAbout, onShowEducation, onShowContact]);

  return null;
}
