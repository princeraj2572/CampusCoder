import type { Role } from "./types";

export const qa: Role = {
  slug: "qa",
  name: "QA / test automation engineer",
  color: "var(--role-lime)",
  tagline: "Make sure the software works before users find out that it does not.",
  job: "You find problems early. You plan what to test, write automated tests that run on every change, explore the product like a curious user would, and tell the team clearly what is broken and how to reproduce it. Good testers save a company from expensive failures.",
  daily: [
    "Read a new feature's requirements and decide what could go wrong.",
    "Write and maintain automated tests for the interface and the API.",
    "Explore the product by hand to find problems a script would miss.",
    "Report bugs with exact steps, evidence and the expected result.",
    "Keep the test pipeline fast and reliable, and fix flaky tests.",
  ],
  suits:
    "You notice details, you like asking 'what if?', and you enjoy proving a system wrong in a constructive way.",
  stack: "Python or JavaScript, Playwright or Selenium, Postman, SQL, GitHub Actions",
  stages: [
    {
      title: "Testing fundamentals",
      time: "Months 1–2",
      study: [
        "Testing levels: unit, integration, system and acceptance.",
        "Test design: equivalence classes, boundary values and decision tables.",
        "How to write a clear bug report and a test case.",
        "Basic programming in Python or JavaScript, plus SQL.",
      ],
      build: "A test plan and 30 written test cases for a website you use every day.",
    },
    {
      title: "API and interface automation",
      time: "Months 3–5",
      study: [
        "Testing REST APIs with Postman, then with code.",
        "Browser automation with Playwright (or Selenium).",
        "A test framework: pytest, or Vitest and Jest.",
        "Page objects and keeping tests easy to read and maintain.",
      ],
      build: "An automated suite for a demo shop: sign-in, search, cart and checkout.",
    },
    {
      title: "Quality in the pipeline",
      time: "Months 6–8",
      study: [
        "Running tests in GitHub Actions on every pull request.",
        "Flaky tests: why they happen and how to remove them.",
        "Test data, mocks and test environments.",
        "Reports, and metrics that matter, such as escaped bugs and test run time.",
      ],
      build:
        "Plug the suite into CI with a report, and make it run in under five minutes.",
    },
    {
      title: "Beyond functional testing",
      time: "Months 9+",
      study: [
        "Performance testing with k6 or JMeter.",
        "Accessibility and security testing basics.",
        "Mobile app testing and cross-browser testing.",
        "Contract testing and testing in production safely.",
      ],
      build: "A load test with a clear report on where the app slows down.",
    },
  ],
  projects: [
    {
      level: "Starter",
      name: "Manual test plan and bug reports",
      what: "Test a real app, write 30 cases and file ten well-written bug reports.",
      proves: "You think like a tester and write clearly.",
    },
    {
      level: "Intermediate",
      name: "Automated suite for a demo shop",
      what: "UI and API tests, readable structure, run in CI with a report.",
      proves: "You can build and maintain automation.",
    },
    {
      level: "Advanced",
      name: "Test platform with performance checks",
      what: "Parallel runs, test data setup, a load test and a dashboard of failures.",
      proves: "You can improve the whole quality process, not just write scripts.",
    },
  ],
  senior: {
    do: [
      "Learn to code properly. The best testers are strong developers who choose to protect quality.",
      "Test the risky parts first, and automate what is run often.",
      "Write bug reports a developer can reproduce in one minute.",
      "Fix flaky tests the day they appear, or the team will stop trusting the suite.",
      "Work with developers early, when a requirement is still cheap to change.",
    ],
    avoid: [
      "Automating everything, including tests that rarely run and often change.",
      "Writing long end-to-end tests when a small API test would do.",
      "Using fixed sleeps instead of waiting for a condition.",
      "Treating testing as a final stage after development ends.",
      "Blaming developers. You are on the same team.",
    ],
  },
  interview: [
    "Test a simple object, such as a pen, a login page or an elevator, and explain your approach.",
    "Write a test case and a bug report from a given scenario.",
    "Coding at an easy to medium level, plus SQL.",
    "Explain how you would design an automation framework and avoid flaky tests.",
    "Differences between severity and priority, regression and retesting, smoke and sanity tests.",
  ],
  links: [
    {
      label: "Playwright documentation",
      href: "https://playwright.dev/docs/intro",
      note: "Modern browser automation, with good guides",
    },
    {
      label: "Test Automation University",
      href: "https://testautomationu.com",
      note: "Free courses on automation tools and techniques",
    },
    {
      label: "Ministry of Testing",
      href: "https://www.ministryoftesting.com",
      note: "Articles and a community for testers",
    },
    {
      label: "k6 documentation",
      href: "https://grafana.com/docs/k6/latest/",
      note: "Performance testing with code",
    },
    {
      label: "YouTube: Rahul Shetty Academy",
      href: "https://www.youtube.com/@RahulShettyAcademy",
      note: "Selenium, API testing and automation",
    },
    {
      label: "YouTube: freeCodeCamp",
      href: "https://www.youtube.com/@freecodecamp",
      note: "Free testing and automation courses",
    },
  ],
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
};
