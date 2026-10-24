import type { RoadmapPage } from "./types";

const start: RoadmapPage = {
  slug: "",
  label: "Start here",
  title: "Start here",
  intro:
    "CampusCoders ranks students by what they solve on LeetCode, Codeforces and CodeChef and what they build on GitHub. If you are starting from zero, follow this order.",
  sections: [
    {
      heading: "First steps",
      steps: [
        "Pick a language: C++, Java or Python. Stay with one until you are comfortable.",
        "Create your accounts on LeetCode, Codeforces, CodeChef and GitHub, then add them to your CampusCoders profile.",
        "Solve a little every day. Consistency beats marathon sessions.",
        "Build and ship projects, and put them on GitHub.",
        "Contribute to open source.",
      ],
    },
    {
      heading: "Year-wise path",
      table: {
        head: ["Year", "Focus"],
        rows: [
          [
            "1",
            "One language, logic building, Git, a basic web or app project, start LeetCode",
          ],
          [
            "2",
            "Full DSA (A2Z), OOP and DBMS, regular contests, first open-source PRs, two projects",
          ],
          [
            "3",
            "Interview prep: SDE sheet, OS, CN, SQL, system design basics, internship and mock interviews",
          ],
          [
            "4",
            "Revise, apply early, polish the resume, and keep the contest and contribution streak going",
          ],
        ],
      },
    },
    {
      heading: "A 15-week starter plan",
      table: {
        head: ["Weeks", "Focus"],
        rows: [
          ["1–2", "Language basics, Git, one LeetCode problem a day"],
          ["3–10", "Striver A2Z sheet, steps 1–10, along with SQL basics"],
          ["11–14", "DBMS, OS and CN theory, first Codeforces and CodeChef contests"],
          [
            "15+",
            "A project, your first open-source PR, then the SDE sheet and a contest every week",
          ],
        ],
      },
    },
    {
      heading: "A daily routine",
      paragraphs: [
        "Sleep, exercise and breaks are part of the plan, not extras. Burnout ends more streaks than lack of talent.",
      ],
      table: {
        head: ["Slot", "Activity"],
        rows: [
          ["45–60 min", "Learn a DSA topic and solve 1–2 problems"],
          ["30 min", "A core subject (DBMS, OS, CN) or revise old problems"],
          ["30–60 min", "Project or open-source work"],
          ["Weekly", "One contest, then upsolve it on the weekend"],
          ["Weekly", "One rest day with no screens for study"],
        ],
      },
    },
    {
      heading: "Using CampusCoders to stay on track",
      bullets: [
        "Link your LeetCode, Codeforces, CodeChef and GitHub accounts so your standing updates automatically.",
        "Check your tier and your rank on your year and department boards, and set one concrete target for the next month.",
        "Watch the weekly trend chart. A flat line tells you to adjust your routine, not to give up.",
        "Find peers a little ahead of you on the boards and learn from what they work on.",
      ],
    },
    {
      heading: "Common mistakes to avoid",
      bullets: [
        "Watching videos without coding along.",
        "Switching sheets and courses every week. Pick one and finish it.",
        "Reading editorials too soon.",
        "Skipping core subjects until the week before interviews.",
        "Building only tutorial clones.",
        "Starting open source with a huge issue instead of a small one.",
        "Leaving gaps in the streak. Thirty minutes every day beats ten hours once a week.",
        "Comparing your first month with someone else's third year.",
      ],
    },
    {
      heading: "Frequently asked questions",
      qa: [
        {
          q: "I am a beginner. Where do I start today?",
          a: "Pick a language, finish a basic course such as CS50, and solve one easy problem. Then open Striver's A2Z sheet and begin at step 1.",
        },
        {
          q: "C++, Java or Python?",
          a: "Whichever you will actually practise. C++ is the usual choice for competitive programming, Java for enterprise roles, Python for AI and quick scripting. Interviews accept all three.",
        },
        {
          q: "How many problems are enough?",
          a: "There is no fixed number. When you can spot the pattern in a new medium problem and solve it in 30–40 minutes, you are in good shape.",
        },
        {
          q: "I am in my final year. Is it too late?",
          a: "No. Focus on the SDE sheet, the core subjects and mock interviews, build one strong project, and apply right away.",
        },
        {
          q: "Should I do DSA or development first?",
          a: "Both, in short daily slots. DSA gets you through the screening, and projects get you through the interview and the job.",
        },
        {
          q: "My rank is low. Should I worry?",
          a: "Rank only shows where you are today. Improve your trend week over week and keep going.",
        },
      ],
    },
  ],
};

