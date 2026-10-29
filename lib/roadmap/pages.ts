import { ai } from "./ai";
import { ideas } from "./ideas";
import { interview } from "./interview";
import { linux } from "./linux";
import { patterns } from "./patterns";
import { systemDesign } from "./system-design";
import { tools } from "./tools";
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
      heading: "Check yourself each month",
      bullets: [
        "Did I solve something on at least 20 days this month?",
        "Can I explain one pattern I learned, to a friend, without notes?",
        "Did I upsolve at least two contests?",
        "Did I add or improve something in a project or a pull request?",
        "Did I revise a core subject, not only DSA?",
        "Is my trend on the weekly chart flat or rising? If flat, change one thing in my routine.",
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
    {
      heading: "How to review a problem you solved",
      steps: [
        "Write the idea in one sentence before you look at the code again.",
        "State the time and space cost, and say what limits it.",
        "Read one other solution and note what it does differently.",
        "Name the pattern (two pointers, sliding window, BFS and so on) and add the problem to a list under that name.",
        "Come back in a week and solve it again from a blank page.",
      ],
    },
    {
      heading: "A weekly rhythm",
      table: {
        head: ["Day", "What to do"],
        rows: [
          ["Mon to Thu", "One topic: learn it, then solve 3 to 5 problems on it."],
          ["Friday", "Redo two problems you got wrong earlier."],
          ["Saturday", "Take a timed contest or a mock interview."],
          ["Sunday", "Upsolve what you missed and write notes on new patterns."],
        ],
      },
    },
    {
      heading: "A 12-week DSA plan",
      paragraphs: [
        "Adjust the pace to your schedule, but keep the order. Finish each block before the next.",
      ],
      table: {
        head: ["Weeks", "Topics", "Goal by the end"],
        rows: [
          [
            "1–2",
            "Arrays, strings, hashing, prefix sums",
            "Solve easy problems in under 15 minutes",
          ],
          [
            "3",
            "Sorting and binary search",
            "Binary search on answers, not only on arrays",
          ],
          [
            "4",
            "Two pointers and sliding window",
            "Spot a window problem from the wording",
          ],
          [
            "5",
            "Linked lists, stacks, queues",
            "Reverse a list and use a monotonic stack",
          ],
          [
            "6",
            "Recursion and backtracking",
            "Write subsets and permutations from scratch",
          ],
          [
            "7–8",
            "Binary trees and BSTs",
            "All four traversals, recursive and iterative",
          ],
          ["9", "Heaps and greedy", "Top-k problems with a heap"],
          [
            "10",
            "Graphs: BFS, DFS, shortest paths",
            "Count components and find shortest paths",
          ],
          [
            "11–12",
            "Dynamic programming and tries",
            "Write a recurrence, then the table",
          ],
        ],
      },
    },
    {
      heading: "What input size tells you about the algorithm",
      paragraphs: [
        "Read the constraints first. They hint at the complexity the problem expects, assuming about 10^8 simple operations per second.",
      ],
      table: {
        head: ["Input size n", "Aim for", "Typical technique"],
        rows: [
          ["Up to 10", "O(n!)", "Try every permutation"],
          ["Up to 20", "O(2^n)", "Bitmask or backtracking"],
          ["Up to 500", "O(n^3)", "Triple loops, Floyd–Warshall"],
          ["Up to 5,000", "O(n^2)", "Nested loops, simple DP"],
          ["Up to 100,000", "O(n log n)", "Sorting, heaps, binary search"],
          ["Up to 1,000,000", "O(n)", "One pass, hashing, two pointers"],
          ["Above 10^8", "O(log n) or O(1)", "Maths or binary search"],
        ],
      },
    },
    {
      heading: "Signs you are ready to move on",
      bullets: [
        "You can explain the approach before you start typing.",
        "You solve easy problems in this topic in under 15 minutes.",
        "When you are stuck, you know which pattern to try next.",
        "You can say why a brute-force solution is too slow.",
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
        head: [
          "#",
          "Project",
          "Concept it clears",
          "You understand it when you can explain",
        ],
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
      heading: "A six-week plan for the core subjects",
      table: {
        head: ["Week", "Focus", "Finish by"],
        rows: [
          [
            "1",
            "ER model, keys and basic SQL",
            "Writing joins and GROUP BY without help",
          ],
          [
            "2",
            "Normalisation, transactions and indexes",
            "Explaining ACID and isolation levels",
          ],
          [
            "3",
            "Processes, threads and CPU scheduling",
            "Comparing FCFS, SJF and round robin",
          ],
          [
            "4",
            "Synchronisation, deadlock and memory",
            "Explaining paging and virtual memory",
          ],
          ["5", "Network layers, TCP, HTTP, DNS", "Describing a URL request end to end"],
          ["6", "OOP, SOLID and revision", "Answering the cross-subject questions below"],
        ],
      },
    },
    {
      heading: "SQL queries to practise",
      table: {
        head: ["Task", "Idea it tests"],
        rows: [
          ["Second highest salary", "A subquery, or DENSE_RANK()"],
          ["Find duplicate emails", "GROUP BY with HAVING COUNT(*) > 1"],
          ["Employees who earn more than their manager", "A self join"],
          [
            "Top three salaries in each department",
            "A window function with PARTITION BY",
          ],
          [
            "Customers who never placed an order",
            "LEFT JOIN with IS NULL, or NOT EXISTS",
          ],
          ["Running total of sales by date", "SUM() OVER (ORDER BY date)"],
          ["Consecutive days a user logged in", "Window functions and date arithmetic"],
        ],
      },
    },
    {
      heading: "Rules for every project",
      steps: [
        "Write it yourself. Use AI as a tutor that gives tasks and reviews your work, not one that writes the code.",
        "Write a one-page note: what it does, the one idea that clicked, and the one bug that taught you something.",
        "Explain it to a friend, or record yourself for 3 minutes. Wherever you get stuck is the concept to revisit.",
      ],
    },
    {
      heading: "A four-step revision loop",
      steps: [
        "Read one topic from a book or lecture, then close it.",
        "Write what you remember on a blank page, then check what you missed.",
        "Answer three interview questions on the topic out loud.",
        "Use it once: write a query, run a command or sketch a diagram. Revise it again after a week.",
      ],
    },
    {
      heading: "Questions that tie the subjects together",
      qa: [
        {
          q: "What happens when you type a URL and press Enter?",
          a: "The browser looks up the address with DNS, opens a TCP connection and a TLS session, sends an HTTP request, the server runs code and queries a database, and the browser renders the response. It touches networks, operating systems and databases at once.",
        },
        {
          q: "Why can an index make writes slower?",
          a: "Every insert or update must also update each index on the table, so more indexes mean faster reads but more work on each write.",
        },
        {
          q: "What is the difference between a process and a thread?",
          a: "A process has its own memory space. Threads inside a process share memory, so they communicate easily but can corrupt each other's data without locks.",
        },
        {
          q: "How does a deadlock happen, and how do you avoid it?",
          a: "Two tasks each hold a resource the other needs and wait forever. Avoid it by always taking locks in the same order, holding them briefly or using timeouts.",
        },
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
    {
      heading: "An 8-week plan to ship a full-stack app",
      steps: [
        "Week 1: choose a small real problem, write down the five things a user can do, and sketch the screens on paper.",
        "Week 2: design the database tables and build the sign-up and login with a hashed password or a hosted login.",
        "Week 3: build the main create, read, update and delete flow, and test each API call with a client such as curl.",
        "Week 4: build the main screens with real data, and handle loading, empty and error states.",
        "Week 5: add validation, permissions (who can see or change what) and a few unit tests.",
        "Week 6: deploy it, add environment variables safely, and fix what breaks in production.",
        "Week 7: ask five real users to try it, watch where they get stuck, and fix the top three problems.",
        "Week 8: write the README with a screenshot, add it to your resume with one number, and prepare a two-minute explanation.",
      ],
    },
    {
      heading: "What happens when you open a web page",
      steps: [
        "The browser finds the server's address using DNS.",
        "It opens a TCP connection, then a TLS session so the traffic is encrypted.",
        "It sends an HTTP request: a method, a path, headers and sometimes a body.",
        "The server runs your code, which may read or write a database, and builds a response.",
        "The browser receives HTML, then fetches the CSS, JavaScript and images it points to.",
        "It builds the page, runs the scripts and responds to clicks.",
      ],
    },
    {
      heading: "Choosing a stack",
      table: {
        head: ["Goal", "A good starting point", "Why"],
        rows: [
          [
            "First website",
            "HTML, CSS and JavaScript",
            "You see results at once and learn how the browser works.",
          ],
          [
            "A full web app",
            "React or Next.js with Node.js and PostgreSQL",
            "One language across the stack, with large communities.",
          ],
          [
            "An Android app",
            "Kotlin with Jetpack Compose",
            "The platform's own modern toolkit.",
          ],
          [
            "An app for both phones",
            "Flutter or React Native",
            "One codebase for iOS and Android.",
          ],
          [
            "Data or AI work",
            "Python with pandas and a notebook",
            "The libraries and tutorials are plentiful.",
          ],
        ],
      },
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
      heading: "Finding an issue on GitHub",
      bullets: [
        'Search issues with filters, for example: label:"good first issue" language:typescript is:open no:assignee',
        "Sort by recently updated, and skip issues that are old or already have an open pull request.",
        "Prefer projects with recent commits, a CONTRIBUTING.md and maintainers who reply to issues.",
        "Read the whole issue thread before you comment, so you do not repeat a question.",
      ],
    },
    {
      heading: "The Git commands for a pull request",
      steps: [
        "Fork the repository on GitHub, then clone your fork: git clone <your-fork-url>.",
        "Add the original as a remote: git remote add upstream <original-url>.",
        "Create a branch for the change: git switch -c fix-typo-in-readme.",
        "Make the change, run the project's tests, then git add and git commit with a clear message.",
        "Push the branch to your fork: git push -u origin fix-typo-in-readme.",
        "Open a pull request on GitHub, link the issue (for example Fixes #123) and describe what you changed.",
        "If the main branch has moved on, update with git fetch upstream and git rebase upstream/main, then push again.",
        "After it is merged, switch back to main, pull from upstream and delete your branch.",
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
    {
      heading: "What counts as a contribution",
      bullets: [
        "Fixing a typo or unclear sentence in the documentation.",
        "Reproducing a bug and adding details to the issue.",
        "Writing or improving a test.",
        "Fixing a small bug marked good first issue.",
        "Reviewing and testing someone else's pull request.",
      ],
    },
    {
      heading: "Etiquette that gets your pull request merged",
      bullets: [
        "Read the contributing guide and the code of conduct first.",
        "Comment on an issue to claim it, and wait for a maintainer to agree.",
        "Keep each pull request small and about one thing.",
        "Follow the project's style and run its tests before you push.",
        "Be polite when you get feedback, and respond to it quickly.",
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
      heading: "Writing a resume that gets read",
      bullets: [
        "One page, one column, a plain font. Recruiters and screening tools read it in seconds.",
        "Order: contact line, education, projects, skills, experience, achievements. Freshers put projects before skills.",
        "Write each project as: what you built, with what, and the result. Example: 'Built a leaderboard for 300 students with Next.js and PostgreSQL; refreshes scores every 5 minutes.'",
        "Start lines with a strong verb (built, reduced, designed, led) and add a number where honest.",
        "List only skills you can answer questions about. Group them: languages, frameworks, tools.",
        "Link your GitHub, LeetCode or Codeforces profile and a live project. Check that every link works.",
        "Name the file clearly, such as FirstName_LastName_Resume.pdf, and send a PDF.",
        "Ask a senior to review it. Two reviews are better than one.",
      ],
    },
    {
      heading: "Turn a small piece of work into a project",
      paragraphs: [
        "Interviewers ask about your projects far more than about the job description. Even a single bug fix or feature can become a strong story if you can explain it end to end.",
      ],
      steps: [
        "Write the problem in one sentence: who had it and what went wrong.",
        "Describe the before: how it worked, what it cost in time, errors or users affected.",
        "Explain the design: the parts involved and why you chose this approach over one alternative.",
        "Name the hardest bug or trade-off, and what you did about it.",
        "State the result with a number: time saved, errors removed, users served.",
        "List what you would change with more time.",
      ],
      bullets: [
        "Quantify every resume bullet. 'Reduced page load from 4s to 1.5s by caching' beats 'Improved performance'.",
        "Prepare a two-minute version and a ten-minute version of each project.",
        "Use AI to quiz you with follow-up questions on your own project, then answer out loud. Do not let it write answers you cannot defend.",
      ],
    },
    {
      heading: "AI-assisted coding rounds",
      paragraphs: [
        "Some companies now let you use an AI assistant in the interview, or run rounds on debugging, integration, SQL or performance in an existing codebase. They score how you think, not how much you type.",
      ],
      bullets: [
        "Read the code and the task before you prompt. State your plan first.",
        "Give the assistant small, specific tasks and check every answer. Say aloud what you are verifying.",
        "Run the tests and try edge cases yourself. Interviewers watch whether you catch its mistakes.",
        "Be ready to explain every line you keep, and to solve the problem without the assistant if asked.",
        "In debugging rounds, reproduce the failure, form a hypothesis, then change one thing at a time.",
        "In performance rounds, measure before you change anything, and say what the bottleneck is.",
      ],
    },
    {
      heading: "LinkedIn and cold outreach",
      steps: [
        "Use a clear photo, a headline with your role and skills, and an About section with two or three lines on what you build.",
        "Follow the companies you want and read their engineering posts.",
        "Find an engineer or recruiter on the team. Check that they hire for your level.",
        "Send a short message: who you are, one specific reason for this person or team, and one clear ask, such as advice or a referral for a named role.",
        "Attach nothing on the first message, and keep it under about 100 words.",
        "Follow up once after a week. If there is no reply, move on politely.",
        "Thank anyone who helps, and tell them how it went.",
      ],
      paragraphs: [
        "A message that works is specific. 'Hi, I am a third-year student and I built a leaderboard that tracks 300 students' coding profiles. I saw your team works on data pipelines, and I am applying for the SDE intern role. Could you tell me what the team looks for in interns?' is much better than 'Please give me a referral'.",
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
        {
          label: "Engineering Atlas career guides",
          href: "https://engineering-atlas.in/career-guide/",
          note: "A backend roadmap, resume guide and project deep-dive playbook",
        },
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
    {
      heading: "Reading an offer",
      bullets: [
        "Separate the fixed pay from bonuses, joining bonuses and stock, and ask what is guaranteed.",
        "Ask about the notice period, any service agreement and what happens if you leave early.",
        "Ask what team you will join and what you will work on, not only the company name.",
        "Get the offer in writing and read it fully before accepting.",
        "Be polite and clear if you need time or want to ask a question. That is normal.",
      ],
    },
    {
      heading: "Service, product and startup companies",
      table: {
        head: ["Type", "What it is usually like", "Good fit if"],
        rows: [
          [
            "Service companies",
            "You build software for clients, often in large batches of new joiners with set training.",
            "You want a structured start and exposure to many domains.",
          ],
          [
            "Product companies",
            "You build and own one product for its users, and the hiring bar is often higher.",
            "You want depth in one product and a strong engineering culture.",
          ],
          [
            "Startups",
            "Small teams, wide responsibility and quick changes, with less structure.",
            "You want to learn fast and are comfortable with uncertainty.",
          ],
        ],
      },
    },
  ],
};

export const ROADMAP_PAGES: RoadmapPage[] = [
  start,
  dsa,
  patterns,
  coreSubjects,
  interview,
  systemDesign,
  development,
  ideas,
  tools,
  linux,
  ai,
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

export interface RoadmapTab {
  label: string;
  title: string;
  href: string;
  blurb: string;
}

/** The roadmap pages in reading order, grouped for the switcher and the overview. */
export const ROADMAP_GROUPS: { label: string; color: string; tabs: RoadmapTab[] }[] = [
  {
    label: "Start",
    color: "var(--board-dsa)",
    tabs: [
      tab(
        "",
        "Where to begin: the order to learn things and a plan for your first weeks.",
      ),
    ],
  },
  {
    label: "Jobs",
    color: "var(--tier-blue)",
    tabs: [
      {
        label: "Roles and jobs",
        title: "Roles and jobs",
        href: "/roadmap/roles",
        blurb:
          "14 roles: what each does, what to study and build, and what seniors advise.",
      },
      tab("career", "Resume, LinkedIn, internships and placement preparation."),
    ],
  },
  {
    label: "Learn the basics",
    color: "var(--board-contests)",
    tabs: [
      tab("dsa", "Data structures and algorithms: what to study and how to practise."),
      tab(
        "dsa-patterns",
        "The patterns behind most interview problems, with cheat sheets.",
      ),
      tab("core-subjects", "DBMS, operating systems, networks and OOP."),
      tab("interview-qa", "About 50 common questions with short answers."),
      tab("system-design", "How to design systems that many people use."),
    ],
  },
  {
    label: "Build and ship",
    color: "var(--board-github)",
    tabs: [
      tab("development", "Web, apps and backend: what to learn and in what order."),
      tab("project-ideas", "Project ideas by level and role, and how to finish them."),
      tab("tools", "Git, Docker, editors and the tools every developer uses."),
      tab("linux", "The terminal, permissions, shell scripts and servers, step by step."),
      tab("ai", "Learn with AI without skipping the basics, and build with it."),
      tab("open-source", "How to find a project and make your first contribution."),
    ],
  },
];

function tab(slug: string, blurb: string): RoadmapTab {
  const page = ROADMAP_PAGES.find((p) => p.slug === slug)!;
  return { label: page.label, title: page.title, href: roadmapHref(slug), blurb };
}

/** Every roadmap page in reading order, for the "Next" link. */
export const ROADMAP_TABS: RoadmapTab[] = ROADMAP_GROUPS.flatMap((g) => g.tabs);
