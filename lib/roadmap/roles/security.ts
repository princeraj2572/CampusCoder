import type { Role } from "./types";

export const security: Role = {
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
    { label: "TryHackMe", href: "https://tryhackme.com", note: "Guided learning paths" },
    {
      label: "OWASP Juice Shop",
      href: "https://owasp.org/www-project-juice-shop/",
      note: "A deliberately vulnerable app to practise on",
    },
  ],
  tools: [
    "Kali Linux or Parrot in a virtual machine",
    "Burp Suite Community Edition",
    "Wireshark and nmap, on networks you own",
    "Browser DevTools",
    "A note-taking tool such as Obsidian",
    "Python and Bash for scripting",
  ],
  ladder: [
    {
      level: "Junior (0–2 years)",
      focus: "Triage findings, run tests under supervision and write clear reports.",
    },
    {
      level: "Mid-level (2–5 years)",
      focus: "Own assessments or a detection area and guide developers to fix problems.",
    },
    {
      level: "Senior (5+ years)",
      focus: "Lead security programmes, threat modelling and incident response.",
    },
    {
      level: "Staff and beyond",
      focus: "Set security strategy and risk decisions across the organisation.",
    },
  ],
  first90: [
    {
      days: "Days 1–30",
      goal: "Learn the systems and the threat model, and shadow reviews and incidents.",
    },
    {
      days: "Days 31–60",
      goal: "Complete a supervised review and write a report the developers act on.",
    },
    {
      days: "Days 61–90",
      goal: "Automate one repeated check, such as dependency or secret scanning.",
    },
  ],
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
  where: [
    {
      type: "Product companies",
      what: "Application security and incident response teams.",
    },
    { type: "Banks and fintech", what: "Strict rules and high stakes." },
    {
      type: "Security consultancies",
      what: "Test many clients' systems, with permission.",
    },
    { type: "Bug bounty", what: "Independent testing of programmes that invite it." },
  ],
  myths: [
    {
      myth: "Security is mostly hacking like in films.",
      truth: "It is patient reading, writing, testing and helping developers fix things.",
    },
    {
      myth: "You can start with tools like Kali.",
      truth: "Networking, Linux and web fundamentals come first.",
    },
    {
      myth: "Bug bounties are an easy income.",
      truth: "They are competitive. Treat them as practice, not a salary.",
    },
  ],
};