const dsa: RoadmapPage = {
  slug: "dsa",
  label: "DSA",
  title: "Data structures and algorithms",
  intro:
    "Solving many problems is not the goal. Being able to solve a new one is. Pick one sheet, follow it in order, and practise the way this page describes.",
  sections: [
    {
      heading: "Where to learn",
      links: [
        {
          label: "Striver's A2Z DSA Sheet",
          href: "https://takeuforward.org/strivers-a2z-dsa-course/strivers-a2z-dsa-course-sheet-2/",
          note: "Step-by-step topic order from basics to advanced, with videos",
        },
        {
          label: "Striver's SDE Sheet",
          href: "https://takeuforward.org/interviews/strivers-sde-sheet-top-coding-interview-problems/",
          note: "Top interview problems, once the A2Z basics are done",
        },
        {
          label: "NeetCode 150",
          href: "https://neetcode.io/practice",
          note: "Curated LeetCode problems with video explanations",
        },
        {
          label: "LeetCode Top Interview 150",
          href: "https://leetcode.com/studyplan/top-interview-150/",
          note: "The official interview-prep plan",
        },
        {
          label: "CP-Algorithms",
          href: "https://cp-algorithms.com",
          note: "Reference for competitive programming algorithms",
        },
        {
          label: "Codeforces EDU",
          href: "https://codeforces.com/edu/courses",
          note: "Free courses with graded problems",
        },
      ],
    },
    {
      heading: "How to practise properly",
      steps: [
        "Learn the topic first. Watch or read one lesson, then solve the easy problems of that topic the same day.",
        "Think before you look. Give each problem 20–30 minutes: restate it, try small examples, write the brute force, then improve it.",
        "Read the editorial only after a real attempt. Then close it and code the solution from memory. Copying code teaches nothing.",
        "Write down what you learned: the pattern, the trick, and why your first idea failed.",
        "Revise on a schedule. Re-solve a problem after 3 days, 2 weeks and 2 months. Mark the ones you got wrong.",
        "Always state the time and space complexity out loud.",
        "Do not jump ahead. Finish a topic before starting the next.",
      ],
    },
    {
      heading: "The A2Z order",
      paragraphs: [
        "Basics and pattern printing, sorting, arrays, binary search, strings, linked lists, recursion and backtracking, bit manipulation, stacks and queues, sliding window and two pointers, heaps, greedy, binary trees, binary search trees, graphs, dynamic programming, tries.",
        "Do the easy and medium problems first and come back for the hard ones.",
      ],
    },
    {
      heading: "Targets",
      paragraphs: [
        "These are rough guides, not rules. About 150 LeetCode problems and a rating of 1400+ in LeetCode contests makes a good campus placement profile. Top product companies tend to expect 300+ problems and some Codeforces or CodeChef contest history.",
      ],
    },
    {
      heading: "Competitive programming",
      bullets: [
        "Start contests once you know arrays, sorting, binary search and basic maths. Do not wait to feel ready.",
        "Join every LeetCode weekly and biweekly contest, and one Codeforces Div. 3 or Div. 4 round a week.",
        "After each contest, upsolve: solve the problems you missed, even though the contest is over. This is where most of the improvement comes from.",
        "Aim to solve problems A and B quickly and accurately before chasing C.",
        "Read how top-rated people solved the problems you could not.",
      ],
    },
  ],
};

