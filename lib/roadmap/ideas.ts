import type { RoadmapPage } from "./types";

export const ideas: RoadmapPage = {
  slug: "project-ideas",
  label: "Project ideas",
  title: "Project ideas",
  intro:
    "Pick one project from each level and finish it. A finished, deployed project with a good README is worth more than five half-built ones. Choose something that solves a real problem for you or your classmates.",
  sections: [
    {
      heading: "How to choose and finish a project",
      steps: [
        "Pick a project you would use yourself. Motivation is what finishes projects.",
        "Write one sentence: who it is for and what problem it solves.",
        "List the smallest version that works (the first version should take a weekend or two).",
        "Build it, deploy it early and show it to three people.",
        "Improve it from their feedback, and write the README and a short demo video.",
        "Add the project to your resume with one line about the result.",
      ],
    },
    {
      heading: "Beginner: logic and first apps (1–2 weeks each)",
      table: {
        head: ["Idea", "Stack", "What you learn"],
        rows: [
          [
            "To-do list with filters and local storage",
            "HTML, CSS, JavaScript",
            "The DOM, events, saving state",
          ],
          [
            "Weather app using a public API",
            "JavaScript or React",
            "Fetching data, loading and error states",
          ],
          [
            "Expense tracker with charts",
            "Any frontend stack",
            "State, forms, simple charts",
          ],
          [
            "Quiz app with a score and a timer",
            "JavaScript",
            "Application logic and timers",
          ],
          ["Pomodoro and habit tracker", "React", "Components, effects, local storage"],
          ["Markdown notes app", "React or Vue", "Text parsing, persistence"],
          [
            "Tic-tac-toe or Snake with an AI opponent",
            "Any language",
            "Game loops, minimax or simple heuristics",
          ],
          [
            "Command-line contact book",
            "Python or Java",
            "Files, data structures, input handling",
          ],
          [
            "URL shortener (basic)",
            "Node.js or Python and SQLite",
            "Routing, a database, redirects",
          ],
          [
            "Personal portfolio and blog",
            "Next.js or plain HTML",
            "Layout, responsive design, deployment",
          ],
        ],
      },
    },
    {
      heading: "Intermediate: real apps with a database (3–5 weeks each)",
      table: {
        head: ["Idea", "Stack", "What you learn"],
        rows: [
          [
            "Campus event and club portal",
            "Next.js, PostgreSQL, auth",
            "Roles, CRUD, notifications",
          ],
          [
            "Study group and notes sharing app",
            "Full-stack, file uploads",
            "Uploads, permissions, search",
          ],
          [
            "Placement tracker (companies, deadlines, status)",
            "Full-stack with a calendar view",
            "Data modelling and reminders",
          ],
          [
            "Hostel mess feedback and complaint system",
            "Full-stack with dashboards",
            "Real users, admin views, analytics",
          ],
          [
            "Lost and found for campus",
            "Full-stack with images",
            "Image uploads, matching, moderation",
          ],
          [
            "Coding contest tracker with reminders",
            "Node.js, public contest APIs",
            "API integration, cron jobs, email",
          ],
          [
            "Blog or CMS with a markdown editor",
            "Next.js and a database",
            "Auth, drafts, SEO, caching",
          ],
          [
            "Real-time chat with rooms",
            "WebSockets, Redis",
            "Real-time messaging, presence",
          ],
          [
            "Job and internship board",
            "Full-stack with search",
            "Filtering, pagination, full-text search",
          ],
          [
            "Expense splitting app (like Splitwise)",
            "Full-stack",
            "Algorithms for settling debts, data design",
          ],
          [
            "Resume builder that exports a PDF",
            "React and a PDF library",
            "Forms, templates, rendering",
          ],
          [
            "Quiz and exam platform with timed tests",
            "Full-stack",
            "Sessions, timers, anti-cheat basics",
          ],
        ],
      },
    },
    {
      heading: "Advanced: systems and depth (6–10 weeks each)",
      table: {
        head: ["Idea", "Stack", "What you learn"],
        rows: [
          [
            "Collaborative document editor",
            "WebSockets, CRDTs or operational transforms",
            "Conflict resolution and real-time sync",
          ],
          [
            "Code execution sandbox (online judge)",
            "Docker, queues, a backend",
            "Isolation, queues, security, resource limits",
          ],
          [
            "Distributed rate limiter or job queue",
            "Redis, Go or Java",
            "Distributed locking, retries, idempotency",
          ],
          [
            "Search engine for a set of documents",
            "Inverted index, ranking",
            "Indexing, relevance, text processing",
          ],
          [
            "Mini database or key-value store",
            "C++, Go or Rust",
            "Storage engines, indexes, persistence",
          ],
          [
            "Recommendation engine for books or courses",
            "Python, scikit-learn",
            "Collaborative filtering, evaluation",
          ],
          [
            "Retrieval-based Q&A bot over college documents",
            "Python, embeddings, a vector store",
            "Chunking, retrieval, evaluation, cost",
          ],
          [
            "Monitoring dashboard with alerts",
            "Prometheus, Grafana, a sample app",
            "Metrics, dashboards, alerting rules",
          ],
          [
            "Compiler or interpreter for a small language",
            "Any language",
            "Parsing, scoping, bytecode, error messages",
          ],
          [
            "Multiplayer game with a server",
            "Unity or Godot, a backend",
            "Networking, lag handling, authority",
          ],
        ],
      },
    },
    {
      heading: "Ideas by role",
      table: {
        head: ["Role", "Strong portfolio project"],
        rows: [
          [
            "Backend",
            "An order service with idempotent payments, a queue for emails and a load test showing the results",
          ],
          [
            "Frontend",
            "A design system with documented components, accessibility tests and a published demo site",
          ],
          [
            "Full-stack",
            "A product with real users, payments, an admin area, tests and CI",
          ],
          [
            "Mobile",
            "An offline-first app on the Play Store or TestFlight, with crash reporting",
          ],
          [
            "AI / ML",
            "An evaluated retrieval app, or a model with an honest error analysis and a demo",
          ],
          [
            "Data",
            "A daily pipeline that loads, tests and models data, with a dashboard and documentation",
          ],
          [
            "DevOps",
            "A full pipeline in code: build, test, deploy, monitor and roll back",
          ],
          [
            "Security",
            "A write-up series of CTF challenges, and fixes for a deliberately vulnerable app",
          ],
          ["QA", "An automated suite in CI with reports and a load test"],
          [
            "Embedded",
            "A connected sensor device with firmware updates and a custom board",
          ],
          ["Game", "A published game with a finished loop, from a game jam"],
        ],
      },
    },
    {
      heading: "Make your project stand out",
      bullets: [
        "A live demo link that works. Many reviewers will not clone a repository.",
        "A README with a screenshot, a one-line pitch, features, the tech stack, how to run it and what you would do next.",
        "Tests and a CI badge, even a small number of tests.",
        "A short write-up of one hard problem you solved and the trade-offs you made.",
        "Real usage: even 20 classmates using it is a strong signal.",
        "Clean commits and a clear history. Reviewers read it.",
        "No secrets in the repository, and a sensible licence.",
      ],
    },
    {
      heading: "Project README template",
      steps: [
        "Title and a one-line description of the problem it solves.",
        "A screenshot or a short GIF of the app in use.",
        "Features, in a short list.",
        "Tech stack, and why you chose it.",
        "How to run it locally, with the exact commands.",
        "Architecture: a diagram or a few lines on the main parts.",
        "What you learned and what you would improve.",
        "Links: the live demo, a demo video, and how to contribute.",
      ],
    },
    {
      heading: "Where to find ideas and datasets",
      links: [
        {
          label: "Build Your Own X",
          href: "https://github.com/codecrafters-io/build-your-own-x",
          note: "Guides for rebuilding Git, Redis, a shell, a database and more",
        },
        {
          label: "Project-Based Learning",
          href: "https://github.com/practical-tutorials/project-based-learning",
          note: "Tutorials that teach through projects, by language",
        },
        {
          label: "Free public APIs",
          href: "https://github.com/public-apis/public-apis",
          note: "A list of APIs to build on",
        },
        {
          label: "Kaggle datasets",
          href: "https://www.kaggle.com/datasets",
          note: "Data for ML and analysis projects",
        },
        {
          label: "Frontend Mentor",
          href: "https://www.frontendmentor.io",
          note: "Real design challenges to build",
        },
        {
          label: "CodeCrafters",
          href: "https://codecrafters.io",
          note: "Build real tools step by step, with tests",
        },
      ],
    },
  ],
};
