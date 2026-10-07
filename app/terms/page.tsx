import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Terms and Conditions · CampusCoders",
  description: "The rules for using CampusCoders.",
};

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms and Conditions"
      updated="7 October 2026"
      intro="CampusCoders is a department project. By signing in or using it, you agree to these terms. They are short and meant to be read."
      sections={[
        {
          heading: "Who it is for",
          body: (
            <p>
              CampusCoders is built for our department&rsquo;s students and faculty. Any
              Google account can sign in, but please register only if you belong to the
              department.
            </p>
          ),
        },
        {
          heading: "Your account and details",
          body: (
            <ul>
              <li>Give your own real name and your own coding usernames.</li>
              <li>
                Do not register someone else&rsquo;s accounts or pretend to be another
                person.
              </li>
              <li>One registration per Google account. Keep your details accurate.</li>
            </ul>
          ),
        },
        {
          heading: "Fair play",
          body: (
            <>
              <p>The boards are only fun if they are honest. Please do not:</p>
              <ul>
                <li>
                  Inflate your scores, for example with fake or automated activity, copied
                  work or extra accounts.
                </li>
                <li>Use the site to harass or embarrass anyone.</li>
                <li>
                  Scrape the site, overload it, or try to get around its security or its
                  limits.
                </li>
              </ul>
              <p>
                We may correct or remove a record, or a score, that breaks these rules.
                Scores and the way they are calculated may change as the site grows.
              </p>
            </>
          ),
        },
        {
          heading: "About the scores",
          body: (
            <p>
              Scores and ranks come from public information on LeetCode, Codeforces,
              CodeChef and GitHub. They can be late, incomplete or wrong, and they are not
              an official assessment of anyone&rsquo;s ability or an academic grade.
            </p>
          ),
        },
        {
          heading: "Your data",
          body: (
            <p>
              You keep ownership of what you enter. By registering, you let us show it as
              described in our{" "}
              <Link
                href="/privacy"
                className="text-foreground underline underline-offset-4"
              >
                Privacy Policy
              </Link>
              . You can hide yourself or delete your data at any time.
            </p>
          ),
        },
        {
          heading: "Other services",
          body: (
            <p>
              CampusCoders is not affiliated with LeetCode, Codeforces, CodeChef, GitHub
              or Google. Their own terms apply when you use them, and we cannot promise
              they will always be available.
            </p>
          ),
        },
        {
          heading: "No guarantees",
          body: (
            <p>
              CampusCoders is a free student-built project, provided as it is. It may be
              slow, change or stop working. To the extent the law allows, we are not
              responsible for losses that come from using it.
            </p>
          ),
        },
        {
          heading: "Changes and contact",
          body: (
            <p>
              We may update these terms and will change the date at the top when we do.
              Continuing to use the site means you accept the update. Questions: contact{" "}
              <a
                href="https://github.com/princeraj2572"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground underline underline-offset-4"
              >
                Prince Raj on GitHub
              </a>
              .
            </p>
          ),
        },
      ]}
    />
  );
}
