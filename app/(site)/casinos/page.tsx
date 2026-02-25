import type { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import { CASINOS_QUERY } from "@/sanity/lib/queries";
import { Casino } from "@/sanity/lib/types";
import { CasinoFilter } from "@/components/ui/casino-filter";
import { PageHero } from "@/components/ui/page-hero";
import { Breadcrumb } from "@/components/ui/breadcrumb";

export const revalidate = 60;

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://askgamblers.co.il";

export const metadata: Metadata = {
  title: "קזינו בטוח בישראל - ביקורות 2026",
    description: "גלו את בתי הקזינו המובילים לישראלים עם ביקורות מקיפות, דירוגים שקופים ובונוסים בלעדיים — השוו אתרים והתחילו לשחק בקזינו הטוב ביותר עכשיו",
  alternates: {
    canonical: `${baseUrl}/casinos`,
  },
  openGraph: {
    title: "קזינו בטוח בישראל - ביקורות 2026",
  description: "גלו את בתי הקזינו המובילים לישראלים עם ביקורות מקיפות, דירוגים שקופים ובונוסים בלעדיים — השוו אתרים והתחילו לשחק בקזינו הטוב ביותר עכשיו",
    type: "website",
    url: `${baseUrl}/casinos`,
  },
};

export default async function CasinosPage() {
  const casinos = await client.fetch<Casino[]>(CASINOS_QUERY);

  return (
    <>
      <PageHero
        title="בתי קזינו מומלצים לישראלים"
        subtitle="ביקורות אמיתיות, דירוגים שקופים ובונוסים בלעדיים — כל מה שצריך כדי לשחק חכם"
        badge="קזינו מומלצים 2026"
      />
      <Breadcrumb items={[{ label: "דף הבית", href: "/" }, { label: "בתי קזינו" }]} />
      <div className="mx-auto max-w-7xl px-4 py-16">
        <CasinoFilter casinos={casinos} />
      </div>
    </>
  );
}
