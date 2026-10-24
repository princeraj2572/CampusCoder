import type { BaseRole } from "./roles";
import type { RoleExtra } from "./roles-extra";
import type { RoleInfo } from "./roles-info";

/** Design, product and blockchain roles, added after the first eleven. */
export const uxdesign: BaseRole = {
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
  ],
};

export const product: BaseRole = {
  slug: "product",
  name: "Product manager",
  color: "var(--role-coral)",
  tagline:
    "Decide what to build and why, and keep the team pointed at the right problem.",
  job: "You do not write the code or draw the screens. You work out which problems are worth solving, decide what to build first, write it down clearly, and keep designers, engineers and the business working together. You are judged on whether the product succeeds, not on how many features ship.",
  daily: [
    "Talk to users and read data to find what hurts most.",
    "Write a clear problem statement and a short spec for the next piece of work.",
    "Prioritise the backlog and say no to good ideas that are not the best idea.",
    "Work with engineers and designers to scope and unblock the work.",
    "Look at the numbers after release and decide what to do next.",
  ],
  suits:
    "You like people, problems and trade-offs, you write and speak clearly, and you are comfortable making decisions with incomplete information.",
  stack: "Writing, SQL and analytics, user research, roadmaps, basic technical knowledge",
  stages: [
    {
      title: "Product thinking",
      time: "Months 1–2",
      study: [
        "What a product is, who it is for, and what problem it solves.",
        "How to write a problem statement and a short product spec.",
        "Prioritisation: impact against effort, and simple frameworks like RICE.",
        "How software teams work: sprints, backlogs and releases.",
      ],
      build:
        "A one-page product spec for a feature you would add to an app you use daily.",
    },
    {
      title: "Users and data",
      time: "Months 3–4",
      study: [
        "User interviews and finding the real problem behind a request.",
        "Basic SQL and a spreadsheet for answering questions with data.",
        "Metrics: activation, retention, conversion and how to pick a goal.",
        "Running a simple experiment, such as an A/B test, and reading the result.",
      ],
      build:
        "Analyse a public dataset or your own project's usage and recommend one change.",
    },
    {
      title: "Work with a team",
      time: "Months 5–7",
      study: [
        "Writing user stories and acceptance criteria that engineers can build from.",
        "Roadmaps: what to commit to and what to leave flexible.",
        "Enough technical knowledge to talk with engineers: APIs, databases, trade-offs.",
        "Communicating with stakeholders and saying no politely.",
      ],
      build:
        "Be the product lead on a small student project: define the goal, scope it and ship it.",
    },
    {
      title: "Strategy and craft",
      time: "Months 8+",
      study: [
        "Market and competitor analysis.",
        "Pricing and business models at a basic level.",
        "Product teardowns: why a product works and where it fails.",
        "Telling the story of a product decision in an interview.",
      ],
      build: "Three product teardowns and one launched project with measured results.",
    },
  ],
  projects: [
    {
      level: "Starter",
      name: "Product teardown",
      what: "Analyse a well-known app: who it is for, how it makes money, what you would fix, and why.",
      proves: "You can think about products critically.",
    },
    {
      level: "Intermediate",
      name: "Lead a small student product",
      what: "Run a project with 3–4 classmates: users, spec, priorities, launch and a review of the numbers.",
      proves: "You can lead without authority and ship.",
    },
    {
      level: "Advanced",
      name: "Experiment with real users",
      what: "Run an A/B test or a pricing experiment on a live project and write up the decision.",
      proves: "You make decisions from evidence.",
    },
  ],
  senior: {
    do: [
      "Fall in love with the problem, not the solution. Many good ideas solve nothing.",
      "Talk to users every week. Reports are no replacement for conversations.",
      "Write short, clear documents. If it takes ten pages to explain, it is not yet clear.",
      "Learn enough about technology to respect what is hard and what is cheap.",
      "Say no often, and explain why in terms of the goal.",
    ],
    avoid: [
      "Building whatever the loudest person asks for.",
      "Treating engineers and designers as people who simply carry out orders.",
      "Measuring success by features shipped instead of results for users.",
      "Hiding behind data you have not looked at carefully, or ignoring data that disagrees with you.",
      "Writing a long roadmap that no one believes.",
    ],
  },
  interview: [
    "A product design question: improve an app, or design a product for a group of users.",
    "A prioritisation case: you have ten ideas and limited time, so what do you build first and why?",
    "A metrics question: how would you measure the success of a feature, and what if the number drops?",
    "A behavioural question about influencing a team or handling a disagreement.",
    "A teardown of a product you know well, with a clear opinion.",
  ],
  links: [
    {
      label: "Lenny's Newsletter",
      href: "https://www.lennysnewsletter.com",
      note: "Practical product advice from people doing the job",
    },
    {
      label: "Silicon Valley Product Group articles",
      href: "https://www.svpg.com/articles/",
      note: "How strong product teams work",
    },
    {
      label: "Shape Up (Basecamp)",
      href: "https://basecamp.com/shapeup",
      note: "A free book on scoping and shipping work",
    },
    {
      label: "Mind the Product",
      href: "https://www.mindtheproduct.com",
      note: "Articles and talks from the product community",
    },
    {
      label: "Mode SQL Tutorial",
      href: "https://mode.com/sql-tutorial/",
      note: "Learn the SQL a product manager uses to answer questions",
    },
  ],
};

