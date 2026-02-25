import type { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import { POSTS_QUERY } from "@/sanity/lib/queries";
import { BlogPost } from "@/sanity/lib/types";
import { BlogCard } from "@/components/ui/blog-card";
import { PageHero } from "@/components/ui/page-hero";
import { Breadcrumb } from "@/components/ui/breadcrumb";

export const revalidate = 60;

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://askgamblers.co.il";

export const metadata: Metadata = {
  title: "בלוג קזינו - מדריכים וטיפים 2026",
    description: "קראו מאמרים מקצועיים, מדריכים מפורטים וטיפים לקזינו אונליין — למדו אסטרטגיות, שפרו את המשחק והפכו לשחקנים חכמים יותר היום",
  alternates: {
    canonical: `${baseUrl}/blog`,
  },
  openGraph: {
    title: "בלוג קזינו - מדריכים וטיפים 2026",
  description: "קראו מאמרים מקצועיים, מדריכים מפורטים וטיפים לקזינו אונליין — למדו אסטרטגיות, שפרו את המשחק והפכו לשחקנים חכמים יותר היום",
    type: "website",
    url: `${baseUrl}/blog`,
  },
};

export default async function BlogPage() {
  const posts = await client.fetch<BlogPost[]>(POSTS_QUERY);

  return (
    <>
      <PageHero
        title="המדריך שיהפוך אתכם לשחקנים חכמים יותר"
        subtitle="טיפים מקצועיים, אסטרטגיות מנצחות ועדכוני ענף ישירות מהמומחים"
        badge="תוכן מקצועי"
      />
      <Breadcrumb items={[{ label: "דף הבית", href: "/" }, { label: "בלוג" }]} />
      <div className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, i) => (
            <BlogCard key={post._id} {...post} index={i} />
          ))}
        </div>
      </div>
    </>
  );
}
