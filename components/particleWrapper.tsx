"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Particles } from "@/components/ui/particles";

export default function ParticlesWrapper() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Particles
      key={resolvedTheme}
      className="fixed inset-0 -z-10 pointer-events-none"
      quantity={80}
      ease={80}
      color={resolvedTheme === "dark" ? "#ffffff" : "#000000"}
      refresh={false} // 🚨 THIS IS THE CRITICAL FIX
    />
  );
}