export const web3: BaseRole = {
  slug: "web3",
  name: "Blockchain developer",
  color: "var(--role-indigo)",
  tagline:
    "Build programs that run on a blockchain, where mistakes can be expensive and permanent.",
  job: "You write smart contracts, programs that run on a blockchain and often handle money, and the apps that talk to them. Because deployed contracts are hard to change and can hold real value, you work carefully, test heavily and think like an attacker. Many students try this area, so strong fundamentals stand out.",
  daily: [
    "Write and test smart contracts in Solidity (or Rust on other chains).",
    "Build a front end that connects a wallet and reads or writes to a contract.",
    "Review code for security problems such as reentrancy and bad access control.",
    "Estimate and reduce the gas cost of functions.",
    "Read audits and past hacks to learn what went wrong.",
  ],
  suits:
    "You are careful and curious, you like security and systems, and you are comfortable with a field that changes quickly and has real risks.",
  stack: "Solidity, Foundry or Hardhat, TypeScript, ethers or viem, a wallet, a testnet",
  stages: [
    {
      title: "Blockchain basics",
      time: "Months 1–2",
      study: [
        "How a blockchain works: blocks, hashing, consensus and transactions.",
        "Wallets, keys, signatures and gas.",
        "What smart contracts can and cannot do, and what an oracle is.",
        "JavaScript or TypeScript, and strong general programming skills.",
      ],
      build:
        "Explain a transaction from wallet to block, and send one on a test network.",
    },
    {
      title: "Smart contracts",
      time: "Months 3–5",
      study: [
        "Solidity: types, storage, functions, events and errors.",
        "The ERC-20 and ERC-721 standards, using OpenZeppelin.",
        "Testing with Foundry or Hardhat, including fuzz tests.",
        "Deploying to a testnet and verifying a contract.",
      ],
      build:
        "An ERC-20 token and an NFT contract, fully tested and deployed to a testnet.",
    },
    {
      title: "Security",
      time: "Months 6–8",
      study: [
        "Common bugs: reentrancy, access control, integer issues and front-running.",
        "Solving Ethernaut and Damn Vulnerable DeFi challenges.",
        "Reading real audit reports and post-mortems of hacks.",
        "Gas optimisation, and when it is not worth the complexity.",
      ],
      build:
        "Write-ups for ten security challenges, each explaining the bug and the fix.",
    },
    {
      title: "Full applications",
      time: "Months 9+",
      study: [
        "A front end with a wallet connection, using viem or ethers.",
        "Indexing events, with The Graph or your own indexer.",
        "Upgradable contracts and their risks.",
        "Layer 2 networks and how costs and security differ.",
      ],
      build: "A complete app: contract, tests, front end and a testnet deployment.",
    },
  ],
  projects: [
    {
      level: "Starter",
      name: "Token and voting contract",
      what: "An ERC-20 token and a simple voting contract with tests and a testnet deployment.",
      proves: "You can write and ship basic contracts.",
    },
    {
      level: "Intermediate",
      name: "Escrow or crowdfunding app",
      what: "A contract that holds funds under rules, a front end with wallet connection and thorough tests.",
      proves: "You handle money logic safely and build the full stack.",
    },
    {
      level: "Advanced",
      name: "Security write-ups and a small protocol",
      what: "A lending or staking contract with fuzz tests, plus public write-ups of challenges you solved.",
      proves: "You think about security and can explain risk.",
    },
  ],
  senior: {
    do: [
      "Treat every contract as if it will be attacked, because it will be.",
      "Test far more than you would for ordinary software, and use fuzz tests.",
      "Use well-reviewed libraries such as OpenZeppelin instead of writing your own.",
      "Keep contracts small and simple. Complexity is where bugs hide.",
      "Learn from past hacks. Most new exploits are variations of old ones.",
    ],
    avoid: [
      "Deploying untested code with real money in it.",
      "Copying a contract you do not fully understand.",
      "Storing secrets or private keys in a repository or on the chain.",
      "Chasing hype instead of learning fundamentals.",
      "Promising returns to users. Build tools, not get-rich-quick schemes.",
    ],
  },
  interview: [
    "Explain how a transaction is created, signed, included in a block and finalised.",
    "Spot the bug in a short Solidity function, such as a reentrancy or an access control flaw.",
    "Explain gas, storage versus memory, and how you would reduce a function's cost.",
    "Describe how you would test and secure a contract that holds user funds.",
    "General coding and data structures, since many teams test them first.",
  ],
  links: [
    {
      label: "Solidity documentation",
      href: "https://docs.soliditylang.org",
      note: "The official language guide",
    },
    {
      label: "Ethereum developer docs",
      href: "https://ethereum.org/en/developers/",
      note: "Concepts and tutorials from the start",
    },
    {
      label: "Foundry Book",
      href: "https://book.getfoundry.sh",
      note: "The fast testing and deployment toolkit",
    },
    {
      label: "OpenZeppelin documentation",
      href: "https://docs.openzeppelin.com",
      note: "Audited contracts and security guidance",
    },
    {
      label: "CryptoZombies",
      href: "https://cryptozombies.io",
      note: "Learn Solidity by building a small game",
    },
    {
      label: "Ethernaut",
      href: "https://ethernaut.openzeppelin.com",
      note: "Hacking challenges that teach contract security",
    },
    {
      label: "Cyfrin Updraft",
      href: "https://updraft.cyfrin.io",
      note: "Free courses on Solidity, testing and security",
    },
  ],
};

