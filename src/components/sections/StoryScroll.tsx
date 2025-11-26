"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { registerGSAP } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";

const story = [
  {
    eyebrow: "200 Level",
    title: "Cutting my teeth on flash and timelines",
    description:
      "I started as a motion-first designer, reverse engineering Flash experiments and building interactive demos that felt like films.",
    media: "/media/story-engine.svg",
  },
  {
    eyebrow: "300 Level",
    title: "Falling in love with the stack",
    description:
      "I pivoted into engineering to keep pushing what felt possible, blending TypeScript, React, and WebGL to ship immersive experiences.",
    media: "/media/realtime-suite.svg",
  },
  {
    eyebrow: "400 Level",
    title: "Championing premium performance",
    description:
      "Today, I architect scalable design systems and narrative journeys where every transition earns its keep and ships <1s LCP.",
    media: "/media/ai-workbench.svg",
  },
];

const StoryScroll = () => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<Array<HTMLDivElement | null>>([]);
  const mediaRef = useRef<Array<HTMLDivElement | null>>([]);

  const setCardRef = (index: number) => (element: HTMLDivElement | null) => {
    cardsRef.current[index] = element;
  };

  const setMediaRef = (index: number) => (element: HTMLDivElement | null) => {
    mediaRef.current[index] = element;
  };

  useIsomorphicLayoutEffect(() => {
    registerGSAP();
    const wrapper = wrapperRef.current;
    const track = trackRef.current;
    if (!wrapper || !track) return;

    const ctx = gsap.context(() => {
      gsap.from(wrapper.querySelector(".story-title"), {
        y: 32,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      if (progressRef.current) {
        gsap.to(progressRef.current, {
          height: "100%",
          ease: "none",
          scrollTrigger: {
            trigger: track,
            start: "top center",
            end: "bottom center",
            scrub: true,
          },
        });
      }

      cardsRef.current.forEach((card, index) => {
        if (!card) return;
        const media = mediaRef.current[index];

        // set an initial clipped reveal for a more premium entrance
        gsap.set(card, { opacity: 0.35, y: 120, clipPath: 'inset(12% 0% 12% 0%)' });
        gsap.to(card, {
          opacity: 1,
          y: 0,
          clipPath: 'inset(0% 0% 0% 0%)',
          ease: "power3.out",
          duration: 1,
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
            end: "bottom 60%",
            scrub: true,
          },
        });

        if (media) {
          gsap.to(media, {
            yPercent: -28,
            scale: 1.02,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          });
        }
      });

      gsap.to(track, {
        y: "-5%",
        ease: "none",
        scrollTrigger: {
          trigger: track,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, wrapper);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={wrapperRef}
      className="relative mx-auto flex w-full max-w-6xl flex-col gap-16 px-6 md:px-12 lg:px-16"
    >
      <header className="story-title flex flex-col gap-4">
        <span className="text-sm uppercase tracking-[0.4em] text-foreground/50">
          The Thread
        </span>
        <h2 className="text-4xl font-semibold text-white sm:text-5xl">
          The journey from motion designer to systems-minded engineer.
        </h2>
      </header>
      <div className="relative grid gap-16 md:grid-cols-[minmax(0,0.28fr)_1fr]">
        <aside className="sticky top-32 hidden h-full md:flex">
          <div className="relative w-px flex-1">
            <div className="absolute inset-y-0 -left-px w-0.5 bg-white/10" />
            <div
              ref={progressRef}
              className="absolute top-0 -left-px h-[20%] w-0.5 rounded-full bg-linear-to-b from-indigo-400 via-sky-400 to-teal-300"
            />
          </div>
        </aside>
        <div ref={trackRef} className="flex flex-col gap-12">
          {story.map((step, index) => (
            <article
              key={step.title}
              ref={setCardRef(index)}
              className="relative flex flex-col gap-6 rounded-3xl border border-white/10 bg-white/3 p-10 backdrop-blur-xl"
            >
              <span className="text-xs uppercase tracking-[0.4em] text-foreground/50">
                {step.eyebrow}
              </span>
              <h3 className="text-2xl font-semibold text-white sm:text-3xl">
                {step.title}
              </h3>
              <p className="max-w-xl text-base text-foreground/70 sm:text-lg">
                {step.description}
              </p>
              <div
                ref={setMediaRef(index)}
                className="relative mt-4 h-64 overflow-hidden rounded-2xl border border-white/10 bg-white/4"
              >
                <Image
                  src={step.media}
                  alt={step.title}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 640px, 100vw"
                  priority={index === 0}
                />
                <div className="pointer-events-none absolute inset-0 bg-linear-to-tr from-black/20 via-transparent to-white/5" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StoryScroll;
