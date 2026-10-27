import type { Role } from "./types";

export const web3: Role = {
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
    {
      label: "YouTube (Global): Patrick Collins",
      href: "https://www.youtube.com/@PatrickAlphaC",
      note: "Free long Solidity and smart contract courses",
    },
    {
      label: "YouTube (Global): Dapp University",
      href: "https://www.youtube.com/@DappUniversity",
      note: "Build blockchain apps step by step",
    },
    {
      label: "YouTube (Global): Smart Contract Programmer",
      href: "https://www.youtube.com/@smartcontractprogrammer",
      note: "Solidity tutorials with examples",
    },
    {
      label: "YouTube (Global): Whiteboard Crypto",
      href: "https://www.youtube.com/@WhiteboardCrypto",
      note: "Crypto and blockchain concepts, explained simply",
    },
  ],
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
};
