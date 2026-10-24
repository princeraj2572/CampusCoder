import { ROLE_EXTRAS, type RoleExtra } from "./roles-extra";
import { MORE_EXTRAS, ROLE_INFO, type RoleInfo } from "./roles-info";
import { embedded, game, qa } from "./roles-more";
import { NEW_DETAILS, product, uxdesign, web3 } from "./roles-new";
import type { RoadmapLink } from "./types";

export interface RoleStage {
  title: string;
  /** Rough time to spend here, for someone studying alongside college. */
  time: string;
  study: string[];
  /** What to make before moving on. */
  build: string;
}

export interface RoleProject {
  level: "Starter" | "Intermediate" | "Advanced";
  name: string;
  what: string;
  /** What a reviewer learns about you from it. */
  proves: string;
}

export interface BaseRole {
  slug: string;
  name: string;
  /** A CSS colour variable from the theme. */
  color: string;
  tagline: string;
  /** Plain words: what this person does all day. */
  job: string;
  daily: string[];
  suits: string;
  /** Main language or tools, for the comparison table. */
  stack: string;
  stages: RoleStage[];
  projects: RoleProject[];
  senior: { do: string[]; avoid: string[] };
  interview: string[];
  links: RoadmapLink[];
}

const backend: BaseRole = {
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
};

const frontend: BaseRole = {
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
};

const fullstack: BaseRole = {
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
  ],
};

const mobile: BaseRole = {
  slug: "mobile",
  name: "Mobile developer",
  color: "var(--role-pink)",
  tagline: "Build apps people carry in their pocket.",
  job: "You build apps for Android, iPhone or both. You work with touch input, small screens, flaky networks, battery limits and app-store rules, which makes the job different from the web.",
  daily: [
    "Build screens and navigation from designs.",
    "Handle offline use, slow networks and background work.",
    "Test on real devices and several screen sizes.",
    "Ship through the app stores and fix issues from crash reports.",
  ],
  suits:
    "You enjoy polished interfaces, and you like building something you use yourself every day.",
  stack: "Kotlin, Swift, or React Native/Flutter",
  stages: [
    {
      title: "Programming foundations",
      time: "Months 1–2",
      study: [
        "A solid grip on one language: Kotlin, Swift, or TypeScript for React Native.",
        "OOP, collections and async code.",
        "Git, and reading API documentation.",
      ],
      build:
        "A command-line or console app that fetches and prints data from a public API.",
    },
    {
      title: "First apps",
      time: "Months 3–5",
      study: [
        "Pick one route: native Android (Kotlin and Jetpack Compose), native iOS (Swift and SwiftUI) or cross-platform (React Native with Expo, or Flutter).",
        "Layouts, navigation, lists and forms.",
        "Calling REST APIs and showing the results.",
        "Local storage.",
      ],
      build: "A multi-screen app that talks to an API and saves data on the device.",
    },
    {
      title: "Real-world behaviour",
      time: "Months 6–8",
      study: [
        "App architecture: separating screens, state and data.",
        "Offline-first design and syncing.",
        "Push notifications, permissions, camera and location.",
        "Authentication and keeping tokens safe.",
        "Crash reporting and analytics.",
      ],
      build: "Make your app work offline and add push notifications and sign-in.",
    },
    {
      title: "Release",
      time: "Months 9+",
      study: [
        "Performance: list rendering, memory, start-up time.",
        "Testing UI and logic.",
        "App store listings, signing, review guidelines and release builds.",
        "CI for building and testing.",
      ],
      build: "Publish an app to the Play Store or TestFlight and collect feedback.",
    },
  ],
  projects: [
    {
      level: "Starter",
      name: "Expense or habit tracker",
      what: "Several screens, local storage, charts.",
      proves: "You can build and navigate a complete app.",
    },
    {
      level: "Intermediate",
      name: "Campus utility app",
      what: "Timetable, notes or bus times from an API, with notifications and offline use.",
      proves: "You can handle the network and device features.",
    },
    {
      level: "Advanced",
      name: "A published app with real users",
      what: "Sign-in, sync, crash reporting, store listing and several releases.",
      proves: "You can ship and maintain, which is what employers want.",
    },
  ],
  senior: {
    do: [
      "Test on a real, cheap phone. Emulators hide slowness.",
      "Design for no network first, then add the network.",
      "Ask for a permission only when the user needs the feature, and explain why.",
      "Keep a release checklist and follow it.",
      "Read crash reports weekly.",
    ],
    avoid: [
      "Choosing cross-platform or native only because of hype. Choose for the team and the product.",
      "Doing heavy work on the main thread.",
      "Storing tokens in plain text on the device.",
      "Building for the newest phone only.",
      "Ignoring the app store rules until the review fails.",
    ],
  },
  interview: [
    "DSA at medium level.",
    "The app lifecycle, and how state survives rotation or being killed.",
    "Architecture: MVVM or similar, and why.",
    "How you would build an offline-first feed or chat screen.",
    "Walk through your published or demo app.",
  ],
  links: [
    {
      label: "roadmap.sh: Android",
      href: "https://roadmap.sh/android",
      note: "A visual checklist of topics",
    },
    {
      label: "Android Basics with Compose",
      href: "https://developer.android.com/courses/android-basics-compose/course",
      note: "Google's free beginner course",
    },
    {
      label: "Expo documentation",
      href: "https://docs.expo.dev",
      note: "React Native with the fastest start",
    },
    {
      label: "100 Days of SwiftUI",
      href: "https://www.hackingwithswift.com/100/swiftui",
      note: "A free structured course for iOS",
    },
  ],
};

