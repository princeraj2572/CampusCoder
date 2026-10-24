import type { RoleExtra } from "./roles-extra";

export interface RoleInfo {
  /** The kinds of employer, so a student knows where to apply. */
  where: { type: string; what: string }[];
  /** Common beliefs that are wrong, and what is true. */
  myths: { myth: string; truth: string }[];
}

/** The three roles added after the first set. */
export const MORE_EXTRAS: Record<string, RoleExtra> = {
  qa: {
    tools: [
      "Playwright or Selenium",
      "Postman",
      "pytest, or Vitest and Jest",
      "GitHub Actions",
      "Jira or a similar issue tracker",
      "k6 for load tests",
    ],
    ladder: [
      {
        level: "Junior (0–2 years)",
        focus: "Run and write test cases, report bugs clearly and learn the product.",
      },
      {
        level: "Mid-level (2–5 years)",
        focus: "Own the automation for an area, keep it reliable and mentor newcomers.",
      },
      {
        level: "Senior (5+ years)",
        focus: "Design the test strategy and framework, and shape quality across teams.",
      },
      {
        level: "Staff and beyond",
        focus:
          "Set the quality engineering direction, or move into engineering leadership.",
      },
    ],
    first90: [
      {
        days: "Days 1–30",
        goal: "Learn the product as a user, run the existing tests and file your first real bug reports.",
      },
      {
        days: "Days 31–60",
        goal: "Automate a few repeated checks and fix at least one flaky test.",
      },
      {
        days: "Days 61–90",
        goal: "Own the test plan for a feature from requirement to release.",
      },
    ],
    week: [
      {
        when: "Mon, Wed",
        what: "Learn a testing technique or tool and practise on a real site (1 hour)",
      },
      { when: "Tue, Thu", what: "Coding practice and SQL (45 minutes)" },
      {
        when: "Fri",
        what: "Find and write up five bugs in an open-source app (45 minutes)",
      },
      { when: "Weekend", what: "Build: two hours on your automation project" },
    ],
    mistakes: [
      "Writing tests that depend on each other's order.",
      "Using fixed waits instead of waiting for the page.",
      "Reporting a bug with no steps or screenshot.",
      "Testing only the happy path.",
      "Never reading the code under test.",
    ],
    ask: [
      "Which bugs reach users most often, and why do they escape?",
      "How do you decide what to automate and what to leave manual?",
      "How do you stop the suite becoming slow and flaky?",
    ],
  },
  embedded: {
    tools: [
      "An ESP32 or STM32 board and an Arduino",
      "A multimeter and a breadboard",
      "A logic analyser (even a cheap one)",
      "PlatformIO or ESP-IDF",
      "KiCad",
      "A serial terminal",
    ],
    ladder: [
      {
        level: "Junior (0–2 years)",
        focus: "Write drivers and small features, and learn to debug on real hardware.",
      },
      {
        level: "Mid-level (2–5 years)",
        focus: "Own a subsystem, such as communication or power management.",
      },
      {
        level: "Senior (5+ years)",
        focus:
          "Design firmware architecture, choose parts and lead bring-up of new boards.",
      },
      {
        level: "Staff and beyond",
        focus:
          "Set the technical direction for a product line and its hardware and software together.",
      },
    ],
    first90: [
      {
        days: "Days 1–30",
        goal: "Build the firmware, flash a board and read through the existing drivers.",
      },
      {
        days: "Days 31–60",
        goal: "Fix hardware-related bugs using the debugger and a logic analyser.",
      },
      {
        days: "Days 61–90",
        goal: "Own a small feature and test it on real hardware, including a long-running test.",
      },
    ],
    week: [
      {
        when: "Mon, Wed",
        what: "C practice and one electronics topic with a small experiment (1 hour)",
      },
      { when: "Tue, Thu", what: "DSA in C or C++ (45 minutes)" },
      {
        when: "Fri",
        what: "Read one datasheet section and write a driver from it (45 minutes)",
      },
      { when: "Weekend", what: "Build: two hours on your hardware project" },
    ],
    mistakes: [
      "Skipping the datasheet and copying a library.",
      "Doing heavy work inside an interrupt.",
      "Blaming the code when the wiring or power is wrong.",
      "Not using a watchdog.",
      "Forgetting that variables shared with interrupts need to be volatile.",
    ],
    ask: [
      "What is the hardest bug you have debugged, and how did you find it?",
      "How do you test firmware without the real device?",
      "How do you make updates safe when the device is in the field?",
    ],
  },
  game: {
    tools: [
      "Unity, Godot or Unreal Engine",
      "Visual Studio or Rider",
      "Git and Git LFS",
      "Aseprite or Blender for simple art",
      "The engine's profiler",
      "itch.io for publishing",
    ],
    ladder: [
      {
        level: "Junior (0–2 years)",
        focus: "Implement features and fix bugs inside an existing game.",
      },
      {
        level: "Mid-level (2–5 years)",
        focus: "Own gameplay systems, such as combat, inventory or AI.",
      },
      {
        level: "Senior (5+ years)",
        focus: "Design the architecture, lead a feature team and tune performance.",
      },
      {
        level: "Staff and beyond",
        focus: "Lead technical direction, engines and tools across projects.",
      },
    ],
    first90: [
      {
        days: "Days 1–30",
        goal: "Build the project, play the game a lot and fix small bugs.",
      },
      {
        days: "Days 31–60",
        goal: "Implement a small gameplay feature with the designers and tune how it feels.",
      },
      {
        days: "Days 61–90",
        goal: "Find and fix a frame-rate problem using the profiler.",
      },
    ],
    week: [
      {
        when: "Mon, Wed",
        what: "Learn one engine feature or maths topic and add it to your game (1 hour)",
      },
      {
        when: "Tue, Thu",
        what: "DSA, with pathfinding and geometry questions (45 minutes)",
      },
      { when: "Fri", what: "Rebuild one mechanic from a game you like (45 minutes)" },
      { when: "Weekend", what: "Build: three hours on your game, or a game jam" },
    ],
    mistakes: [
      "Starting a huge project and never finishing it.",
      "Putting all logic in one giant script.",
      "Spawning and destroying objects every frame.",
      "Tuning by guesswork instead of testing with real players.",
      "Not building for the target device until the end.",
    ],
    ask: [
      "How do you decide a feature is fun enough to keep?",
      "How do you keep the game running at a steady frame rate?",
      "How do programmers and designers work together here?",
    ],
  },
};

