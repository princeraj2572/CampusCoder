import type { Metadata } from "next";
import { RolesOverview } from "@/components/roles-overview";

export const metadata: Metadata = {
  title: "Roles and jobs · Roadmap · CampusCoders",
  description:
    "Backend, frontend, full-stack, mobile, AI/ML, data, DevOps and security: what each job is, what to study and what to build.",
};

export default function RolesPage() {
  return <RolesOverview />;
}
