import type { Role } from "./types";

export const game: Role = {
  slug: "game",
  name: "Game developer",
  color: "var(--tier-grey)",
  tagline: "Build the interactive worlds that people play.",
  job: "You write the code that makes games run: movement, physics, enemy behaviour, menus, saving, and the many small systems that make a game feel good. A game must run smoothly 60 times a second, so performance and clear structure matter as much as ideas.",
  daily: [
    "Implement gameplay features in Unity (C#) or Unreal (C++).",
    "Tune how the game feels: jump height, camera, controls and timing.",
    "Profile and fix frame-rate drops.",
    "Work with artists and designers on tools and content pipelines.",
    "Fix bugs found in play tests.",
  ],
  suits:
    "You love games and finishing things, you enjoy maths and logic, and you are happy iterating until it feels right.",
  stack: "C# with Unity, C++ with Unreal, Godot, Git LFS",
  stages: [
    {
      title: "Programming and game maths",
      time: "Months 1–2",
      study: [
        "C# (for Unity) or C++ (for Unreal) with OOP basics.",
        "Vectors, dot and cross products, and basic geometry.",
        "The game loop: input, update, render, delta time.",
        "Git, and keeping large assets out of normal Git.",
      ],
      build:
        "A tiny 2D game with no engine, such as Pong or Snake, using a simple graphics library.",
    },
    {
      title: "An engine and your first games",
      time: "Months 3–5",
      study: [
        "Unity or Godot: scenes, objects, components, prefabs.",
        "2D and 3D movement, collision and physics.",
        "UI, audio, animation and particle effects.",
        "Saving and loading data.",
      ],
      build:
        "A complete 2D game with a start screen, levels, sound, a win and a lose state.",
    },
    {
      title: "Systems and polish",
      time: "Months 6–8",
      study: [
        "Enemy AI: state machines, pathfinding with A* and behaviour trees.",
        "Design patterns for games: components, object pooling, events.",
        "Profiling, memory and optimising frame time.",
        "Game feel: screen shake, easing, feedback and sound.",
      ],
      build:
        "Add AI enemies and object pooling to your game, and hold 60 frames a second on an older laptop.",
    },
    {
      title: "Ship it",
      time: "Months 9+",
      study: [
        "Multiplayer basics: client and server, lag and synchronisation.",
        "Shaders and rendering basics.",
        "Builds for several platforms, and releasing on itch.io or Steam.",
        "Game jams: finishing a game in 48 hours.",
      ],
      build: "Publish a game on itch.io and take feedback from real players.",
    },
  ],
  projects: [
    {
      level: "Starter",
      name: "Classic arcade clone",
      what: "Pong, Snake or Flappy Bird, finished, with score and restart.",
      proves: "You can finish a game loop from end to end.",
    },
    {
      level: "Intermediate",
      name: "Platformer or top-down shooter",
      what: "Levels, enemies with simple AI, sound, a save system and a menu.",
      proves: "You can build several systems that work together.",
    },
    {
      level: "Advanced",
      name: "Published game or game-jam entry",
      what: "A polished build with pathfinding or multiplayer, released and playable by strangers.",
      proves: "You can ship, which is what studios look for.",
    },
  ],
  senior: {
    do: [
      "Finish small games. Ten finished tiny games teach more than one unfinished epic.",
      "Make it playable first, then pretty. A grey-box prototype shows if it is fun.",
      "Join game jams. A deadline forces you to cut and finish.",
      "Profile before you optimise.",
      "Let other people play, and watch without telling them what to do.",
    ],
    avoid: [
      "Starting with a huge multiplayer RPG.",
      "Copying a tutorial game and calling it your design.",
      "Spending months on assets before the game is fun.",
      "Allocating memory every frame, which causes stutter.",
      "Ignoring the business side: the market is crowded and finishing counts.",
    ],
  },
  interview: [
    "C++ or C# fundamentals, and DSA at a medium level.",
    "Vector maths questions, such as finding the angle or distance between objects.",
    "Explain the game loop and how you would make movement frame-rate independent.",
    "Design a system, such as an inventory or an enemy AI.",
    "Show a playable build and explain a technical problem you solved in it.",
  ],
  links: [
    {
      label: "Unity Learn",
      href: "https://learn.unity.com",
      note: "Free official courses and pathways",
    },
    {
      label: "Godot documentation",
      href: "https://docs.godotengine.org",
      note: "A free, open-source engine with a friendly start",
    },
    {
      label: "itch.io game jams",
      href: "https://itch.io/jams",
      note: "Find a jam and finish a game",
    },
    {
      label: "Game Programming Patterns",
      href: "https://gameprogrammingpatterns.com",
      note: "A free book on structuring game code",
    },
  ],
  tools: [
    "Unity, Godot or Unreal Engine",
    "Visual Studio or Rider",
    "Git and Git LFS",
    "Aseprite or Blender for simple art",
    "The engine's profiler",
    "itch.io for publishing",
  ],
  ladder: [
    {
      level: "Junior (0–2 years)",
      focus: "Implement features and fix bugs inside an existing game.",
    },
    {
      level: "Mid-level (2–5 years)",
      focus: "Own gameplay systems, such as combat, inventory or AI.",
    },
    {
      level: "Senior (5+ years)",
      focus: "Design the architecture, lead a feature team and tune performance.",
    },
    {
      level: "Staff and beyond",
      focus: "Lead technical direction, engines and tools across projects.",
    },
  ],
  first90: [
    {
      days: "Days 1–30",
      goal: "Build the project, play the game a lot and fix small bugs.",
    },
    {
      days: "Days 31–60",
      goal: "Implement a small gameplay feature with the designers and tune how it feels.",
    },
    { days: "Days 61–90", goal: "Find and fix a frame-rate problem using the profiler." },
  ],
  week: [
    {
      when: "Mon, Wed",
      what: "Learn one engine feature or maths topic and add it to your game (1 hour)",
    },
    {
      when: "Tue, Thu",
      what: "DSA, with pathfinding and geometry questions (45 minutes)",
    },
    { when: "Fri", what: "Rebuild one mechanic from a game you like (45 minutes)" },
    { when: "Weekend", what: "Build: three hours on your game, or a game jam" },
  ],
  mistakes: [
    "Starting a huge project and never finishing it.",
    "Putting all logic in one giant script.",
    "Spawning and destroying objects every frame.",
    "Tuning by guesswork instead of testing with real players.",
    "Not building for the target device until the end.",
  ],
  ask: [
    "How do you decide a feature is fun enough to keep?",
    "How do you keep the game running at a steady frame rate?",
    "How do programmers and designers work together here?",
  ],
  where: [
    { type: "Game studios", what: "Gameplay, tools and engine programming." },
    { type: "Mobile game companies", what: "Casual and free-to-play titles." },
    {
      type: "Simulation and training",
      what: "Games engines for education, defence and architecture.",
    },
    { type: "Indie and freelance", what: "Build and sell your own games." },
  ],
  myths: [
    {
      myth: "Game development is mostly playing games.",
      truth: "It is long, careful engineering with tight deadlines.",
    },
    {
      myth: "You need to be an artist too.",
      truth: "Programmers focus on code, though basic art helps for prototypes.",
    },
    {
      myth: "Game skills only lead to game jobs.",
      truth: "Performance, maths and real-time systems transfer to many industries.",
    },
  ],
};