const aiMl: BaseRole = {
  slug: "ai-ml",
  name: "AI / ML engineer",
  color: "var(--board-contests)",
  tagline: "Train, evaluate and ship models, and build products on top of them.",
  job: "You turn data into working predictions or language features. Much of the job is not the model: it is cleaning data, measuring whether the model is actually good, and getting it into a product that does not break.",
  daily: [
    "Clean and explore data, and find where it is wrong or biased.",
    "Train, tune and compare models, or design prompts and retrieval for language models.",
    "Build evaluation sets and measure quality honestly.",
    "Package a model behind an API and monitor it.",
    "Explain results to people who are not specialists.",
  ],
  suits:
    "You enjoy maths, experiments and being wrong several times before being right. You are careful about evidence.",
  stack: "Python, NumPy, pandas, PyTorch, scikit-learn, SQL",
  stages: [
    {
      title: "Programming and maths",
      time: "Months 1–3",
      study: [
        "Python, including NumPy and pandas.",
        "Linear algebra: vectors, matrices, dot products.",
        "Probability and statistics: distributions, mean and variance, bias, sampling.",
        "Calculus essentials: derivatives and the chain rule.",
        "Plotting with matplotlib.",
      ],
      build: "Analyse a real dataset and write up three findings with charts.",
    },
    {
      title: "Classical machine learning",
      time: "Months 4–6",
      study: [
        "Regression, classification, trees, and ensembles.",
        "Train, validation and test splits; cross-validation; overfitting.",
        "Metrics: accuracy, precision, recall, F1, ROC-AUC, and why accuracy misleads.",
        "Feature engineering with scikit-learn.",
      ],
      build:
        "A model on a Kaggle dataset, with a clear metric and an honest error analysis.",
    },
    {
      title: "Deep learning and language models",
      time: "Months 7–10",
      study: [
        "Neural networks, backpropagation, and training with PyTorch.",
        "CNNs for images and transformers for text.",
        "Fine-tuning and using pretrained models.",
        "Working with language-model APIs: prompting, structured output, retrieval-augmented generation and evaluation.",
      ],
      build:
        "A retrieval-based question-answering app over a document set, with a test set to measure quality.",
    },
    {
      title: "Production",
      time: "Months 11+",
      study: [
        "Serving a model through an API, and batching.",
        "Experiment tracking and data versioning.",
        "Monitoring for drift and bad outputs.",
        "Cost and latency trade-offs.",
        "Safety, privacy and bias.",
      ],
      build:
        "Deploy your model or app with logging, an evaluation script and a short model card.",
    },
  ],
  projects: [
    {
      level: "Starter",
      name: "Exploratory data analysis",
      what: "A cleaned dataset, charts, a baseline model and an honest note on its limits.",
      proves: "You can handle data and not oversell results.",
    },
    {
      level: "Intermediate",
      name: "Image or text classifier with a demo",
      what: "Transfer learning, a proper evaluation, a small web demo.",
      proves: "You can train, measure and present a model.",
    },
    {
      level: "Advanced",
      name: "Retrieval-based assistant with evaluation",
      what: "Documents, chunking, retrieval, a prompt, an evaluation set and cost tracking.",
      proves: "You can build something useful and know whether it works.",
    },
  ],
  senior: {
    do: [
      "Start with a dumb baseline. If a simple rule gets 90%, you need a reason to use a model.",
      "Hold out a test set and do not touch it until the end.",
      "Look at your data and your errors by hand. Most improvements come from there.",
      "Write the evaluation before you build the feature.",
      "Learn the maths behind one model deeply, not the name of fifty.",
    ],
    avoid: [
      "Quoting accuracy on an imbalanced dataset.",
      "Leaking test data into training.",
      "Copying notebooks without understanding each cell.",
      "Using a huge model where a small one would do.",
      "Shipping a demo as if it were a product.",
    ],
  },
  interview: [
    "Python and DSA at an easy to medium level.",
    "Statistics and ML fundamentals: overfitting, bias and variance, regularisation, metrics.",
    "Walk through a project: data, baseline, results and mistakes.",
    "SQL and data manipulation questions.",
    "How you would evaluate a language-model feature.",
  ],
  links: [
    {
      label: "Machine Learning Specialization",
      href: "https://www.coursera.org/specializations/machine-learning-introduction",
      note: "Andrew Ng's course, a gentle start",
    },
    {
      label: "fast.ai Practical Deep Learning",
      href: "https://course.fast.ai",
      note: "A free, project-first course",
    },
    {
      label: "Kaggle Learn",
      href: "https://www.kaggle.com/learn",
      note: "Short courses and datasets to practise on",
    },
    {
      label: "roadmap.sh: AI and Data Scientist",
      href: "https://roadmap.sh/ai-data-scientist",
      note: "A visual checklist of topics",
    },
  ],
};

