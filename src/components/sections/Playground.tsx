"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { registerGSAP } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";

const shots = [
  { src: "/media/realtime-suite.svg", alt: "Dashboard experiment" },
  { src: "/media/story-engine.svg", alt: "3D scene test" },
  { src: "/media/ai-workbench.svg", alt: "UI component library" },
  { src: "/media/realtime-suite.svg", alt: "Mobile interaction" },
  { src: "/media/story-engine.svg", alt: "WebGL shader" },
  { src: "/media/ai-workbench.svg", alt: "Design system" },
];

const Playground = () => {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const wrapperRef = useRef<HTMLElement | null>(null);

  useIsomorphicLayoutEffect(() => {
    registerGSAP();
    const track = trackRef.current;
    const wrapper = wrapperRef.current;
    
    if (!track || !wrapper) return;

    const ctx = gsap.context(() => {
      // Scroll-triggered horizontal move
      gsap.to(track, {
        x: () => -(track.scrollWidth - document.documentElement.clientWidth),
        ease: "none",
        scrollTrigger: {
          trigger: wrapper,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={wrapperRef}
      className="relative flex w-full flex-col gap-12 overflow-hidden py-24"
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-6 md:px-12 lg:px-16">
        <span className="text-sm uppercase tracking-[0.4em] text-foreground/50">
          Playground
        </span>
        <h2 className="text-4xl font-semibold text-white sm:text-5xl">
          Visual experiments & shots.
        </h2>
      </div>

      <div className="relative w-full">
        <div 
          ref={trackRef}
          className="flex w-fit gap-8 px-6 md:px-12 lg:px-16"
        >
          {shots.map((shot, i) => (
            <div
              key={i}
              className="relative h-[300px] w-[400px] shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-white/5 md:h-[400px] md:w-[600px]"
            >
              <Image
                src={shot.src}
                alt={shot.alt}
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-0 transition-opacity hover:opacity-100" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Playground;
