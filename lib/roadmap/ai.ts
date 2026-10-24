import type { RoadmapPage } from "./types";

export const ai: RoadmapPage = {
  slug: "ai",
  label: "Learning with AI",
  title: "Learning and building in the age of AI",
  intro:
    "AI tools now write a lot of code, and companies know it. That changes what is worth learning and how you should learn it, but it does not remove the need for fundamentals. The students who do well use AI to learn faster and build more, and can still explain every line they ship.",
  sections: [
    {
      heading: "What AI changes, and what it does not",
      table: {
        head: ["Still matters", "Matters more now", "Matters less now"],
        rows: [
          [
            "DSA, DBMS, OS, networks: interviews still test them, and you need them to judge AI output",
            "Reading and reviewing code, writing tests, debugging, and explaining trade-offs",
            "Memorising syntax and boilerplate",
          ],
          [
            "Building and finishing real projects",
            "Breaking a vague problem into small, checkable steps",
            "Typing speed, and writing simple CRUD by hand",
          ],
          [
            "Clear writing and communication",
            "Knowing when the AI is wrong, and how to verify it",
            "Looking up the same commands again and again",
          ],
        ],
      },
      paragraphs: [
        "A useful rule: if you could not have written it, or at least explained it, do not commit it. The AI is a fast junior who is confident and sometimes wrong. You are the senior who reviews the work.",
      ],
    },
    {
      heading: "Use AI to learn, not to skip learning",
      bullets: [
        "Try the problem first for 20–30 minutes. Then ask for a hint, not the answer. Say 'give me a hint only' or 'ask me questions until I find it'.",
        "Ask it to explain a concept three ways: simply, with an example, and with where it breaks. Then explain it back in your own words and ask it to find the gaps.",
        "Ask it to quiz you on a topic, and to mark your answers. It is a patient interviewer that is available at 2 a.m.",
        "Paste an error and your code, and ask why it happens. Do not just apply the fix. Understand the cause.",
        "Ask for a code review of your own solution: bugs, edge cases, complexity and naming. Compare it with a better solution afterwards.",
        "Never copy a solution you cannot reproduce from a blank file a day later. That is the test of whether you learned it.",
        "Check facts against the official docs. AI can invent functions, flags and links that do not exist.",
      ],
    },
    {
      heading: "Where AI help hurts you",
      bullets: [
        "Contests and online assessments often ban AI, and interviews often test you without it. If you only ever practised with help, you will freeze.",
        "Pasting the problem and the answer back builds the feeling of understanding without the skill.",
        "Accepting code you did not read creates bugs you cannot debug, and security holes you cannot see.",
        "Your college or an employer may have rules on AI use. Read them, and say honestly when you used it.",
        "Sharing private data, API keys, or company code in a public AI tool can leak it. Treat prompts as public unless you know otherwise.",
      ],
    },
    {
      heading: "A good workflow for coding with AI",
      steps: [
        "Write down what you want in plain words first: inputs, outputs, edge cases and what 'done' means.",
        "Ask for a plan or a design before code, and read the plan. Fix the plan before you fix the code.",
        "Work in small steps. One function or one change at a time, not a whole app in one go.",
        "Read every line of the result. Run it. Ask what each part does if you do not know.",
        "Write or ask for tests, and run them. Tests are how you check the AI, not the other way round.",
        "Use Git: commit before a big AI change so you can undo it, and review the diff like a teammate's pull request.",
        "When it goes in circles, stop. Start a new chat with a short summary of the problem, or debug it yourself.",
      ],
    },
    {
      heading: "How to write a good prompt",
      bullets: [
        "Give context: the language, the framework, the version, and what the code is for.",
        "Show the actual error message, the relevant code and what you already tried.",
        "State the constraints: 'no new libraries', 'must run in O(n log n)', 'match the style of the file'.",
        "Say the output you want: a diff, one function, a table, or a step-by-step explanation.",
        "Ask it to say what it is unsure about, and to list assumptions it made.",
        "Iterate. The first answer is a draft. Reply with what is wrong and what you want changed.",
      ],
    },
    {
      heading: "Learning to build with AI: a path",
      paragraphs: [
        "Every software role is gaining AI work, not only the AI/ML role. Adding a language model to a product is now an ordinary skill, like adding a database. This path is for building apps that use models, and it needs ordinary programming first.",
      ],
      table: {
        head: ["Stage", "Learn", "Build"],
        rows: [
          [
            "1. Foundations (any time)",
            "Python or TypeScript, HTTP and JSON APIs, basic SQL, Git",
            "A small app that calls any public API and shows the result",
          ],
          [
            "2. Use a model through an API",
            "Chat and message formats, system prompts, temperature, tokens and context windows, streaming, error handling and rate limits, cost per call",
            "A command-line or web chatbot with a clear purpose and a saved history",
          ],
          [
            "3. Make the output reliable",
            "Structured output (JSON with a schema), validation, retries, few-shot examples, and handling refusals and bad output",
            "A tool that turns messy text (emails, resumes, receipts) into clean data",
          ],
          [
            "4. Give the model your data (RAG)",
            "Embeddings, chunking, a vector store or full-text search, retrieval, citing sources, and when not to use RAG",
            "A question-answering bot over your college notes or a set of PDFs, with source links",
          ],
          [
            "5. Tools and agents",
            "Tool and function calling, loops with a step limit, state, human approval for risky actions, and why simple workflows beat clever agents",
            "An assistant that can search, read a file and call one real API, with a log of each step",
          ],
          [
            "6. Evaluate and ship",
            "Test sets, automatic and human evaluation, regression checks when you change a prompt, logging, latency and cost, and caching",
            "Take one earlier project and add an evaluation set and a dashboard of cost and quality",
          ],
        ],
      },
    },
    {
      heading: "Concepts worth understanding",
      table: {
        head: ["Concept", "In one line"],
        rows: [
          [
            "Large language model (LLM)",
            "A model trained to predict the next piece of text, which turns out to be useful for many language tasks",
          ],
          [
            "Token and context window",
            "Models read and write in pieces called tokens, and can only consider a limited amount of text at once",
          ],
          [
            "Hallucination",
            "A fluent answer that is wrong or made up. Ground it with sources and check it",
          ],
          [
            "Embedding",
            "A list of numbers that captures meaning, so similar texts are close together",
          ],
          [
            "RAG (retrieval-augmented generation)",
            "Fetch relevant text first, then ask the model to answer from it",
          ],
          [
            "Fine-tuning",
            "Further training a model on your examples. Try prompting and RAG first, since they are cheaper and easier",
          ],
          [
            "Agent",
            "A model in a loop that can call tools and decide the next step. Powerful, but harder to make reliable",
          ],
          [
            "Evaluation",
            "A repeatable test of quality on example inputs. Without one you are guessing whether a change helped",
          ],
          [
            "Prompt injection",
            "Text in the input that tries to give the model new instructions. Never trust content the model reads from the web or from users",
          ],
        ],
      },
    },
    {
      heading: "Safety and good habits when you ship AI features",
      bullets: [
        "Treat model output as untrusted input. Validate it before you run it, show it, or put it in a database.",
        "Never let a model run commands, send emails or spend money without a limit and, for risky actions, a human check.",
        "Keep API keys on the server, never in the browser or in the repository. Set spending limits.",
        "Do not send personal or private data to a model unless you have a clear reason and permission.",
        "Tell users when they are talking to an AI, and give a way to report a bad answer.",
        "Log inputs, outputs, latency and cost so you can find problems, and respect privacy while doing it.",
        "Expect models to change. Pin the model version where you can and re-run your evaluation set when it changes.",
      ],
    },
    {
      heading: "What to do in each year",
      table: {
        head: ["Year", "Learn", "Do with AI"],
        rows: [
          [
            "First",
            "A language, basic DSA, Git, and how to debug without help",
            "Use AI as a tutor: explain, quiz, hint. Keep a rule of no copy-pasting solutions",
          ],
          [
            "Second",
            "DSA, DBMS, OS, networks and web development",
            "Review your own code with AI, and build a small app that calls a model API",
          ],
          [
            "Third",
            "System design basics, a role-specific stack, and the AI path from stages 2 to 4",
            "Ship a RAG or structured-output project to real users, with an evaluation set",
          ],
          [
            "Final",
            "Interview skills and depth in one area",
            "Show one AI project with measured results, and be ready to explain every design choice without help",
          ],
        ],
      },
    },
    {
      heading: "For students who want an AI/ML career",
      paragraphs: [
        "Building apps with models and researching or training models are different jobs. The first is a software skill and open to everyone. The second needs more mathematics and is the AI/ML role described on the Roles page.",
      ],
      bullets: [
        "Maths to study: linear algebra, probability and statistics, and a little calculus (gradients).",
        "Learn classical machine learning first: regression, trees, evaluation, overfitting and cross-validation. It teaches you to think about data.",
        "Then deep learning: neural networks, backpropagation, and transformers. Build a tiny model from scratch once.",
        "Read a paper a week with a friend. Start with surveys and well-known papers, and reproduce one result.",
        "Show work: a Kaggle notebook, a reproduced paper, or an honest error analysis of a model you trained.",
      ],
    },
    {
      heading: "AI in interviews and at work",
      bullets: [
        "Many interviews are still run without AI. Practise on paper or in a plain editor so you can think without help.",
        "Some companies now allow or even test AI use. Then they judge how you prompt, check, and fix the output.",
        "Expect questions on your projects: why this model, how you evaluated it, what it costs, and what fails. Prepare honest answers.",
        "At work, you are still responsible for the code you merge. 'The AI wrote it' is never an answer in a review.",
        "Be open about it. Say which parts used AI and how you verified them. Teams trust people who check.",
      ],
    },
    {
      heading: "Common mistakes",
      bullets: [
        "Skipping the basics because 'AI will do it'. You then cannot tell good output from bad.",
        "Building a chatbot wrapper with no clear problem, and no evaluation, and calling it a project.",
        "Starting with agents or fine-tuning before you have a reliable single prompt.",
        "Not checking cost until the bill arrives.",
        "Trusting a confident answer. Test it, run it, and read the docs.",
        "Switching tools every week. Pick one assistant and learn it well.",
        "Hiding your use of AI in coursework or interviews.",
      ],
    },
    {
      heading: "Where to learn",
      links: [
        {
          label: "Anthropic documentation",
          href: "https://docs.anthropic.com",
          note: "The API, prompting guides and examples for building with Claude",
        },
        {
          label: "OpenAI documentation",
          href: "https://platform.openai.com/docs",
          note: "APIs, embeddings and guides for building with GPT models",
        },
        {
          label: "Prompt Engineering Guide",
          href: "https://www.promptingguide.ai",
          note: "Techniques and examples for writing prompts",
        },
        {
          label: "DeepLearning.AI short courses",
          href: "https://www.deeplearning.ai/short-courses/",
          note: "Free, one-hour courses on RAG, agents, evaluation and more",
        },
        {
          label: "Hugging Face Learn",
          href: "https://huggingface.co/learn",
          note: "Free courses on LLMs, transformers and agents",
        },
        {
          label: "Machine Learning Crash Course (Google)",
          href: "https://developers.google.com/machine-learning/crash-course",
          note: "A free, practical start in machine learning",
        },
        {
          label: "fast.ai: Practical Deep Learning",
          href: "https://course.fast.ai",
          note: "A free, code-first course in deep learning",
        },
        {
          label: "Neural Networks: Zero to Hero (Andrej Karpathy)",
          href: "https://karpathy.ai/zero-to-hero.html",
          note: "Build a small language model from scratch",
        },
        {
          label: "AI SDK",
          href: "https://ai-sdk.dev",
          note: "A TypeScript toolkit for chat, streaming, tools and structured output",
        },
        {
          label: "OWASP Top 10 for LLM applications",
          href: "https://owasp.org/www-project-top-10-for-large-language-model-applications/",
          note: "The main security risks when building with models",
        },
      ],
    },
  ],
};
