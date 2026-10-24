import type { Metadata } from "next";
import { notFound } from "next/navigation";
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

export default async function RolePage({ params }: PageProps<"/roadmap/roles/[role]">) {
  const role = getRole((await params).role);
  if (!role) notFound();
  return <RoleDetail role={role} />;
}
