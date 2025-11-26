"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { registerGSAP } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";

const tools = [
  { name: "Next.js", category: "Framework" },
  { name: "TypeScript", category: "Language" },
  { name: "React", category: "Library" },
  { name: "Tailwind", category: "Styling" },
  { name: "GSAP", category: "Animation" },
  { name: "Three.js", category: "WebGL" },
  { name: "Node.js", category: "Runtime" },
  { name: "PostgreSQL", category: "Database" },
  { name: "Figma", category: "Design" },
  { name: "Blender", category: "3D" },
];

const Toolkit = () => {
  const sectionRef = useRef<HTMLElement | null>(null);

  useIsomorphicLayoutEffect(() => {
    registerGSAP();
    const ctx = gsap.context(() => {
      gsap.from(".tool-item", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.05,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 md:px-12 lg:px-16"
    >
      <header className="flex flex-col gap-4">
        <span className="text-sm uppercase tracking-[0.4em] text-foreground/50">
          Toolkit
        </span>
        <h2 className="text-4xl font-semibold text-white sm:text-5xl">
          The stack I use to build.
        </h2>
      </header>
      
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
        {tools.map((tool) => (
          <div
            key={tool.name}
            className="tool-item group relative flex flex-col gap-2 rounded-2xl border border-white/10 bg-white/5 p-6 transition-colors hover:bg-white/10"
          >
            <span className="text-lg font-medium text-white">{tool.name}</span>
            <span className="text-xs uppercase tracking-wider text-white/40">
              {tool.category}
            </span>
            <div className="absolute inset-0 -z-10 rounded-2xl bg-linear-to-br from-white/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Toolkit;