const coreSubjects: RoadmapPage = {
  slug: "core-subjects",
  label: "Core subjects",
  title: "Core subjects",
  intro:
    "DBMS, operating systems, networks and OOP are asked in almost every interview. Learn them alongside DSA, and build small projects to make the ideas stick.",
  sections: [
    {
      heading: "Where to learn",
      links: [
        {
          label: "Gate Smashers",
          href: "https://www.youtube.com/@GateSmashers",
          note: "DBMS, OS and networks playlists",
        },
        {
          label: "Knowledge Gate",
          href: "https://www.youtube.com/@KnowledgeGATE",
          note: "A more detailed alternative",
        },
        {
          label: "SQLBolt",
          href: "https://sqlbolt.com",
          note: "Learn SQL by typing queries",
        },
        {
          label: "Mode SQL Tutorial",
          href: "https://mode.com/sql-tutorial",
          note: "SQL from basics to window functions",
        },
        {
          label: "LeetCode SQL 50",
          href: "https://leetcode.com/studyplan/top-sql-50/",
          note: "SQL practice for interviews",
        },
        {
          label: "GeeksforGeeks DBMS",
          href: "https://www.geeksforgeeks.org/dbms/",
          note: "Quick notes for revision",
        },
        {
          label: "CS50",
          href: "https://cs50.harvard.edu/x/",
          note: "A free introduction to computer science from Harvard",
        },
      ],
    },
    {
      heading: "DBMS and SQL: what to cover",
      table: {
        head: ["Area", "Topics"],
        rows: [
          [
            "Basics",
            "Database vs file system, DBMS architecture, keys (primary, candidate, foreign, super), ER model",
          ],
          [
            "Design",
            "Functional dependencies, normalisation up to BCNF, 1NF to 3NF differences, denormalisation",
          ],
          [
            "SQL",
            "SELECT, WHERE, GROUP BY, HAVING, joins (inner, left, right, full, self), subqueries, window functions, CTEs, indexes",
          ],
          [
            "Transactions",
            "ACID, isolation levels, dirty, non-repeatable and phantom reads, locking, deadlocks, serialisability",
          ],
          [
            "Internals",
            "B and B+ trees, indexing, query optimisation, recovery and logging",
          ],
          ["Beyond SQL", "SQL vs NoSQL, CAP theorem, sharding and replication"],
        ],
      },
      paragraphs: [
        "Practise by designing the database for a small app (a library, a hostel, this leaderboard), writing 20 queries for it, and explaining your design choices.",
      ],
    },
    {
      heading: "Operating systems, networks and OOP",
      bullets: [
        "OS: processes vs threads, scheduling, synchronisation (mutex, semaphore), deadlock, memory management, paging and virtual memory.",
        "Computer networks: OSI and TCP/IP layers, TCP vs UDP, what happens when you type a URL in the browser, HTTP and HTTPS, DNS, IP addressing.",
        "OOP: the four pillars with real examples, SOLID principles, abstract class vs interface, and the common design patterns.",
      ],
    },
    {
      heading: "Concept-clearing projects",
      paragraphs: [
        "Small projects that teach how things work underneath. Each builds on the one before. The last column is the test: you understand it when you can explain that out loud, without notes.",
      ],
      table: {
        head: ["#", "Project", "Concept it clears", "You understand it when you can explain"],
        rows: [
          [
            "1",
            "HTTP server from scratch",
            "Sockets, TCP, request and response format, status codes",
            "What happens between typing a URL and seeing a page",
          ],
          [
            "2",
            "Mini Redis",
            "Protocols, hash maps, expiry, handling many clients",
            "Why Redis is fast, and what a client and a server each do",
          ],
          [
            "3",
            "Unix shell",
            "Processes, pipes, file descriptors, signals",
            "What `ls | grep x` does at the system level",
          ],
          [
            "4",
            "Scheduler and memory simulator",
            "CPU scheduling, paging, page replacement",
            "Why one algorithm beats another on a given workload",
          ],
          [
            "5",
            "Regex engine",
            "Finite automata, parsing",
            "How a pattern becomes a state machine",
          ],
          [
            "6",
            "Tiny interpreter, then a bytecode VM",
            "Tokenising, parsing, scope, stacks, compilation",
            "How code becomes behaviour",
          ],
          [
            "7",
            "Mini database (B-tree on disk, simple SQL)",
            "Indexes, pages, query execution",
            "Why an index speeds up a query and what it costs on writes",
          ],
          [
            "8",
            "Mini Git",
            "Hashing, content-addressed storage, graphs",
            "What a commit really is, and why branches are cheap",
          ],
          [
            "9",
            "Search engine (inverted index, BM25)",
            "Indexing, ranking, text processing",
            "Why one page ranks above another",
          ],
          [
            "10",
            "Load balancer and reverse proxy",
            "Concurrency, health checks, rate limiting",
            "What happens when one backend dies",
          ],
          [
            "11",
            "Autograd engine (tiny neural network library)",
            "Backpropagation, gradients, training loops",
            "How a model learns from an error",
          ],
          [
            "12",
            "Auth system (sessions, password hashing, JWT, OAuth flow)",
            "Security basics, cookies, tokens",
            "Why passwords are hashed, not encrypted, and what a token proves",
          ],
        ],
      },
      bullets: [
        "Do them in order if you want foundations first. Projects 1 to 4 cover most of what interviews and the OS and networking parts of GATE ask.",
        "Fit them to your gaps. Projects 2 and 10 build Redis knowledge and system design thinking. For Docker, add a mini container runtime later (Linux only).",
        "Keep each to about a week. Do not start the next until you pass its test.",
      ],
    },
    {
      heading: "Rules for every project",
      steps: [
        "Write it yourself. Use AI as a tutor that gives tasks and reviews your work, not one that writes the code.",
        "Write a one-page note: what it does, the one idea that clicked, and the one bug that taught you something.",
        "Explain it to a friend, or record yourself for 3 minutes. Wherever you get stuck is the concept to revisit.",
      ],
    },
  ],
};

