import type { Role } from "./types";

export const embedded: Role = {
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
  concepts: [
    {
      name: "Microcontrollers and registers",
      what: "A small chip with memory, a CPU and peripherals you control by reading and writing hardware registers.",
      why: "It is what your code actually talks to.",
    },
    {
      name: "GPIO, ADC and PWM",
      what: "Read and write digital pins, convert analogue voltages to numbers and fake analogue output with pulses.",
      why: "These three cover most simple sensors and actuators.",
    },
    {
      name: "Interrupts",
      what: "Hardware signals that pause the main code to run a short handler right away.",
      why: "They let a device react quickly without polling constantly.",
    },
    {
      name: "Communication protocols",
      what: "UART, I2C and SPI let chips and sensors exchange data over a few wires.",
      why: "Almost every component you add speaks one of them.",
    },
    {
      name: "Memory and C pointers",
      what: "Fixed RAM and flash, no garbage collector and direct access through pointers.",
      why: "A small mistake corrupts memory silently.",
    },
    {
      name: "RTOS basics",
      what: "A real-time operating system schedules tasks with fixed priorities and deadlines.",
      why: "It keeps complex firmware predictable.",
    },
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
    {
      label: "YouTube (Global): Ben Eater",
      href: "https://www.youtube.com/@BenEater",
      note: "Build a computer from chips to learn how hardware works",
    },
    {
      label: "YouTube (Global): Phil's Lab",
      href: "https://www.youtube.com/@PhilsLab",
      note: "PCB design and embedded firmware",
    },
    {
      label: "YouTube (Global): Low Level Learning",
      href: "https://www.youtube.com/@LowLevelTV",
      note: "C, systems and low-level programming",
    },
    {
      label: "YouTube (India): Gate Smashers",
      href: "https://www.youtube.com/@GateSmashers",
      note: "Computer architecture and OS basics",
    },
    {
      label: "YouTube (Global): Jacob Sorber",
      href: "https://www.youtube.com/@JacobSorber",
      note: "C and embedded systems programming",
    },
  ],
  tools: [
    "An ESP32 or STM32 board and an Arduino",
    "A multimeter and a breadboard",
    "A logic analyser (even a cheap one)",
    "PlatformIO or ESP-IDF",
    "KiCad",
    "A serial terminal",
  ],
  ladder: [
    {
      level: "Junior (0–2 years)",
      focus: "Write drivers and small features, and learn to debug on real hardware.",
    },
    {
      level: "Mid-level (2–5 years)",
      focus: "Own a subsystem, such as communication or power management.",
    },
    {
      level: "Senior (5+ years)",
      focus:
        "Design firmware architecture, choose parts and lead bring-up of new boards.",
    },
    {
      level: "Staff and beyond",
      focus:
        "Set the technical direction for a product line and its hardware and software together.",
    },
  ],
  first90: [
    {
      days: "Days 1–30",
      goal: "Build the firmware, flash a board and read through the existing drivers.",
    },
    {
      days: "Days 31–60",
      goal: "Fix hardware-related bugs using the debugger and a logic analyser.",
    },
    {
      days: "Days 61–90",
      goal: "Own a small feature and test it on real hardware, including a long-running test.",
    },
  ],
  week: [
    {
      when: "Mon, Wed",
      what: "C practice and one electronics topic with a small experiment (1 hour)",
    },
    { when: "Tue, Thu", what: "DSA in C or C++ (45 minutes)" },
    {
      when: "Fri",
      what: "Read one datasheet section and write a driver from it (45 minutes)",
    },
    { when: "Weekend", what: "Build: two hours on your hardware project" },
  ],
  mistakes: [
    "Skipping the datasheet and copying a library.",
    "Doing heavy work inside an interrupt.",
    "Blaming the code when the wiring or power is wrong.",
    "Not using a watchdog.",
    "Forgetting that variables shared with interrupts need to be volatile.",
  ],
  ask: [
    "What is the hardest bug you have debugged, and how did you find it?",
    "How do you test firmware without the real device?",
    "How do you make updates safe when the device is in the field?",
  ],
  where: [
    { type: "Automotive", what: "Engine control, infotainment and driver assistance." },
    { type: "Consumer electronics", what: "Wearables, speakers and smart-home devices." },
    {
      type: "Medical and industrial",
      what: "Reliable devices with strict safety rules.",
    },
    { type: "Telecom and networking", what: "Routers and radio equipment." },
  ],
  myths: [
    {
      myth: "Embedded means only Arduino.",
      truth: "Arduino is a start. Professional work uses C, RTOS and custom boards.",
    },
    {
      myth: "You must be an electronics graduate.",
      truth: "Many software people succeed, if they learn electronics basics.",
    },
    {
      myth: "It is a dying field.",
      truth: "Every connected device needs firmware, and demand keeps growing.",
    },
  ],
};
