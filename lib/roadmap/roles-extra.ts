export interface RoleExtra {
  /** Tools to install and get comfortable with. */
  tools: string[];
  /** What the job asks at each level, so a student knows where the road goes. */
  ladder: { level: string; focus: string }[];
  /** What to aim for in the first three months of a job or internship. */
  first90: { days: string; goal: string }[];
  /** A realistic week of study alongside college. */
  week: { when: string; what: string }[];
  /** Mistakes juniors make in this role. */
  mistakes: string[];
  /** Questions worth asking a senior. */
  ask: string[];
}

const ladder = (
  junior: string,
  mid: string,
  senior: string,
  staff: string,
): RoleExtra["ladder"] => [
  { level: "Junior (0–2 years)", focus: junior },
  { level: "Mid-level (2–5 years)", focus: mid },
  { level: "Senior (5+ years)", focus: senior },
  { level: "Staff and beyond", focus: staff },
];

const first90 = (a: string, b: string, c: string): RoleExtra["first90"] => [
  { days: "Days 1–30", goal: a },
  { days: "Days 31–60", goal: b },
  { days: "Days 61–90", goal: c },
];

export const ROLE_EXTRAS: Record<string, RoleExtra> = {
  backend: {
    tools: [
      "PostgreSQL or MySQL, plus a client such as DBeaver",
      "Postman or curl for trying APIs",
      "Docker and Docker Compose",
      "Redis",
      "Git and GitHub Actions",
      "A debugger and a profiler for your language",
    ],
    ladder: ladder(
      "Finish well-scoped tasks, write tests, and learn the codebase.",
      "Own a service or feature area, design APIs, and fix production problems alone.",
      "Design systems, review others, and make trade-offs between speed, cost and safety.",
      "Set technical direction across teams and grow other engineers.",
    ),
    first90: first90(
      "Get the project running locally, fix two small bugs, and read the main request flow end to end.",
      "Ship a small feature with tests, and learn how the team deploys and monitors.",
      "Take an on-call shadow shift and own a small improvement, such as a slow query.",
    ),
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
  },
  frontend: {
    tools: [
      "VS Code with ESLint and Prettier",
      "Chrome DevTools and the React DevTools extension",
      "Node.js with npm or pnpm",
      "Figma, at least for reading designs",
      "Lighthouse and axe for accessibility and speed checks",
      "Playwright for browser tests",
    ],
    ladder: ladder(
      "Turn designs into working, responsive components and fix visual bugs.",
      "Own features, manage state well, and improve accessibility and speed.",
      "Design the frontend architecture, guide the design system, and mentor others.",
      "Set standards across products and connect design, product and engineering.",
    ),
    first90: first90(
      "Run the app, fix small visual bugs, and learn the component library and naming.",
      "Build a feature from a design, including empty and error states and tests.",
      "Find and fix one real performance or accessibility problem and show the numbers.",
    ),
    week: [
      {
        when: "Mon, Wed",
        what: "One lesson on a frontend topic, then apply it (1 hour)",
      },
      {
        when: "Tue, Thu",
        what: "DSA: two problems and a JavaScript question (45 minutes)",
      },
      {
        when: "Fri",
        what: "Rebuild one real site's component from scratch (45 minutes)",
      },
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
  },
  "full-stack": {
    tools: [
      "VS Code, Git and GitHub",
      "Node.js and a package manager",
      "PostgreSQL and a database client",
      "Docker",
      "A hosting platform such as Vercel, Render or Fly.io",
      "Postman and browser DevTools",
    ],
    ladder: ladder(
      "Ship small features across the stack with guidance.",
      "Own whole features and the way they are deployed and monitored.",
      "Lead product areas, choose the stack, and balance speed and quality.",
      "Own the technical direction of a product, or move toward engineering management.",
    ),
    first90: first90(
      "Run the whole stack locally, fix a bug on each side, and read the database schema.",
      "Ship one complete feature, from migration to user interface, with tests.",
      "Own a small area, such as emails or onboarding, and improve something measurable.",
    ),
    week: [
      { when: "Mon, Wed", what: "Learn one missing piece, frontend or backend (1 hour)" },
      { when: "Tue, Thu", what: "DSA: two problems and a revision (45 minutes)" },
      {
        when: "Fri",
        what: "Read the code of an open-source app you admire (45 minutes)",
      },
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
  },
  mobile: {
    tools: [
      "Android Studio, or Xcode on a Mac",
      "A real device for testing",
      "Expo and Expo Go, if you use React Native",
      "Firebase, or an equivalent for auth and push",
      "Postman",
      "A crash reporting tool such as Crashlytics or Sentry",
    ],
    ladder: ladder(
      "Build screens, wire them to APIs, and fix bugs from crash reports.",
      "Own features and architecture, and handle offline use and performance.",
      "Lead app architecture, release process and quality for the team.",
      "Set mobile strategy across apps and platforms.",
    ),
    first90: first90(
      "Build and run the app on a real device, fix small bugs, and learn the navigation structure.",
      "Ship one screen or flow with tests and handle its offline behaviour.",
      "Find a crash or slow screen from the reports and fix it.",
    ),
    week: [
      {
        when: "Mon, Wed",
        what: "Learn one mobile topic and add it to your app (1 hour)",
      },
      { when: "Tue, Thu", what: "DSA: two problems and a revision (45 minutes)" },
      {
        when: "Fri",
        what: "Study one well-known app's behaviour and rebuild a screen (45 minutes)",
      },
      { when: "Weekend", what: "Build: two hours on your app, test on a real phone" },
    ],
    mistakes: [
      "Only testing on a fast emulator.",
      "Blocking the main thread with network or database work.",
      "Asking for every permission on the first launch.",
      "Not handling screen rotation, small screens or the keyboard.",
      "Ignoring the store's review guidelines until the app is rejected.",
    ],
    ask: [
      "How do you keep release quality up when you cannot instantly update the app?",
      "How do you support old phones and old operating systems?",
      "What do you log to understand a crash?",
    ],
  },
  "ai-ml": {
    tools: [
      "Python with Jupyter or VS Code notebooks",
      "NumPy, pandas, scikit-learn, matplotlib",
      "PyTorch",
      "Weights & Biases or MLflow for experiment tracking",
      "Hugging Face for models and datasets",
      "FastAPI for serving",
    ],
    ladder: ladder(
      "Clean data, run experiments, and reproduce results with guidance.",
      "Own a model or feature, design evaluations, and ship it.",
      "Choose approaches, set quality bars, and lead projects from idea to production.",
      "Define the technical strategy for data and models across teams.",
    ),
    first90: first90(
      "Learn the data, reproduce the current baseline, and read the evaluation code.",
      "Run a clean experiment that beats a baseline, with notes anyone can repeat.",
      "Ship an improvement behind a flag and track its effect in production.",
    ),
    week: [
      { when: "Mon, Wed", what: "Maths or an ML lesson plus exercises (1 hour)" },
      { when: "Tue, Thu", what: "DSA: two problems and a SQL query (45 minutes)" },
      { when: "Fri", what: "Read a paper summary and reimplement one idea (45 minutes)" },
      { when: "Weekend", what: "Build: three hours on a Kaggle task or your project" },
    ],
    mistakes: [
      "Tuning the model before looking at the data.",
      "Reporting a number from a single lucky run.",
      "Splitting data randomly when it should be split by time or user.",
      "Not writing down which data and settings produced a result.",
      "Treating a model's confident answer as a true answer.",
    ],
    ask: [
      "How do you decide a model is good enough to ship?",
      "How do you find out that a model has quietly got worse?",
      "How do you handle labelling and bad data?",
    ],
  },
  data: {
    tools: [
      "PostgreSQL, plus a free warehouse tier such as BigQuery",
      "Python with pandas and Jupyter",
      "Power BI, Tableau or Metabase",
      "dbt, for building tested tables in SQL",
      "Airflow or a similar scheduler",
      "Git for your queries and pipelines",
    ],
    ladder: ladder(
      "Write reliable queries and build charts from clear requests.",
      "Own datasets and dashboards, model data, and build pipelines.",
      "Design the data platform, set quality standards and guide analysts.",
      "Define data strategy, governance and the way a company uses its data.",
    ),
    first90: first90(
      "Learn where each important number comes from, and recreate one report from raw data.",
      "Build a trusted table or pipeline with tests, plus documentation.",
      "Find a recurring data problem and fix its cause, not just its symptom.",
    ),
    week: [
      { when: "Mon, Wed", what: "SQL practice or a data modelling topic (1 hour)" },
      { when: "Tue, Thu", what: "DSA: two easy to medium problems (45 minutes)" },
      {
        when: "Fri",
        what: "Analyse a new public dataset and write three insights (45 minutes)",
      },
      { when: "Weekend", what: "Build: two hours on your pipeline or dashboard" },
    ],
    mistakes: [
      "Joining tables without checking for duplicates.",
      "Showing a number without saying what it counts.",
      "Hard-coding dates and filters in queries.",
      "Making a dashboard nobody asked for.",
      "Fixing data by hand in a spreadsheet.",
    ],
    ask: [
      "Which numbers here do people trust, and which do they argue about?",
      "How do you find out that a pipeline has failed silently?",
      "How do you decide what belongs in the warehouse?",
    ],
  },
  devops: {
    tools: [
      "A Linux machine or WSL, and a good terminal",
      "Docker and Docker Compose",
      "GitHub Actions",
      "Terraform",
      "kubectl with minikube or kind",
      "Prometheus and Grafana",
    ],
    ladder: ladder(
      "Maintain pipelines, handle tickets and learn the systems with guidance.",
      "Own the deployment platform and automate away repeated work.",
      "Design reliable platforms, lead incidents and set standards for delivery.",
      "Define reliability, cost and security strategy across the company.",
    ),
    first90: first90(
      "Learn how code gets from a commit to production, and read the last three incident reports.",
      "Automate one painful manual task and write the runbook for it.",
      "Improve a metric: deploy time, failure rate or cloud cost, and show the numbers.",
    ),
    week: [
      {
        when: "Mon, Wed",
        what: "A Linux, networking or cloud lesson with a lab (1 hour)",
      },
      { when: "Tue, Thu", what: "Scripting practice and DSA (45 minutes)" },
      { when: "Fri", what: "Break your own setup on purpose and fix it (45 minutes)" },
      {
        when: "Weekend",
        what: "Build: two hours on your lab, and destroy it to keep costs at zero",
      },
    ],
    mistakes: [
      "Making changes on a server by hand and not recording them.",
      "Alerts that fire so often everyone ignores them.",
      "Giving a pipeline admin keys.",
      "Copying commands from the internet without reading them.",
      "No test of the rollback until it is needed.",
    ],
    ask: [
      "What does a good deploy look like here, and what does a bad one look like?",
      "How do you decide what deserves an alert?",
      "What is the cheapest improvement we could make to reliability?",
    ],
  },
  security: {
    tools: [
      "Kali Linux or Parrot in a virtual machine",
      "Burp Suite Community Edition",
      "Wireshark and nmap, on networks you own",
      "Browser DevTools",
      "A note-taking tool such as Obsidian",
      "Python and Bash for scripting",
    ],
    ladder: ladder(
      "Triage findings, run tests under supervision and write clear reports.",
      "Own assessments or a detection area and guide developers to fix problems.",
      "Lead security programmes, threat modelling and incident response.",
      "Set security strategy and risk decisions across the organisation.",
    ),
    first90: first90(
      "Learn the systems and the threat model, and shadow reviews and incidents.",
      "Complete a supervised review and write a report the developers act on.",
      "Automate one repeated check, such as dependency or secret scanning.",
    ),
    week: [
      {
        when: "Mon, Wed",
        what: "A lab on PortSwigger or TryHackMe, then write notes (1 hour)",
      },
      {
        when: "Tue, Thu",
        what: "Networking or cryptography reading plus Python (45 minutes)",
      },
      {
        when: "Fri",
        what: "Read a public bug report or post-mortem and summarise it (45 minutes)",
      },
      { when: "Weekend", what: "A CTF, or write up the last one you solved" },
    ],
    mistakes: [
      "Testing something without clear permission.",
      "Reporting a finding with no steps to reproduce.",
      "Using a tool's output as the conclusion.",
      "Ignoring the easy problems, such as weak passwords and old software.",
      "Keeping secrets in notes that are not protected.",
    ],
    ask: [
      "Which security issue has cost this team the most?",
      "How do you get developers to fix findings quickly?",
      "How do you decide what to fix first when everything looks urgent?",
    ],
  },
};
