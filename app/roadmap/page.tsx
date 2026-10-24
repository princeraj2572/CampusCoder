import type { Metadata } from "next";
import { RoadmapPage } from "@/components/roadmap-page";
import { roadmapPage } from "@/lib/roadmap/pages";

export const metadata: Metadata = {
  title: "Roadmap · CampusCoders",
  description:
    "How to get started: what to learn, in what order, and where to learn it. DSA, DBMS, development and open source.",
};

export default function RoadmapIndexPage() {
  return <RoadmapPage page={roadmapPage("")!} />;
}
