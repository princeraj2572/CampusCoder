import type { RoadmapPage } from "./types";

export const systemDesign: RoadmapPage = {
  slug: "system-design",
  label: "System design",
  title: "System design basics",
  intro:
    "System design asks how you would build something that many people use: what the parts are, how they talk, and what breaks first. Start after you are comfortable with DSA and databases. For freshers the bar is lower: show clear thinking, not a perfect architecture.",
  sections: [
    {
      heading: "When it matters",
      bullets: [
        "Freshers: some product companies ask a light design question, such as a URL shortener or a parking lot. Many ask only low-level design (classes and objects).",
        "1–3 years of experience: expect one full design round.",
        "Senior roles: design is the main round.",
        "Even when it is not asked, it makes you a better developer, because you stop writing code that cannot scale.",
      ],
    },
    {
      heading: "A framework for any design question",
      steps: [
        "Clarify the requirements. What must it do (functional), and how well (speed, availability, scale)? Ask who the users are and how many.",
        "Estimate the scale: requests per second, data stored per day, read-to-write ratio. Rough numbers are enough.",
        "Define the API: the main endpoints and what they take and return.",
        "Sketch the data model: the main entities and which database fits.",
        "Draw the high-level design: clients, load balancer, services, database, cache, queue.",
        "Go deeper on one or two parts the interviewer cares about, such as how to generate unique IDs or how to fan out a feed.",
        "Discuss bottlenecks and trade-offs: single points of failure, hot keys, consistency versus availability.",
        "Summarise, and say what you would improve with more time.",
      ],
    },
    {
      heading: "The building blocks",
      table: {
        head: ["Block", "What it does", "Reach for it when"],
        rows: [
          [
            "Load balancer",
            "Spreads requests over several servers and drops unhealthy ones",
            "One server cannot handle the traffic, or you want no single point of failure",
          ],
          [
            "Cache (Redis, Memcached)",
            "Keeps hot data in memory for quick reads",
            "Reads are far more frequent than writes, or a query is slow",
          ],
          [
            "CDN",
            "Serves static files from servers near the user",
            "Images, videos and scripts are slow for faraway users",
          ],
          [
            "Relational database",
            "Stores structured data with transactions and joins",
            "You need consistency, relations and flexible queries",
          ],
          [
            "NoSQL (document, key-value, wide-column)",
            "Scales out for simple access patterns",
            "Huge volume, a flexible schema, or lookups by key",
          ],
          [
            "Replication",
            "Copies data to other servers",
            "You want more read capacity or failover",
          ],
          [
            "Sharding",
            "Splits data over servers by a key",
            "One database cannot hold or serve all the data",
          ],
          [
            "Message queue (Kafka, RabbitMQ, SQS)",
            "Holds work to be done later, decoupling producers and consumers",
            "Spikes, slow tasks such as emails, or several consumers of an event",
          ],
          [
            "API gateway",
            "A single entry point for authentication, routing and rate limits",
            "Many services sit behind one public API",
          ],
          [
            "Object storage (S3)",
            "Cheap storage for files and large blobs",
            "Images, videos, backups and logs",
          ],
          [
            "Search index (Elasticsearch)",
            "Full-text and fuzzy search",
            "SQL LIKE queries become slow or too limited",
          ],
        ],
      },
    },
    {
      heading: "Numbers worth remembering",
      table: {
        head: ["Quantity", "Rough value"],
        rows: [
          ["Seconds in a day", "About 100,000 (86,400)"],
          ["1 million requests a day", "About 12 requests per second on average"],
          ["Memory read", "About 100 nanoseconds"],
          ["SSD read", "About 100 microseconds"],
          ["Network round trip in one data centre", "About 0.5 milliseconds"],
          ["Network round trip across continents", "About 150 milliseconds"],
          ["A character", "1 byte (ASCII) to about 4 bytes (UTF-8)"],
          ["A typical row or small JSON object", "About 1 KB"],
          ["A photo", "A few MB"],
          ["Peak traffic", "Plan for 2 to 10 times the average"],
        ],
      },
      paragraphs: [
        "You are not expected to be exact. Show that you can reason: 10 million users, 10% active a day, 5 actions each, is 5 million writes a day, or about 60 per second on average.",
      ],
    },
    {
      heading: "Key trade-offs",
      table: {
        head: ["Choice", "What you gain", "What you pay"],
        rows: [
          [
            "Cache",
            "Speed and less database load",
            "Stale data, and invalidation is hard",
          ],
          [
            "Replication",
            "Availability and read capacity",
            "Replicas may lag, so reads can be stale",
          ],
          [
            "Sharding",
            "Scale beyond one machine",
            "Cross-shard queries and rebalancing are hard",
          ],
          [
            "Async with queues",
            "Smooth spikes and faster responses",
            "Eventual results, retries and duplicates to handle",
          ],
          [
            "Microservices",
            "Independent teams and scaling",
            "Network failures, deployment and debugging cost",
          ],
          [
            "Strong consistency",
            "Everyone sees the latest data",
            "Slower, and less available during failures",
          ],
          [
            "Eventual consistency",
            "High availability and speed",
            "Users may briefly see old data",
          ],
        ],
      },
      paragraphs: [
        "The CAP theorem says that during a network partition a system must choose between consistency and availability. Banks choose consistency. Social feeds usually choose availability.",
      ],
    },
    {
      heading: "Classic designs to practise",
      table: {
        head: ["Design", "Key ideas to cover"],
        rows: [
          [
            "URL shortener",
            "Unique ID or hash generation, base62 encoding, a read-heavy cache, a redirect with 301 or 302, expiry, and click analytics",
          ],
          [
            "Rate limiter",
            "Token bucket or sliding window, counters in Redis, per-user and per-IP limits, and what happens across several servers",
          ],
          [
            "Chat application",
            "WebSockets, message ordering, delivery receipts, offline storage, group chats and fan-out",
          ],
          [
            "News feed",
            "Fan-out on write versus on read, ranking, a cache for hot users, and pagination",
          ],
          [
            "Notification service",
            "A queue, templates, retries, deduplication, user preferences and several channels",
          ],
          [
            "File storage (like Drive)",
            "Chunked uploads, metadata separate from blobs, sync, versioning and deduplication",
          ],
          [
            "Ride booking",
            "Location updates, geospatial indexing, matching, surge pricing and payments",
          ],
          [
            "Video streaming",
            "Encoding to several resolutions, a CDN, adaptive bitrate and a recommendation service",
          ],
        ],
      },
    },
    {
      heading: "Low-level design (object-oriented design)",
      paragraphs: [
        "Many fresher interviews ask for classes and relationships instead of servers. The aim is clean, extensible code.",
      ],
      bullets: [
        "Practise: parking lot, library management, elevator, tic-tac-toe, chess, a vending machine, a food ordering app and an ATM.",
        "Steps: list the requirements, identify the objects (nouns), write their behaviour (verbs), draw the relationships, then code the core classes.",
        "Use SOLID principles and a design pattern only where it fits, for example Strategy for pricing rules or State for a vending machine.",
        "Handle concurrency and edge cases at the end, and say which assumptions you made.",
      ],
    },
    {
      heading: "Common mistakes",
      bullets: [
        "Jumping to the architecture without asking questions.",
        "Adding Kafka, Kubernetes and microservices to a problem that needs one database.",
        "Ignoring data: no schema, no estimate of size.",
        "Not discussing failure: what happens when a server, a database or a network link goes down.",
        "Saying 'use a cache' without saying what is cached, for how long and how it is invalidated.",
        "Going quiet. Explain your thinking all the time.",
      ],
    },
    {
      heading: "Where to learn",
      links: [
        {
          label: "System Design Primer",
          href: "https://github.com/donnemartin/system-design-primer",
          note: "A free guide with diagrams and worked answers",
        },
        {
          label: "ByteByteGo",
          href: "https://bytebytego.com",
          note: "Clear diagrams and a weekly newsletter",
        },
        {
          label: "High Scalability",
          href: "http://highscalability.com",
          note: "Case studies on real systems",
        },
        {
          label: "Designing Data-Intensive Applications",
          href: "https://dataintensive.net",
          note: "The standard book on data systems, for after the basics",
        },
        {
          label: "Awesome Low Level Design",
          href: "https://github.com/ashishps1/awesome-low-level-design",
          note: "Object-oriented design problems with code",
        },
        {
          label: "Engineering blogs",
          href: "https://github.com/kilimchoi/engineering-blogs",
          note: "A list of company blogs where real designs are explained",
        },
      ],
    },
  ],
};
