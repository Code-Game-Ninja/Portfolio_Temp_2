"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { registerGSAP } from "@/lib/gsap";

const Cursor = () => {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const outlineRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    registerGSAP();
    const dot = dotRef.current;
    const outline = outlineRef.current;
    if (!dot || !outline || typeof window === "undefined") return;

    let lastX = 0;
    let lastY = 0;

    const move = (e: PointerEvent) => {
      const { clientX: x, clientY: y } = e;
      lastX = x;
      lastY = y;
      gsap.to(dot, { x: x - 8, y: y - 8, duration: 0.06, ease: 'power2.out' });
      gsap.to(outline, { x: x - 24, y: y - 24, duration: 0.3, ease: 'power3.out' });
    };

    const enterInteractive = () => {
      gsap.to(outline, { scale: 1.6, opacity: 0.9, duration: 0.25, ease: 'power3.out' });
      gsap.to(dot, { scale: 0.8, duration: 0.25, ease: 'power3.out' });
    };
    const leaveInteractive = () => {
      gsap.to(outline, { scale: 1, opacity: 0.6, duration: 0.4, ease: 'expo.out' });
      gsap.to(dot, { scale: 1, duration: 0.4, ease: 'expo.out' });
    };

    document.addEventListener('pointermove', move);
    document.addEventListener('pointerenter', move);

    document.querySelectorAll('a, button, .group, [role="button"]').forEach((el) => {
      el.addEventListener('pointerenter', enterInteractive);
      el.addEventListener('pointerleave', leaveInteractive);
    });

    return () => {
      document.removeEventListener('pointermove', move);
      document.removeEventListener('pointerenter', move);
      document.querySelectorAll('a, button, .group, [role="button"]').forEach((el) => {
        el.removeEventListener('pointerenter', enterInteractive);
        el.removeEventListener('pointerleave', leaveInteractive);
      });
    };
  }, []);

  return (
    <div aria-hidden>
      <div
        ref={outlineRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/6 opacity-60 shadow-[0_10px_30px_rgba(59,130,246,0.12)] md:block"
      />
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white md:block"
      />
    </div>
  );
};

export default Cursor;