const development: RoadmapPage = {
  slug: "development",
  label: "Development",
  title: "Development and projects",
  intro:
    "Do DSA for everyone. After the basics, go deep in one track instead of sampling all of them, and ship projects that real people use.",
  sections: [
    {
      heading: "Pick a track",
      table: {
        head: ["Track", "Learn", "Good first project"],
        rows: [
          [
            "Web (frontend)",
            "HTML, CSS, JavaScript, TypeScript, React, Next.js, accessibility",
            "A portfolio site and a dashboard with live data",
          ],
          [
            "Web (backend)",
            "Node.js or Python, REST APIs, SQL, authentication, caching, testing",
            "A REST API with login, roles and a database",
          ],
          [
            "Mobile",
            "React Native with Expo, or Kotlin / Swift",
            "A campus utility app (timetable, notes, bus timings)",
          ],
          [
            "AI / ML",
            "Python, NumPy, pandas, scikit-learn, then deep learning",
            "A model on a real Kaggle dataset, with a small demo app",
          ],
          [
            "DevOps / Cloud",
            "Linux, Docker, CI/CD with GitHub Actions, AWS or GCP basics",
            "Deploy one of your projects with automated tests and deploys",
          ],
          [
            "Security",
            "Networking, web vulnerabilities, the OWASP Top 10, beginner CTFs",
            "Solve beginner CTFs and write up what you learned",
          ],
        ],
      },
    },
    {
      heading: "Where to learn",
      links: [
        {
          label: "MDN Learn Web Development",
          href: "https://developer.mozilla.org/en-US/docs/Learn_web_development",
          note: "The reference for HTML, CSS and JavaScript",
        },
        {
          label: "The Odin Project",
          href: "https://www.theodinproject.com",
          note: "A free full-stack curriculum built on projects",
        },
        {
          label: "Learn Next.js",
          href: "https://nextjs.org/learn",
          note: "The official interactive tutorial",
        },
        {
          label: "roadmap.sh",
          href: "https://roadmap.sh",
          note: "Roadmaps for any track",
        },
        {
          label: "fast.ai",
          href: "https://course.fast.ai",
          note: "Practical deep learning",
        },
        {
          label: "Kaggle",
          href: "https://www.kaggle.com",
          note: "Datasets and ML practice",
        },
        {
          label: "picoCTF",
          href: "https://picoctf.org",
          note: "Beginner-friendly security challenges",
        },
        {
          label: "OWASP Top 10",
          href: "https://owasp.org/www-project-top-ten/",
          note: "The most common web security risks",
        },
        {
          label: "System Design Primer",
          href: "https://github.com/donnemartin/system-design-primer",
          note: "Read after you finish the DSA basics",
        },
      ],
    },
    {
      heading: "Tools every student should know",
      bullets: [
        "Terminal and Linux: navigation, grep, ssh, permissions and shell scripts.",
        "Git beyond the basics: branches, rebase, resolving conflicts, clear commit messages and pull requests.",
        "An editor and debugger: learn your editor's shortcuts and use a debugger instead of print statements.",
        "Docker basics: write a Dockerfile for one project.",
        "Reading documentation: go to the official docs before a video. This one skill separates a beginner from a developer.",
        "Testing: write a few unit tests for every project.",
      ],
      links: [
        {
          label: "The Missing Semester",
          href: "https://missing.csail.mit.edu",
          note: "The shell, Git, editors and debugging, taught properly",
        },
        {
          label: "Pro Git",
          href: "https://git-scm.com/book",
          note: "The Git book",
        },
        {
          label: "GitHub Skills",
          href: "https://skills.github.com",
          note: "Short hands-on Git and GitHub courses",
        },
      ],
    },
    {
      heading: "Building projects that count",
      bullets: [
        "Build 2–3 projects, not 10. Finish them and deploy them.",
        "Pick a real problem: a tool for your hostel, club or college. Real users beat tutorial clones.",
        "Each project should include a database, authentication and a deployed link.",
        "Write a README with a screenshot, a description, the tech stack and how to run it.",
        "Be ready to explain why you made each design choice.",
      ],
    },
  ],
};

