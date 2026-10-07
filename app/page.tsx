import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-xl flex-col justify-center gap-4 p-6">
      <h1 className="font-display text-4xl font-bold">CampusCoders</h1>
      <p>
        See how the department is doing on LeetCode, contests and GitHub, or register your
        own accounts.
      </p>
      <div className="flex gap-3">
        <Link href="/leaderboards/problem-solving" className={buttonVariants()}>
          Leaderboards
        </Link>
        <Link href="/register" className={buttonVariants({ variant: "outline" })}>
          Register
        </Link>
        <Link href="/students" className={buttonVariants({ variant: "outline" })}>
          View students
        </Link>
      </div>
    </main>
  );
}
