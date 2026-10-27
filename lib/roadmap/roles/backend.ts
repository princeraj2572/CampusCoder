import type { Role } from "./types";

export const backend: Role = {
  slug: "backend",
  name: "Backend developer",
  color: "var(--tier-blue)",
  tagline: "Build the servers, APIs and databases that apps run on.",
  job: "You write the code that runs on servers: the APIs a website or app calls, the rules that decide who can do what, and the database queries behind it. Users never see your work, but they feel it when it is slow or broken.",
  daily: [
    "Design and build API endpoints, and agree their shape with the frontend or mobile team.",
    "Write and tune SQL queries and database schemas.",
    "Debug production problems from logs, metrics and error reports.",
    "Review teammates' code and write tests for your own.",
    "Talk to other services: payments, email, queues, third-party APIs.",
  ],
  suits:
    "You like logic, data and making systems reliable more than pixels. You are patient when debugging.",
  stack: "Java, Node.js/TypeScript, Python or Go, SQL, Redis",
  stages: [
    {
      title: "Foundations",
      time: "Months 1–2",
      study: [
        "One language well (Java, Python, Node.js with TypeScript or Go).",
        "How the web works: HTTP, status codes, headers, cookies, DNS.",
        "Git, the terminal, and reading error messages calmly.",
        "Basic SQL: tables, joins, GROUP BY.",
      ],
      build: "A small command-line tool and a plain HTTP server with three endpoints.",
    },
    {
      title: "Core backend",
      time: "Months 3–5",
      study: [
        "REST API design: resources, verbs, pagination, versioning, error format.",
        "A relational database in depth: schema design, normalisation, indexes, transactions.",
        "Authentication and authorisation: sessions, JWT, OAuth, role checks.",
        "Input validation, logging and configuration through environment variables.",
        "Automated tests: unit tests and API tests.",
      ],
      build: "A CRUD API with login, roles, a real database, tests and a deploy.",
    },
    {
      title: "Make it fast and reliable",
      time: "Months 6–8",
      study: [
        "Caching with Redis, and when a cache causes more problems than it solves.",
        "Background jobs and queues; retries and idempotency.",
        "Reading query plans (EXPLAIN) and fixing slow queries.",
        "Rate limiting, timeouts, and handling a downstream service that fails.",
        "Docker and a CI pipeline that runs your tests.",
      ],
      build:
        "Add a cache, a job queue and rate limiting to the previous project, and measure the difference.",
    },
    {
      title: "Systems thinking",
      time: "Months 9+",
      study: [
        "System design basics: load balancers, replication, sharding, CAP theorem.",
        "Message brokers and event-driven designs.",
        "Observability: structured logs, metrics, traces, alerts.",
        "Security basics: OWASP Top 10, secrets handling, SQL injection.",
      ],
      build:
        "A design document and working prototype for a URL shortener or a notification system.",
    },
  ],
  projects: [
    {
      level: "Starter",
      name: "Library or hostel manager API",
      what: "CRUD endpoints, a relational schema, login, and a README with every endpoint documented.",
      proves: "You can model data and build a clean API.",
    },
    {
      level: "Intermediate",
      name: "URL shortener with analytics",
      what: "Short codes, redirects, click counts, a cache in front of the database, rate limiting.",
      proves: "You understand caching, indexes and abuse protection.",
    },
    {
      level: "Advanced",
      name: "Order and payment service",
      what: "Idempotent payment calls, a job queue for emails and invoices, retries, and an audit log.",
      proves: "You can design for failure, which is the real backend skill.",
    },
  ],
  senior: {
    do: [
      "Learn SQL properly. Most backend work is a database problem in disguise.",
      "Write the data model first. A good schema removes half the bugs.",
      "Log enough to debug a failure at 2 am, but never passwords or tokens.",
      "Add an index only after checking the query plan.",
      "Make every write safe to retry.",
    ],
    avoid: [
      "Reaching for microservices before one service is well built.",
      "Storing money in floating-point numbers.",
      "Trusting any input from the client, even from your own frontend.",
      "Skipping tests because 'it works on my machine'.",
      "Copying a framework tutorial without knowing what the framework does for you.",
    ],
  },
  interview: [
    "DSA at medium level, usually hashing, trees and graphs.",
    "SQL queries and schema design for a small app.",
    "Design an API or a service such as a URL shortener.",
    "What happens when you type a URL; how HTTPS works; how sessions differ from JWTs.",
    "Walk through one of your projects, including a bug you fixed.",
  ],
  links: [
    {
      label: "roadmap.sh: Backend",
      href: "https://roadmap.sh/backend",
      note: "A visual checklist of topics",
    },
    {
      label: "System Design Primer",
      href: "https://github.com/donnemartin/system-design-primer",
      note: "Design problems with worked answers",
    },
    {
      label: "Use The Index, Luke",
      href: "https://use-the-index-luke.com",
      note: "Free guide to SQL indexing",
    },
    {
      label: "OWASP Top 10",
      href: "https://owasp.org/www-project-top-ten/",
      note: "The risks every backend developer should know",
    },
  ],
  tools: [
    "PostgreSQL or MySQL, plus a client such as DBeaver",
    "Postman or curl for trying APIs",
    "Docker and Docker Compose",
    "Redis",
    "Git and GitHub Actions",
    "A debugger and a profiler for your language",
  ],
  ladder: [
    {
      level: "Junior (0–2 years)",
      focus: "Finish well-scoped tasks, write tests, and learn the codebase.",
    },
    {
      level: "Mid-level (2–5 years)",
      focus:
        "Own a service or feature area, design APIs, and fix production problems alone.",
    },
    {
      level: "Senior (5+ years)",
      focus:
        "Design systems, review others, and make trade-offs between speed, cost and safety.",
    },
    {
      level: "Staff and beyond",
      focus: "Set technical direction across teams and grow other engineers.",
    },
  ],
  first90: [
    {
      days: "Days 1–30",
      goal: "Get the project running locally, fix two small bugs, and read the main request flow end to end.",
    },
    {
      days: "Days 31–60",
      goal: "Ship a small feature with tests, and learn how the team deploys and monitors.",
    },
    {
      days: "Days 61–90",
      goal: "Take an on-call shadow shift and own a small improvement, such as a slow query.",
    },
  ],
  week: [
    {
      when: "Mon, Wed",
      what: "Study one backend topic and apply it in your project (1 hour)",
    },
    { when: "Tue, Thu", what: "DSA: two problems and a revision (45 minutes)" },
    { when: "Fri", what: "SQL practice or a system design case (45 minutes)" },
    { when: "Weekend", what: "Build: two hours on your project, then a contest" },
  ],
  mistakes: [
    "Building endpoints without thinking about who is allowed to call them.",
    "Returning different error shapes from different endpoints.",
    "Running a query inside a loop.",
    "Catching an exception and doing nothing with it.",
    "Never reading the logs of their own deployed service.",
  ],
  ask: [
    "What was the worst production incident here, and what did you change afterwards?",
    "How do you decide when to add a new service?",
    "What would you check first if the API suddenly became slow?",
  ],
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
};