const data: BaseRole = {
  slug: "data",
  name: "Data analyst / engineer",
  color: "var(--tier-cyan)",
  tagline: "Move data, shape it, and turn it into answers.",
  job: "Analysts answer business questions with data and show the answers clearly. Data engineers build the pipelines that collect, clean and store that data so analysts and models can trust it. The two roles overlap, and many people start as one and move to the other.",
  daily: [
    "Write SQL to answer questions or to build clean tables.",
    "Build and monitor pipelines that load data on a schedule.",
    "Check data quality and chase down why numbers do not match.",
    "Build dashboards and explain what they mean.",
    "Work with the people who own the data and the people who use it.",
  ],
  suits:
    "You like finding the story in numbers, you are careful with details, and you enjoy explaining things plainly.",
  stack:
    "SQL, Python, Airflow or similar, a warehouse such as BigQuery, Power BI or Tableau",
  stages: [
    {
      title: "SQL and spreadsheets",
      time: "Months 1–2",
      study: [
        "SQL: joins, aggregates, subqueries, window functions and CTEs.",
        "Spreadsheet formulas and pivot tables.",
        "Basic statistics: averages, medians, percentiles, correlation, sampling.",
      ],
      build: "Answer 20 business questions on a public dataset, with the SQL for each.",
    },
    {
      title: "Python and analysis",
      time: "Months 3–4",
      study: [
        "Python with pandas for cleaning and reshaping data.",
        "Visualisation with matplotlib or a BI tool.",
        "Data cleaning: missing values, duplicates, wrong types and outliers.",
        "Telling a story: one question, one chart, one conclusion.",
      ],
      build: "A dashboard with a written summary that a manager could act on.",
    },
    {
      title: "Data engineering",
      time: "Months 5–8",
      study: [
        "Data modelling: facts and dimensions, star schema.",
        "ETL and ELT, and scheduling with Airflow or similar.",
        "A cloud warehouse such as BigQuery, Snowflake or Redshift.",
        "Batch versus streaming, and what Kafka is for.",
        "Data quality tests and monitoring.",
      ],
      build:
        "An automated pipeline that loads data daily, tests it and updates a dashboard.",
    },
    {
      title: "Scale",
      time: "Months 9+",
      study: [
        "Spark or a similar engine for large data.",
        "Partitioning, file formats such as Parquet, and cost control.",
        "Orchestration, lineage and documentation.",
        "Privacy and access control for data.",
      ],
      build: "Process a large public dataset and compare the speed of two designs.",
    },
  ],
  projects: [
    {
      level: "Starter",
      name: "Sales or cricket analysis",
      what: "Clean the data, answer ten questions in SQL, and chart the results.",
      proves: "You can get answers out of data and show them.",
    },
    {
      level: "Intermediate",
      name: "Automated reporting pipeline",
      what: "Pull from an API daily, store in a database, test quality, refresh a dashboard.",
      proves: "You can build something that runs without you.",
    },
    {
      level: "Advanced",
      name: "Warehouse with a star schema",
      what: "Several sources, modelled tables, tests, documentation and a cost report.",
      proves: "You think about design, trust and cost, like an engineer.",
    },
  ],
  senior: {
    do: [
      "Check the numbers against a second source before showing anyone.",
      "Write SQL that another person can read: CTEs, clear names, comments for the odd parts.",
      "Ask what decision the analysis will support before starting.",
      "Make pipelines safe to run twice.",
      "Document where each number comes from.",
    ],
    avoid: [
      "Showing a chart with no conclusion.",
      "Cleaning data by hand in a way you cannot repeat.",
      "Trusting a join without checking the row counts.",
      "Averaging when the median tells the truth.",
      "Building for big data when a spreadsheet would do.",
    ],
  },
  interview: [
    "SQL: joins, window functions, finding duplicates, top-N per group.",
    "A case study: given a metric that dropped, how would you investigate?",
    "Statistics and probability basics.",
    "Pipeline design: how to load, test and monitor daily data.",
    "A project walk-through with the business question and result.",
  ],
  links: [
    {
      label: "Mode SQL Tutorial",
      href: "https://mode.com/sql-tutorial",
      note: "SQL for analysis, from basic to advanced",
    },
    {
      label: "Kaggle Learn: Pandas",
      href: "https://www.kaggle.com/learn/pandas",
      note: "A short, practical pandas course",
    },
    {
      label: "Data Engineering Zoomcamp",
      href: "https://github.com/DataTalksClub/data-engineering-zoomcamp",
      note: "A free, project-based data engineering course",
    },
    {
      label: "roadmap.sh: Data Analyst",
      href: "https://roadmap.sh/data-analyst",
      note: "A visual checklist of topics",
    },
  ],
};

