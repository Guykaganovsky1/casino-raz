import type { Metadata } from "next";
import { BonusCards } from "@/components/sections/bonus-cards";
import { PageHero } from "@/components/ui/page-hero";
import { Breadcrumb } from "@/components/ui/breadcrumb";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://askgamblers.co.il";

export const metadata: Metadata = {
  title: "בונוסים קזינו בטוח 2026 | כל ההצעות",
  description: "מצאו את הבונוסים הכי שווים לקזינו אונליין — בונוסי הפקדה, ספינים חינם וקאשבק בלעדי — השוו הצעות, בחרו את הבונוס המושלם והתחילו לזכות עכשיו",
  alternates: {
    canonical: `${SITE_URL}/bonuses`,
  },
  openGraph: {
    title: "בונוסים קזינו בטוח 2026 | כל ההצעות",
    description: "מצאו את הבונוסים הכי שווים לקזינו אונליין — בונוסי הפקדה, ספינים חינם וקאשבק בלעדי",
    url: `${SITE_URL}/bonuses`,
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630 }],
    type: "website",
  },
  robots: "index, follow",
};

export default function BonusesPage() {
  return (
    <>
      <PageHero
        title="בונוסים שווים יותר ממה שחשבתם"
        subtitle="קאשבק, ספינים חינם ובונוסי הפקדה — מצא את ההצעה שמכפילה את הכסף שלך"
        badge="הצעות בלעדיות"
      />
      <Breadcrumb items={[{ label: "דף הבית", href: "/" }, { label: "בונוסים" }]} />
      <div className="mx-auto max-w-7xl px-4 py-16">
        <BonusCards />
      </div>
    </>
  );
}
