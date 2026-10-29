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
      heading: "More design problems by difficulty",
      paragraphs: [
        "Work through these in order. HLD means servers and data; LLD means classes and code.",
      ],
      table: {
        head: ["Problem", "Type", "Level", "Main idea"],
        rows: [
          ["Parking lot", "LLD", "Easy", "Spots, vehicles and a fee strategy"],
          ["Vending machine", "LLD", "Easy", "The State pattern for its modes"],
          ["Snake and ladder", "LLD", "Easy", "Board, dice and turn handling"],
          [
            "URL shortener (and Pastebin)",
            "HLD",
            "Easy",
            "ID generation, base62, read-heavy cache",
          ],
          [
            "LRU cache",
            "LLD",
            "Medium",
            "A hash map plus a doubly linked list, both O(1)",
          ],
          ["Splitwise", "LLD", "Medium", "Store money in paise, simplify debts"],
          [
            "Notification system",
            "LLD",
            "Medium",
            "Channels, retries and user preferences",
          ],
          ["Rate limiter", "HLD", "Medium", "Token bucket and counters in Redis"],
          [
            "Typeahead (autocomplete)",
            "HLD",
            "Medium",
            "A trie, top-k per prefix, caching",
          ],
          ["Web crawler", "HLD", "Medium", "A URL frontier, politeness, de-duplication"],
          ["Live leaderboard", "HLD", "Medium", "Redis sorted sets plus a durable table"],
          [
            "Distributed logging",
            "HLD",
            "Medium",
            "Agents, a queue, indexed storage, retention",
          ],
          [
            "Elevator system",
            "LLD",
            "Hard",
            "Scheduling requests across cars, state machines",
          ],
          ["Key-value store", "HLD", "Hard", "Partitioning, replication, LSM storage"],
          ["Uber", "HLD", "Hard", "Geospatial index, matching, location updates"],
          ["YouTube", "HLD", "Hard", "Upload and transcoding pipeline, CDN"],
          [
            "Change data capture (CDC)",
            "HLD",
            "Hard",
            "Reading the database log to feed other systems",
          ],
        ],
      },
    },
    {
      heading: "Databases in a design interview",
      steps: [
        "Start from the access pattern: what is read, what is written, how often, and how fast it must be.",
        "Pick the family. A relational database for relations and transactions, a key-value store for lookups by key, a document store for flexible records, a wide-column store for huge write volume, a search index for text.",
        "Name the indexes. Say which columns you filter and sort by, and that each index costs write speed and space.",
        "State the consistency you need per piece of data. Money needs transactions; a like counter can be eventually consistent.",
        "Scale reads first with a cache and read replicas. Shard only when one machine cannot hold or write the data.",
        "Say how you keep other systems in sync: an outbox table or change data capture, not two writes that can disagree.",
      ],
      paragraphs: [
        "Why writes are fast: databases append to a write-ahead log first, which is a sequential write, and apply the change to the data pages later. Sequential writes are far cheaper than random ones, and the log is what lets the database recover after a crash.",
      ],
      table: {
        head: ["Storage engine", "How it works", "Good at"],
        rows: [
          [
            "B-tree",
            "Updates pages in place in a sorted tree",
            "Reads and range queries, the usual SQL choice",
          ],
          [
            "LSM tree",
            "Buffers writes in memory, flushes sorted files, merges them later",
            "Heavy write loads, as in Cassandra and RocksDB",
          ],
        ],
      },
    },
    {
      heading: "Designing an API",
      bullets: [
        "Pick the style: REST for most public APIs, GraphQL when clients need flexible queries, gRPC between internal services.",
        "Model resources as nouns (/orders/42) and use the HTTP verbs for the actions. Return the right status codes.",
        "Paginate every list. Cursor-based pagination stays stable when new rows arrive; offsets do not.",
        "Make writes idempotent with an idempotency key, so a retry does not charge a customer twice.",
        "Move slow work behind an async job: return 202 with a job ID the client can poll.",
        "Plan for versioning, authentication and rate limits from the start.",
      ],
    },
    {
      heading: "How a search query travels",
      steps: [
        "The browser resolves the domain with DNS and reaches a CDN or load balancer.",
        "An application server checks a cache such as Redis for a recent identical query.",
        "On a miss, it asks the search cluster (Elasticsearch or similar), where a coordinator sends the query to every shard.",
        "Each shard looks the words up in its inverted index (word to list of documents), scores matches with TF-IDF or BM25, and returns its best few.",
        "The coordinator merges the shard results, fetches the documents, and the app returns them.",
      ],
      paragraphs: [
        "New data reaches the index through a queue or change data capture, and becomes searchable after the next refresh, usually within a second or so. That delay is why search is near real-time, not instant. Autocomplete uses a trie or prefix index, fuzzy search tolerates typos, and vector search finds meaning rather than exact words.",
      ],
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
          label: "Engineering Atlas",
          href: "https://engineering-atlas.in",
          note: "Step-by-step design problems and system design deep dives; some are free, others need a membership",
        },
        {
          label: "Engineering blogs",
          href: "https://github.com/kilimchoi/engineering-blogs",
          note: "A list of company blogs where real designs are explained",
        },
      ],
    },
    {
      heading: "How real companies built it",
      paragraphs: [
        "Reading how a team solved a real problem teaches more than a textbook. Pick one post a week and write down the problem, the choice they made and what they gave up.",
      ],
      links: [
        {
          label: "Netflix Tech Blog",
          href: "https://netflixtechblog.com",
          note: "Streaming, resilience and data",
        },
        {
          label: "Uber Engineering",
          href: "https://www.uber.com/blog/engineering/",
          note: "Maps, matching and large-scale data",
        },
        {
          label: "Stripe Engineering",
          href: "https://stripe.com/blog/engineering",
          note: "Payments, APIs and reliability",
        },
        {
          label: "Meta Engineering",
          href: "https://engineering.fb.com",
          note: "Infrastructure and large systems",
        },
        {
          label: "Cloudflare Blog",
          href: "https://blog.cloudflare.com",
          note: "Networking, security and performance",
        },
        {
          label: "Discord Engineering",
          href: "https://discord.com/category/engineering",
          note: "Real-time messaging at scale",
        },
        {
          label: "Flipkart Engineering",
          href: "https://blog.flipkart.tech",
          note: "E-commerce at Indian scale",
        },
        {
          label: "Razorpay Engineering",
          href: "https://engineering.razorpay.com",
          note: "Payments in India",
        },
      ],
    },
  ],
};
