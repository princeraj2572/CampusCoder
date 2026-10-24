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
