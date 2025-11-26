export type Project = {
  title: string;
  description: string;
  stack: string[];
  href: string;
  stats: string;
  layout: {
    colSpan: number;
    rowSpan: number;
  };
  accent: string;
  media: {
    type: "image" | "video" | "code";
    src: string;
    alt: string;
  };
  details: {
    year: string;
    role: string;
    challenge: string;
    solution: string;
    outcome: string;
  };
};

export const projects: Project[] = [
  {
    title: "Realtime Collaboration Suite",
    description:
      "Design system and applications enabling synchronous editing, presence indicators, and AI-assisted handoffs for product teams working globally.",
    stack: ["Next.js", "Turborepo", "Liveblocks", "OpenAI"],
    href: "https://example.com/realtime",
    stats: "Shipped in 11 weeks • +38% active sessions",
    layout: {
      colSpan: 6,
      rowSpan: 2,
    },
    accent: "from-indigo-500 via-cyan-400 to-teal-300",
    media: {
      type: "image",
      src: "/media/realtime-suite.svg",
      alt: "Realtime collaboration dashboards",
    },
    details: {
      year: "2024",
      role: "Lead Frontend Engineer",
      challenge: "The client needed to transition from a static file-based workflow to a live, multiplayer environment without rewriting their entire legacy codebase.",
      solution: "Architected a hybrid synchronization engine using CRDTs (Conflict-free Replicated Data Types) via Liveblocks, wrapped in a custom React hook library for easy adoption.",
      outcome: "Reduced merge conflicts by 90% and increased daily active user sessions by 38% within the first quarter of launch.",
    },
  },
  {
    title: "Immersive Story Engine",
    description:
      "Scroll-driven narrative framework blending WebGL shaders with GSAP timelines to craft award-winning editorial experiences.",
    stack: ["Next.js", "Three.js", "GSAP"],
    href: "https://example.com/story",
    stats: "Awwwards SOTD • 4.9 avg dwell time",
    layout: {
      colSpan: 6,
      rowSpan: 1,
    },
    accent: "from-purple-500 via-fuchsia-500 to-rose-400",
    media: {
      type: "image",
      src: "/media/story-engine.svg",
      alt: "Immersive scrollytelling mockup",
    },
    details: {
      year: "2023",
      role: "Creative Developer",
      challenge: "Marketing teams wanted bespoke, high-fidelity storytelling pages but were bottlenecked by engineering resources for every campaign.",
      solution: "Built a configuration-driven 'Story Engine' where designers could define scenes, scroll triggers, and 3D assets in a JSON schema, automatically rendering optimized WebGL experiences.",
      outcome: "Won Awwwards Site of the Day and increased average page dwell time from 1.2 minutes to 4.9 minutes.",
    },
  },
  {
    title: "Intelligent Developer Hub",
    description:
      "Enterprise portal orchestrating documentation, API metrics, and granular access controls into one cohesive developer platform.",
    stack: ["Next.js", "tRPC", "PostgreSQL", "Tailwind"],
    href: "https://example.com/hub",
    stats: "7 teams onboarded • ↓62% support tickets",
    layout: {
      colSpan: 4,
      rowSpan: 1,
    },
    accent: "from-emerald-500 via-emerald-400 to-lime-300",
    media: {
      type: "code",
      src: "{\n  \"edge\": true,\n  \"sso\": \"okta\",\n  \"growth\": \"+142%\"\n}",
      alt: "API usage snapshot",
    },
    details: {
      year: "2024",
      role: "Full Stack Developer",
      challenge: "Internal API documentation was scattered across Confluence, READMEs, and Slack channels, leading to high support volume and slow onboarding.",
      solution: "Developed a centralized portal with auto-generated API docs (OpenAPI), live usage metrics, and role-based access control using tRPC and PostgreSQL.",
      outcome: "Onboarded 7 major product teams and reduced repetitive support tickets by 62% in the first month.",
    },
  },
  {
    title: "Multimodal AI Workbench",
    description:
      "Research interface for orchestrating large-model experimentation, dataset versioning, and pipeline automation.",
    stack: ["Next.js", "LangGraph", "Supabase", "Docker"],
    href: "https://example.com/ai",
    stats: ">120 experiments/day • SOC2 ready",
    layout: {
      colSpan: 8,
      rowSpan: 1,
    },
    accent: "from-sky-500 via-blue-500 to-indigo-400",
    media: {
      type: "image",
      src: "/media/ai-workbench.svg",
      alt: "AI workflow dashboards",
    },
    details: {
      year: "2025",
      role: "Senior UI Engineer",
      challenge: "Data scientists were using command-line tools that made it difficult to visualize complex model chains and compare experiment results side-by-side.",
      solution: "Created a node-based visual editor for constructing model pipelines and a real-time dashboard for monitoring inference costs and latency.",
      outcome: "Accelerated experiment velocity to over 120 runs per day and achieved SOC2 compliance for enterprise deployment.",
    },
  },
];
