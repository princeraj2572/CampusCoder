import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RoadmapPage } from "@/components/roadmap-page";
import { ROADMAP_PAGES, roadmapPage } from "@/lib/roadmap/pages";

export function generateStaticParams() {
  return ROADMAP_PAGES.filter((p) => p.slug).map((p) => ({ topic: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/roadmap/[topic]">): Promise<Metadata> {
  const page = roadmapPage((await params).topic);
  if (!page) return {};
  return { title: `${page.title} · Roadmap · CampusCoders`, description: page.intro };
}

export default async function RoadmapTopicPage({
  params,
}: PageProps<"/roadmap/[topic]">) {
  const { topic } = await params;
  const page = topic ? roadmapPage(topic) : undefined;
  if (!page) notFound();
  return <RoadmapPage page={page} />;
}
