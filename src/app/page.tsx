"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import GameMode from "@/components/GameMode";

export default function Home() {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    // Detect mobile and redirect to /simple
    const checkMobile = window.innerWidth < 768;
    setIsMobile(checkMobile);

    if (checkMobile) {
      router.replace("/simple");
    }
  }, [router]);

  // Don't render anything on mobile (during redirect)
  if (isMobile === null || isMobile === true) {
    return null;
  }

  // Only render GameMode on desktop
  return <GameMode />;
}