export const ROLE_INFO: Record<string, RoleInfo> = {
  backend: {
    where: [
      { type: "Product companies", what: "Own APIs and services for a large user base." },
      { type: "Startups", what: "Build the whole backend quickly with a small team." },
      {
        type: "Fintech and e-commerce",
        what: "Payments, orders and reliability matter most.",
      },
      { type: "Service companies", what: "Build systems for clients across industries." },
    ],
    myths: [
      {
        myth: "Backend is only CRUD.",
        truth:
          "The hard part is correctness, speed and failure at scale, not the endpoints.",
      },
      {
        myth: "You must learn microservices early.",
        truth: "A well-built single service is better than a badly split system.",
      },
      {
        myth: "The framework is the skill.",
        truth: "Databases, networking and design outlast any framework.",
      },
    ],
  },
  frontend: {
    where: [
      {
        type: "Product companies",
        what: "Own the web app that customers use every day.",
      },
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
  },
  "full-stack": {
    where: [
      { type: "Startups", what: "Small teams need people who can ship a feature alone." },
      { type: "Product teams", what: "Own features from database to screen." },
      {
        type: "Freelance and agencies",
        what: "Deliver full websites and apps for clients.",
      },
      {
        type: "Internal tools teams",
        what: "Build dashboards and admin tools for a company.",
      },
    ],
    myths: [
      {
        myth: "Full-stack means being an expert at everything.",
        truth: "It means being useful across the stack and deep in at least one part.",
      },
      {
        myth: "It is the easier path.",
        truth: "It asks for broad learning and steady updating on both sides.",
      },
      {
        myth: "Full-stack roles pay less.",
        truth: "Pay depends on the company and your depth, not the title.",
      },
    ],
  },
  mobile: {
    where: [
      {
        type: "Consumer app companies",
        what: "Food, travel, payments and social apps depend on mobile.",
      },
      { type: "Fintech and banks", what: "Secure apps used by millions." },
      { type: "Startups", what: "Mobile-first products built by tiny teams." },
      { type: "Agencies", what: "Build apps for many brands." },
    ],
    myths: [
      {
        myth: "Cross-platform makes native skills useless.",
        truth:
          "Knowing the native platform helps you solve problems the framework hides.",
      },
      {
        myth: "Mobile is only for people who like design.",
        truth: "Performance, offline sync and architecture are large parts of the job.",
      },
      {
        myth: "Once published, an app is finished.",
        truth: "Releases, crashes and operating-system updates never stop.",
      },
    ],
  },
  "ai-ml": {
    where: [
      {
        type: "Product companies",
        what: "Recommendations, search, fraud detection and assistants.",
      },
      {
        type: "AI startups",
        what: "Build products on top of language and vision models.",
      },
      { type: "Research labs", what: "Usually need a master's degree or a PhD." },
      {
        type: "Healthcare and finance",
        what: "Predictive models with strict quality rules.",
      },
    ],
    myths: [
      {
        myth: "AI jobs are mostly about training models.",
        truth: "Most of the work is data, evaluation, and getting models into products.",
      },
      {
        myth: "You need a PhD.",
        truth:
          "Research roles often do, but applied engineering roles value skills and projects.",
      },
      {
        myth: "Calling an API is enough.",
        truth: "Employers want people who can measure quality and handle failures.",
      },
    ],
  },
  data: {
    where: [
      {
        type: "Product and e-commerce companies",
        what: "Track the business with dashboards and models.",
      },
      { type: "Banks and insurers", what: "Reporting, risk and customer analysis." },
      { type: "Consulting firms", what: "Analyse data for many clients." },
      {
        type: "Tech companies",
        what: "Build the pipelines and platforms other teams rely on.",
      },
    ],
    myths: [
      {
        myth: "Analysts only make charts.",
        truth: "The value is in choosing the right question and checking the answer.",
      },
      {
        myth: "Data engineering is only for big companies.",
        truth: "Any company with several data sources needs reliable pipelines.",
      },
      {
        myth: "SQL is outdated.",
        truth:
          "SQL is the most used data skill, and it is asked in almost every interview.",
      },
    ],
  },
  devops: {
    where: [
      {
        type: "Cloud-based product companies",
        what: "Run the platform that everyone deploys on.",
      },
      { type: "Fintech and e-commerce", what: "High uptime is a business requirement." },
      { type: "Managed service providers", what: "Operate infrastructure for clients." },
      { type: "Startups", what: "Often one person sets up everything." },
    ],
    myths: [
      {
        myth: "DevOps means knowing every tool.",
        truth: "It is a way of working: automation, feedback and shared ownership.",
      },
      {
        myth: "It is only for experienced people.",
        truth: "Many start as developers or system administrators and learn on the job.",
      },
      {
        myth: "Kubernetes is the first thing to learn.",
        truth: "Linux, networking and Docker come first.",
      },
    ],
  },
  security: {
    where: [
      {
        type: "Product companies",
        what: "Application security and incident response teams.",
      },
      { type: "Banks and fintech", what: "Strict rules and high stakes." },
      {
        type: "Security consultancies",
        what: "Test many clients' systems, with permission.",
      },
      { type: "Bug bounty", what: "Independent testing of programmes that invite it." },
    ],
    myths: [
      {
        myth: "Security is mostly hacking like in films.",
        truth:
          "It is patient reading, writing, testing and helping developers fix things.",
      },
      {
        myth: "You can start with tools like Kali.",
        truth: "Networking, Linux and web fundamentals come first.",
      },
      {
        myth: "Bug bounties are an easy income.",
        truth: "They are competitive. Treat them as practice, not a salary.",
      },
    ],
  },
  qa: {
    where: [
      { type: "Product companies", what: "Quality engineers embedded in feature teams." },
      { type: "Service and testing firms", what: "Test software for many clients." },
      { type: "Fintech and healthcare", what: "Testing is part of compliance." },
      { type: "Game studios", what: "Playtesting and automation for builds." },
    ],
    myths: [
      {
        myth: "QA is a lesser job than development.",
        truth: "Good quality engineers write code, design systems and are valued highly.",
      },
      {
        myth: "Automation will replace testers.",
        truth: "It replaces repeated checks. Thinking about risk still needs people.",
      },
      {
        myth: "Testing is only clicking around.",
        truth: "Modern testing is programming, API work and pipeline design.",
      },
    ],
  },
  embedded: {
    where: [
      { type: "Automotive", what: "Engine control, infotainment and driver assistance." },
      {
        type: "Consumer electronics",
        what: "Wearables, speakers and smart-home devices.",
      },
      {
        type: "Medical and industrial",
        what: "Reliable devices with strict safety rules.",
      },
      { type: "Telecom and networking", what: "Routers and radio equipment." },
    ],
    myths: [
      {
        myth: "Embedded means only Arduino.",
        truth: "Arduino is a start. Professional work uses C, RTOS and custom boards.",
      },
      {
        myth: "You must be an electronics graduate.",
        truth: "Many software people succeed, if they learn electronics basics.",
      },
      {
        myth: "It is a dying field.",
        truth: "Every connected device needs firmware, and demand keeps growing.",
      },
    ],
  },
  game: {
    where: [
      { type: "Game studios", what: "Gameplay, tools and engine programming." },
      { type: "Mobile game companies", what: "Casual and free-to-play titles." },
      {
        type: "Simulation and training",
        what: "Games engines for education, defence and architecture.",
      },
      { type: "Indie and freelance", what: "Build and sell your own games." },
    ],
    myths: [
      {
        myth: "Game development is mostly playing games.",
        truth: "It is long, careful engineering with tight deadlines.",
      },
      {
        myth: "You need to be an artist too.",
        truth: "Programmers focus on code, though basic art helps for prototypes.",
      },
      {
        myth: "Game skills only lead to game jobs.",
        truth: "Performance, maths and real-time systems transfer to many industries.",
      },
    ],
  },
};
