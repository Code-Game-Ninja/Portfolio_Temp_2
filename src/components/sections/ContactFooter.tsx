"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { gsap } from "@/lib/gsap";
import { registerGSAP } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";

const socials = [
  { name: "GitHub", href: "https://github.com" },
  { name: "Twitter", href: "https://twitter.com" },
  { name: "LinkedIn", href: "https://linkedin.com" },
  { name: "Instagram", href: "https://instagram.com" },
];

const TimeDisplay = () => {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          timeZoneName: "short",
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return <span>{time}</span>;
};

const ContactFooter = () => {
  const containerRef = useRef<HTMLElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [copied, setCopied] = useState(false);

  useIsomorphicLayoutEffect(() => {
    registerGSAP();
    const ctx = gsap.context(() => {
      // Reveal animations
      gsap.from(".footer-reveal", {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        },
      });
    }, containerRef);

    // Magnetic button effect
    const btn = buttonRef.current;
    if (btn) {
      const handleMove = (e: PointerEvent) => {
        const bounds = btn.getBoundingClientRect();
        const x = e.clientX - (bounds.left + bounds.width / 2);
        const y = e.clientY - (bounds.top + bounds.height / 2);
        
        gsap.to(btn, {
          x: x * 0.3,
          y: y * 0.3,
          duration: 0.3,
          ease: "power2.out",
        });
        
        gsap.to(btn.querySelector(".btn-content"), {
          x: x * 0.15,
          y: y * 0.15,
          duration: 0.3,
          ease: "power2.out",
        });
      };

      const handleLeave = () => {
        gsap.to([btn, btn.querySelector(".btn-content")], {
          x: 0,
          y: 0,
          duration: 0.8,
          ease: "elastic.out(1, 0.3)",
        });
      };

      btn.addEventListener("pointermove", handleMove);
      btn.addEventListener("pointerleave", handleLeave);

      return () => {
        btn.removeEventListener("pointermove", handleMove);
        btn.removeEventListener("pointerleave", handleLeave);
        ctx.revert();
      };
    }
    
    return () => ctx.revert();
  }, []);

  const handleCopy = async () => {
    if (typeof navigator === "undefined" || !navigator.clipboard) return;
    try {
      await navigator.clipboard.writeText("hello@alexbuilds.dev");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy email:", error);
    }
  };

  return (
    <footer
      ref={containerRef}
      className="relative mx-auto flex min-h-[80vh] w-full max-w-7xl flex-col justify-between px-6 pb-12 pt-32 md:px-12 lg:px-16"
    >
      {/* Background Glow */}
      <div className="pointer-events-none absolute bottom-0 left-1/2 -z-10 h-[500px] w-[800px] -translate-x-1/2 translate-y-1/4 rounded-full bg-[radial-gradient(circle,rgba(79,70,229,0.15)_0%,rgba(0,0,0,0)_70%)] blur-3xl" />

      <div className="flex flex-col gap-12">
        <div className="footer-reveal flex flex-col gap-4">
          <span className="text-sm uppercase tracking-[0.4em] text-foreground/50">
            Contact
          </span>
          <h2 className="max-w-4xl text-6xl font-bold leading-[0.9] tracking-tight text-white sm:text-8xl md:text-9xl">
            Let&apos;s build <br />
            <span className="text-foreground/40">the future.</span>
          </h2>
        </div>

        <div className="footer-reveal flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <button
            ref={buttonRef}
            onClick={handleCopy}
            className="group relative flex h-32 w-32 items-center justify-center rounded-full border border-white/10 bg-white/5 backdrop-blur-sm transition-colors hover:border-white/20 hover:bg-white/10 sm:h-48 sm:w-48"
          >
            <div className="btn-content flex flex-col items-center gap-2">
              <span className="text-sm font-medium uppercase tracking-widest text-white/70 group-hover:text-white">
                {copied ? "Copied!" : "Email Me"}
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className={`h-6 w-6 text-white transition-transform duration-500 ${
                  copied ? "scale-110 text-emerald-400" : "group-hover:-rotate-12"
                }`}
              >
                {copied ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
                  />
                )}
              </svg>
            </div>
            <div className="absolute inset-0 -z-10 rounded-full bg-white/5 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />
          </button>

          <div className="flex flex-col gap-6">
            <p className="max-w-sm text-lg text-foreground/60">
              Currently available for freelance projects and open to full-time
              opportunities.
            </p>
            <div className="flex flex-wrap gap-x-8 gap-y-4">
              {socials.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  className="group relative text-sm uppercase tracking-widest text-white transition-colors hover:text-foreground/70"
                >
                  {social.name}
                  <span className="absolute -bottom-1 left-0 h-px w-0 bg-white transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="footer-reveal mt-24 flex flex-col justify-between gap-6 border-t border-white/10 pt-8 text-xs font-medium uppercase tracking-widest text-foreground/40 sm:flex-row sm:items-center">
        <div className="flex gap-2">
          <span>&copy; 2025 Alex Rivera</span>
          <span>&mdash;</span>
          <span>All Rights Reserved</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
          <TimeDisplay />
        </div>
      </div>
    </footer>
  );
};

export default ContactFooter;
