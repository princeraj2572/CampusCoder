import type { Role } from "./types";

export const devops: Role = {
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
      pitfall: "Memorising commands without understanding what the system is doing.",
      ready: [
        "Find which process is using a port or memory.",
        "Explain DNS, TCP and a TLS handshake simply.",
        "Write a shell script that is safe to re-run.",
      ],
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
      pitfall: "Baking secrets and manual steps into images and pipelines.",
      ready: [
        "Write a Dockerfile with a small final image.",
        "Have every push run tests and build automatically.",
        "Explain the difference between an image and a container.",
      ],
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
      pitfall: "Clicking infrastructure together in the console and never recording it.",
      ready: [
        "Create and destroy an environment from code.",
        "Explain IAM roles and least privilege.",
        "Keep state and secrets out of git.",
      ],
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
      pitfall: "Alerting on everything, so nobody listens when it matters.",
      ready: [
        "Set up a dashboard and an alert that you would act on.",
        "Run a practice incident and write a post-mortem.",
        "Roll back a bad release quickly.",
      ],
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
  concepts: [
    {
      name: "Linux and the shell",
      what: "Files, permissions, processes, services and logs, driven from the command line.",
      why: "Nearly every server you will touch runs Linux.",
    },
    {
      name: "Containers",
      what: "Docker packs an app with everything it needs into an image that runs the same anywhere.",
      why: "It ends the 'works on my machine' problem.",
    },
    {
      name: "CI/CD",
      what: "A pipeline tests and builds every commit, and deploys it automatically if all checks pass.",
      why: "Small, frequent, automatic releases are safer than rare manual ones.",
    },
    {
      name: "Infrastructure as code",
      what: "Describe servers and networks in files (Terraform) kept in git instead of clicking in a console.",
      why: "You can review, repeat and roll back infrastructure like any other code.",
    },
    {
      name: "Observability",
      what: "Logs, metrics and traces tell you what a running system is doing and why it is failing.",
      why: "You cannot fix what you cannot see, especially at 3 a.m.",
    },
    {
      name: "Reliability and incidents",
      what: "Set targets (SLOs), plan for failure and write blameless post-mortems after outages.",
      why: "Systems will fail, so what counts is how quickly you recover and learn.",
    },
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
    {
      label: "YouTube (Global): TechWorld with Nana",
      href: "https://www.youtube.com/@TechWorldwithNana",
      note: "Docker, Kubernetes and CI/CD made clear",
    },
    {
      label: "YouTube (India): Kunal Kushwaha",
      href: "https://www.youtube.com/@KunalKushwaha",
      note: "DevOps and cloud-native basics",
    },
    {
      label: "YouTube (Global): freeCodeCamp",
      href: "https://www.youtube.com/@freecodecamp",
      note: "Long free courses on Linux, AWS and Docker",
    },
    {
      label: "YouTube (India): Abhishek Veeramalla",
      href: "https://www.youtube.com/@AbhishekVeeramalla",
      note: "DevOps, Kubernetes and cloud, step by step",
    },
    {
      label: "YouTube (Global): DevOps Toolkit",
      href: "https://www.youtube.com/@DevOpsToolkit",
      note: "Kubernetes and platform tooling in depth",
    },
  ],
  tools: [
    "A Linux machine or WSL, and a good terminal",
    "Docker and Docker Compose",
    "GitHub Actions",
    "Terraform",
    "kubectl with minikube or kind",
    "Prometheus and Grafana",
  ],
  ladder: [
    {
      level: "Junior (0–2 years)",
      focus: "Maintain pipelines, handle tickets and learn the systems with guidance.",
    },
    {
      level: "Mid-level (2–5 years)",
      focus: "Own the deployment platform and automate away repeated work.",
    },
    {
      level: "Senior (5+ years)",
      focus: "Design reliable platforms, lead incidents and set standards for delivery.",
    },
    {
      level: "Staff and beyond",
      focus: "Define reliability, cost and security strategy across the company.",
    },
  ],
  first90: [
    {
      days: "Days 1–30",
      goal: "Learn how code gets from a commit to production, and read the last three incident reports.",
    },
    {
      days: "Days 31–60",
      goal: "Automate one painful manual task and write the runbook for it.",
    },
    {
      days: "Days 61–90",
      goal: "Improve a metric: deploy time, failure rate or cloud cost, and show the numbers.",
    },
  ],
  week: [
    { when: "Mon, Wed", what: "A Linux, networking or cloud lesson with a lab (1 hour)" },
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
  where: [
    {
      type: "Cloud-based product companies",
      what: "Run the platform that everyone deploys on.",
    },
    { type: "Fintech and e-commerce", what: "High uptime is a business requirement." },
    { type: "Managed service providers", what: "Operate infrastructure for clients." },
    { type: "Startups", what: "Often one person sets up everything." },
  ],
  myths: [
    {
      myth: "DevOps means knowing every tool.",
      truth: "It is a way of working: automation, feedback and shared ownership.",
    },
    {
      myth: "It is only for experienced people.",
      truth: "Many start as developers or system administrators and learn on the job.",
    },
    {
      myth: "Kubernetes is the first thing to learn.",
      truth: "Linux, networking and Docker come first.",
    },
  ],
};
