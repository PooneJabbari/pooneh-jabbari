"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    let x = 0;
    let y = 0;
    let ringX = 0;
    let ringY = 0;
    let dotX = 0;
    let dotY = 0;
    let pointer = false;
    let raf = 0;

    const apply = () => {
      ringX += (x - ringX) * 0.2;
      ringY += (y - ringY) * 0.2;
      dotX += (x - dotX) * 0.45;
      dotY += (y - dotY) * 0.45;

      const ringScale = pointer ? 1.5 : 1;
      const dotScale = pointer ? 0.8 : 1;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX - 20}px, ${ringY - 20}px, 0) scale(${ringScale})`;
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dotX - 6}px, ${dotY - 6}px, 0) scale(${dotScale})`;
      }

      const settled =
        Math.abs(x - ringX) < 0.2 &&
        Math.abs(y - ringY) < 0.2 &&
        Math.abs(x - dotX) < 0.2 &&
        Math.abs(y - dotY) < 0.2;

      if (settled) {
        raf = 0;
        return;
      }
      raf = window.requestAnimationFrame(apply);
    };

    const handleMouseMove = (event: MouseEvent) => {
      x = event.clientX;
      y = event.clientY;
      const target = event.target;
      pointer =
        target instanceof Element &&
        target.closest("a, button, .cursor-pointer") !== null;
      if (raf === 0) raf = window.requestAnimationFrame(apply);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (raf !== 0) window.cancelAnimationFrame(raf);
    };
  }, [isMobile]);

  if (isMobile) {
    return null;
  }

  return (
    <>
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-10 h-10 rounded-full border border-primary-500/30 bg-white/5 pointer-events-none z-[9999] will-change-transform"
      />
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-3 h-3 rounded-full bg-gradient-to-br from-primary-400 to-primary-500 pointer-events-none z-[10000] will-change-transform"
      />
    </>
  );
}
