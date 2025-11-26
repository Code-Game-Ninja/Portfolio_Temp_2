# Alex Rivera — Creative Developer Portfolio

A high-performance, immersive portfolio website built with Next.js, TypeScript, and GSAP. Designed to showcase creative engineering work with premium animations, smooth transitions, and a polished dark-mode aesthetic.

![Portfolio Preview](public/media/preview.png)

## ✨ Features

- **Immersive Animations:**
  - **Magnetic Hero:** Interactive elements that follow and react to cursor movement.
  - **Scroll-Driven Story:** Parallax effects and clipped reveals powered by GSAP ScrollTrigger.
  - **3D Tilt Cards:** Project cards with physics-based tilt and media parallax on hover.
  - **Ambient Motion:** Floating gradient blobs and noise textures for a living background.
  - **Page Transitions:** Smooth blur-to-focus entry animations.

- **Interactive UI:**
  - **Custom Cursor:** Context-aware cursor that expands on interactive elements.
  - **Project Modals:** Detailed view with staggered content reveals and backdrop blurs.
  - **Magnetic Buttons:** Call-to-action buttons that magnetically snap to the cursor.
  - **Infinite Marquee:** Horizontal scrolling playground section.

- **Tech Stack:**
  - **Framework:** [Next.js 15](https://nextjs.org/) (App Router)
  - **Language:** [TypeScript](https://www.typescriptlang.org/)
  - **Styling:** [Tailwind CSS](https://tailwindcss.com/)
  - **Animation:** [GSAP](https://greensock.com/gsap/) (GreenSock Animation Platform)
  - **Fonts:** [Geist](https://vercel.com/font) (Sans & Mono)

## 🚀 Getting Started

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/Code-Game-Ninja/Portfolio_Temp_2.git
    cd Portfolio_Temp_2
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    ```

3.  **Run the development server:**

    ```bash
    npm run dev
    ```

4.  **Open your browser:**
    Navigate to [http://localhost:3000](http://localhost:3000) to view the site.

## 📂 Project Structure

```
src/
├── app/                # Next.js App Router pages and layouts
│   ├── globals.css     # Global styles (Tailwind + Noise texture)
│   ├── layout.tsx      # Root layout with Cursor & Blobs
│   ├── page.tsx        # Main landing page composition
│   └── template.tsx    # Page transition logic
├── components/
│   ├── sections/       # Page sections (Hero, Projects, Story, etc.)
│   ├── AnimatedBlobs.tsx # Background animation
│   ├── Cursor.tsx      # Custom cursor component
│   └── ProjectModal.tsx # Detailed project view
├── data/               # Static content (Projects list)
├── hooks/              # Custom React hooks (useIsomorphicLayoutEffect)
└── lib/                # Utilities (GSAP registry)
```

## 🎨 Customization

-   **Projects:** Edit `src/data/projects.ts` to update your portfolio items.
-   **Theme:** Modify `src/app/globals.css` to change CSS variables for colors.
-   **Animations:** Tweak GSAP settings in individual component files (e.g., `duration`, `ease`).

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