const openSource: RoadmapPage = {
  slug: "open-source",
  label: "Open source",
  title: "Open source",
  intro:
    "Merged pull requests show you can read other people's code, work with reviewers and finish what you start. Start small and start early.",
  sections: [
    {
      heading: "Where to start",
      links: [
        {
          label: "Open Source Guides",
          href: "https://opensource.guide",
          note: "How open source works and how to join in",
        },
        {
          label: "How to Contribute to Open Source",
          href: "https://opensource.guide/how-to-contribute/",
          note: "The step-by-step guide",
        },
        {
          label: "first-contributions",
          href: "https://github.com/firstcontributions/first-contributions",
          note: "Make a practice pull request",
        },
        {
          label: "Good First Issue",
          href: "https://goodfirstissue.dev",
          note: "Beginner issues from many projects",
        },
        {
          label: "Up For Grabs",
          href: "https://up-for-grabs.net",
          note: "Projects with beginner-friendly tasks",
        },
      ],
    },
    {
      heading: "Your first contribution, step by step",
      steps: [
        "Choose a project you already use, or one in your language. A smaller project with active maintainers beats a huge one.",
        "Read the README, CONTRIBUTING.md and the code of conduct.",
        "Run the project locally before you change anything.",
        "Pick a labelled issue (good first issue, documentation). Comment that you want to work on it and wait for a reply.",
        "Fork, clone, and create a branch for the change.",
        "Keep the change small and follow the project's style and commit rules.",
        "Open a pull request that links the issue, explains what you changed and why, and includes screenshots or test results.",
        "Respond to review politely and quickly. Review feedback is the best free mentoring you will get.",
        "Repeat. After three or four merged PRs, move on to bug fixes and small features.",
      ],
    },
    {
      heading: "Programmes to aim for",
      links: [
        {
          label: "Hacktoberfest",
          href: "https://hacktoberfest.com",
          note: "Runs every October",
        },
        {
          label: "Google Summer of Code",
          href: "https://summerofcode.withgoogle.com",
          note: "Paid summer mentorship with open-source organisations",
        },
        {
          label: "MLH Fellowship",
          href: "https://fellowship.mlh.io",
          note: "Remote fellowship on open-source projects",
        },
        {
          label: "LFX Mentorship",
          href: "https://lfx.linuxfoundation.org/tools/mentorship/",
          note: "Linux Foundation mentorships",
        },
      ],
      paragraphs: [
        "Start in your second year at the latest if you want GSoC or similar programmes. Applications open early in the year, and they look for a history of merged work.",
      ],
    },
  ],
};

