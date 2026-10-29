import type { RoadmapPage } from "./types";

export const interview: RoadmapPage = {
  slug: "interview-qa",
  label: "Interview Q&A",
  title: "Interview questions and answers",
  intro:
    "The questions interviewers ask again and again, with short answers you can build on. Do not memorise the words. Understand each answer well enough to explain it with an example of your own.",
  sections: [
    {
      heading: "How to use this page",
      steps: [
        "Cover the answer and try to say it out loud first.",
        "Compare, and note what you missed.",
        "Add a small example or a real use. Interviewers remember examples.",
        "Come back to the questions you missed after a week.",
      ],
    },
    {
      heading: "DBMS and SQL",
      qa: [
        {
          q: "What is normalisation, and why do we do it?",
          a: "It is organising tables so each fact is stored once, to avoid update, insert and delete anomalies. 1NF removes repeating groups, 2NF removes partial dependencies on a key, 3NF removes dependencies between non-key columns, and BCNF tightens 3NF.",
        },
        {
          q: "What are the ACID properties?",
          a: "Atomicity: a transaction happens fully or not at all. Consistency: it moves the database from one valid state to another. Isolation: concurrent transactions do not see each other's half-done work. Durability: once committed, it survives a crash.",
        },
        {
          q: "Primary key, candidate key, foreign key: what is the difference?",
          a: "A candidate key is any minimal set of columns that identifies a row. The primary key is the candidate you choose, and it cannot be null. A foreign key is a column that refers to a primary key in another table, to enforce a relationship.",
        },
        {
          q: "What is the difference between WHERE and HAVING?",
          a: "WHERE filters rows before grouping. HAVING filters groups after aggregation, so it can use functions such as COUNT and SUM.",
        },
        {
          q: "Explain INNER, LEFT, RIGHT and FULL joins.",
          a: "INNER keeps only rows that match on both sides. LEFT keeps all rows from the left table and fills nulls where nothing matches. RIGHT is the mirror. FULL keeps all rows from both sides.",
        },
        {
          q: "What is an index, and what does it cost?",
          a: "An index is a separate structure, usually a B+ tree, that lets the database find rows without scanning the table. It speeds up reads, but it uses space and slows down inserts, updates and deletes, because it must be maintained.",
        },
        {
          q: "What are the transaction isolation levels?",
          a: "Read uncommitted, read committed, repeatable read and serialisable. Higher levels prevent more anomalies (dirty, non-repeatable and phantom reads) but allow less concurrency.",
        },
        {
          q: "How is DELETE different from TRUNCATE and DROP?",
          a: "DELETE removes chosen rows and can be rolled back and filtered. TRUNCATE removes all rows quickly and resets the table. DROP removes the table itself, with its structure.",
        },
        {
          q: "SQL or NoSQL?",
          a: "Choose SQL when you need relations, transactions and a fixed schema. Choose NoSQL when you need flexible documents, simple key-based access or horizontal scale, and can accept weaker consistency. Many systems use both.",
        },
        {
          q: "How would you find the second highest salary?",
          a: "Use a subquery on the maximum below the maximum, or DENSE_RANK() over salary descending and select rank 2. The window-function version also handles ties and the top N.",
        },
      ],
    },
    {
      heading: "Operating systems",
      qa: [
        {
          q: "What is the difference between a process and a thread?",
          a: "A process is a running program with its own memory space. Threads are lightweight units of execution inside a process that share its memory, so they communicate easily but can interfere with each other.",
        },
        {
          q: "What is a deadlock, and how can it be prevented?",
          a: "Processes wait for each other's resources forever. It needs four conditions: mutual exclusion, hold and wait, no pre-emption and circular wait. Break any one, for example by acquiring locks in a fixed order, to prevent it.",
        },
        {
          q: "What is the difference between a mutex and a semaphore?",
          a: "A mutex lets one thread at a time into a critical section and is owned by the thread that locks it. A semaphore holds a count, so it lets up to N threads in and can signal between threads.",
        },
        {
          q: "Explain paging and virtual memory.",
          a: "Memory is divided into fixed-size pages, and a page table maps virtual addresses to physical frames. Virtual memory lets a process use more memory than is physically present by keeping rarely used pages on disk.",
        },
        {
          q: "What is a page fault, and what is thrashing?",
          a: "A page fault happens when a program touches a page that is not in memory, so the OS loads it from disk. Thrashing is when the system spends most of its time swapping pages instead of doing work.",
        },
        {
          q: "Name some CPU scheduling algorithms.",
          a: "First come first served, shortest job first, round robin, priority scheduling and multilevel queues. Round robin gives fair time slices, and shortest job first minimises average waiting time but can starve long jobs.",
        },
        {
          q: "What is a context switch?",
          a: "The CPU saves the state of the running process or thread and loads the state of another. It enables multitasking, but it has a cost, so too many switches waste time.",
        },
        {
          q: "What is a system call?",
          a: "The way a user program asks the kernel to do something privileged, such as reading a file or creating a process. It switches from user mode to kernel mode and back.",
        },
      ],
    },
    {
      heading: "Computer networks",
      qa: [
        {
          q: "What happens when you type a URL into a browser?",
          a: "The browser looks up the IP address through DNS, opens a TCP connection (and a TLS handshake for HTTPS), sends an HTTP request, the server returns a response, and the browser parses the HTML and loads the other resources to render the page.",
        },
        {
          q: "What is the difference between TCP and UDP?",
          a: "TCP is connection-based and reliable: it orders data, retransmits lost packets and controls congestion. UDP sends independent datagrams with no guarantee, so it is faster and used for video calls, games and DNS.",
        },
        {
          q: "Explain the TCP three-way handshake.",
          a: "The client sends SYN, the server replies SYN-ACK, and the client sends ACK. Both sides now agree on starting sequence numbers and the connection is open.",
        },
        {
          q: "What are the layers of the OSI and TCP/IP models?",
          a: "OSI has seven: physical, data link, network, transport, session, presentation and application. TCP/IP groups these into four: link, internet, transport and application.",
        },
        {
          q: "How does HTTPS work?",
          a: "HTTPS is HTTP over TLS. The server shows a certificate, the client verifies it, and both agree on keys for encrypted communication. It protects against eavesdropping and tampering.",
        },
        {
          q: "What is DNS?",
          a: "The system that turns names like example.com into IP addresses. A resolver asks the root, the top-level domain and the authoritative servers, and caches the answers.",
        },
        {
          q: "What is the difference between HTTP/1.1, HTTP/2 and HTTP/3?",
          a: "HTTP/1.1 sends one request at a time per connection. HTTP/2 multiplexes many requests on one connection. HTTP/3 does the same over QUIC (on UDP) to avoid head-of-line blocking at the transport level.",
        },
        {
          q: "What is the difference between GET and POST, and what do the status codes mean?",
          a: "GET reads data and should have no side effects, while POST sends data to create or change something. 2xx means success, 3xx redirect, 4xx a client error (such as 404 or 401) and 5xx a server error.",
        },
      ],
    },
    {
      heading: "OOP and design",
      qa: [
        {
          q: "What are the four pillars of OOP?",
          a: "Encapsulation: hide data behind methods. Abstraction: expose only what matters. Inheritance: reuse and extend behaviour. Polymorphism: one interface, many behaviours.",
        },
        {
          q: "Abstract class or interface?",
          a: "An interface defines a contract with no state and can be implemented by any class. An abstract class can share state and partial code among related classes. Use an interface for 'can do', and an abstract class for 'is a'.",
        },
        {
          q: "What does SOLID stand for?",
          a: "Single responsibility, open for extension and closed for modification, Liskov substitution, interface segregation, and dependency inversion. Together they keep code easy to change.",
        },
        {
          q: "Overloading or overriding?",
          a: "Overloading is several methods with the same name and different parameters, decided at compile time. Overriding is a subclass changing an inherited method, decided at run time.",
        },
        {
          q: "Composition or inheritance?",
          a: "Prefer composition: build objects from smaller parts. Inheritance creates tight coupling and fragile hierarchies, so use it only for a true 'is a' relationship.",
        },
        {
          q: "Name a few design patterns and when you would use them.",
          a: "Singleton for one shared instance, Factory to create objects without naming the class, Observer to notify many listeners, Strategy to swap algorithms, and Decorator to add behaviour without subclassing.",
        },
      ],
    },
    {
      heading: "Web and backend basics",
      qa: [
        {
          q: "What is the difference between authentication and authorisation?",
          a: "Authentication proves who you are. Authorisation decides what you may do once known.",
        },
        {
          q: "Sessions or JWTs?",
          a: "A session keeps state on the server and gives the client an identifier in a cookie, so it is easy to revoke. A JWT is a signed token holding claims, so the server stays stateless, but revoking it before it expires is harder.",
        },
        {
          q: "What is REST?",
          a: "An API style where URLs name resources and HTTP verbs act on them: GET to read, POST to create, PUT or PATCH to update and DELETE to remove, with stateless requests.",
        },
        {
          q: "What is CORS?",
          a: "A browser rule that stops a page from one origin reading responses from another unless the server says so with headers. It protects users, and does not protect the server itself.",
        },
        {
          q: "How do you prevent SQL injection?",
          a: "Never build queries by joining user input into a string. Use parameterised queries or an ORM, validate input and give the database user only the permissions it needs.",
        },
        {
          q: "What is caching, and what is the risk?",
          a: "Keeping a copy of data that is expensive to compute or fetch. The risk is stale data, so you need a plan for expiry and invalidation.",
        },
      ],
    },
    {
      heading: "Java and concurrency",
      paragraphs: [
        "Asked in most Java backend interviews. The ideas carry over to other languages as well.",
      ],
      qa: [
        {
          q: "Why are strings immutable in Java?",
          a: "A string never changes after it is created. That makes it safe to share between threads, lets the JVM reuse identical strings from a pool, keeps its hash code stable for use as a map key, and stops code from altering values such as file paths or class names after they are checked.",
        },
        {
          q: "What is the difference between == and equals()?",
          a: "== compares references, so it asks whether two variables point at the same object. equals() compares content, if the class overrides it. If you override equals(), override hashCode() too, or hash-based collections will break.",
        },
        {
          q: "What does synchronized do, and what does volatile do?",
          a: "synchronized gives one thread at a time access to a block and also makes its changes visible to the next thread that takes the lock. volatile only guarantees visibility and ordering of a single variable. It does not make count++ safe, because that is a read and a write.",
        },
        {
          q: "Why must wait() be called inside synchronized and inside a loop?",
          a: "wait() releases the lock you hold, so you must hold it first. Without the lock, a notify can arrive between your check and your wait and be lost. The loop re-checks the condition after waking, because a thread can wake up when the condition is still false.",
        },
        {
          q: "How does HashMap work?",
          a: "It hashes the key to pick a bucket, then compares keys with equals() inside that bucket. Colliding entries form a list that turns into a tree when it grows long. When the map gets too full it doubles its buckets and rehashes. It is not thread-safe, so use ConcurrentHashMap across threads.",
        },
        {
          q: "What are the thread states in Java?",
          a: "NEW, RUNNABLE, BLOCKED (waiting for a lock), WAITING (waiting with no time limit), TIMED_WAITING (sleep or a timed wait) and TERMINATED.",
        },
        {
          q: "Why use a thread pool instead of creating threads?",
          a: "Creating a thread is expensive and unlimited threads can exhaust memory. A pool reuses a fixed set of threads and queues extra work, which keeps load predictable.",
        },
        {
          q: "What is the Java Memory Model's happens-before rule?",
          a: "It says when one thread's writes are guaranteed to be visible to another: unlocking a monitor before the next lock, a volatile write before a later read, and Thread.start() before anything in the new thread. Without such a link, a thread may see stale values.",
        },
      ],
    },
    {
      heading: "Behavioural questions",
      paragraphs: [
        "Use the STAR shape: Situation, Task, Action and Result. Keep each answer to about two minutes, say 'I' for what you did, and end with a result and what you learned.",
      ],
      qa: [
        {
          q: "Tell me about yourself.",
          a: "Give a 60-second summary: who you are, what you study, one or two projects or results that matter, and why you want this role. Do not recite your resume.",
        },
        {
          q: "Tell me about a project you are proud of.",
          a: "Describe the problem, your part, one technical decision and why you made it, a bug that taught you something, and the result, ideally with a number.",
        },
        {
          q: "Describe a time you failed.",
          a: "Choose a real, small failure. Say what you did wrong, how you fixed it and what you do differently now. Do not blame others.",
        },
        {
          q: "How do you handle disagreement in a team?",
          a: "Listen first, explain your reasoning with evidence, find the goal you share, and accept the team's decision once it is made.",
        },
        {
          q: "Why do you want to work here?",
          a: "Name something specific: the product, the technology, the team or the problem. Link it to what you want to learn. Research before the interview.",
        },
        {
          q: "Do you have any questions for us?",
          a: "Always ask. For example: what does the first three months look like, how do you review code, what is the hardest problem the team has now, and how do new people get mentored?",
        },
      ],
    },
    {
      heading: "More practice",
      links: [
        {
          label: "Engineering Atlas",
          href: "https://engineering-atlas.in",
          note: "Deep dives on Java, concurrency and backend interviews",
        },
        {
          label: "GeeksforGeeks interview experiences",
          href: "https://www.geeksforgeeks.org/company-interview-corner/",
          note: "Real company interview reports",
        },
        {
          label: "Tech Interview Handbook",
          href: "https://www.techinterviewhandbook.org",
          note: "A free guide to every stage of the interview",
        },
        {
          label: "LeetCode Discuss: Interview Experience",
          href: "https://leetcode.com/discuss/interview-experience",
          note: "Recent questions by company",
        },
        {
          label: "Pramp",
          href: "https://www.pramp.com",
          note: "Free mock interviews with peers",
        },
        {
          label: "InterviewBit",
          href: "https://www.interviewbit.com",
          note: "Practice problems and topic-wise questions",
        },
      ],
    },
  ],
};
