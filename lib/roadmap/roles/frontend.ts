import type { Role } from "./types";

export const frontend: Role = {
  slug: "frontend",
  name: "Frontend developer",
  color: "var(--board-dsa)",
  tagline: "Build what people see, tap and read in the browser.",
  job: "You turn designs and ideas into pages that load fast, work on every screen size and can be used by everyone, including people on keyboards and screen readers. You also decide how data from the server is fetched, cached and shown.",
  daily: [
    "Build components from a design and make them responsive.",
    "Connect pages to APIs and handle loading, empty and error states.",
    "Fix layout and browser bugs.",
    "Improve speed: images, bundle size, rendering.",
    "Work with designers and backend developers on how a feature should behave.",
  ],
  suits:
    "You care how things look and feel, you notice small details, and you enjoy quick visual feedback.",
  stack: "HTML, CSS, TypeScript, React, Next.js",
  stages: [
    {
      title: "Web foundations",
      time: "Months 1–2",
      study: [
        "Semantic HTML, forms and links.",
        "CSS: the box model, flexbox, grid, responsive design.",
        "JavaScript: functions, closures, arrays, async/await, the DOM.",
        "Browser DevTools: elements, network and console tabs.",
      ],
      build:
        "Three static pages with no framework: a portfolio, a landing page and a form.",
    },
    {
      title: "Modern frontend",
      time: "Months 3–5",
      study: [
        "TypeScript basics.",
        "React: components, props, state, effects and custom hooks.",
        "Fetching data, loading and error states, and forms with validation.",
        "A CSS approach (Tailwind or CSS modules) and a component library.",
        "Routing and a framework such as Next.js.",
      ],
      build:
        "A dashboard that loads real API data, with search, filters and a dark mode.",
    },
    {
      title: "Quality",
      time: "Months 6–8",
      study: [
        "Accessibility: keyboard use, focus, labels, contrast, ARIA only when needed.",
        "Performance: Core Web Vitals, image formats, lazy loading, code splitting.",
        "Testing: component tests and one end-to-end test with Playwright.",
        "State management beyond local state, and caching server data.",
      ],
      build: "Audit your dashboard with Lighthouse and fix every issue you can explain.",
    },
    {
      title: "Depth",
      time: "Months 9+",
      study: [
        "Rendering strategies: static, server and client rendering, and when to use each.",
        "How React works underneath: rendering, reconciliation, keys.",
        "Design systems and reusable components.",
        "Basic backend skills, so you can build a full feature alone.",
      ],
      build: "A small design system with documented components and tests.",
    },
  ],
  projects: [
    {
      level: "Starter",
      name: "Personal portfolio, hand-written",
      what: "Responsive, accessible, under 100 KB, and deployed on a free host.",
      proves: "You know HTML and CSS without a framework doing the work.",
    },
    {
      level: "Intermediate",
      name: "Data dashboard",
      what: "Charts, tables with sorting and filters, loading and error states, dark mode.",
      proves: "You can handle real data and all the states around it.",
    },
    {
      level: "Advanced",
      name: "Collaborative or real-time app",
      what: "A shared to-do board or chat with optimistic updates, offline handling and tests.",
      proves: "You can manage complex state and keep the interface honest.",
    },
  ],
  senior: {
    do: [
      "Test with the keyboard only. If you cannot use your page, neither can many users.",
      "Handle every state: loading, empty, error, slow network.",
      "Learn plain CSS before a library, so you can fix things when it breaks.",
      "Measure performance before optimising.",
      "Read the framework's docs. Most of the answers are there.",
    ],
    avoid: [
      "Adding a library for something the browser already does.",
      "Using div for everything.",
      "Putting all state in one global store from day one.",
      "Designing only for your own laptop screen.",
      "Chasing every new framework instead of mastering one.",
    ],
  },
  interview: [
    "JavaScript fundamentals: closures, this, promises, the event loop.",
    "Build a small component live, such as a search box with debouncing or an accordion.",
    "CSS layout questions with flexbox and grid.",
    "React: hooks, why keys matter, how to avoid unnecessary renders.",
    "How you would make a page fast and accessible.",
  ],
  links: [
    {
      label: "roadmap.sh: Frontend",
      href: "https://roadmap.sh/frontend",
      note: "A visual checklist of topics",
    },
    {
      label: "web.dev Learn",
      href: "https://web.dev/learn",
      note: "Google's courses on CSS, accessibility and performance",
    },
    {
      label: "JavaScript.info",
      href: "https://javascript.info",
      note: "The modern JavaScript tutorial",
    },
    {
      label: "React documentation",
      href: "https://react.dev/learn",
      note: "Learn React from the official docs",
    },
  ],
  tools: [
    "VS Code with ESLint and Prettier",
    "Chrome DevTools and the React DevTools extension",
    "Node.js with npm or pnpm",
    "Figma, at least for reading designs",
    "Lighthouse and axe for accessibility and speed checks",
    "Playwright for browser tests",
  ],
  ladder: [
    {
      level: "Junior (0–2 years)",
      focus: "Turn designs into working, responsive components and fix visual bugs.",
    },
    {
      level: "Mid-level (2–5 years)",
      focus: "Own features, manage state well, and improve accessibility and speed.",
    },
    {
      level: "Senior (5+ years)",
      focus:
        "Design the frontend architecture, guide the design system, and mentor others.",
    },
    {
      level: "Staff and beyond",
      focus: "Set standards across products and connect design, product and engineering.",
    },
  ],
  first90: [
    {
      days: "Days 1–30",
      goal: "Run the app, fix small visual bugs, and learn the component library and naming.",
    },
    {
      days: "Days 31–60",
      goal: "Build a feature from a design, including empty and error states and tests.",
    },
    {
      days: "Days 61–90",
      goal: "Find and fix one real performance or accessibility problem and show the numbers.",
    },
  ],
  week: [
    { when: "Mon, Wed", what: "One lesson on a frontend topic, then apply it (1 hour)" },
    {
      when: "Tue, Thu",
      what: "DSA: two problems and a JavaScript question (45 minutes)",
    },
    { when: "Fri", what: "Rebuild one real site's component from scratch (45 minutes)" },
    {
      when: "Weekend",
      what: "Build: two hours on your project, then one accessibility fix",
    },
  ],
  mistakes: [
    "Fixing a layout with magic numbers instead of understanding the cause.",
    "Fetching data inside every component.",
    "Not handling the loading and error states.",
    "Removing the focus outline.",
    "Testing only on one browser.",
  ],
  ask: [
    "How do you decide between a new component and a variation of an existing one?",
    "What does a performance regression look like on this team?",
    "How do you work with designers when the design cannot be built as drawn?",
  ],
  where: [
    { type: "Product companies", what: "Own the web app that customers use every day." },
    { type: "Agencies", what: "Build many sites for different clients quickly." },
    {
      type: "SaaS startups",
      what: "Ship dashboards and tools with design and backend teams.",
    },
    { type: "E-commerce", what: "Speed and accessibility directly affect sales." },
  ],
  myths: [
    {
      myth: "Frontend is just making things pretty.",
      truth: "It is state, performance, accessibility and a lot of engineering.",
    },
    {
      myth: "You must know every framework.",
      truth: "Learn one framework deeply and the JavaScript beneath it.",
    },
    {
      myth: "Frontend roles do not need DSA.",
      truth: "Many companies still test it, though often at a lighter level.",
    },
  ],
};
