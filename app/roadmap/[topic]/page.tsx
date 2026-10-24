import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
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

async function Topic({ params }: Pick<PageProps<"/roadmap/[topic]">, "params">) {
  const { topic } = await params;
  const page = topic ? roadmapPage(topic) : undefined;
  if (!page) notFound();
  return <RoadmapPage page={page} />;
}

// The pages are prerendered from generateStaticParams. Reading params inside Suspense keeps navigation instant.
export default function RoadmapTopicPage({ params }: PageProps<"/roadmap/[topic]">) {
  return (
    <Suspense fallback={null}>
      <Topic params={params} />
    </Suspense>
  );
}
