import type { BaseRole } from "./roles";

export const qa: BaseRole = {
  slug: "qa",
  name: "QA / test automation engineer",
  color: "var(--role-lime)",
  tagline: "Make sure the software works before users find out that it does not.",
  job: "You find problems early. You plan what to test, write automated tests that run on every change, explore the product like a curious user would, and tell the team clearly what is broken and how to reproduce it. Good testers save a company from expensive failures.",
  daily: [
    "Read a new feature's requirements and decide what could go wrong.",
    "Write and maintain automated tests for the interface and the API.",
    "Explore the product by hand to find problems a script would miss.",
    "Report bugs with exact steps, evidence and the expected result.",
    "Keep the test pipeline fast and reliable, and fix flaky tests.",
  ],
  suits:
    "You notice details, you like asking 'what if?', and you enjoy proving a system wrong in a constructive way.",
  stack: "Python or JavaScript, Playwright or Selenium, Postman, SQL, GitHub Actions",
  stages: [
    {
      title: "Testing fundamentals",
      time: "Months 1–2",
      study: [
        "Testing levels: unit, integration, system and acceptance.",
        "Test design: equivalence classes, boundary values and decision tables.",
        "How to write a clear bug report and a test case.",
        "Basic programming in Python or JavaScript, plus SQL.",
      ],
      build: "A test plan and 30 written test cases for a website you use every day.",
    },
    {
      title: "API and interface automation",
      time: "Months 3–5",
      study: [
        "Testing REST APIs with Postman, then with code.",
        "Browser automation with Playwright (or Selenium).",
        "A test framework: pytest, or Vitest and Jest.",
        "Page objects and keeping tests easy to read and maintain.",
      ],
      build: "An automated suite for a demo shop: sign-in, search, cart and checkout.",
    },
    {
      title: "Quality in the pipeline",
      time: "Months 6–8",
      study: [
        "Running tests in GitHub Actions on every pull request.",
        "Flaky tests: why they happen and how to remove them.",
        "Test data, mocks and test environments.",
        "Reports, and metrics that matter, such as escaped bugs and test run time.",
      ],
      build:
        "Plug the suite into CI with a report, and make it run in under five minutes.",
    },
    {
      title: "Beyond functional testing",
      time: "Months 9+",
      study: [
        "Performance testing with k6 or JMeter.",
        "Accessibility and security testing basics.",
        "Mobile app testing and cross-browser testing.",
        "Contract testing and testing in production safely.",
      ],
      build: "A load test with a clear report on where the app slows down.",
    },
  ],
  projects: [
    {
      level: "Starter",
      name: "Manual test plan and bug reports",
      what: "Test a real app, write 30 cases and file ten well-written bug reports.",
      proves: "You think like a tester and write clearly.",
    },
    {
      level: "Intermediate",
      name: "Automated suite for a demo shop",
      what: "UI and API tests, readable structure, run in CI with a report.",
      proves: "You can build and maintain automation.",
    },
    {
      level: "Advanced",
      name: "Test platform with performance checks",
      what: "Parallel runs, test data setup, a load test and a dashboard of failures.",
      proves: "You can improve the whole quality process, not just write scripts.",
    },
  ],
  senior: {
    do: [
      "Learn to code properly. The best testers are strong developers who choose to protect quality.",
      "Test the risky parts first, and automate what is run often.",
      "Write bug reports a developer can reproduce in one minute.",
      "Fix flaky tests the day they appear, or the team will stop trusting the suite.",
      "Work with developers early, when a requirement is still cheap to change.",
    ],
    avoid: [
      "Automating everything, including tests that rarely run and often change.",
      "Writing long end-to-end tests when a small API test would do.",
      "Using fixed sleeps instead of waiting for a condition.",
      "Treating testing as a final stage after development ends.",
      "Blaming developers. You are on the same team.",
    ],
  },
  interview: [
    "Test a simple object, such as a pen, a login page or an elevator, and explain your approach.",
    "Write a test case and a bug report from a given scenario.",
    "Coding at an easy to medium level, plus SQL.",
    "Explain how you would design an automation framework and avoid flaky tests.",
    "Differences between severity and priority, regression and retesting, smoke and sanity tests.",
  ],
  links: [
    {
      label: "Playwright documentation",
      href: "https://playwright.dev/docs/intro",
      note: "Modern browser automation, with good guides",
    },
    {
      label: "Test Automation University",
      href: "https://testautomationu.com",
      note: "Free courses on automation tools and techniques",
    },
    {
      label: "Ministry of Testing",
      href: "https://www.ministryoftesting.com",
      note: "Articles and a community for testers",
    },
    {
      label: "k6 documentation",
      href: "https://grafana.com/docs/k6/latest/",
      note: "Performance testing with code",
    },
  ],
};

