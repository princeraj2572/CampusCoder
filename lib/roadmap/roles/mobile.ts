import type { Role } from "./types";

export const mobile: Role = {
  slug: "mobile",
  name: "Mobile developer",
  color: "var(--role-pink)",
  tagline: "Build apps people carry in their pocket.",
  job: "You build apps for Android, iPhone or both. You work with touch input, small screens, flaky networks, battery limits and app-store rules, which makes the job different from the web.",
  daily: [
    "Build screens and navigation from designs.",
    "Handle offline use, slow networks and background work.",
    "Test on real devices and several screen sizes.",
    "Ship through the app stores and fix issues from crash reports.",
  ],
  suits:
    "You enjoy polished interfaces, and you like building something you use yourself every day.",
  stack: "Kotlin, Swift, or React Native/Flutter",
  stages: [
    {
      title: "Programming foundations",
      time: "Months 1–2",
      study: [
        "A solid grip on one language: Kotlin, Swift, or TypeScript for React Native.",
        "OOP, collections and async code.",
        "Git, and reading API documentation.",
      ],
      build:
        "A command-line or console app that fetches and prints data from a public API.",
      pitfall:
        "Starting with a UI toolkit before you can write a clean program in the language.",
      ready: [
        "Write classes, collections and async code comfortably.",
        "Explain how a screen is described and drawn in your toolkit.",
        "Run the app on both an emulator and a real device.",
      ],
    },
    {
      title: "First apps",
      time: "Months 3–5",
      study: [
        "Pick one route: native Android (Kotlin and Jetpack Compose), native iOS (Swift and SwiftUI) or cross-platform (React Native with Expo, or Flutter).",
        "Layouts, navigation, lists and forms.",
        "Calling REST APIs and showing the results.",
        "Local storage.",
      ],
      build: "A multi-screen app that talks to an API and saves data on the device.",
      pitfall:
        "Putting all logic in the screen code, so rotating or leaving the screen breaks it.",
      ready: [
        "Build a multi-screen app with navigation.",
        "Keep state alive across a rotation.",
        "Call an API and show loading and error states.",
      ],
    },
    {
      title: "Real-world behaviour",
      time: "Months 6–8",
      study: [
        "App architecture: separating screens, state and data.",
        "Offline-first design and syncing.",
        "Push notifications, permissions, camera and location.",
        "Authentication and keeping tokens safe.",
        "Crash reporting and analytics.",
      ],
      build: "Make your app work offline and add push notifications and sign-in.",
      pitfall: "Testing only on a fast phone with a fast connection.",
      ready: [
        "Make the app useful offline.",
        "Handle a denied permission without crashing.",
        "Profile memory and frame time on a low-end device.",
      ],
    },
    {
      title: "Release",
      time: "Months 9+",
      study: [
        "Performance: list rendering, memory, start-up time.",
        "Testing UI and logic.",
        "App store listings, signing, review guidelines and release builds.",
        "CI for building and testing.",
      ],
      build: "Publish an app to the Play Store or TestFlight and collect feedback.",
      pitfall: "Leaving the store listing, privacy policy and signing until launch day.",
      ready: [
        "Produce a signed release build.",
        "Pass the store's review checklist.",
        "Track crashes after release and fix the top one.",
      ],
    },
  ],
  projects: [
    {
      level: "Starter",
      name: "Expense or habit tracker",
      what: "Several screens, local storage, charts.",
      proves: "You can build and navigate a complete app.",
    },
    {
      level: "Intermediate",
      name: "Campus utility app",
      what: "Timetable, notes or bus times from an API, with notifications and offline use.",
      proves: "You can handle the network and device features.",
    },
    {
      level: "Advanced",
      name: "A published app with real users",
      what: "Sign-in, sync, crash reporting, store listing and several releases.",
      proves: "You can ship and maintain, which is what employers want.",
    },
  ],
  senior: {
    do: [
      "Test on a real, cheap phone. Emulators hide slowness.",
      "Design for no network first, then add the network.",
      "Ask for a permission only when the user needs the feature, and explain why.",
      "Keep a release checklist and follow it.",
      "Read crash reports weekly.",
    ],
    avoid: [
      "Choosing cross-platform or native only because of hype. Choose for the team and the product.",
      "Doing heavy work on the main thread.",
      "Storing tokens in plain text on the device.",
      "Building for the newest phone only.",
      "Ignoring the app store rules until the review fails.",
    ],
  },
  interview: [
    "DSA at medium level.",
    "The app lifecycle, and how state survives rotation or being killed.",
    "Architecture: MVVM or similar, and why.",
    "How you would build an offline-first feed or chat screen.",
    "Walk through your published or demo app.",
  ],
  concepts: [
    {
      name: "The app lifecycle",
      what: "Apps are paused, backgrounded and killed by the OS at any moment, so you must save state and restore it.",
      why: "Users lose work when the lifecycle is ignored.",
    },
    {
      name: "Declarative UI",
      what: "You describe what the screen looks like for a given state (Compose, SwiftUI, Flutter) and the framework updates it.",
      why: "It removes a whole class of out-of-date-screen bugs.",
    },
    {
      name: "Navigation",
      what: "Screens form a stack or a graph with arguments passed between them and a back button that must behave.",
      why: "Broken navigation is the most visible way an app feels unfinished.",
    },
    {
      name: "Offline-first and local storage",
      what: "Keep data on the device (SQLite, Room, Core Data) and sync when the network returns.",
      why: "Mobile networks drop all the time, and users expect the app to still work.",
    },
    {
      name: "Permissions and privacy",
      what: "Ask for camera, location or notifications only when needed, and explain why.",
      why: "Stores reject apps that ask carelessly, and users uninstall them.",
    },
    {
      name: "Performance on small devices",
      what: "Mind memory, battery and frame rate: lazy lists, small images and no work on the main thread.",
      why: "A janky scroll on a cheap phone is what most of your users will see.",
    },
  ],
  links: [
    {
      label: "roadmap.sh: Android",
      href: "https://roadmap.sh/android",
      note: "A visual checklist of topics",
    },
    {
      label: "Android Basics with Compose",
      href: "https://developer.android.com/courses/android-basics-compose/course",
      note: "Google's free beginner course",
    },
    {
      label: "Expo documentation",
      href: "https://docs.expo.dev",
      note: "React Native with the fastest start",
    },
    {
      label: "100 Days of SwiftUI",
      href: "https://www.hackingwithswift.com/100/swiftui",
      note: "A free structured course for iOS",
    },
    {
      label: "YouTube (Global): Philipp Lackner",
      href: "https://www.youtube.com/@PhilippLackner",
      note: "Android and Kotlin, current and practical",
    },
    {
      label: "YouTube (Global): Flutter",
      href: "https://www.youtube.com/@flutterdev",
      note: "Official Flutter tutorials and widget guides",
    },
    {
      label: "YouTube (Global): Programming with Mosh",
      href: "https://www.youtube.com/@programmingwithmosh",
      note: "Clear, structured language and framework courses",
    },
    {
      label: "YouTube (India): Telusko",
      href: "https://www.youtube.com/@Telusko",
      note: "Java and Android fundamentals",
    },
    {
      label: "YouTube (Global): Code With Andrea",
      href: "https://www.youtube.com/@CodeWithAndrea",
      note: "Flutter apps, architecture and state management",
    },
  ],
  tools: [
    "Android Studio, or Xcode on a Mac",
    "A real device for testing",
    "Expo and Expo Go, if you use React Native",
    "Firebase, or an equivalent for auth and push",
    "Postman",
    "A crash reporting tool such as Crashlytics or Sentry",
  ],
  ladder: [
    {
      level: "Junior (0–2 years)",
      focus: "Build screens, wire them to APIs, and fix bugs from crash reports.",
    },
    {
      level: "Mid-level (2–5 years)",
      focus: "Own features and architecture, and handle offline use and performance.",
    },
    {
      level: "Senior (5+ years)",
      focus: "Lead app architecture, release process and quality for the team.",
    },
    {
      level: "Staff and beyond",
      focus: "Set mobile strategy across apps and platforms.",
    },
  ],
  first90: [
    {
      days: "Days 1–30",
      goal: "Build and run the app on a real device, fix small bugs, and learn the navigation structure.",
    },
    {
      days: "Days 31–60",
      goal: "Ship one screen or flow with tests and handle its offline behaviour.",
    },
    {
      days: "Days 61–90",
      goal: "Find a crash or slow screen from the reports and fix it.",
    },
  ],
  week: [
    { when: "Mon, Wed", what: "Learn one mobile topic and add it to your app (1 hour)" },
    { when: "Tue, Thu", what: "DSA: two problems and a revision (45 minutes)" },
    {
      when: "Fri",
      what: "Study one well-known app's behaviour and rebuild a screen (45 minutes)",
    },
    { when: "Weekend", what: "Build: two hours on your app, test on a real phone" },
  ],
  mistakes: [
    "Only testing on a fast emulator.",
    "Blocking the main thread with network or database work.",
    "Asking for every permission on the first launch.",
    "Not handling screen rotation, small screens or the keyboard.",
    "Ignoring the store's review guidelines until the app is rejected.",
  ],
  ask: [
    "How do you keep release quality up when you cannot instantly update the app?",
    "How do you support old phones and old operating systems?",
    "What do you log to understand a crash?",
  ],
  where: [
    {
      type: "Consumer app companies",
      what: "Food, travel, payments and social apps depend on mobile.",
    },
    { type: "Fintech and banks", what: "Secure apps used by millions." },
    { type: "Startups", what: "Mobile-first products built by tiny teams." },
    { type: "Agencies", what: "Build apps for many brands." },
  ],
  myths: [
    {
      myth: "Cross-platform makes native skills useless.",
      truth: "Knowing the native platform helps you solve problems the framework hides.",
    },
    {
      myth: "Mobile is only for people who like design.",
      truth: "Performance, offline sync and architecture are large parts of the job.",
    },
    {
      myth: "Once published, an app is finished.",
      truth: "Releases, crashes and operating-system updates never stop.",
    },
  ],
};
