import type { Role } from "./types";

export const fullStack: Role = {
  slug: "full-stack",
  name: "Full-stack developer",
  color: "var(--board-github)",
  tagline: "Own a feature from the database to the screen.",
  job: "You build both sides of an application: the pages people use and the server behind them. Small teams and startups value this a lot, because one person can ship a whole feature.",
  daily: [
    "Build a feature end to end: schema, API, user interface.",
    "Deploy, monitor and fix your own work.",
    "Decide where logic should live, on the server or in the browser.",
    "Move quickly between SQL, TypeScript and CSS.",
  ],
  suits:
    "You like seeing something finished, and you do not mind being slightly less deep in each area.",
  stack: "TypeScript, React/Next.js, Node.js, PostgreSQL",
  stages: [
    {
      title: "Both foundations",
      time: "Months 1–3",
      study: [
        "HTML, CSS and JavaScript as in the frontend path.",
        "HTTP, REST and SQL as in the backend path.",
        "Git and a deployment workflow.",
      ],
      build: "A static site plus a tiny API, deployed.",
    },
    {
      title: "One stack, end to end",
      time: "Months 4–6",
      study: [
        "TypeScript across frontend and backend.",
        "Next.js (or similar): routing, server components, API routes.",
        "A hosted PostgreSQL database and an ORM or query builder.",
        "Authentication with a provider or library, not written by hand.",
      ],
      build:
        "A full app with sign-in, a database and a deploy. This leaderboard is a good model.",
    },
    {
      title: "Production habits",
      time: "Months 7–9",
      study: [
        "Tests at three levels: unit, API and end to end.",
        "Environment variables, secrets and database migrations.",
        "CI/CD with GitHub Actions.",
        "Error tracking and basic monitoring.",
      ],
      build: "Add tests, CI and error tracking to your app.",
    },
    {
      title: "Product sense",
      time: "Months 10+",
      study: [
        "Payments, file uploads and email: the usual integrations.",
        "Performance on both sides: database indexes and page speed.",
        "Reading and shaping requirements, not just implementing them.",
      ],
      build: "A product with real users, even if only 20 of them.",
    },
  ],
  projects: [
    {
      level: "Starter",
      name: "Notes or task app",
      what: "Sign-in, create and edit items, per-user data, deployed.",
      proves: "You can connect all the layers.",
    },
    {
      level: "Intermediate",
      name: "Marketplace or booking app",
      what: "Roles, search, image uploads, email notifications.",
      proves: "You can handle several user types and integrations.",
    },
    {
      level: "Advanced",
      name: "Product with real users",
      what: "Payments, an admin area, analytics, tests, CI and error tracking.",
      proves: "You can run something in production, which is rarer than building it.",
    },
  ],
  senior: {
    do: [
      "Pick one stack and go deep. Switching every month leaves you shallow everywhere.",
      "Ship early, then improve. A live app teaches more than a perfect local one.",
      "Keep validation on the server. The browser is not a security boundary.",
      "Write database migrations instead of editing the schema by hand.",
      "Learn what your auth library does, even if you do not write it.",
    ],
    avoid: [
      "Calling yourself full-stack after only following tutorials.",
      "Making every project the same to-do app.",
      "Ignoring the database until it is slow.",
      "Skipping deployment. 'It works locally' is not finished.",
      "Rewriting things for fun that already work.",
    ],
  },
  interview: [
    "DSA at medium level.",
    "Build or design a small feature across the stack.",
    "SQL and schema questions, plus a frontend question.",
    "Explain a project you shipped, including a trade-off you made.",
    "Authentication flows and common security mistakes.",
  ],
  links: [
    {
      label: "The Odin Project",
      href: "https://www.theodinproject.com",
      note: "A free full-stack curriculum",
    },
    {
      label: "Full Stack Open",
      href: "https://fullstackopen.com/en/",
      note: "University of Helsinki's free course",
    },
    {
      label: "Learn Next.js",
      href: "https://nextjs.org/learn",
      note: "The official interactive tutorial",
    },
    {
      label: "roadmap.sh: Full Stack",
      href: "https://roadmap.sh/full-stack",
      note: "A visual checklist of topics",
    },
    {
      label: "YouTube (Global): Traversy Media",
      href: "https://www.youtube.com/@TraversyMedia",
      note: "Full stack project builds, start to finish",
    },
    {
      label: "YouTube (Global): The Net Ninja",
      href: "https://www.youtube.com/@NetNinja",
      note: "Short playlists on React, Node and databases",
    },
    {
      label: "YouTube (India): CodeWithHarry",
      href: "https://www.youtube.com/@CodeWithHarry",
      note: "Web development in Hindi",
    },
    {
      label: "YouTube (India): 100xDevs",
      href: "https://www.youtube.com/@100xDevs",
      note: "Full stack and open-source cohort content",
    },
    {
      label: "YouTube (India): Thapa Technical",
      href: "https://www.youtube.com/@ThapaTechnical",
      note: "MERN stack in Hindi",
    },
    {
      label: "YouTube (Global): Theo",
      href: "https://www.youtube.com/@t3dotgg",
      note: "Modern full stack with TypeScript",
    },
  ],
  tools: [
    "VS Code, Git and GitHub",
    "Node.js and a package manager",
    "PostgreSQL and a database client",
    "Docker",
    "A hosting platform such as Vercel, Render or Fly.io",
    "Postman and browser DevTools",
  ],
  ladder: [
    {
      level: "Junior (0–2 years)",
      focus: "Ship small features across the stack with guidance.",
    },
    {
      level: "Mid-level (2–5 years)",
      focus: "Own whole features and the way they are deployed and monitored.",
    },
    {
      level: "Senior (5+ years)",
      focus: "Lead product areas, choose the stack, and balance speed and quality.",
    },
    {
      level: "Staff and beyond",
      focus:
        "Own the technical direction of a product, or move toward engineering management.",
    },
  ],
  first90: [
    {
      days: "Days 1–30",
      goal: "Run the whole stack locally, fix a bug on each side, and read the database schema.",
    },
    {
      days: "Days 31–60",
      goal: "Ship one complete feature, from migration to user interface, with tests.",
    },
    {
      days: "Days 61–90",
      goal: "Own a small area, such as emails or onboarding, and improve something measurable.",
    },
  ],
  week: [
    { when: "Mon, Wed", what: "Learn one missing piece, frontend or backend (1 hour)" },
    { when: "Tue, Thu", what: "DSA: two problems and a revision (45 minutes)" },
    { when: "Fri", what: "Read the code of an open-source app you admire (45 minutes)" },
    {
      when: "Weekend",
      what: "Build: three hours on your product, then deploy the changes",
    },
  ],
  mistakes: [
    "Using a different new tool in every project.",
    "Building features nobody has asked for.",
    "Putting business rules only in the user interface.",
    "Forgetting that every field is a possible attack path.",
    "Never deploying until the end.",
  ],
  ask: [
    "How do you decide what to build first when time is short?",
    "Where have you regretted putting logic on the wrong side?",
    "What do you check before every release?",
  ],
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
};
