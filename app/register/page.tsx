import { notFound } from "next/navigation";
import { connection } from "next/server";
import { RegisterForm } from "@/components/register-form";
import { isAnonRegistrationEnabled } from "@/lib/temp-anon/flag";

export default async function RegisterPage() {
  await connection();
  if (!isAnonRegistrationEnabled()) notFound();
  return (
    <main className="mx-auto flex w-full max-w-xl flex-col gap-6 p-6">
      <h1 className="font-display text-3xl font-bold">Register your accounts</h1>
      <RegisterForm />
    </main>
  );
}
