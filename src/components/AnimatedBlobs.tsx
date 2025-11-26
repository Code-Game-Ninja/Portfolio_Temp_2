"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { registerGSAP } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";

const AnimatedBlobs = () => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useIsomorphicLayoutEffect(() => {
    registerGSAP();
    const wrap = wrapperRef.current;
    if (!wrap) return;

    const ctx = gsap.context(() => {
      const blobs = wrap.querySelectorAll<HTMLElement>('.animated-blob');
      blobs.forEach((b, i) => {
        gsap.set(b, { transformOrigin: '50% 50%' });
        gsap.to(b, {
          x: `${(i % 2 === 0 ? -1 : 1) * 20}px`,
          y: `${(i % 3 === 0 ? -1 : 1) * 18}px`,
          scale: 1.08,
          duration: 6 + i * 1.5,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      });
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={wrapperRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div className="absolute left-[-8%] top-10 hidden h-72 w-72 animate-fade md:block">
        <div
          className="animated-blob h-full w-full rounded-full blur-3xl"
          style={{
            background:
              'radial-gradient(circle at 30% 30%, rgba(79,70,229,0.45), rgba(99,102,241,0.18) 40%, rgba(79,70,229,0) 65%)',
          }}
        />
      </div>

      <div className="absolute right-[-6%] bottom-24 hidden h-80 w-80 md:block">
        <div
          className="animated-blob h-full w-full rounded-full blur-3xl"
          style={{
            background:
              'radial-gradient(circle at 70% 40%, rgba(14,165,233,0.28), rgba(56,189,248,0.12) 40%, rgba(14,165,233,0) 65%)',
          }}
        />
      </div>

      <div className="absolute left-1/2 top-1/3 -translate-x-1/2 hidden h-56 w-96 md:block">
        <div
          className="animated-blob h-full w-full rounded-2xl blur-2xl"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(99,102,241,0.18), rgba(79,70,229,0.06) 45%, rgba(255,255,255,0) 70%)',
          }}
        />
      </div>
    </div>
  );
};

export default AnimatedBlobs;