const devops: BaseRole = {
  slug: "devops",
  name: "DevOps / cloud engineer",
  color: "var(--role-brown)",
  tagline: "Make software ship safely and stay running.",
  job: "You build the machinery that tests, packages, deploys and monitors software, and you keep it running on cloud servers. When a release breaks at night or a server fills its disk, you are the one who knows where to look.",
  daily: [
    "Maintain pipelines that build, test and deploy code.",
    "Run applications in containers and manage the cloud resources under them.",
    "Watch dashboards and alerts, and respond when something is wrong.",
    "Automate repeated work with scripts and infrastructure as code.",
    "Work with developers on making deploys safer and faster.",
  ],
  suits:
    "You like understanding how systems fit together, you stay calm when things break, and you prefer automating a task to doing it twice.",
  stack: "Linux, Docker, Kubernetes, Terraform, GitHub Actions, AWS or GCP",
  stages: [
    {
      title: "Linux and networking",
      time: "Months 1–3",
      study: [
        "The Linux command line, file permissions, processes, services and logs.",
        "Shell scripting.",
        "Networking: IP, ports, DNS, TCP, HTTP, TLS, firewalls.",
        "Git, and one programming language (Python or Go).",
      ],
      build:
        "Set up a Linux virtual machine, host a website on it with HTTPS, and write a backup script.",
    },
    {
      title: "Containers and CI/CD",
      time: "Months 4–5",
      study: [
        "Docker: images, layers, volumes, networks and Compose.",
        "CI/CD with GitHub Actions: build, test, deploy.",
        "Environments, secrets and configuration.",
      ],
      build:
        "A pipeline that tests an app, builds an image and deploys it on every merge.",
    },
    {
      title: "Cloud and infrastructure as code",
      time: "Months 6–8",
      study: [
        "One cloud in depth (AWS or GCP): compute, storage, networking, IAM, managed databases.",
        "Terraform: write infrastructure as code and keep state safely.",
        "Cost control and least-privilege permissions.",
      ],
      build:
        "Define a small environment in Terraform: network, server, database. Create it and destroy it from code.",
    },
    {
      title: "Reliability",
      time: "Months 9+",
      study: [
        "Kubernetes basics: pods, deployments, services, scaling.",
        "Observability: metrics with Prometheus and Grafana, logs and alerts.",
        "Incident response, post-mortems, SLOs.",
        "Backups, disaster recovery and security hardening.",
      ],
      build:
        "Run an app on Kubernetes with monitoring, an alert and a documented runbook.",
    },
  ],
  projects: [
    {
      level: "Starter",
      name: "Self-hosted site on a Linux server",
      what: "Nginx, HTTPS, a firewall, automatic renewal and backups.",
      proves: "You know the basics underneath the platforms.",
    },
    {
      level: "Intermediate",
      name: "CI/CD pipeline for a real app",
      what: "Tests, a Docker build, deploy to the cloud, and a rollback step.",
      proves: "You can make delivery repeatable and safe.",
    },
    {
      level: "Advanced",
      name: "Monitored, scalable environment as code",
      what: "Terraform for the infrastructure, Kubernetes for the app, dashboards, alerts and a runbook.",
      proves: "You can run a service, not just deploy it once.",
    },
  ],
  senior: {
    do: [
      "Automate anything you do twice, then write down why it works.",
      "Keep secrets out of Git. Always.",
      "Give each tool the least access it needs.",
      "Practise restoring from a backup. A backup you have never restored is a hope.",
      "Write a short runbook for every alert.",
    ],
    avoid: [
      "Learning Kubernetes before you understand Linux and Docker.",
      "Clicking through the cloud console and forgetting what you changed.",
      "Leaving cloud resources running and getting a surprise bill.",
      "Giving everything admin access to save time.",
      "Blaming people after an incident instead of fixing the process.",
    ],
  },
  interview: [
    "Linux and networking: what happens when you type a URL; debugging a slow server.",
    "Docker and CI/CD design for a given app.",
    "Cloud services and IAM questions.",
    "Scenario: the site is down, what do you check first?",
    "Scripting, plus DSA at an easy to medium level.",
  ],
  links: [
    {
      label: "roadmap.sh: DevOps",
      href: "https://roadmap.sh/devops",
      note: "A visual checklist of topics",
    },
    {
      label: "Docker getting started",
      href: "https://docs.docker.com/get-started/",
      note: "The official walkthrough",
    },
    {
      label: "Kubernetes basics",
      href: "https://kubernetes.io/docs/tutorials/kubernetes-basics/",
      note: "An interactive introduction",
    },
    {
      label: "Google SRE books",
      href: "https://sre.google/books/",
      note: "Free books on running reliable services",
    },
  ],
};

