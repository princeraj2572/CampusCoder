import type { Metadata } from "next";
import { Bricolage_Grotesque, Instrument_Sans } from "next/font/google";
import { Suspense } from "react";
import { AuthLinks } from "@/components/auth-links";
import { SiteHeader, SiteHeaderFallback } from "@/components/site-header";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  axes: ["opsz", "wdth"],
});
const instrument = Instrument_Sans({ subsets: ["latin"], variable: "--font-instrument" });

export const metadata: Metadata = {
  title: "CampusCoders",
  description: "Coding leaderboards for our campus",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${bricolage.variable} ${instrument.variable} h-full antialiased`}
    >
      <body className="bg-background text-foreground flex min-h-full flex-col font-sans">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Suspense fallback={<SiteHeaderFallback />}>
            <SiteHeader
              authBar={
                <Suspense fallback={null}>
                  <AuthLinks variant="bar" />
                </Suspense>
              }
              authMenu={
                <Suspense fallback={null}>
                  <AuthLinks variant="menu" />
                </Suspense>
              }
            />
          </Suspense>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
