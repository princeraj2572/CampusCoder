import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-xl flex-col justify-center gap-4 p-6">
      <h1 className="font-display text-4xl font-bold">CampusCoders</h1>
      <p>Register your coding accounts. Sign-in and leaderboards come in later phases.</p>
      <div className="flex gap-3">
        <Link href="/register" className={buttonVariants()}>
          Register
        </Link>
        <Link href="/students" className={buttonVariants({ variant: "outline" })}>
          View students
        </Link>
      </div>
    </main>
  );
}
