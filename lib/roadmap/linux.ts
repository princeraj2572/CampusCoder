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
      heading: "Ways to get Linux",
      paragraphs: [
        "You do not need to wipe your laptop. Start with the lightest option and move up when you want more.",
      ],
      table: {
        head: ["Option", "How", "Good for", "Watch out for"],
        rows: [
          [
            "WSL (Windows)",
            "Open PowerShell as administrator and run wsl --install, then restart. It installs Ubuntu by default; wsl --install -d <name> picks another.",
            "Learning the shell and developing alongside Windows",
            "Keep project files inside the Linux home folder for speed, not under /mnt/c",
          ],
          [
            "Virtual machine",
            "Install VirtualBox or VMware, download an ISO, and create a VM with about 4 GB of RAM and 25 GB of disk.",
            "Safe experiments and a full desktop, on Windows, macOS or Linux",
            "Slower than a real install; turn on virtualisation in the BIOS if it fails to start",
          ],
          [
            "Live USB",
            "Write an ISO to a USB stick with Rufus, balenaEtcher or Ventoy, then boot from it.",
            "Trying a distro without installing anything",
            "Changes are lost on restart unless you set up persistence",
          ],
          [
            "Dual boot",
            "Shrink your Windows partition, then install Linux in the free space beside it.",
            "Full speed and real hardware, like a daily driver",
            "Back up first. Turn off Windows Fast Startup and check Secure Boot. A mistake here can cost data.",
          ],
          [
            "Cloud server",
            "Rent a small virtual server from a cloud provider and log in with ssh.",
            "Practising servers, ssh, firewalls and deployment",
            "Costs money after any free tier. Never leave a password login open to the internet.",
          ],
          [
            "Main install",
            "Replace your current system with Linux.",
            "When you are sure and your files are backed up",
            "Check that your Wi-Fi, graphics and laptop keys are supported first",
          ],
        ],
      },
    },
    {
      heading: "Install on Windows with WSL, step by step",
      paragraphs: [
        "The quickest start on Windows 10 (version 2004 or later) or Windows 11. You get a real Linux command line without leaving Windows.",
      ],
      steps: [
        "Right-click the Start button and open Terminal (Admin) or PowerShell as administrator.",
        "Run wsl --install. It turns on the needed Windows features and downloads Ubuntu.",
        "Restart the computer when asked.",
        "Open Ubuntu from the Start menu. The first launch takes a minute while it finishes setting up.",
        "Choose a username and password. The password will not show as you type, which is normal. You need it for sudo.",
        "Run sudo apt update && sudo apt upgrade -y to bring everything up to date.",
        "Check the version with wsl -l -v in PowerShell. VERSION should say 2.",
        "Keep your projects inside the Linux home folder (cd ~), not /mnt/c, because file access there is much faster.",
        "Open a project in VS Code from the Linux shell with code . after you install the WSL extension.",
      ],
      bullets: [
        "If wsl --install does nothing, turn on virtualisation in the BIOS and enable 'Virtual Machine Platform' in Windows Features.",
        "To pick another distro, run wsl --list --online, then wsl --install -d <name>.",
        "To start fresh, run wsl --unregister Ubuntu. This deletes everything inside that distro.",
      ],
    },
    {
      heading: "Install in a virtual machine, step by step",
      steps: [
        "Turn on virtualisation (Intel VT-x or AMD-V) in the BIOS if it is off. Most laptops have it on already.",
        "Install VirtualBox, which is free, or VMware Workstation Player.",
        "Download the Ubuntu LTS desktop ISO from ubuntu.com. Check the file size matches the download page.",
        "Create a new VM, choose Linux and Ubuntu (64-bit), and select the ISO.",
        "Give it at least 4 GB of RAM, 2 CPU cores and 25 GB of disk. More is better if your laptop can spare it.",
        "Start the VM and choose Install Ubuntu. Accept 'Erase disk': this only affects the virtual disk, not your real one.",
        "Pick your language, keyboard and timezone, then create your user and password.",
        "Restart when asked, and remove the ISO if the VM asks you to.",
        "Install the guest additions (VirtualBox) or VMware Tools for full-screen display, copy and paste, and shared folders.",
        "Take a snapshot now. If you break something later, you can roll back in seconds.",
      ],
    },
    {
      heading: "Make a live USB, step by step",
      steps: [
        "Download the ISO of the distro you want, and a USB stick of at least 8 GB. Everything on the stick will be erased.",
        "Install Rufus (Windows), balenaEtcher (any system) or Ventoy (keeps several ISOs on one stick).",
        "Select the ISO and the USB drive, double-check you picked the right drive, and write it.",
        "Restart the laptop and open the boot menu with its key (often F12, F10, Esc or F2; it varies by brand).",
        "Choose the USB stick. Pick 'Try Ubuntu' to run it without installing.",
        "Check that Wi-Fi, sound, the display and the trackpad all work before you decide to install.",
      ],
    },
    {
      heading: "Dual boot with Windows, step by step",
      paragraphs: [
        "This changes your disk. Back up everything you cannot lose before you begin, and keep the charger plugged in.",
      ],
      steps: [
        "Back up your important files to an external drive or cloud storage.",
        "In Windows, open Disk Management and shrink the main partition by at least 60 GB to leave free space.",
        "Turn off Windows Fast Startup and BitLocker, or save your BitLocker recovery key first.",
        "Make a live USB with the Ubuntu ISO (see the steps above) and boot from it.",
        "Check the live session works, then start the installer.",
        "Choose 'Install Ubuntu alongside Windows Boot Manager'. Use the free space you made, not the Windows partition.",
        "Finish the install and restart. The GRUB menu lets you pick Ubuntu or Windows at each start.",
        "If Windows is missing from the menu, boot Ubuntu and run sudo update-grub.",
        "Keep Windows updated, and note that a big Windows update can sometimes replace the boot menu. Keep the live USB handy to repair it.",
      ],
    },
    {
      heading: "Choosing a distro",
      paragraphs: [
        "A distro is Linux packaged with a package manager, a desktop and defaults. The commands you learn work on all of them, so pick one and stay with it for a few months before you compare.",
      ],
      table: {
        head: ["Distro", "Best for", "Package manager", "Notes"],
        rows: [
          [
            "Ubuntu LTS",
            "Most students, and most tutorials",
            "apt",
            "The safest first choice. Long-term releases get five years of updates.",
          ],
          [
            "Linux Mint",
            "Moving from Windows",
            "apt",
            "Based on Ubuntu with a familiar desktop that works out of the box.",
          ],
          [
            "Debian",
            "Stability, and learning how servers work",
            "apt",
            "What many servers and Docker images are built on. Fewer new features, fewer surprises.",
          ],
          [
            "Fedora",
            "Newer software and the Red Hat world",
            "dnf",
            "Close to what Red Hat enterprise systems use, which helps for DevOps roles.",
          ],
          [
            "Arch Linux",
            "Learning by building your own system",
            "pacman",
            "Excellent documentation, but you configure everything yourself. Try it after you are comfortable.",
          ],
        ],
      },
      bullets: [
        "Unsure? Choose Ubuntu LTS. Most guides and answers online assume it.",
        "Pick a desktop you like (GNOME, KDE Plasma or Xfce). You can change it later without losing your files.",
        "The same task has different commands on different families: apt install on Ubuntu and Debian, dnf install on Fedora, pacman -S on Arch.",
      ],
    },
    {
      heading: "After you install: a setup checklist",
      steps: [
        "Update everything. On Ubuntu or Debian: sudo apt update && sudo apt upgrade.",
        "Install the basics: git, curl, a compiler and build tools (on Ubuntu, sudo apt install git curl build-essential).",
        "Set your Git name and email, then create an SSH key with ssh-keygen and add the public key to GitHub.",
        "Install your language runtimes through your package manager or a version manager (nvm for Node, pyenv for Python, SDKMAN for Java).",
        "Install Docker or Podman if you plan to use containers, and add yourself to the docker group.",
        "Install a code editor, and learn its terminal and debugger.",
        "Set up automatic security updates, and make a backup of your home folder.",
        "Keep a notes file of commands you had to look up, and reread it each month.",
      ],
      paragraphs: [
        "If something breaks, copy the exact error text into a search before you reinstall. Most problems are a missing package or a permission, and the error message names it.",
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
