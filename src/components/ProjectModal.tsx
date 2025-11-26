"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { Project } from "@/data/projects";

type ProjectModalProps = {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
};

const ProjectModal = ({ project, isOpen, onClose }: ProjectModalProps) => {
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const overlay = overlayRef.current;
    const modal = modalRef.current;
    const content = contentRef.current;

    if (!overlay || !modal || !content) return;

    if (isOpen) {
      // Prevent body scroll
      document.body.style.overflow = "hidden";

      const tl = gsap.timeline();

      tl.set(overlay, { display: "flex" })
        .to(overlay, {
          opacity: 1,
          duration: 0.4,
          ease: "power2.out",
        })
        .fromTo(
          modal,
          { y: 40, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.5,
            ease: "back.out(1.2)",
          },
          "-=0.2"
        )
        .fromTo(
          content.children,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.4,
            stagger: 0.05,
            ease: "power2.out",
          },
          "-=0.3"
        );
    } else {
      // Restore body scroll
      document.body.style.overflow = "";

      const tl = gsap.timeline({
        onComplete: () => {
          gsap.set(overlay, { display: "none" });
        },
      });

      tl.to(modal, {
        y: 20,
        opacity: 0,
        scale: 0.95,
        duration: 0.3,
        ease: "power2.in",
      }).to(
        overlay,
        {
          opacity: 0,
          duration: 0.3,
          ease: "power2.in",
        },
        "-=0.1"
      );
    }
  }, [isOpen]);

  // Close on escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!project) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] hidden items-center justify-center bg-black/60 p-4 backdrop-blur-md sm:p-8"
      onClick={(e) => {
        if (e.target === overlayRef.current) onClose();
      }}
    >
      <div
        ref={modalRef}
        className="relative flex max-h-full w-full max-w-4xl flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#0a0a0a] shadow-2xl"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-6 top-6 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white/70 backdrop-blur transition-colors hover:bg-white/10 hover:text-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-5 w-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="flex h-full flex-col overflow-y-auto md:flex-row">
          {/* Media Column */}
          <div className="relative h-64 w-full shrink-0 overflow-hidden bg-white/5 md:h-auto md:w-2/5">
            {project.media.type === "code" ? (
              <pre className="flex h-full w-full items-center justify-center whitespace-pre-wrap break-words p-8 font-mono text-xs text-emerald-200/90">
                {project.media.src}
              </pre>
            ) : (
              <>
                <Image
                  src={project.media.src}
                  alt={project.media.alt}
                  fill
                  className="object-cover"
                />
                <div
                  className={`absolute inset-0 bg-linear-to-br ${project.accent} opacity-30 mix-blend-screen`}
                />
              </>
            )}
          </div>

          {/* Content Column */}
          <div ref={contentRef} className="flex flex-col gap-8 p-8 md:p-10">
            <header className="flex flex-col gap-4">
              <div className="flex flex-wrap items-center gap-3 text-xs font-medium uppercase tracking-wider text-white/50">
                <span>{project.details.year}</span>
                <span className="h-1 w-1 rounded-full bg-white/20" />
                <span>{project.details.role}</span>
              </div>
              <h2 className="text-3xl font-bold text-white sm:text-4xl">
                {project.title}
              </h2>
              <p className="text-lg leading-relaxed text-white/70">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white/80"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </header>

            <div className="grid gap-6 border-t border-white/10 pt-8 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
                  The Challenge
                </h3>
                <p className="text-sm leading-relaxed text-white/60">
                  {project.details.challenge}
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
                  The Solution
                </h3>
                <p className="text-sm leading-relaxed text-white/60">
                  {project.details.solution}
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-2 rounded-xl bg-white/5 p-6">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-emerald-400">
                Outcome
              </h3>
              <p className="text-base font-medium text-white/90">
                {project.details.outcome}
              </p>
            </div>

            <div className="mt-auto pt-4">
              <a
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-black transition-transform hover:scale-105 active:scale-95"
              >
                Visit Live Site
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-4 w-4"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
