"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import type { Points } from "three";

const PARTICLE_COUNT = 80;

function FramePacer() {
  const invalidate = useThree((state) => state.invalidate);

  useEffect(() => {
    const id = window.setInterval(() => {
      invalidate();
    }, 33);
    return () => window.clearInterval(id);
  }, [invalidate]);

  return null;
}

function MinimalParticles() {
  const particlesRef = useRef<Points>(null);

  const positions = useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3);
    for (let i = 0; i < PARTICLE_COUNT * 3; i += 3) {
      const radius = 4 + Math.random() * 4;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;

      pos[i] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i + 2] = radius * Math.cos(phi);
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#87b1f9"
        transparent
        opacity={0.2}
        sizeAttenuation
      />
    </points>
  );
}

function placeOrb(
  element: HTMLDivElement | null,
  x: number,
  y: number,
) {
  if (!element) return;
  element.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
}

export function InteractiveBackground() {
  const orbARef = useRef<HTMLDivElement>(null);
  const orbBRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    let hasInteracted = false;
    let currentX = window.innerWidth * 0.5;
    let currentY = window.innerHeight * 0.5;
    let targetX = currentX;
    let targetY = currentY;

    const place = (x: number, y: number) => {
      placeOrb(orbARef.current, x, y);
      placeOrb(orbBRef.current, window.innerWidth - x, window.innerHeight - y);
    };

    place(currentX, currentY);

    const tick = () => {
      currentX += (targetX - currentX) * 0.12;
      currentY += (targetY - currentY) * 0.12;
      place(currentX, currentY);

      const dx = targetX - currentX;
      const dy = targetY - currentY;
      if (dx * dx + dy * dy < 0.25) {
        raf = 0;
        return;
      }
      raf = window.requestAnimationFrame(tick);
    };

    const handleMouseMove = (event: MouseEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;

      if (!hasInteracted) {
        const distance = Math.hypot(
          targetX / window.innerWidth - 0.5,
          targetY / window.innerHeight - 0.5,
        );
        if (distance > 0.1) {
          hasInteracted = true;
          window.dispatchEvent(new CustomEvent("scene3d-interaction"));
        }
      }

      if (raf === 0) {
        raf = window.requestAnimationFrame(tick);
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (raf !== 0) window.cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0">
        <Canvas
          camera={{ position: [0, 0, 6], fov: 60 }}
          dpr={1}
          frameloop="demand"
          gl={{ antialias: false, powerPreference: "low-power" }}
          style={{ opacity: 0.6 }}
        >
          <FramePacer />
          <ambientLight intensity={0.15} />
          <MinimalParticles />
        </Canvas>
      </div>

      <div
        ref={orbARef}
        className="absolute top-0 left-0 w-[540px] h-[540px] rounded-full blur-3xl opacity-40 will-change-transform"
        style={{
          background:
            "radial-gradient(circle, rgba(83, 127, 231, 0.6) 0%, rgba(107, 149, 240, 0.35) 50%, transparent 70%)",
        }}
      />
      <div
        ref={orbBRef}
        className="absolute top-0 left-0 w-[450px] h-[450px] rounded-full blur-3xl opacity-35 will-change-transform"
        style={{
          background:
            "radial-gradient(circle, rgba(135, 177, 249, 0.5) 0%, rgba(175, 203, 251, 0.25) 50%, transparent 70%)",
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-br from-primary-950/50 via-background/70 to-primary-900/50" />
      <div
        className="absolute inset-0 opacity-50"
        style={{
          background:
            "radial-gradient(circle at 50% 40%, rgba(83, 127, 231, 0.25) 0%, transparent 50%)",
        }}
      />
    </div>
  );
}
