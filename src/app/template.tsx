"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";

export default function Template({ children }: { children: React.ReactNode }) {
  const contentRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    // Premium content reveal: Fade up + unblur
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { 
          opacity: 0, 
          y: 32, 
          filter: "blur(12px)" 
        },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.2,
          ease: "power3.out",
          clearProps: "all" // Cleanup after animation to avoid stacking context issues
        }
      );
    }, contentRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={contentRef} className="min-h-screen w-full">
      {children}
    </div>
  );
}
