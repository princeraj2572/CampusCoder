import type { Role } from "./types";

export const aiMl: Role = {
  slug: "ai-ml",
  name: "AI / ML engineer",
  color: "var(--board-contests)",
  tagline: "Train, evaluate and ship models, and build products on top of them.",
  job: "You turn data into working predictions or language features. Much of the job is not the model: it is cleaning data, measuring whether the model is actually good, and getting it into a product that does not break.",
  daily: [
    "Clean and explore data, and find where it is wrong or biased.",
    "Train, tune and compare models, or design prompts and retrieval for language models.",
    "Build evaluation sets and measure quality honestly.",
    "Package a model behind an API and monitor it.",
    "Explain results to people who are not specialists.",
  ],
  suits:
    "You enjoy maths, experiments and being wrong several times before being right. You are careful about evidence.",
  stack: "Python, NumPy, pandas, PyTorch, scikit-learn, SQL",
  stages: [
    {
      title: "Programming and maths",
      time: "Months 1–3",
      study: [
        "Python, including NumPy and pandas.",
        "Linear algebra: vectors, matrices, dot products.",
        "Probability and statistics: distributions, mean and variance, bias, sampling.",
        "Calculus essentials: derivatives and the chain rule.",
        "Plotting with matplotlib.",
      ],
      build: "Analyse a real dataset and write up three findings with charts.",
      pitfall: "Skipping the maths and then not knowing why a model fails.",
      ready: [
        "Explain mean, variance and a gradient in plain words.",
        "Manipulate data with NumPy and pandas fluently.",
        "Plot a distribution and spot an outlier.",
      ],
    },
    {
      title: "Classical machine learning",
      time: "Months 4–6",
      study: [
        "Regression, classification, trees, and ensembles.",
        "Train, validation and test splits; cross-validation; overfitting.",
        "Metrics: accuracy, precision, recall, F1, ROC-AUC, and why accuracy misleads.",
        "Feature engineering with scikit-learn.",
      ],
      build:
        "A model on a Kaggle dataset, with a clear metric and an honest error analysis.",
      pitfall: "Judging a model on the data it trained on.",
      ready: [
        "Split data correctly and explain why.",
        "Choose a metric that matches the problem.",
        "Compare two models fairly with cross-validation.",
      ],
    },
    {
      title: "Deep learning and language models",
      time: "Months 7–10",
      study: [
        "Neural networks, backpropagation, and training with PyTorch.",
        "CNNs for images and transformers for text.",
        "Fine-tuning and using pretrained models.",
        "Working with language-model APIs: prompting, structured output, retrieval-augmented generation and evaluation.",
      ],
      build:
        "A retrieval-based question-answering app over a document set, with a test set to measure quality.",
      pitfall: "Fine-tuning a huge model when a better prompt or better data would do.",
      ready: [
        "Train a small network from scratch and watch the loss fall.",
        "Explain tokens, embeddings and attention simply.",
        "Build a retrieval-based question answerer and test where it fails.",
      ],
    },
    {
      title: "Production",
      time: "Months 11+",
      study: [
        "Serving a model through an API, and batching.",
        "Experiment tracking and data versioning.",
        "Monitoring for drift and bad outputs.",
        "Cost and latency trade-offs.",
        "Safety, privacy and bias.",
      ],
      build:
        "Deploy your model or app with logging, an evaluation script and a short model card.",
      pitfall: "Shipping a notebook instead of a service someone can call and monitor.",
      ready: [
        "Serve a model behind an API with tests.",
        "Monitor inputs and outputs for drift.",
        "Explain a model's failures to a non-technical person.",
      ],
    },
  ],
  projects: [
    {
      level: "Starter",
      name: "Exploratory data analysis",
      what: "A cleaned dataset, charts, a baseline model and an honest note on its limits.",
      proves: "You can handle data and not oversell results.",
    },
    {
      level: "Intermediate",
      name: "Image or text classifier with a demo",
      what: "Transfer learning, a proper evaluation, a small web demo.",
      proves: "You can train, measure and present a model.",
    },
    {
      level: "Advanced",
      name: "Retrieval-based assistant with evaluation",
      what: "Documents, chunking, retrieval, a prompt, an evaluation set and cost tracking.",
      proves: "You can build something useful and know whether it works.",
    },
  ],
  senior: {
    do: [
      "Start with a dumb baseline. If a simple rule gets 90%, you need a reason to use a model.",
      "Hold out a test set and do not touch it until the end.",
      "Look at your data and your errors by hand. Most improvements come from there.",
      "Write the evaluation before you build the feature.",
      "Learn the maths behind one model deeply, not the name of fifty.",
    ],
    avoid: [
      "Quoting accuracy on an imbalanced dataset.",
      "Leaking test data into training.",
      "Copying notebooks without understanding each cell.",
      "Using a huge model where a small one would do.",
      "Shipping a demo as if it were a product.",
    ],
  },
  interview: [
    "Python and DSA at an easy to medium level.",
    "Statistics and ML fundamentals: overfitting, bias and variance, regularisation, metrics.",
    "Walk through a project: data, baseline, results and mistakes.",
    "SQL and data manipulation questions.",
    "How you would evaluate a language-model feature.",
  ],
  concepts: [
    {
      name: "Train, validation and test sets",
      what: "Split data so the model learns on one part, you tune on another and you judge it on a third it has never seen.",
      why: "Without it you measure memory, not learning, and ship a model that fails on real data.",
    },
    {
      name: "Overfitting",
      what: "A model that fits its training data too closely and fails on new data.",
      why: "It is the main way models look good in a notebook and bad in production.",
    },
    {
      name: "Loss function and gradient descent",
      what: "The loss scores how wrong the model is. Gradient descent nudges the weights to make it smaller, step by step.",
      why: "This one loop is how nearly every neural network learns.",
    },
    {
      name: "Features and data quality",
      what: "The inputs you give a model, and whether they are clean, balanced and relevant.",
      why: "Better data usually beats a fancier model.",
    },
    {
      name: "Evaluation metrics",
      what: "Accuracy, precision, recall, F1 and AUC each answer a different question about the errors.",
      why: "On rare events such as fraud, accuracy alone can be 99% and useless.",
    },
    {
      name: "Embeddings and transformers",
      what: "Embeddings turn text or images into vectors of numbers where similar things sit close together. Transformers use attention to relate every part of the input to every other.",
      why: "They sit behind modern language and vision models and search.",
    },
  ],
  links: [
    {
      label: "Machine Learning Specialization",
      href: "https://www.coursera.org/specializations/machine-learning-introduction",
      note: "Andrew Ng's course, a gentle start",
    },
    {
      label: "fast.ai Practical Deep Learning",
      href: "https://course.fast.ai",
      note: "A free, project-first course",
    },
    {
      label: "Kaggle Learn",
      href: "https://www.kaggle.com/learn",
      note: "Short courses and datasets to practise on",
    },
    {
      label: "roadmap.sh: AI and Data Scientist",
      href: "https://roadmap.sh/ai-data-scientist",
      note: "A visual checklist of topics",
    },
    {
      label: "YouTube (Global): Andrej Karpathy",
      href: "https://www.youtube.com/@AndrejKarpathy",
      note: "Build neural networks and LLMs from scratch",
    },
    {
      label: "YouTube (Global): 3Blue1Brown",
      href: "https://www.youtube.com/@3blue1brown",
      note: "Visual maths behind neural networks",
    },
    {
      label: "YouTube (Global): StatQuest",
      href: "https://www.youtube.com/@statquest",
      note: "Statistics and ML explained step by step",
    },
    {
      label: "YouTube (India): Krish Naik",
      href: "https://www.youtube.com/@krishnaik06",
      note: "Data science and ML projects",
    },
    {
      label: "YouTube (India): CampusX",
      href: "https://www.youtube.com/@campusx-official",
      note: "Machine learning in depth, in Hindi",
    },
    {
      label: "YouTube (India): codebasics",
      href: "https://www.youtube.com/@codebasics",
      note: "Practical data science and ML projects",
    },
    {
      label: "YouTube (Global): DeepLearning.AI",
      href: "https://www.youtube.com/@Deeplearningai",
      note: "Andrew Ng's courses and talks",
    },
    {
      label: "YouTube (Global): sentdex",
      href: "https://www.youtube.com/@sentdex",
      note: "Python and neural networks by example",
    },
  ],
  tools: [
    "Python with Jupyter or VS Code notebooks",
    "NumPy, pandas, scikit-learn, matplotlib",
    "PyTorch",
    "Weights & Biases or MLflow for experiment tracking",
    "Hugging Face for models and datasets",
    "FastAPI for serving",
  ],
  ladder: [
    {
      level: "Junior (0–2 years)",
      focus: "Clean data, run experiments, and reproduce results with guidance.",
    },
    {
      level: "Mid-level (2–5 years)",
      focus: "Own a model or feature, design evaluations, and ship it.",
    },
    {
      level: "Senior (5+ years)",
      focus:
        "Choose approaches, set quality bars, and lead projects from idea to production.",
    },
    {
      level: "Staff and beyond",
      focus: "Define the technical strategy for data and models across teams.",
    },
  ],
  first90: [
    {
      days: "Days 1–30",
      goal: "Learn the data, reproduce the current baseline, and read the evaluation code.",
    },
    {
      days: "Days 31–60",
      goal: "Run a clean experiment that beats a baseline, with notes anyone can repeat.",
    },
    {
      days: "Days 61–90",
      goal: "Ship an improvement behind a flag and track its effect in production.",
    },
  ],
  week: [
    { when: "Mon, Wed", what: "Maths or an ML lesson plus exercises (1 hour)" },
    { when: "Tue, Thu", what: "DSA: two problems and a SQL query (45 minutes)" },
    { when: "Fri", what: "Read a paper summary and reimplement one idea (45 minutes)" },
    { when: "Weekend", what: "Build: three hours on a Kaggle task or your project" },
  ],
  mistakes: [
    "Tuning the model before looking at the data.",
    "Reporting a number from a single lucky run.",
    "Splitting data randomly when it should be split by time or user.",
    "Not writing down which data and settings produced a result.",
    "Treating a model's confident answer as a true answer.",
  ],
  ask: [
    "How do you decide a model is good enough to ship?",
    "How do you find out that a model has quietly got worse?",
    "How do you handle labelling and bad data?",
  ],
  where: [
    {
      type: "Product companies",
      what: "Recommendations, search, fraud detection and assistants.",
    },
    { type: "AI startups", what: "Build products on top of language and vision models." },
    { type: "Research labs", what: "Usually need a master's degree or a PhD." },
    {
      type: "Healthcare and finance",
      what: "Predictive models with strict quality rules.",
    },
  ],
  myths: [
    {
      myth: "AI jobs are mostly about training models.",
      truth: "Most of the work is data, evaluation, and getting models into products.",
    },
    {
      myth: "You need a PhD.",
      truth:
        "Research roles often do, but applied engineering roles value skills and projects.",
    },
    {
      myth: "Calling an API is enough.",
      truth: "Employers want people who can measure quality and handle failures.",
    },
  ],
};
