"use client";

import { useGamification } from "@/contexts/GamificationContext";
import type { ActionId } from "@/contexts/GamificationContext";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Sparkles, HelpCircle, X } from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import content from "@/data/content.json";

export default function GamificationProgress() {
  const { completedActions, totalActions, isRewardUnlocked } =
    useGamification();
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showHintTooltip, setShowHintTooltip] = useState(false);
  const [showWelcomePopup, setShowWelcomePopup] = useState(false);
  const [hasSeenWelcome, setHasSeenWelcome] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Show welcome popup when no achievements are completed
  useEffect(() => {
    if (completedActions.size === 0 && !hasSeenWelcome && !isMobile) {
      const timer = setTimeout(() => {
        setShowWelcomePopup(true);
      }, 1500); // Show after 1.5s to let user settle in

      return () => clearTimeout(timer);
    }
  }, [completedActions.size, hasSeenWelcome, isMobile]);

  // Auto-hide welcome popup after 8 seconds
  useEffect(() => {
    if (showWelcomePopup) {
      const timer = setTimeout(() => {
        setShowWelcomePopup(false);
        setHasSeenWelcome(true);
      }, 8000);

      return () => clearTimeout(timer);
    }
  }, [showWelcomePopup]);

  const dismissWelcomePopup = () => {
    setShowWelcomePopup(false);
    setHasSeenWelcome(true);
  };

  // Get a random remaining task hint
  const remainingTaskHint = useMemo(() => {
    const allActions: ActionId[] = [
      "action_1",
      "action_2",
      "action_3",
      "action_4",
      "action_5",
      "action_6",
      "action_7",
      "action_8",
      "action_9",
      "action_10",
    ];
    let remaining = allActions.filter(
      (action) => !completedActions.has(action)
    );

    // Don't show action_10 hint unless 9 actions are completed
    if (remaining.length > 1) {
      remaining = remaining.filter((action) => action !== "action_10");
    }

    if (remaining.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * remaining.length);
    const randomAction = remaining[randomIndex];
    return content.gamification.tasks[randomAction];
  }, [completedActions]);

  // Don't render on mobile
  if (isMobile) {
    return null;
  }

  return (
    <motion.div
      className="fixed bottom-24 left-24 z-40 pointer-events-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.4 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="relative bg-primary-500/10 border border-primary-500/30 rounded-lg shadow-lg overflow-hidden"
        initial={false}
        animate={{
          width: "auto",
          height: "auto",
        }}
        transition={{
          duration: 0.3,
          ease: "easeInOut",
        }}
      >
        <motion.div
          className="relative"
          initial={false}
          animate={{
            paddingLeft: isHovered ? "1rem" : "0.5rem",
            paddingRight: isHovered ? "1rem" : "0.5rem",
            paddingTop: isHovered ? "0.75rem" : "0.5rem",
            paddingBottom: isHovered ? "0.75rem" : "0.5rem",
          }}
          transition={{
            duration: 0.3,
            ease: "easeInOut",
          }}
        >
          {/* Minimized state - icon + counter */}
          <AnimatePresence>
            {!isHovered && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-2 whitespace-nowrap"
              >
                <motion.div
                  className={`p-1.5 rounded ${
                    isRewardUnlocked ? "bg-yellow-500/20" : "bg-primary-500/20"
                  }`}
                  animate={
                    isRewardUnlocked
                      ? {
                          scale: [1, 1.05, 1],
                        }
                      : {}
                  }
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 1,
                  }}
                >
                  {isRewardUnlocked ? (
                    <Trophy className="w-4 h-4 text-yellow-400" />
                  ) : (
                    <Sparkles className="w-4 h-4 text-primary-400" />
                  )}
                </motion.div>
                <span className="text-xs text-foreground/70 font-mono">
                  {completedActions.size}/{totalActions}
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Expanded state - full content */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {/* Header */}
                <div className="flex items-center gap-2.5 mb-2.5 whitespace-nowrap">
                  <motion.div
                    className={`p-1.5 rounded ${
                      isRewardUnlocked
                        ? "bg-yellow-500/20"
                        : "bg-primary-500/20"
                    }`}
                    animate={
                      isRewardUnlocked
                        ? {
                            scale: [1, 1.05, 1],
                          }
                        : {}
                    }
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 1,
                    }}
                  >
                    {isRewardUnlocked ? (
                      <Trophy className="w-4 h-4 text-yellow-400" />
                    ) : (
                      <Sparkles className="w-4 h-4 text-primary-400" />
                    )}
                  </motion.div>
                  <span className="text-xs text-foreground/70 font-mono">
                    {completedActions.size}/{totalActions}
                  </span>
                  {/* Hint button */}
                  {remainingTaskHint && (
                    <button
                      className="p-1 rounded hover:bg-primary-500/20 transition-colors ml-auto"
                      onMouseEnter={() => setShowHintTooltip(true)}
                      onMouseLeave={() => setShowHintTooltip(false)}
                      aria-label="Show hint"
                    >
                      <HelpCircle className="w-3.5 h-3.5 text-primary-400" />
                    </button>
                  )}
                </div>

                {/* Step indicators */}
                <div className="flex gap-1">
                  {Array.from({ length: totalActions }).map((_, index) => (
                    <motion.div
                      key={index}
                      className={`w-4 h-1 rounded-full ${
                        index < completedActions.size
                          ? "bg-primary-500"
                          : "bg-foreground/10"
                      }`}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Particle effect when rewarded */}
          <AnimatePresence>
            {isRewardUnlocked && isHovered && (
              <>
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1.5 h-1.5 bg-yellow-400 rounded-full"
                    style={{
                      left: "50%",
                      top: "50%",
                    }}
                    initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
                    animate={{
                      scale: [0, 1, 0],
                      x: Math.cos((i * Math.PI * 2) / 5) * 30,
                      y: Math.sin((i * Math.PI * 2) / 5) * 30,
                      opacity: [1, 1, 0],
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      repeatDelay: 2,
                      delay: i * 0.1,
                    }}
                  />
                ))}
              </>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      {/* Tooltip - positioned outside card to avoid clipping */}
      <AnimatePresence>
        {showHintTooltip && remainingTaskHint && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            transition={{ duration: 0.2 }}
            className="absolute -top-14 left-0 px-3 py-2 bg-background/95 border border-primary-500/30 rounded-lg shadow-xl max-w-xs z-50 backdrop-blur-sm pointer-events-none"
          >
            <div className="text-xs text-foreground/90 leading-relaxed">
              {remainingTaskHint}
            </div>
            <div className="absolute top-full left-6 -mt-1 w-2 h-2 bg-background/95 border-r border-b border-primary-500/30 transform rotate-45"></div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Welcome Popup - Shows when no achievements completed */}
      <AnimatePresence>
        {showWelcomePopup && completedActions.size === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="absolute -top-32 left-0 w-80 px-4 py-3 bg-gradient-to-br from-primary-500/20 to-primary-600/10 border border-primary-500/40 rounded-lg rounded-bl-none shadow-2xl z-50 backdrop-blur-md pointer-events-auto"
          >
            {/* Close button */}
            <button
              onClick={dismissWelcomePopup}
              className="absolute top-2 right-2 p-1 rounded hover:bg-primary-500/20 transition-colors"
              aria-label="Close"
            >
              <X className="w-3.5 h-3.5 text-foreground/50" />
            </button>

            {/* Content */}
            <div className="flex items-start gap-3">
              <motion.div
                animate={{
                  rotate: [0, 10, -10, 10, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 3,
                }}
                className="p-2 bg-primary-500/20 rounded-lg shrink-0"
              >
                <Sparkles className="w-5 h-5 text-primary-400" />
              </motion.div>

              <div>
                <h4 className="text-sm font-semibold text-foreground/90 mb-1">
                  Start Your Quest!
                </h4>
                <p className="text-xs text-foreground/70 leading-relaxed">
                  Complete challenges to unlock achievements. Hover over this
                  card and click the{" "}
                  <HelpCircle className="w-3 h-3 inline text-primary-400" />{" "}
                  icon for hints!
                </p>
              </div>
            </div>

            {/* Animated border glow */}
            <motion.div
              className="absolute inset-0 rounded-lg pointer-events-none"
              animate={{
                boxShadow: [
                  "0 0 0 0 rgba(83, 127, 231, 0)",
                  "0 0 20px 2px rgba(83, 127, 231, 0.3)",
                  "0 0 0 0 rgba(83, 127, 231, 0)",
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
