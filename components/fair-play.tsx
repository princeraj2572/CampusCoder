/** The fair play rules. Shown on the login page and in the Terms, so the two always say the same thing. */
export function FairPlay() {
  return (
    <>
      <p>The boards are only fun if they are honest. Please do not:</p>
      <ul>
        <li>
          Inflate your scores, for example with fake or automated activity, copied work or
          extra accounts.
        </li>
        <li>Use the site to harass or embarrass anyone.</li>
        <li>
          Scrape the site, overload it, or try to get around its security or its limits.
        </li>
      </ul>
      <p>
        <strong>
          Anyone who breaks these rules will be banned, and their record and scores will
          be removed.
        </strong>
      </p>
    </>
  );
}

/** The short, friendly version for the login page. The full rules, with the ban, are in the Terms. */
export function FairPlaySummary() {
  return (
    <>
      <p>
        Please play fair. The boards are only fun if the scores are honest, so no fake or
        automated activity, no extra accounts, no scraping or overloading the site, and no
        harassing anyone.
      </p>
      <p className="text-muted-foreground">
        Accounts that cheat can be removed. The full rules are in the{" "}
        <a
          href="/terms"
          target="_blank"
          className="text-foreground underline underline-offset-4"
        >
          Terms
        </a>
        .
      </p>
    </>
  );
}