const security: BaseRole = {
  slug: "security",
  name: "Security engineer",
  color: "var(--tier-red)",
  tagline: "Find weaknesses before attackers do, and help fix them.",
  job: "You protect software and systems. That can mean testing applications for flaws, reviewing designs for risk, detecting and responding to attacks, or building safer defaults for developers. You must have permission before you test anything.",
  daily: [
    "Review code and designs for security problems.",
    "Test applications and networks that you are authorised to test.",
    "Investigate alerts and incidents.",
    "Write clear reports so developers can fix what you find.",
    "Help teams adopt safe practices such as dependency checks and secret scanning.",
  ],
  suits:
    "You are curious about how things break, careful about ethics and permission, and you can explain a risk without scaring people.",
  stack: "Networking, Linux, Python, Burp Suite, Wireshark, SIEM tools",
  stages: [
    {
      title: "Fundamentals",
      time: "Months 1–3",
      study: [
        "Networking: TCP/IP, DNS, HTTP, TLS.",
        "Linux and the command line.",
        "Programming in Python, and reading code in other languages.",
        "Cryptography basics: hashing, symmetric and public-key encryption, and what each protects.",
      ],
      build:
        "Set up a home lab with virtual machines and capture and read your own network traffic.",
    },
    {
      title: "Web security",
      time: "Months 4–6",
      study: [
        "The OWASP Top 10: injection, broken access control, XSS, CSRF, SSRF and more.",
        "How authentication, sessions and tokens fail.",
        "Burp Suite and browser DevTools.",
        "Secure coding fixes for each class of bug.",
      ],
      build:
        "Complete the PortSwigger Web Security Academy labs and write up three of them.",
    },
    {
      title: "Practice in safe places",
      time: "Months 7–9",
      study: [
        "Capture-the-flag events on picoCTF, TryHackMe and Hack The Box.",
        "Linux privilege escalation and basic reverse engineering.",
        "Reporting: describe impact, steps to reproduce and a fix.",
        "Responsible disclosure and bug-bounty rules.",
      ],
      build:
        "A public write-up series of CTF challenges you solved, explained for a beginner.",
    },
    {
      title: "Specialise",
      time: "Months 10+",
      study: [
        "Pick one: application security, cloud security, blue team and detection, or malware analysis.",
        "Threat modelling a real design.",
        "Cloud security basics: IAM, misconfiguration and logging.",
        "Certifications only if your target employers ask for them.",
      ],
      build: "Threat-model one of your own projects and fix what you find.",
    },
  ],
  projects: [
    {
      level: "Starter",
      name: "Home lab and traffic analysis",
      what: "Virtual machines, Wireshark captures, and a note on what each protocol exposes.",
      proves: "You understand what travels on a network.",
    },
    {
      level: "Intermediate",
      name: "Secure a vulnerable app",
      what: "Find the flaws in an intentionally vulnerable app such as OWASP Juice Shop, then fix the code and retest.",
      proves: "You can find a bug and fix it, not just report it.",
    },
    {
      level: "Advanced",
      name: "Security review of a real project",
      what: "Threat model, dependency and secret scanning, a written report, and pull requests that fix the issues, with the maintainers' permission.",
      proves: "You can add real value to a real codebase.",
    },
  ],
  senior: {
    do: [
      "Get written permission before testing anything that is not yours.",
      "Learn to build before you break. You cannot secure what you do not understand.",
      "Write reports that a developer can act on in 10 minutes.",
      "Practise only in legal labs and CTFs.",
      "Keep notes of everything you try.",
    ],
    avoid: [
      "Testing real sites without permission. It is illegal and ends careers.",
      "Running tools without knowing what they do.",
      "Chasing certifications instead of skills.",
      "Reporting every low-risk finding as critical.",
      "Collecting tools instead of learning concepts.",
    ],
  },
  interview: [
    "Networking and web fundamentals: HTTP, TLS, cookies, same-origin policy.",
    "Explain an OWASP Top 10 bug and how to fix it.",
    "Scenario: you find a suspicious login in the logs, what do you do?",
    "Threat-model a simple login page.",
    "Python scripting and DSA at an easy level.",
  ],
  links: [
    {
      label: "PortSwigger Web Security Academy",
      href: "https://portswigger.net/web-security",
      note: "Free labs for web security",
    },
    {
      label: "picoCTF",
      href: "https://picoctf.org",
      note: "Beginner-friendly capture-the-flag practice",
    },
    {
      label: "TryHackMe",
      href: "https://tryhackme.com",
      note: "Guided learning paths",
    },
    {
      label: "OWASP Juice Shop",
      href: "https://owasp.org/www-project-juice-shop/",
      note: "A deliberately vulnerable app to practise on",
    },
  ],
};

export type Role = BaseRole & RoleExtra & RoleInfo;

export const ROLES: Role[] = [
  backend,
  frontend,
  fullstack,
  mobile,
  aiMl,
  data,
  devops,
  security,
  qa,
  embedded,
  game,
  uxdesign,
  product,
  web3,
].map((r) => ({
  ...r,
  ...ROLE_EXTRAS[r.slug],
  ...MORE_EXTRAS[r.slug],
  ...ROLE_INFO[r.slug],
  ...NEW_DETAILS[r.slug],
}));

export function getRole(slug: string): Role | undefined {
  return ROLES.find((r) => r.slug === slug);
}
