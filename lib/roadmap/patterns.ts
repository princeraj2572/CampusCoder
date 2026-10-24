import type { RoadmapPage } from "./types";

export const patterns: RoadmapPage = {
  slug: "dsa-patterns",
  label: "DSA patterns",
  title: "DSA patterns and cheat sheets",
  intro:
    "Most interview problems are a small number of ideas in different clothes. Learn to recognise the pattern from the problem statement, and a new problem stops being new.",
  sections: [
    {
      heading: "How to recognise a pattern",
      steps: [
        "Read the constraints first. An input size of 10^5 means you need about O(n log n) or better. 20 or fewer hints at backtracking or bitmasks.",
        "Look at the input shape: a sorted array, a string, a tree, a graph, intervals or a stream.",
        "Look at the ask: longest, shortest, count of ways, minimum or maximum, all possibilities, or does it exist.",
        "Write the brute force and find where it repeats work. That repeated work is what the pattern removes.",
        "Match it to a pattern below, then check the example problems to see if the idea fits.",
      ],
    },
    {
      heading: "Arrays and strings",
      table: {
        head: ["Pattern", "Use it when", "Core idea", "Practise on"],
        rows: [
          [
            "Two pointers",
            "A sorted array or a pair or triple with a target",
            "Move one pointer from each end, or both forward, based on a comparison",
            "Two Sum II, 3Sum, Container With Most Water",
          ],
          [
            "Sliding window",
            "A contiguous subarray or substring with a condition",
            "Grow the window on the right and shrink on the left to keep it valid",
            "Longest Substring Without Repeating Characters, Minimum Window Substring",
          ],
          [
            "Prefix sum",
            "Many range-sum queries, or a subarray with a given sum",
            "Store running totals so any range is a subtraction",
            "Subarray Sum Equals K, Range Sum Query",
          ],
          [
            "Hash map counting",
            "Frequencies, duplicates, pairs, or grouping",
            "Trade memory for speed: one pass with a map of what you have seen",
            "Two Sum, Group Anagrams, Longest Consecutive Sequence",
          ],
          [
            "Monotonic stack",
            "The next greater or smaller element, or spans",
            "Keep a stack in sorted order and pop when the order breaks",
            "Daily Temperatures, Largest Rectangle in Histogram",
          ],
          [
            "Intervals",
            "Overlapping ranges, meetings, or scheduling",
            "Sort by start, then merge or compare with the last interval",
            "Merge Intervals, Meeting Rooms II, Insert Interval",
          ],
          [
            "Kadane's algorithm",
            "The best contiguous subarray sum",
            "Keep the best sum ending here, and the best seen so far",
            "Maximum Subarray, Maximum Product Subarray",
          ],
        ],
      },
    },
    {
      heading: "Searching, sorting and heaps",
      table: {
        head: ["Pattern", "Use it when", "Core idea", "Practise on"],
        rows: [
          [
            "Binary search",
            "A sorted or rotated array, or any monotonic yes/no check",
            "Halve the range each step by testing the middle",
            "Search in Rotated Sorted Array, Find Peak Element",
          ],
          [
            "Binary search on the answer",
            "Find the minimum or maximum value that satisfies a condition",
            "Search the range of possible answers, and check each with a simple function",
            "Koko Eating Bananas, Capacity to Ship Packages",
          ],
          [
            "Top K with a heap",
            "The k largest, smallest or most frequent",
            "Keep a heap of size k, so each insert costs log k",
            "Kth Largest Element, Top K Frequent Elements",
          ],
          [
            "Two heaps",
            "A running median, or balancing two halves",
            "A max-heap for the lower half and a min-heap for the upper half",
            "Find Median from Data Stream",
          ],
          [
            "Merge k sorted lists",
            "Combining several sorted sources",
            "Keep the current head of each in a min-heap",
            "Merge k Sorted Lists, Smallest Range Covering Elements",
          ],
        ],
      },
    },
    {
      heading: "Linked lists, trees and graphs",
      table: {
        head: ["Pattern", "Use it when", "Core idea", "Practise on"],
        rows: [
          [
            "Fast and slow pointers",
            "Cycles or the middle of a linked list",
            "One pointer moves two steps, the other one, and they meet if there is a cycle",
            "Linked List Cycle, Middle of the Linked List",
          ],
          [
            "Tree DFS",
            "Depth, paths, or anything that depends on both children",
            "Recurse on the children and combine the results on the way up",
            "Maximum Depth, Diameter of Binary Tree, Path Sum",
          ],
          [
            "Tree BFS (level order)",
            "Level by level, or the shortest path in an unweighted graph",
            "A queue, processed one level at a time",
            "Binary Tree Level Order Traversal, Rotting Oranges",
          ],
          [
            "Graph DFS and flood fill",
            "Connected components, islands, or reachability",
            "Mark each node visited, and explore neighbours",
            "Number of Islands, Clone Graph",
          ],
          [
            "Topological sort",
            "Tasks with dependencies, or detecting a cycle in a directed graph",
            "Process nodes with no incoming edges first (Kahn's algorithm)",
            "Course Schedule, Alien Dictionary",
          ],
          [
            "Union-Find",
            "Grouping, and 'are these connected?' as edges arrive",
            "Merge sets with path compression and union by rank",
            "Number of Provinces, Redundant Connection",
          ],
          [
            "Shortest path",
            "Weighted edges and a minimum cost",
            "Dijkstra for non-negative weights, Bellman-Ford if negative edges exist",
            "Network Delay Time, Cheapest Flights Within K Stops",
          ],
          [
            "Trie",
            "Prefix search and word dictionaries",
            "A tree of characters, so shared prefixes are stored once",
            "Implement Trie, Word Search II",
          ],
        ],
      },
    },
    {
      heading: "Recursion, backtracking and dynamic programming",
      table: {
        head: ["Pattern", "Use it when", "Core idea", "Practise on"],
        rows: [
          [
            "Backtracking",
            "All combinations, permutations, subsets, or valid placements",
            "Choose, explore, then undo the choice. Prune when a branch cannot work",
            "Subsets, Permutations, N-Queens, Combination Sum",
          ],
          [
            "1D dynamic programming",
            "The answer for i depends on a few earlier answers",
            "Define the state, write the recurrence, then fill from the smallest case",
            "Climbing Stairs, House Robber, Coin Change",
          ],
          [
            "2D / grid dynamic programming",
            "Two sequences or a grid",
            "State is two indices, and the recurrence looks at the neighbours",
            "Unique Paths, Longest Common Subsequence, Edit Distance",
          ],
          [
            "Knapsack",
            "Pick items under a limit, to maximise value or count ways",
            "State is the item and the remaining capacity",
            "Partition Equal Subset Sum, Target Sum",
          ],
          [
            "Longest increasing subsequence",
            "The longest ordered subsequence",
            "O(n^2) with a table, or O(n log n) with binary search",
            "Longest Increasing Subsequence, Russian Doll Envelopes",
          ],
          [
            "Greedy",
            "A local best choice that never needs undoing",
            "Sort, take the best option each step, and be ready to prove why it works",
            "Jump Game, Gas Station, Task Scheduler",
          ],
          [
            "Bit manipulation",
            "Single numbers, toggles, subsets of small sets",
            "XOR cancels pairs; n & (n - 1) removes the lowest set bit",
            "Single Number, Counting Bits",
          ],
        ],
      },
    },
    {
      heading: "Big-O cheat sheet",
      table: {
        head: ["Structure", "Access", "Search", "Insert", "Delete"],
        rows: [
          ["Array", "O(1)", "O(n)", "O(n)", "O(n)"],
          ["Linked list", "O(n)", "O(n)", "O(1) at a known node", "O(1) at a known node"],
          ["Hash map (average)", "n/a", "O(1)", "O(1)", "O(1)"],
          ["Balanced BST", "n/a", "O(log n)", "O(log n)", "O(log n)"],
          ["Heap", "O(1) for the top", "O(n)", "O(log n)", "O(log n) for the top"],
          ["Stack and queue", "O(n)", "O(n)", "O(1)", "O(1)"],
        ],
      },
      paragraphs: [
        "A rule of thumb for time limits: about 10^8 simple operations per second. With n = 10^5, aim for O(n log n). With n = 10^3, O(n^2) is fine. With n up to 20, exponential solutions can work.",
      ],
    },
    {
      heading: "Sorting and common algorithm costs",
      table: {
        head: ["Algorithm", "Time (typical)", "Space", "Notes"],
        rows: [
          ["Merge sort", "O(n log n)", "O(n)", "Stable, with predictable speed"],
          [
            "Quick sort",
            "O(n log n) average, O(n^2) worst",
            "O(log n)",
            "Fast in practice",
          ],
          ["Heap sort", "O(n log n)", "O(1)", "Not stable"],
          ["Counting sort", "O(n + k)", "O(k)", "For small integer ranges"],
          ["BFS or DFS", "O(V + E)", "O(V)", "Graph traversal"],
          [
            "Dijkstra with a heap",
            "O((V + E) log V)",
            "O(V)",
            "Non-negative weights only",
          ],
          ["Binary search", "O(log n)", "O(1)", "Needs a monotonic condition"],
        ],
      },
    },
    {
      heading: "Common mistakes in DSA problems",
      bullets: [
        "Coding before you understand the examples and the edge cases.",
        "Forgetting empty input, a single element, duplicates, negative numbers and overflow.",
        "Off-by-one errors in binary search and sliding windows. Decide whether your range is inclusive or exclusive and stay consistent.",
        "Modifying a collection while looping over it.",
        "Passing a shared list into recursion without copying it when you save a result.",
        "Using recursion on a deep input without thinking about the stack limit.",
        "Stating the wrong complexity, such as ignoring the cost of string slicing or sorting.",
      ],
    },
    {
      heading: "A way to talk through any problem in an interview",
      steps: [
        "Restate the problem in your own words and ask about the input size, ranges and edge cases.",
        "Work through one small example by hand.",
        "Describe the brute force and its complexity.",
        "Find the bottleneck, and say which pattern might remove it.",
        "Explain the improved approach before you write code.",
        "Write clean code, with clear variable names, and keep talking.",
        "Test with your example and with one edge case, and fix what you find.",
        "State the final time and space complexity.",
      ],
    },
    {
      heading: "Where to practise by pattern",
      links: [
        {
          label: "NeetCode roadmap",
          href: "https://neetcode.io/roadmap",
          note: "Problems grouped by pattern, in a sensible order",
        },
        {
          label: "Blind 75",
          href: "https://www.techinterviewhandbook.org/grind75",
          note: "A short list of high-value interview problems, with a schedule",
        },
        {
          label: "LeetCode Patterns study plans",
          href: "https://leetcode.com/studyplan/",
          note: "Official plans such as Dynamic Programming and Graph theory",
        },
        {
          label: "Visualgo",
          href: "https://visualgo.net/en",
          note: "Animations of sorting, trees and graph algorithms",
        },
        {
          label: "Big O notation (Wikipedia)",
          href: "https://en.wikipedia.org/wiki/Big_O_notation",
          note: "The definition and the common growth rates",
        },
      ],
    },
  ],
};
