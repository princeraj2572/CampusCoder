import type { Role } from "./types";

export const product: Role = {
  slug: "product",
  name: "Product manager",
  color: "var(--role-coral)",
  tagline:
    "Decide what to build and why, and keep the team pointed at the right problem.",
  job: "You do not write the code or draw the screens. You work out which problems are worth solving, decide what to build first, write it down clearly, and keep designers, engineers and the business working together. You are judged on whether the product succeeds, not on how many features ship.",
  daily: [
    "Talk to users and read data to find what hurts most.",
    "Write a clear problem statement and a short spec for the next piece of work.",
    "Prioritise the backlog and say no to good ideas that are not the best idea.",
    "Work with engineers and designers to scope and unblock the work.",
    "Look at the numbers after release and decide what to do next.",
  ],
  suits:
    "You like people, problems and trade-offs, you write and speak clearly, and you are comfortable making decisions with incomplete information.",
  stack: "Writing, SQL and analytics, user research, roadmaps, basic technical knowledge",
  stages: [
    {
      title: "Product thinking",
      time: "Months 1–2",
      study: [
        "What a product is, who it is for, and what problem it solves.",
        "How to write a problem statement and a short product spec.",
        "Prioritisation: impact against effort, and simple frameworks like RICE.",
        "How software teams work: sprints, backlogs and releases.",
      ],
      build:
        "A one-page product spec for a feature you would add to an app you use daily.",
    },
    {
      title: "Users and data",
      time: "Months 3–4",
      study: [
        "User interviews and finding the real problem behind a request.",
        "Basic SQL and a spreadsheet for answering questions with data.",
        "Metrics: activation, retention, conversion and how to pick a goal.",
        "Running a simple experiment, such as an A/B test, and reading the result.",
      ],
      build:
        "Analyse a public dataset or your own project's usage and recommend one change.",
    },
    {
      title: "Work with a team",
      time: "Months 5–7",
      study: [
        "Writing user stories and acceptance criteria that engineers can build from.",
        "Roadmaps: what to commit to and what to leave flexible.",
        "Enough technical knowledge to talk with engineers: APIs, databases, trade-offs.",
        "Communicating with stakeholders and saying no politely.",
      ],
      build:
        "Be the product lead on a small student project: define the goal, scope it and ship it.",
    },
    {
      title: "Strategy and craft",
      time: "Months 8+",
      study: [
        "Market and competitor analysis.",
        "Pricing and business models at a basic level.",
        "Product teardowns: why a product works and where it fails.",
        "Telling the story of a product decision in an interview.",
      ],
      build: "Three product teardowns and one launched project with measured results.",
    },
  ],
  projects: [
    {
      level: "Starter",
      name: "Product teardown",
      what: "Analyse a well-known app: who it is for, how it makes money, what you would fix, and why.",
      proves: "You can think about products critically.",
    },
    {
      level: "Intermediate",
      name: "Lead a small student product",
      what: "Run a project with 3–4 classmates: users, spec, priorities, launch and a review of the numbers.",
      proves: "You can lead without authority and ship.",
    },
    {
      level: "Advanced",
      name: "Experiment with real users",
      what: "Run an A/B test or a pricing experiment on a live project and write up the decision.",
      proves: "You make decisions from evidence.",
    },
  ],
  senior: {
    do: [
      "Fall in love with the problem, not the solution. Many good ideas solve nothing.",
      "Talk to users every week. Reports are no replacement for conversations.",
      "Write short, clear documents. If it takes ten pages to explain, it is not yet clear.",
      "Learn enough about technology to respect what is hard and what is cheap.",
      "Say no often, and explain why in terms of the goal.",
    ],
    avoid: [
      "Building whatever the loudest person asks for.",
      "Treating engineers and designers as people who simply carry out orders.",
      "Measuring success by features shipped instead of results for users.",
      "Hiding behind data you have not looked at carefully, or ignoring data that disagrees with you.",
      "Writing a long roadmap that no one believes.",
    ],
  },
  interview: [
    "A product design question: improve an app, or design a product for a group of users.",
    "A prioritisation case: you have ten ideas and limited time, so what do you build first and why?",
    "A metrics question: how would you measure the success of a feature, and what if the number drops?",
    "A behavioural question about influencing a team or handling a disagreement.",
    "A teardown of a product you know well, with a clear opinion.",
  ],
  links: [
    {
      label: "Lenny's Newsletter",
      href: "https://www.lennysnewsletter.com",
      note: "Practical product advice from people doing the job",
    },
    {
      label: "Silicon Valley Product Group articles",
      href: "https://www.svpg.com/articles/",
      note: "How strong product teams work",
    },
    {
      label: "Shape Up (Basecamp)",
      href: "https://basecamp.com/shapeup",
      note: "A free book on scoping and shipping work",
    },
    {
      label: "Mind the Product",
      href: "https://www.mindtheproduct.com",
      note: "Articles and talks from the product community",
    },
    {
      label: "Mode SQL Tutorial",
      href: "https://mode.com/sql-tutorial/",
      note: "Learn the SQL a product manager uses to answer questions",
    },
    {
      label: "YouTube (Global): Product School",
      href: "https://www.youtube.com/@ProductSchool",
      note: "Talks and lessons from working product managers",
    },
    {
      label: "YouTube (Global): The Futur",
      href: "https://www.youtube.com/@thefutur",
      note: "Communication and thinking skills",
    },
    {
      label: "YouTube (India): Ankur Warikoo",
      href: "https://www.youtube.com/@warikoo",
      note: "Career and business thinking",
    },
    {
      label: "YouTube (Global): Exponent",
      href: "https://www.youtube.com/@tryexponent",
      note: "Product management interview prep",
    },
    {
      label: "YouTube (Global): Lenny's Podcast",
      href: "https://www.youtube.com/@LennysPodcast",
      note: "Interviews with product leaders",
    },
  ],
  tools: [
    "A notes and docs app for writing specs",
    "Spreadsheet skills",
    "SQL",
    "Figma, to read and discuss designs",
    "Jira, Linear or a similar tracker",
    "An analytics tool, such as Google Analytics or PostHog",
  ],
  ladder: [
    {
      level: "Associate (0–2 years)",
      focus:
        "Support a product manager, write specs, analyse data and run small improvements.",
    },
    {
      level: "Product manager (2–5 years)",
      focus: "Own a product area end to end: users, roadmap, delivery and results.",
    },
    {
      level: "Senior (5+ years)",
      focus: "Lead strategy for a larger area, handle ambiguity and mentor others.",
    },
    {
      level: "Director and beyond",
      focus:
        "Own a portfolio of products and the strategy behind it, or lead the product team.",
    },
  ],
  first90: [
    {
      days: "Days 1–30",
      goal: "Learn the product, the users and the metrics. Talk to ten users and your team.",
    },
    {
      days: "Days 31–60",
      goal: "Write your first spec, work with engineers to scope it and ship a small improvement.",
    },
    {
      days: "Days 61–90",
      goal: "Measure the result, share what you learned, and propose the next priority.",
    },
  ],
  week: [
    { when: "Mon, Wed", what: "Product reading and one teardown of an app (1 hour)" },
    { when: "Tue, Thu", what: "SQL and spreadsheet practice on real data (45 minutes)" },
    { when: "Fri", what: "Write a one-page spec for an idea (45 minutes)" },
    { when: "Weekend", what: "Build: two hours on your student project, with your team" },
  ],
  mistakes: [
    "Writing long documents nobody reads.",
    "Saying yes to every request to keep people happy.",
    "Never looking at the data after a release.",
    "Giving engineers solutions instead of problems.",
    "Not learning enough about how software is built.",
  ],
  ask: [
    "How does the team decide what to build next?",
    "How do you measure whether a feature worked?",
    "How do product, design and engineering work together day to day?",
  ],
  where: [
    {
      type: "Product companies and startups",
      what: "The most common route, often via an associate or APM programme.",
    },
    {
      type: "Large tech firms",
      what: "Structured programmes and specialised product areas.",
    },
    {
      type: "Fintech, e-commerce and edtech",
      what: "Fast-growing teams that need product thinking.",
    },
    {
      type: "Consulting and internal tools teams",
      what: "Product work for a business or for staff.",
    },
  ],
  myths: [
    {
      myth: "A product manager is the boss of the engineers.",
      truth:
        "You lead through clarity and trust. You have responsibility, not authority.",
    },
    {
      myth: "You can go straight into product from college easily.",
      truth:
        "Entry roles are few. Many start as engineers, designers or analysts, or build and launch their own project.",
    },
    {
      myth: "Product managers do not need technical knowledge.",
      truth:
        "You need enough to understand trade-offs. The best ones can read data and talk to engineers as equals.",
    },
  ],
};
