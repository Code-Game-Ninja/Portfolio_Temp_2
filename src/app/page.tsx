import MagneticHero from "@/components/sections/MagneticHero";
import ProjectsGrid from "@/components/sections/ProjectsGrid";
import StoryScroll from "@/components/sections/StoryScroll";
import Toolkit from "@/components/sections/Toolkit";
import Playground from "@/components/sections/Playground";
import ContactFooter from "@/components/sections/ContactFooter";

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col gap-32 overflow-hidden pb-0">
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-[0.65] mix-blend-screen">
        <div className="absolute -left-32 top-12 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(79,70,229,0.18)_0%,rgba(79,70,229,0)_70%)] blur-3xl" />
        <div className="absolute right-0 top-40 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(6,182,212,0.16)_0%,rgba(6,182,212,0)_70%)] blur-3xl" />
      </div>
      <MagneticHero />
      <StoryScroll />
      <Toolkit />
      <ProjectsGrid />
      <Playground />
      <ContactFooter />
    </main>
  );
}
