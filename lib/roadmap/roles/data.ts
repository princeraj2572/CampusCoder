import type { Role } from "./types";

export const data: Role = {
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
      pitfall:
        "Using spreadsheets as a database and losing track of what each formula does.",
      ready: [
        "Write joins and window functions in SQL.",
        "Build a pivot table that answers a question.",
        "Explain a query to someone else line by line.",
      ],
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
      pitfall: "Plotting before understanding the data's shape and gaps.",
      ready: [
        "Clean a messy dataset with pandas.",
        "Choose a chart that fits the comparison.",
        "State one finding and the evidence behind it.",
      ],
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
      pitfall: "Writing one-off scripts that nobody can re-run.",
      ready: [
        "Build a pipeline that runs on a schedule.",
        "Model data into clean tables for reporting.",
        "Add a check that catches bad data early.",
      ],
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
      pitfall: "Using big-data tools on data that fits in memory.",
      ready: [
        "Say when a warehouse or Spark is justified.",
        "Tune a slow query on a large table.",
        "Document where each number in a dashboard comes from.",
      ],
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
  concepts: [
    {
      name: "SQL joins and aggregation",
      what: "Join tables on shared keys, then GROUP BY to count, sum and average.",
      why: "Most analysis starts as a query, and wrong joins silently duplicate rows.",
    },
    {
      name: "Data cleaning",
      what: "Handle missing values, duplicates, wrong types and outliers before analysing anything.",
      why: "Analysts spend most of their time here, and results on dirty data mislead.",
    },
    {
      name: "Descriptive statistics",
      what: "Mean, median, spread and distributions describe a column before you model it.",
      why: "The median often tells the truth where the mean is pulled by outliers.",
    },
    {
      name: "Correlation versus causation",
      what: "Two things moving together does not mean one causes the other.",
      why: "It is the most common wrong conclusion in reports.",
    },
    {
      name: "Data visualisation",
      what: "Choose the chart that makes the comparison obvious, label it and avoid decoration.",
      why: "A good chart persuades faster than a table of numbers.",
    },
    {
      name: "Pipelines and warehouses",
      what: "Move data from sources into a warehouse on a schedule, then model it for reporting.",
      why: "Dashboards are only as trustworthy as the pipeline feeding them.",
    },
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
    {
      label: "YouTube (Global): Alex The Analyst",
      href: "https://www.youtube.com/@AlexTheAnalyst",
      note: "SQL, Excel and Power BI for beginners",
    },
    {
      label: "YouTube (Global): Luke Barousse",
      href: "https://www.youtube.com/@LukeBarousse",
      note: "Data analyst skills and portfolio projects",
    },
    {
      label: "YouTube (Global): StatQuest",
      href: "https://www.youtube.com/@statquest",
      note: "Statistics you need for data work",
    },
    {
      label: "YouTube (India): codebasics",
      href: "https://www.youtube.com/@codebasics",
      note: "Data analytics, SQL and Power BI projects",
    },
    {
      label: "YouTube (India): CampusX",
      href: "https://www.youtube.com/@campusx-official",
      note: "Data science with Python, in Hindi",
    },
    {
      label: "YouTube (Global): Ken Jee",
      href: "https://www.youtube.com/@KenJee_ds",
      note: "Data science careers and projects",
    },
    {
      label: "YouTube (Global): Tina Huang",
      href: "https://www.youtube.com/@TinaHuang1",
      note: "Learning data skills and landing the job",
    },
  ],
  tools: [
    "PostgreSQL, plus a free warehouse tier such as BigQuery",
    "Python with pandas and Jupyter",
    "Power BI, Tableau or Metabase",
    "dbt, for building tested tables in SQL",
    "Airflow or a similar scheduler",
    "Git for your queries and pipelines",
  ],
  ladder: [
    {
      level: "Junior (0–2 years)",
      focus: "Write reliable queries and build charts from clear requests.",
    },
    {
      level: "Mid-level (2–5 years)",
      focus: "Own datasets and dashboards, model data, and build pipelines.",
    },
    {
      level: "Senior (5+ years)",
      focus: "Design the data platform, set quality standards and guide analysts.",
    },
    {
      level: "Staff and beyond",
      focus: "Define data strategy, governance and the way a company uses its data.",
    },
  ],
  first90: [
    {
      days: "Days 1–30",
      goal: "Learn where each important number comes from, and recreate one report from raw data.",
    },
    {
      days: "Days 31–60",
      goal: "Build a trusted table or pipeline with tests, plus documentation.",
    },
    {
      days: "Days 61–90",
      goal: "Find a recurring data problem and fix its cause, not just its symptom.",
    },
  ],
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
};
