"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { projects, Project } from "@/data/projects";
import { gsap } from "@/lib/gsap";
import { registerGSAP } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import ProjectModal from "@/components/ProjectModal";

const spanMap = (value: number) => {
  switch (value) {
    case 12:
      return "md:col-span-12";
    case 8:
      return "md:col-span-8";
    case 6:
      return "md:col-span-6";
    case 4:
      return "md:col-span-4";
    case 3:
      return "md:col-span-3";
    default:
      return "md:col-span-6";
  }
};

const rowSpanMap = (value: number) => {
  switch (value) {
    case 3:
      return "md:row-span-3";
    case 2:
      return "md:row-span-2";
    default:
      return "md:row-span-1";
  }
};

const ProjectsGrid = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const cardsRef = useRef<Array<HTMLDivElement | null>>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const setCardRef = (index: number) => (node: HTMLDivElement | null) => {
    cardsRef.current[index] = node;
  };

  const openModal = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  useIsomorphicLayoutEffect(() => {
    registerGSAP();
    const listeners: Array<[HTMLDivElement, (e: PointerEvent) => void, () => void]> = [];
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, index) => {
        if (!card) return;
        gsap.set(card, { y: 60, opacity: 0, rotateX: 10 });
        gsap.to(card, {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 0.9,
          ease: "power3.out",
          delay: Math.min(index * 0.08, 0.4),
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        });

        // pointer tilt + media parallax
        const media = card.querySelector<HTMLElement>(".project-media");
        const handlePointerMove = (e: PointerEvent) => {
          const bounds = card.getBoundingClientRect();
          const x = (e.clientX - bounds.left) / bounds.width;
          const y = (e.clientY - bounds.top) / bounds.height;
          const rotateX = (y - 0.5) * 10;
          const rotateY = (x - 0.5) * -10;

          gsap.to(card, {
            rotateX,
            rotateY,
            transformPerspective: 900,
            transformOrigin: "center",
            duration: 0.45,
            ease: "power3.out",
          });

          if (media) {
            gsap.to(media, {
              x: (x - 0.5) * 26,
              y: (y - 0.5) * 14,
              scale: 1.03,
              duration: 0.6,
              ease: "power3.out",
            });
          }
        };

        const reset = () => {
          gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.8, ease: "expo.out" });
          if (media) gsap.to(media, { x: 0, y: 0, scale: 1, duration: 0.8, ease: "expo.out" });
        };

        card.addEventListener("pointermove", handlePointerMove);
        card.addEventListener("pointerleave", reset);
        listeners.push([card, handlePointerMove, reset]);
      });
    }, sectionRef);

    return () => {
      listeners.forEach(([card, move, leave]) => {
        card.removeEventListener("pointermove", move);
        card.removeEventListener("pointerleave", leave);
      });
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 md:px-12 lg:px-16"
    >
      <header className="flex flex-col gap-4">
        <span className="text-sm uppercase tracking-[0.4em] text-foreground/50">
          Selected Work
        </span>
        <h2 className="text-4xl font-semibold text-white sm:text-5xl">
          Bento grid of recent collaborations and experiments.
        </h2>
      </header>
      <div className="grid auto-rows-[220px] grid-cols-1 gap-6 md:auto-rows-[280px] md:grid-cols-12">
        {projects.map((project, index) => (
          <div
            key={project.title}
            ref={setCardRef(index)}
            onClick={() => openModal(project)}
            className={`group relative flex cursor-pointer flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-white/4 p-6 text-white backdrop-blur-xl transition-[transform,box-shadow] duration-500 hover:-translate-y-1 hover:shadow-[0_40px_120px_rgba(59,130,246,0.18)] ${spanMap(project.layout.colSpan)} ${rowSpanMap(project.layout.rowSpan)}`}
          >
            <div className="pointer-events-none absolute inset-0 bg-radial-[circle_at_top] from-white/10 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <div className="flex flex-col gap-3">
              <span className="text-xs uppercase tracking-[0.4em] text-foreground/60">
                {project.stats}
              </span>
              <h3 className="text-2xl font-semibold leading-tight">
                {project.title}
              </h3>
              <p className="max-w-lg text-sm text-foreground/70">
                {project.description}
              </p>
            </div>
            <div className="mt-6 flex flex-wrap gap-2 text-xs uppercase tracking-[0.3em] text-foreground/60">
              {project.stack.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/10 bg-black/30 px-3 py-1"
                >
                  {item}
                </span>
              ))}
            </div>
            <div className="relative mt-6 flex-1 overflow-hidden rounded-2xl border border-white/10 bg-black/40 project-media">
              {project.media.type === "code" ? (
                <pre className="h-full w-full whitespace-pre-wrap break-words rounded-2xl bg-black/40 p-4 font-mono text-xs text-emerald-200/90">
{project.media.src}
                </pre>
              ) : (
                <div className="absolute inset-0">
                  <Image
                    src={project.media.src}
                    alt={project.media.alt}
                    fill
                    sizes="(min-width: 1024px) 400px, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className={`absolute inset-0 bg-linear-to-br ${project.accent} opacity-40 mix-blend-screen`} />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
};

export default ProjectsGrid;
