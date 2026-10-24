import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { RoleDetail } from "@/components/role-detail";
import { ROLES, getRole } from "@/lib/roadmap/roles";

export function generateStaticParams() {
  return ROLES.map((r) => ({ role: r.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/roadmap/roles/[role]">): Promise<Metadata> {
  const role = getRole((await params).role);
  if (!role) return {};
  return { title: `${role.name} · Roadmap · CampusCoders`, description: role.tagline };
}

async function Role({ params }: Pick<PageProps<"/roadmap/roles/[role]">, "params">) {
  const role = getRole((await params).role);
  if (!role) notFound();
  return <RoleDetail role={role} />;
}

// The pages are prerendered from generateStaticParams. Reading params inside Suspense keeps navigation instant.
export default function RolePage({ params }: PageProps<"/roadmap/roles/[role]">) {
  return (
    <Suspense fallback={null}>
      <Role params={params} />
    </Suspense>
  );
}
