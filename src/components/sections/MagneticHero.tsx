"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { registerGSAP } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";

const headline = ["Engineering", "immersive", "web experiences."];

const metrics = [
  { label: "Client NPS", value: "72" },
  { label: "Projects delivered", value: "38" },
  { label: "Avg. load", value: "< 1.1s" },
];

const MagneticHero = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const ctaRef = useRef<HTMLAnchorElement | null>(null);
  const orbRef = useRef<HTMLDivElement | null>(null);
  const metricsRef = useRef<HTMLDivElement | null>(null);

  useIsomorphicLayoutEffect(() => {
    registerGSAP();
    const ctx = gsap.context(() => {
      gsap.set(".hero-line", { yPercent: 100, opacity: 0 });
      gsap.to(".hero-line", {
        yPercent: 0,
        opacity: 1,
        duration: 1.1,
        ease: "power4.out",
        stagger: 0.1,
        delay: 0.2,
      });
      gsap.from(".hero-sub", {
        y: 32,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.55,
      });
      if (orbRef.current) {
        gsap.fromTo(
          orbRef.current,
          { scale: 0.8, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 1.4,
            ease: "power3.out",
            delay: 0.5,
          }
        );
      }
      if (metricsRef.current) {
        gsap.from(metricsRef.current.querySelectorAll(".metric"), {
          y: 24,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
          stagger: 0.12,
          delay: 0.8,
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    registerGSAP();
    const cta = ctaRef.current;
    const section = sectionRef.current;
    if (!cta || !section) return;

    const handlePointerMove = (event: PointerEvent) => {
      const bounds = cta.getBoundingClientRect();
      const strength = 40;
      const x = event.clientX - (bounds.left + bounds.width / 2);
      const y = event.clientY - (bounds.top + bounds.height / 2);
      const distance = Math.sqrt(x * x + y * y);
      const pull = Math.min(distance / 150, 1);
      gsap.to(cta, {
        x: (x / bounds.width) * strength * pull,
        y: (y / bounds.height) * strength * pull,
        duration: 0.6,
        ease: "power3.out",
      });
    };

    const resetPosition = () => {
      gsap.to(cta, {
        x: 0,
        y: 0,
        duration: 0.8,
        ease: "expo.out",
      });
    };

    section.addEventListener("pointermove", handlePointerMove);
    section.addEventListener("pointerleave", resetPosition);

    return () => {
      section.removeEventListener("pointermove", handlePointerMove);
      section.removeEventListener("pointerleave", resetPosition);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="mx-auto mt-16 flex w-full max-w-6xl flex-col gap-20 px-6 pt-24 md:px-12 lg:px-16"
    >
      <header className="relative flex flex-col gap-8">
        <div className="w-fit rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.4em] text-foreground/70 backdrop-blur">
          Available Q1 2026
        </div>
        <div className="relative flex flex-col gap-6 text-left">
          <div
            ref={orbRef}
            className="pointer-events-none absolute -left-12 top-[-72px] hidden h-36 w-36 rounded-full bg-[radial-gradient(circle,rgba(79,70,229,0.35)_0%,rgba(79,70,229,0.05)_65%,rgba(79,70,229,0)_100%)] blur-2xl md:block"
          />
          <h1 className="flex flex-wrap items-end gap-x-4 text-5xl font-semibold leading-[1.05] text-white sm:text-6xl lg:text-[4.25rem]">
            {headline.map((chunk) => (
              <span key={chunk} className="hero-line inline-block">
                {chunk}
              </span>
            ))}
          </h1>
          <p className="hero-sub max-w-2xl text-lg text-foreground/70 sm:text-xl">
            I blend systems thinking, motion design, and performance engineering to
            create premium digital products that feel alive and effortless.
          </p>
        </div>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
          <Link
            ref={ctaRef}
            href="#projects"
            className="relative inline-flex h-14 items-center gap-3 overflow-hidden rounded-full border border-white/10 bg-white/[0.08] px-8 text-sm font-medium uppercase tracking-[0.3em] text-white shadow-[0_24px_48px_rgba(79,70,229,0.25)] transition-[transform,box-shadow] duration-300 hover:shadow-[0_24px_64px_rgba(79,70,229,0.4)]"
          >
            <span className="relative z-10">View Work</span>
            <span className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(79,70,229,0.6),rgba(79,70,229,0.1))]" />
          </Link>
          <Link
            href="mailto:hello@alexbuilds.dev"
            className="text-sm uppercase tracking-[0.3em] text-foreground/60 transition-colors hover:text-white"
          >
            hello@alexbuilds.dev
          </Link>
        </div>
      </header>
      <footer
        ref={metricsRef}
        className="grid grid-cols-1 gap-6 rounded-3xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-xl sm:grid-cols-3"
      >
        {metrics.map((metric) => (
          <div key={metric.label} className="metric flex flex-col gap-1">
            <span className="text-sm uppercase tracking-[0.25em] text-foreground/50">
              {metric.label}
            </span>
            <span className="text-3xl font-semibold text-white">{metric.value}</span>
          </div>
        ))}
      </footer>
    </section>
  );
};

export default MagneticHero;
