"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import content from "@/data/content.json";

export default function SkillsSection() {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <section
      id="skills"
      className="min-h-screen py-20 relative overflow-hidden snap-start"
    >
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-center mb-4 bg-gradient-to-r from-primary-400 to-primary-500 bg-clip-text text-transparent">
            {content.sections.skills.title}
          </h2>

          <p className="text-center text-foreground/50 mb-12 text-sm">
            Technologies & Tools
          </p>

          {/* Compact Grid Layout */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {content.skills.map((category, catIndex) => (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: catIndex * 0.1 }}
                className="glass p-6 rounded-xl hover:glass-strong transition-all duration-300 group"
              >
                {/* Category Header */}
                <div className="flex items-center gap-2 mb-4 pb-3 border-b border-primary-500/20">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary-500 group-hover:animate-pulse" />
                  <h3 className="text-sm font-semibold text-primary-400 uppercase tracking-wider">
                    {category.category}
                  </h3>
                </div>

                {/* Skills List */}
                <div className="space-y-3">
                  {category.items.map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, x: -10 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{
                        duration: 0.3,
                        delay: catIndex * 0.1 + index * 0.05,
                      }}
                      className="flex items-center justify-between group/skill"
                    >
                      <span className="text-foreground/90 text-sm font-medium group-hover/skill:text-primary-400 transition-colors">
                        {skill.name}
                      </span>
                      <div className="flex items-center gap-2">
                        <div className="w-12 h-1 bg-primary-950/30 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={inView ? { width: `${skill.level}%` } : {}}
                            transition={{
                              duration: 0.8,
                              delay: catIndex * 0.1 + index * 0.05 + 0.2,
                              ease: [0.25, 0.1, 0.25, 1],
                            }}
                            className="h-full bg-gradient-to-r from-primary-500 to-primary-400 rounded-full"
                          />
                        </div>
                        <span className="text-xs text-foreground/40 font-mono w-8 text-right">
                          {skill.level}%
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
