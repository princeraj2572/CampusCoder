import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Privacy Policy · CampusCoders",
  description: "What CampusCoders collects, who can see it, and how you stay in control.",
};

const CONTACT = (
  <a
    href="https://github.com/princeraj2572"
    target="_blank"
    rel="noopener noreferrer"
    className="text-foreground underline underline-offset-4"
  >
    Prince Raj on GitHub
  </a>
);

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated="7 October 2026"
      intro="CampusCoders ranks our students on DSA, contests and GitHub. This page explains what we collect to do that, who can see it, and how you stay in control."
      sections={[
        {
          heading: "What we collect",
          body: (
            <>
              <p>
                <strong>When you sign in.</strong> Google tells us your email address and
                the basic profile details it shares with any app. We use your email to
                recognise you. We do not display it to anyone else.
              </p>
              <p>
                <strong>What you enter.</strong> Your full name, admission year, section
                or batch, your primary and secondary domains, and your coding usernames
                (LeetCode and GitHub, plus Codeforces and CodeChef if you add them). Also
                whether you want to be hidden from the leaderboards.
              </p>
              <p>
                <strong>Public activity we fetch.</strong> From the usernames you give us,
                we read public information from LeetCode, Codeforces, CodeChef and GitHub:
                ratings, problems solved, contest history, public contributions,
                repositories and languages. We keep a daily snapshot of your scores so we
                can show growth over time.
              </p>
              <p>
                <strong>Technical data.</strong> A sign-in cookie that keeps you signed
                in, and a setting in your browser that remembers light or dark theme. Our
                hosting provider keeps standard request logs.
              </p>
            </>
          ),
        },
        {
          heading: "How we use it",
          body: (
            <p>
              Only to run CampusCoders: to build the leaderboards and profiles, keep the
              scores up to date, and let you manage your own details. We do not sell your
              data, show ads, or share it with anyone for marketing.
            </p>
          ),
        },
        {
          heading: "Who can see what",
          body: (
            <ul>
              <li>
                <strong>Anyone, without signing in:</strong> the leaderboards show your
                name, year, section, primary domain and scores, unless you hide yourself.
              </li>
              <li>
                <strong>Signed-in students:</strong> your profile page, with your coding
                usernames, contest history, GitHub activity and registration date.
              </li>
              <li>
                <strong>Only you:</strong> your Google email address.
              </li>
              <li>
                <strong>The developer:</strong> can access the database in order to run
                and fix the site.
              </li>
            </ul>
          ),
        },
        {
          heading: "Your choices",
          body: (
            <ul>
              <li>
                <strong>Hide yourself.</strong> Tick &ldquo;Hide me from the
                leaderboards&rdquo; in Edit details. You stop being ranked and listed on
                the boards.
              </li>
              <li>
                <strong>Change your details</strong> any time, including your usernames.
              </li>
              <li>
                <strong>Delete your data.</strong> &ldquo;Delete my data&rdquo; removes
                your registration, scores, history and snapshots. Your sign-in account
                (your Google email) is kept so you can sign in again later. To have that
                removed as well, contact us.
              </li>
            </ul>
          ),
        },
        {
          heading: "Other services we rely on",
          body: (
            <ul>
              <li>Google, to sign you in.</li>
              <li>Supabase, which stores our database and sign-in accounts.</li>
              <li>Vercel, which hosts the website.</li>
              <li>
                LeetCode, Codeforces, CodeChef and GitHub, whose public data we read.
                CampusCoders is not affiliated with or endorsed by any of them.
              </li>
            </ul>
          ),
        },
        {
          heading: "How long we keep it",
          body: (
            <p>
              For as long as you are registered. When you delete your data, your
              registration, scores, history and snapshots are removed.
            </p>
          ),
        },
        {
          heading: "Changes and contact",
          body: (
            <p>
              If we change this policy we will update the date at the top. Questions, or a
              request to remove your sign-in account: contact {CONTACT}.
            </p>
          ),
        },
      ]}
    />
  );
}