const career: RoadmapPage = {
  slug: "career",
  label: "Career",
  title: "Placements and career",
  intro:
    "Interviews test more than problem solving. Prepare aptitude, your resume, your projects and how you talk about your work.",
  sections: [
    {
      heading: "Aptitude and placement preparation",
      bullets: [
        "Many companies filter first on aptitude: quantitative, logical reasoning and verbal. Practise for 20–30 minutes a day in your last year.",
        "Learn the common puzzles and probability basics.",
        "Solve ten past questions from each target company's online assessment, such as those on GeeksforGeeks interview experiences and LeetCode Discuss.",
        'Prepare "tell me about yourself", a project walkthrough, and a story each for teamwork, failure and conflict.',
      ],
      links: [
        {
          label: "IndiaBIX",
          href: "https://www.indiabix.com",
          note: "Aptitude and reasoning practice",
        },
      ],
    },
    {
      heading: "Resume and interview checklist",
      bullets: [
        "One page, with projects, links to your GitHub and coding profiles, and numbers where you can (users, problems solved, rating).",
        "Practise explaining your approach out loud, as you would in an interview.",
        "Do mock interviews with friends or on Pramp and interviewing.io.",
        "Know your projects well enough to answer any question about them.",
      ],
      links: [
        {
          label: "Pramp",
          href: "https://www.pramp.com",
          note: "Free peer mock interviews",
        },
        {
          label: "interviewing.io",
          href: "https://interviewing.io",
          note: "Anonymous mock interviews",
        },
      ],
    },
    {
      heading: "Hackathons, internships and clubs",
      bullets: [
        "Hackathons: you learn more in 24 hours of building with a team than in weeks of tutorials.",
        "Internships: apply from the second year onwards. Startups often take juniors.",
        "Clubs: join or start a coding club on campus. Teaching others is the fastest way to learn something thoroughly.",
        "Write in public: a short blog or LinkedIn post about what you built or learned helps recruiters find you and helps you remember.",
      ],
      links: [
        { label: "Devpost", href: "https://devpost.com", note: "Hackathons" },
        {
          label: "Unstop",
          href: "https://unstop.com",
          note: "Hackathons and contests",
        },
        { label: "MLH", href: "https://mlh.io", note: "Student hackathons" },
        { label: "Internshala", href: "https://internshala.com", note: "Internships" },
        { label: "Wellfound", href: "https://wellfound.com", note: "Startup jobs" },
        {
          label: "LinkedIn",
          href: "https://www.linkedin.com",
          note: "Jobs and networking",
        },
      ],
    },
    {
      heading: "Using AI tools well",
      bullets: [
        "Use AI to explain a concept, review your code or suggest test cases. Do not use it to produce the solution before you have tried.",
        "Never submit code you cannot explain line by line.",
        "Verify every claim and every API it gives you against the official docs.",
        "Ask it to quiz you or find the flaw in your approach, rather than hand you the answer.",
      ],
    },
    {
      heading: "Further reading",
      bullets: [
        "Cracking the Coding Interview, by Gayle Laakmann McDowell.",
        "Introduction to Algorithms (CLRS), as a reference rather than a first read.",
        "Designing Data-Intensive Applications, by Martin Kleppmann, for backend and system design.",
        "The Pragmatic Programmer, by Hunt and Thomas.",
        "Competitive Programmer's Handbook, by Antti Laaksonen (free PDF).",
      ],
    },
  ],
};

export const ROADMAP_PAGES: RoadmapPage[] = [
  start,
  dsa,
  coreSubjects,
  development,
  openSource,
  career,
];

export function roadmapPage(slug: string): RoadmapPage | undefined {
  return ROADMAP_PAGES.find((p) => p.slug === slug);
}

/** The URL for a roadmap page. */
export function roadmapHref(slug: string): string {
  return slug ? `/roadmap/${slug}` : "/roadmap";
}