/** The extra sections and the "where you will work" and myths blocks for the new roles. */
export const NEW_DETAILS: Record<string, RoleExtra & RoleInfo> = {
  "ui-ux": {
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
  },
  product: {
    tools: [
      "A notes and docs app for writing specs",
      "Spreadsheet skills",
      "SQL",
      "Figma, to read and discuss designs",
      "Jira, Linear or a similar tracker",
      "An analytics tool, such as Google Analytics or PostHog",
    ],
    ladder: [
      {
        level: "Associate (0–2 years)",
        focus:
          "Support a product manager, write specs, analyse data and run small improvements.",
      },
      {
        level: "Product manager (2–5 years)",
        focus: "Own a product area end to end: users, roadmap, delivery and results.",
      },
      {
        level: "Senior (5+ years)",
        focus: "Lead strategy for a larger area, handle ambiguity and mentor others.",
      },
      {
        level: "Director and beyond",
        focus:
          "Own a portfolio of products and the strategy behind it, or lead the product team.",
      },
    ],
    first90: [
      {
        days: "Days 1–30",
        goal: "Learn the product, the users and the metrics. Talk to ten users and your team.",
      },
      {
        days: "Days 31–60",
        goal: "Write your first spec, work with engineers to scope it and ship a small improvement.",
      },
      {
        days: "Days 61–90",
        goal: "Measure the result, share what you learned, and propose the next priority.",
      },
    ],
    week: [
      { when: "Mon, Wed", what: "Product reading and one teardown of an app (1 hour)" },
      {
        when: "Tue, Thu",
        what: "SQL and spreadsheet practice on real data (45 minutes)",
      },
      { when: "Fri", what: "Write a one-page spec for an idea (45 minutes)" },
      {
        when: "Weekend",
        what: "Build: two hours on your student project, with your team",
      },
    ],
    mistakes: [
      "Writing long documents nobody reads.",
      "Saying yes to every request to keep people happy.",
      "Never looking at the data after a release.",
      "Giving engineers solutions instead of problems.",
      "Not learning enough about how software is built.",
    ],
    ask: [
      "How does the team decide what to build next?",
      "How do you measure whether a feature worked?",
      "How do product, design and engineering work together day to day?",
    ],
    where: [
      {
        type: "Product companies and startups",
        what: "The most common route, often via an associate or APM programme.",
      },
      {
        type: "Large tech firms",
        what: "Structured programmes and specialised product areas.",
      },
      {
        type: "Fintech, e-commerce and edtech",
        what: "Fast-growing teams that need product thinking.",
      },
      {
        type: "Consulting and internal tools teams",
        what: "Product work for a business or for staff.",
      },
    ],
    myths: [
      {
        myth: "A product manager is the boss of the engineers.",
        truth:
          "You lead through clarity and trust. You have responsibility, not authority.",
      },
      {
        myth: "You can go straight into product from college easily.",
        truth:
          "Entry roles are few. Many start as engineers, designers or analysts, or build and launch their own project.",
      },
      {
        myth: "Product managers do not need technical knowledge.",
        truth:
          "You need enough to understand trade-offs. The best ones can read data and talk to engineers as equals.",
      },
    ],
  },
  web3: {
    tools: [
      "Foundry or Hardhat",
      "Solidity and an editor extension",
      "A wallet such as MetaMask, for testnets only",
      "viem or ethers",
      "A block explorer such as Etherscan",
      "Slither for static analysis",
    ],
    ladder: [
      {
        level: "Junior (0–2 years)",
        focus: "Write and test contracts under review, and learn security patterns.",
      },
      {
        level: "Mid-level (2–5 years)",
        focus:
          "Own contracts for a protocol feature, write thorough tests and review others.",
      },
      {
        level: "Senior (5+ years)",
        focus: "Design protocol architecture, lead security reviews and handle audits.",
      },
      {
        level: "Staff and beyond",
        focus:
          "Set the technical and security direction, or become an auditor or protocol lead.",
      },
    ],
    first90: [
      {
        days: "Days 1–30",
        goal: "Learn the codebase and the protocol, run the full test suite and fix a small bug.",
      },
      {
        days: "Days 31–60",
        goal: "Ship a small contract change with tests, and take part in a code review.",
      },
      {
        days: "Days 61–90",
        goal: "Own a feature, including tests and a security review, and learn how audits work.",
      },
    ],
    week: [
      {
        when: "Mon, Wed",
        what: "Study one Solidity or security topic and write code (1 hour)",
      },
      { when: "Tue, Thu", what: "Solve a security challenge on Ethernaut (45 minutes)" },
      { when: "Fri", what: "Read one audit report or hack post-mortem (45 minutes)" },
      { when: "Weekend", what: "Build: two hours on your contract project, with tests" },
    ],
    mistakes: [
      "Deploying without enough tests, and with real funds.",
      "Copying code from tutorials without understanding the risks.",
      "Putting private keys in a repository.",
      "Learning only tools and skipping general programming and security.",
      "Chasing token prices instead of building skills.",
    ],
    ask: [
      "How is code reviewed and audited before deployment?",
      "How do you handle an upgrade or an emergency pause?",
      "What does your testing strategy look like, including fuzz tests?",
    ],
    where: [
      {
        type: "Blockchain protocols and startups",
        what: "Core contracts, tooling and infrastructure.",
      },
      {
        type: "Security and audit firms",
        what: "Review other teams' contracts for a living.",
      },
      {
        type: "Fintech and payments",
        what: "Settlement, tokenisation and cross-border payments.",
      },
      {
        type: "Open-source and grants",
        what: "Many contributors work on public goods and are funded by grants.",
      },
    ],
    myths: [
      {
        myth: "You can get rich quickly in this field.",
        truth:
          "It is hard engineering with real risk. The people who last are the careful ones.",
      },
      {
        myth: "You do not need a computer science foundation.",
        truth:
          "Strong programming, data structures and security knowledge matter even more here than elsewhere.",
      },
      {
        myth: "The market is always booming.",
        truth:
          "Hiring rises and falls with the market. Skills in security and testing stay valuable throughout.",
      },
    ],
  },
};
