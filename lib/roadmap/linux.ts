import type { RoadmapPage } from "./types";

export const linux: RoadmapPage = {
  slug: "linux",
  label: "Linux",
  title: "Linux and the terminal",
  intro:
    "Most servers run Linux and most developer tools live in the terminal. Learn it in order, tick off each step, and practise a little every week.",
  sections: [
    {
      heading: "The terminal and Linux",
      paragraphs: [
        "Almost every server runs Linux, and most developer tools are made for the terminal. An hour of practice each week makes you quicker for years.",
      ],
      table: {
        head: ["Task", "Command", "Why it matters"],
        rows: [
          ["Move around", "cd, ls, pwd", "Basic navigation"],
          ["Search inside files", 'grep -rn "text" .', "Finding where something is used"],
          ["Search for files", 'find . -name "*.ts"', "Locating files fast"],
          ["Read logs", "tail -f app.log", "Watching what an app does live"],
          [
            "Chain commands",
            "ls | grep test | wc -l",
            "Pipes are the heart of the shell",
          ],
          ["Permissions", "chmod, chown", "Fixing 'permission denied' correctly"],
          ["Processes", "ps, top, kill", "Finding and stopping stuck programs"],
          ["Network", "curl, ping, ssh", "Testing APIs and logging in to servers"],
        ],
      },
      links: [
        {
          label: "The Missing Semester",
          href: "https://missing.csail.mit.edu",
          note: "Shell, editors, Git, debugging and more, from MIT",
        },
        {
          label: "Linux Journey",
          href: "https://linuxjourney.com",
          note: "Beginner-friendly Linux lessons",
        },
        {
          label: "OverTheWire: Bandit",
          href: "https://overthewire.org/wargames/bandit/",
          note: "A game that teaches the command line",
        },
      ],
    },
    {
      heading: "Linux: a learning path",
      paragraphs: [
        "Work through these in order and tick them off. Each step takes an evening, and you can practise on Windows with WSL, or on a free cloud server.",
      ],
      steps: [
        "Get a Linux shell: install WSL on Windows, or a Ubuntu virtual machine, or use a Linux laptop.",
        "Learn to move around: pwd, ls -la, cd, mkdir, cp, mv and rm, and use Tab to complete names.",
        "Read files: cat, less, head, tail -f, and search with grep and find.",
        "Learn the file tree: /home is your files, /etc is configuration, /var/log is logs, /usr/bin is programs.",
        "Understand permissions: read the rwxr-xr-x in ls -l, then change them with chmod and chown.",
        "Use pipes and redirects: command | command, > to write a file, >> to append, 2> for errors.",
        "Manage processes: ps, top or htop, kill, and run a job in the background with & and nohup.",
        "Install software with a package manager (apt, or dnf on Fedora) and keep the system updated.",
        "Write a shell script with variables, if, for, and arguments, and make it executable.",
        "Connect to a server with ssh and keys, copy files with scp, and set up a firewall rule.",
        "Schedule a task with cron and read its output in the logs.",
        "Explain out loud what happens when you run ls | grep x.",
      ],
    },
    {
      heading: "Linux permissions, explained",
      paragraphs: [
        "Every file has an owner, a group and three sets of permissions: for the owner, the group and everyone else. Each set has read (r, 4), write (w, 2) and execute (x, 1).",
      ],
      table: {
        head: ["You see", "Number", "Meaning"],
        rows: [
          [
            "rwxr-xr-x",
            "755",
            "Owner can do everything; others can read and run it. Typical for programs.",
          ],
          [
            "rw-r--r--",
            "644",
            "Owner can edit; others can only read. Typical for ordinary files.",
          ],
          [
            "rw-------",
            "600",
            "Only the owner can read or write. Required for SSH private keys.",
          ],
          [
            "rwxrwxrwx",
            "777",
            "Anyone can change it. Avoid it; it is almost never the right fix.",
          ],
        ],
      },
      bullets: [
        "A 'permission denied' error means your user lacks a needed bit. Check with ls -l before reaching for sudo.",
        "sudo runs one command as the administrator. Read the command twice before you run it.",
      ],
    },
    {
      heading: "Shell scripting basics",
      bullets: [
        "Start the file with #!/usr/bin/env bash, then run chmod +x script.sh to make it runnable.",
        "Use set -euo pipefail near the top so the script stops on the first error instead of carrying on.",
        'Quote your variables: "$name", so file names with spaces do not break the script.',
        "Read arguments with $1, $2 and $@, and check them before you use them.",
        "Automate something you actually do: back up a folder, rename files, or set up a new project.",
        "For anything longer than about 50 lines, consider Python instead.",
      ],
      links: [
        {
          label: "ShellCheck",
          href: "https://www.shellcheck.net",
          note: "Paste a script in and it points out mistakes",
        },
        {
          label: "Bash Guide for Beginners",
          href: "https://tldp.org/LDP/Bash-Beginners-Guide/html/",
          note: "A free introduction to scripting",
        },
        {
          label: "explainshell",
          href: "https://explainshell.com",
          note: "Paste any command and see what each part means",
        },
      ],
    },
  ],
};
