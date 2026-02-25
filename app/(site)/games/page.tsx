import type { Metadata } from "next";
import { TopDevelopers } from "@/components/sections/top-developers";
import { PageHero } from "@/components/ui/page-hero";
import { Breadcrumb } from "@/components/ui/breadcrumb";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://askgamblers.co.il";

export const metadata: Metadata = {
  title: "משחקי קזינו - סלוטים ורולטה 2026",
  description: "גלו משחקי קזינו אונליין מהמפתחים המובילים — סלוטים, רולטה, בלאקג׳ק ועוד עם גרפיקה מרהיבה וזכיות גדולות — מצאו את המשחק שלכם והתחילו לשחק עכשיו",
  alternates: {
    canonical: `${SITE_URL}/games`,
  },
  openGraph: {
    title: "משחקי קזינו - סלוטים ורולטה 2026",
    description: "גלו משחקי קזינו אונליין מהמפתחים המובילים — סלוטים, רולטה, בלאקג׳ק ועוד",
    url: `${SITE_URL}/games`,
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630 }],
    type: "website",
  },
  robots: "index, follow",
};

export default function GamesPage() {
  return (
    <>
      <PageHero
        title="משחקים מהמפתחים המובילים בעולם"
        subtitle="גרפיקה מדהימה, אחוז החזר גבוה וחוויית משחק בלתי נשכחת"
        badge="משחקי פרמיום"
      />
      <Breadcrumb items={[{ label: "דף הבית", href: "/" }, { label: "משחקים" }]} />
      <div className="mx-auto max-w-7xl px-4 py-16">
        <TopDevelopers />
      </div>
    </>
  );
}