export const embedded: BaseRole = {
  slug: "embedded",
  name: "Embedded / IoT engineer",
  color: "var(--role-yellow)",
  tagline: "Write the software that runs inside devices.",
  job: "You program the small computers inside things: sensors, watches, cars, routers, medical devices and smart-home gadgets. The code must work with tight memory, little power and real hardware that does not always behave. Your software touches the physical world.",
  daily: [
    "Write C or C++ firmware that reads sensors and controls hardware.",
    "Debug with oscilloscopes, logic analysers and serial logs.",
    "Read datasheets and schematics to understand what a chip really does.",
    "Add communication over Wi-Fi, Bluetooth, or wired protocols.",
    "Test on real boards and measure power use and timing.",
  ],
  suits:
    "You like electronics and tinkering, you are patient with hardware that fails in odd ways, and you enjoy seeing code move something real.",
  stack: "C, C++, microcontrollers (ESP32, STM32, Arduino), RTOS, I2C, SPI, UART",
  stages: [
    {
      title: "C and electronics basics",
      time: "Months 1–3",
      study: [
        "C in depth: pointers, memory, bit manipulation and structs.",
        "Digital electronics: voltage, current, resistors, transistors and logic levels.",
        "Reading a datasheet and a pinout.",
        "Arduino or ESP32 basics: GPIO, PWM, analogue reading.",
      ],
      build:
        "A blinking LED, then a button-controlled light with debouncing, then a temperature display.",
    },
    {
      title: "Communication and sensors",
      time: "Months 4–6",
      study: [
        "UART, I2C and SPI, and when to use each.",
        "Interrupts and timers.",
        "Reading real sensors and filtering noisy data.",
        "Wi-Fi and Bluetooth, with MQTT for sending data.",
      ],
      build: "A weather station that sends readings to a dashboard over Wi-Fi.",
    },
    {
      title: "Real-time and professional firmware",
      time: "Months 7–9",
      study: [
        "An RTOS such as FreeRTOS: tasks, queues, semaphores and priorities.",
        "State machines and clean firmware structure.",
        "Debugging with a hardware debugger, JTAG or SWD, and a logic analyser.",
        "Low-power design and watchdog timers.",
      ],
      build: "A multi-task device with a state machine, a watchdog and a low-power mode.",
    },
    {
      title: "Product-level skills",
      time: "Months 10+",
      study: [
        "Bootloaders and safe over-the-air updates.",
        "Basic PCB design and schematics with KiCad.",
        "Unit testing firmware and hardware-in-the-loop testing.",
        "Security: secure boot, encrypted storage and safe defaults.",
      ],
      build:
        "A complete device with a custom board, firmware updates and a written test plan.",
    },
  ],
  projects: [
    {
      level: "Starter",
      name: "Smart plant monitor",
      what: "A soil sensor, an LED alert and readings on a small display.",
      proves: "You can connect sensors to code reliably.",
    },
    {
      level: "Intermediate",
      name: "IoT weather or air-quality station",
      what: "Several sensors, Wi-Fi, MQTT, a dashboard and sleeping between readings.",
      proves: "You can build a connected device that runs for weeks.",
    },
    {
      level: "Advanced",
      name: "RTOS-based device with updates",
      what: "FreeRTOS tasks, a state machine, a bootloader and over-the-air updates, on your own PCB.",
      proves: "You understand how real products are built and maintained.",
    },
  ],
  senior: {
    do: [
      "Read the datasheet first. The answer is almost always in it.",
      "Test on the real hardware early and often. Simulators hide timing problems.",
      "Keep interrupt handlers tiny, and do the work outside them.",
      "Add a watchdog and a safe state. Devices must recover on their own.",
      "Log over serial from the first day.",
    ],
    avoid: [
      "Using delay() everywhere instead of timers and state machines.",
      "Allocating memory dynamically in a long-running device without a plan.",
      "Ignoring the power supply. Many 'software' bugs are electrical.",
      "Copying library code you cannot debug.",
      "Shipping without a way to update the device.",
    ],
  },
  interview: [
    "C questions: pointers, volatile, const, bit manipulation, memory layout.",
    "Explain interrupts, DMA, and the difference between polling and interrupts.",
    "Compare UART, I2C and SPI.",
    "Design a state machine for a simple device, such as a washing machine.",
    "Walk through a hardware bug you debugged and how you found it.",
  ],
  links: [
    {
      label: "Arduino documentation",
      href: "https://docs.arduino.cc",
      note: "Tutorials for your first sensors and circuits",
    },
    {
      label: "FreeRTOS documentation",
      href: "https://www.freertos.org/Documentation/00-Overview",
      note: "The most common real-time operating system",
    },
    {
      label: "ESP-IDF programming guide",
      href: "https://docs.espressif.com/projects/esp-idf/en/latest/",
      note: "Professional development for the ESP32",
    },
    {
      label: "KiCad",
      href: "https://www.kicad.org",
      note: "Free tool for schematics and circuit boards",
    },
  ],
};

export const game: BaseRole = {
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
};
