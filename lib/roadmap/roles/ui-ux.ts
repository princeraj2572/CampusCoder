import type { Role } from "./types";

export const uiUx: Role = {
  slug: "ui-ux",
  name: "UI/UX designer",
  color: "var(--role-teal)",
  tagline:
    "Work out what people need, then shape a product that is easy and pleasant to use.",
  job: "You study how people use a product, find where they get stuck, and design the screens and flows that fix it. You sketch, build clickable prototypes, test them with real users, and work with developers so the final product matches the design. Good design makes software feel simple.",
  daily: [
    "Talk to users and read feedback to understand what they are trying to do.",
    "Sketch flows and wireframes, then build them as clean screens in Figma.",
    "Test a prototype with five people and note where they hesitate.",
    "Hand designs to developers, answer questions, and check the built result.",
    "Keep the design system (colours, type, components) consistent.",
  ],
  suits:
    "You notice what is confusing, you care about details and people, and you can explain a design choice calmly to someone who disagrees.",
  stack: "Figma, user research, prototyping, design systems, basic HTML and CSS",
  stages: [
    {
      title: "Design fundamentals",
      time: "Months 1–2",
      study: [
        "Layout, spacing, alignment and visual hierarchy.",
        "Typography and colour, including contrast and accessibility.",
        "Usability heuristics and the laws of UX.",
        "Figma basics: frames, auto layout, components and styles.",
      ],
      build:
        "Recreate three screens of an app you like, pixel by pixel, then redesign one of them.",
    },
    {
      title: "Research and flows",
      time: "Months 3–4",
      study: [
        "User interviews, surveys and writing user stories.",
        "Personas, journeys and mapping a flow from start to goal.",
        "Information architecture: how to organise content and navigation.",
        "Low-fidelity wireframes before any visual polish.",
      ],
      build:
        "Interview five students about a problem on campus and map the main user flow.",
    },
    {
      title: "Prototype and test",
      time: "Months 5–7",
      study: [
        "Clickable prototypes with Figma and realistic content.",
        "Usability testing: tasks, observing, and writing findings.",
        "Responsive design for phone, tablet and desktop.",
        "Accessibility: contrast, focus order, touch targets and labels.",
      ],
      build:
        "A full prototype tested with five people, with a short report of what you changed.",
    },
    {
      title: "Systems and handoff",
      time: "Months 8+",
      study: [
        "Building a design system: tokens, components and documentation.",
        "Working with developers: specs, states and edge cases.",
        "Basic HTML and CSS so you understand what is possible.",
        "Telling the story of a project in a portfolio case study.",
      ],
      build: "A small design system and a portfolio with three case studies.",
    },
  ],
  projects: [
    {
      level: "Starter",
      name: "Redesign an app you use",
      what: "Pick one screen with a real problem, explain it, and redesign it with before and after.",
      proves: "You can see problems and justify your choices.",
    },
    {
      level: "Intermediate",
      name: "End-to-end design for a campus problem",
      what: "Research with real students, wireframes, a tested prototype and a short report.",
      proves: "You follow a full design process, not just draw screens.",
    },
    {
      level: "Advanced",
      name: "Design system and case-study portfolio",
      what: "A documented component library, plus three case studies showing the problem, process and result.",
      proves: "You design at scale and can explain your thinking.",
    },
  ],
  senior: {
    do: [
      "Start with the user's problem. A beautiful screen that solves the wrong thing is waste.",
      "Test early with rough designs. It is cheap to change a sketch and costly to change code.",
      "Design every state: empty, loading, error and success, not just the happy screen.",
      "Learn enough code to talk to developers, and design within what is easy to build.",
      "Show the reasoning in your portfolio, not only the final images.",
    ],
    avoid: [
      "Copying trends without asking whether they help the user.",
      "Designing only for yourself or for the latest phone.",
      "Ignoring accessibility. Poor contrast and tiny targets exclude real people.",
      "Defending a design instead of listening to what testing showed.",
      "A portfolio of pretty screens with no problem, process or outcome.",
    ],
  },
  interview: [
    "A portfolio walkthrough: the problem, your role, your process, and what changed because of your work.",
    "A design exercise: improve a flow, such as booking a ticket, in 45 minutes while thinking aloud.",
    "How you would research a problem and decide what to test.",
    "Critique an existing app: what works, what does not, and what you would change.",
    "Questions on accessibility, design systems and working with developers.",
  ],
  links: [
    {
      label: "Laws of UX",
      href: "https://lawsofux.com",
      note: "Short, clear principles of how people use interfaces",
    },
    {
      label: "Nielsen Norman Group articles",
      href: "https://www.nngroup.com/articles/",
      note: "Research-backed guidance on usability",
    },
    {
      label: "Refactoring UI",
      href: "https://www.refactoringui.com",
      note: "Practical visual design tips for people who are not artists",
    },
    {
      label: "Figma Learn",
      href: "https://help.figma.com/hc/en-us",
      note: "Official tutorials for the main design tool",
    },
    {
      label: "Material Design",
      href: "https://m3.material.io",
      note: "A real design system to study, with guidelines",
    },
    {
      label: "Apple Human Interface Guidelines",
      href: "https://developer.apple.com/design/human-interface-guidelines/",
      note: "How a well-known platform thinks about design",
    },
    {
      label: "WCAG quick reference",
      href: "https://www.w3.org/WAI/WCAG22/quickref/",
      note: "The accessibility rules, searchable",
    },
    {
      label: "YouTube (Global): DesignCourse",
      href: "https://www.youtube.com/@DesignCourse",
      note: "UI design and Figma tutorials",
    },
    {
      label: "YouTube (Global): The Futur",
      href: "https://www.youtube.com/@thefutur",
      note: "Design thinking and the business of design",
    },
    {
      label: "YouTube (Global): Figma",
      href: "https://www.youtube.com/@Figma",
      note: "Official Figma tutorials",
    },
    {
      label: "YouTube (Global): Flux Academy",
      href: "https://www.youtube.com/@FluxAcademy",
      note: "Web design and UI skills",
    },
  ],
  tools: [
    "Figma",
    "FigJam or Miro for flows",
    "Maze or a simple usability test setup",
    "Contrast checkers such as the WebAIM tool",
    "A notes app for research",
    "Basic HTML and CSS",
  ],
  ladder: [
    {
      level: "Junior (0–2 years)",
      focus:
        "Design screens and flows under guidance, run small tests and learn the system.",
    },
    {
      level: "Mid-level (2–5 years)",
      focus:
        "Own a feature from research to handoff, and contribute to the design system.",
    },
    {
      level: "Senior (5+ years)",
      focus: "Lead design for a product area, set the process and mentor others.",
    },
    {
      level: "Staff and beyond",
      focus:
        "Shape the design direction of a product, or become a design lead or head of design.",
    },
  ],
  first90: [
    {
      days: "Days 1–30",
      goal: "Learn the product and its users, read past research, and ship a small design fix.",
    },
    {
      days: "Days 31–60",
      goal: "Own a small feature: research, wireframes, a test and handoff to developers.",
    },
    {
      days: "Days 61–90",
      goal: "Show the result of your work in numbers or user feedback, and improve the design system.",
    },
  ],
  week: [
    { when: "Mon, Wed", what: "Study one principle and apply it to a screen (1 hour)" },
    { when: "Tue, Thu", what: "Redesign one real screen in Figma (45 minutes)" },
    {
      when: "Fri",
      what: "Test your design with one person and note where they struggled (30 minutes)",
    },
    { when: "Weekend", what: "Build: two hours on your portfolio case study" },
  ],
  mistakes: [
    "Showing final screens without the problem or the process.",
    "Designing only the happy path and skipping empty, loading and error states.",
    "Using low-contrast grey text because it looks elegant.",
    "Never testing with a real person.",
    "Never talking to the developers who will build the design.",
  ],
  ask: [
    "How do you learn what users really need, and how often?",
    "How closely do designers and developers work together here?",
    "How do you decide when a design is done?",
  ],
  where: [
    {
      type: "Product companies",
      what: "Designers embedded in teams building one product.",
    },
    {
      type: "Design and digital agencies",
      what: "Varied client work with fast learning.",
    },
    {
      type: "Startups",
      what: "Broad roles: research, design and sometimes front-end code.",
    },
    {
      type: "In-house teams at banks and large firms",
      what: "Complex tools and internal products.",
    },
  ],
  myths: [
    {
      myth: "UI/UX design is just making things pretty.",
      truth:
        "Most of the job is research, structure and testing. Visual polish is one part.",
    },
    {
      myth: "You must be good at drawing.",
      truth:
        "You need judgement, empathy and clear thinking more than illustration skill.",
    },
    {
      myth: "Designers do not need to know any code.",
      truth:
        "You do not need to code, but understanding HTML and CSS makes you far more effective.",
    },
  ],
};
