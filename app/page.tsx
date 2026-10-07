import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-xl flex-col justify-center gap-4 p-6">
      <h1 className="font-display text-4xl font-bold">CampusCoders</h1>
      <p>Sign-in and leaderboards arrive in the next phases.</p>
      <Button className="w-fit">Sign in with Google</Button>
    </main>
  );
}
