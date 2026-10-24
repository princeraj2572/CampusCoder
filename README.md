This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## New here? How to get started

CampusCoder ranks students by what they solve on LeetCode, Codeforces, CodeChef and GitHub. If you are starting from zero, follow this order.

1. **Pick a language** – C++, Java or Python. Stay with one until you are comfortable.
2. **Create your accounts** – [LeetCode](https://leetcode.com), [Codeforces](https://codeforces.com), [CodeChef](https://www.codechef.com) and [GitHub](https://github.com), then add them to your CampusCoder profile.
3. **Solve a little every day** – consistency beats marathon sessions.
4. **Build and ship projects** – put them on GitHub.
5. **Contribute to open source** – see below.

### DSA

| Resource | Use it for |
| --- | --- |
| [Striver's A2Z DSA Sheet](https://takeuforward.org/strivers-a2z-dsa-course/strivers-a2z-dsa-course-sheet-2/) | Step-by-step topic order from basics to advanced, with videos |
| [Striver's SDE Sheet](https://takeuforward.org/interviews/strivers-sde-sheet-top-coding-interview-problems/) | Top ~190 interview problems, once the A2Z basics are done |
| [NeetCode 150](https://neetcode.io/practice) | Curated LeetCode problems with video explanations |
| [LeetCode Top Interview 150](https://leetcode.com/studyplan/top-interview-150/) | Official interview-prep plan |
| [CP-Algorithms](https://cp-algorithms.com) | Reference for competitive programming algorithms |
| [Codeforces EDU](https://codeforces.com/edu/courses) | Free courses with graded problems |

### DBMS and SQL

- [Gate Smashers DBMS playlist](https://www.youtube.com/@GateSmashers) – ER model, normalisation, transactions, indexing.
- [Knowledge Gate DBMS](https://www.youtube.com/@KnowledgeGATE) – a more detailed alternative.
- [SQLBolt](https://sqlbolt.com) and [Mode SQL Tutorial](https://mode.com/sql-tutorial) – learn SQL by typing queries.
- [LeetCode SQL 50](https://leetcode.com/studyplan/top-sql-50/) – practice for interviews.
- [GeeksforGeeks DBMS](https://www.geeksforgeeks.org/dbms/) – quick notes for revision.

### Other core subjects

- **Operating Systems, Computer Networks, OOP** – Gate Smashers and Knowledge Gate playlists, plus GeeksforGeeks notes.
- **CS fundamentals** – [CS50](https://cs50.harvard.edu/x/) (free Harvard course).
- **Git and GitHub** – [Pro Git book](https://git-scm.com/book) and [GitHub Skills](https://skills.github.com).
- **Web development** – [MDN Learn Web Development](https://developer.mozilla.org/en-US/docs/Learn_web_development), [The Odin Project](https://www.theodinproject.com), [Next.js Learn](https://nextjs.org/learn).
- **Roadmaps for any track** – [roadmap.sh](https://roadmap.sh).
- **System design** – [System Design Primer](https://github.com/donnemartin/system-design-primer), after you finish DSA basics.

### Open source contribution

1. Learn the basics: [Open Source Guides](https://opensource.guide) and [How to Contribute to Open Source](https://opensource.guide/how-to-contribute/).
2. Make a practice pull request: [first-contributions](https://github.com/firstcontributions/first-contributions).
3. Find beginner issues: [Good First Issue](https://goodfirstissue.dev), [Up For Grabs](https://up-for-grabs.net), or the `good first issue` label on GitHub.
4. Start with docs fixes and small bugs. Read `CONTRIBUTING.md`, comment on the issue, then open a PR.
5. Join programs: [Hacktoberfest](https://hacktoberfest.com) (October), [GSoC](https://summerofcode.withgoogle.com), [MLH Fellowship](https://fellowship.mlh.io), [LFX Mentorship](https://lfx.linuxfoundation.org/tools/mentorship/).

### Suggested plan

| Weeks | Focus |
| --- | --- |
| 1–2 | Language basics, Git, one LeetCode problem a day |
| 3–10 | Striver A2Z sheet, steps 1–10, along with SQL basics |
| 11–14 | DBMS, OS and CN theory, first Codeforces/CodeChef contests |
| 15+ | A project, first open-source PR, then the SDE sheet and contests weekly |

### How to practise DSA properly

Solving many problems is not the goal. Being able to solve a new one is.

1. **Learn the topic first.** Watch or read one lesson, then solve the easy problems of that topic the same day.
2. **Think before you look.** Give each problem 20–30 minutes: restate it, try small examples, write the brute force, then improve it.
3. **Read the editorial only after a real attempt.** Then close it and code the solution from memory. Copying code teaches nothing.
4. **Write down what you learned.** Keep a short note per problem: the pattern, the trick, and why your first idea failed.
5. **Revise on a schedule.** Re-solve a problem after 3 days, 2 weeks and 2 months. Mark the ones you got wrong.
6. **Always state the complexity.** After each solution, say the time and space complexity out loud.
7. **Do not jump ahead.** Finish a topic (arrays, then binary search, then recursion, and so on) before starting the next.

**Striver A2Z order, in short:** basics and pattern printing, sorting, arrays, binary search, strings, linked lists, recursion and backtracking, bit manipulation, stacks and queues, sliding window and two pointers, heaps, greedy, binary trees, binary search trees, graphs, dynamic programming, tries. Do the easy and medium problems first and come back for the hard ones.

**Target numbers (a guide, not a rule):** about 150 LeetCode problems and a rating of 1400+ on LeetCode contests for a good campus placement profile; 300+ problems with some Codeforces or CodeChef contest history for top product companies.

### Competitive programming

- Start contests once you know arrays, sorting, binary search and basic maths. Do not wait to feel ready.
- Join every LeetCode weekly and biweekly contest, and one Codeforces Div. 3 or Div. 4 round a week.
- **After each contest, upsolve:** solve the problems you missed, even if the contest is over. This is where most of the improvement comes from.
- Aim to solve problem A and B quickly and accurately before chasing C.
- Read how top-rated people solved the problems you could not.

### DBMS and SQL: what to cover

| Area | Topics |
| --- | --- |
| Basics | Database vs file system, DBMS architecture, keys (primary, candidate, foreign, super), ER model |
| Design | Functional dependencies, normalisation up to BCNF, 1NF to 3NF differences, denormalisation |
| SQL | SELECT, WHERE, GROUP BY, HAVING, joins (inner, left, right, full, self), subqueries, window functions, CTEs, indexes |
| Transactions | ACID, isolation levels, dirty/non-repeatable/phantom reads, locking, deadlocks, serialisability |
| Internals | B and B+ trees, indexing, query optimisation, recovery and logging |
| Beyond SQL | SQL vs NoSQL, CAP theorem, sharding and replication |

Practise by designing the database for a small app (a library, a hostel, this leaderboard), writing 20 queries for it, and explaining your design choices.

### Operating systems, networks and OOP

These are asked in almost every interview. Cover them in this order:

- **OS:** processes vs threads, scheduling, synchronisation (mutex, semaphore), deadlock, memory management, paging and virtual memory.
- **Computer networks:** OSI and TCP/IP layers, TCP vs UDP, what happens when you type a URL in the browser, HTTP and HTTPS, DNS, IP addressing.
- **OOP:** the four pillars with real examples, SOLID principles, abstract class vs interface, and the common design patterns.

### Building projects that count

- Build 2–3 projects, not 10. Finish them and deploy them.
- Pick a real problem: a tool for your hostel, club or college. Real users beat tutorial clones.
- Each project should include a database, authentication and a deployed link.
- Write a README with a screenshot, a description, the tech stack and how to run it.
- Be ready to explain why you made each design choice.

### Open source: a step-by-step first contribution

1. **Choose a project you already use** or one in your language. A smaller project with active maintainers is better than a huge one.
2. **Read** the README, `CONTRIBUTING.md` and the code of conduct.
3. **Run the project locally** before you change anything.
4. **Pick a labelled issue** (`good first issue`, `documentation`). Comment that you want to work on it and wait for a reply.
5. **Fork, clone, and create a branch** for the change.
6. **Keep the change small** and follow the project's style and commit rules.
7. **Open a pull request** that links the issue, explains what you changed and why, and includes screenshots or test results.
8. **Respond to review politely and quickly.** Review feedback is the best free mentoring you will get.
9. **Repeat.** After three or four merged PRs, move on to bug fixes and small features.

Start in your second year at the latest if you want GSoC or similar programmes: applications open early in the year, and they look for a history of merged work.

### Year-wise path

| Year | Focus |
| --- | --- |
| 1 | One language, logic building, Git, basic web or app project, start LeetCode |
| 2 | Full DSA (A2Z), OOP and DBMS, regular contests, first open-source PRs, two projects |
| 3 | Interview prep: SDE sheet, OS, CN, SQL, system design basics, internship and mock interviews |
| 4 | Revise, apply early, polish the resume, and keep the contest and contribution streak going |

### Common mistakes to avoid

- Watching videos without coding along.
- Switching sheets and courses every week. Pick one and finish it.
- Reading editorials too soon.
- Skipping core subjects until the week before interviews.
- Building only tutorial clones.
- Starting open source with a huge issue instead of a small one.
- Leaving gaps in the streak. Thirty minutes every day beats ten hours once a week.
- Comparing your first month with someone else's third year.

### Interview and resume checklist

- One page, with projects, links to your GitHub and coding profiles, and numbers where you can (users, problems solved, rating).
- Practise explaining your approach out loud, as you would in an interview.
- Do mock interviews with friends or on [Pramp](https://www.pramp.com) and [interviewing.io](https://interviewing.io).
- Know your projects well enough to answer any question about them.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Refresh timer (Cloudflare Worker)

Scores are refreshed by a small free Cloudflare Worker that calls the site every 5 minutes. The
site refreshes only accounts that have not been updated for `REFRESH_STALE_MINUTES` (default 180),
so most calls do almost nothing. The GitHub Actions job in `.github/workflows/refresh.yml` still
works as a backup.

One-time setup:

1. Set `CRON_SECRET` (at least 24 characters, random) in Vercel's Production environment and in
   `.env.local`.
2. Deploy the Worker from `workers/refresh-timer`:

   ```bash
   cd workers/refresh-timer
   npx wrangler login
   npx wrangler deploy
   # PowerShell:  Get-Content ../../.env.cron | npx wrangler secret put CRON_SECRET
   # bash:        npx wrangler secret put CRON_SECRET < ../../.env.cron
   ```

3. Check it in the Cloudflare dashboard under Workers, then Logs, after the next 5-minute mark.

The endpoint is `POST /api/cron/refresh` with `Authorization: Bearer <CRON_SECRET>`.
