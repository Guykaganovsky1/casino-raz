import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { POSTS_QUERY, FEATURED_CASINOS_QUERY } from "@/sanity/lib/queries";
import { BlogPost, Casino } from "@/sanity/lib/types";
import { urlFor } from "@/sanity/lib/image";
import { formatDate } from "@/lib/utils";
import { StarRating } from "@/components/ui/star-rating";
import { PageHero } from "@/components/ui/page-hero";
import { Breadcrumb } from "@/components/ui/breadcrumb";


// Helper function to generate deterministic view counts from post IDs
function viewsCount(id: string): number {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    const char = id.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash % 9000) + 1000;
}
export const revalidate = 60;

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://askgamblers.co.il";

export const metadata: Metadata = {
  title: "חדשות קזינו 2026 - עדכונים שוטפים",
  description: "עקבו אחר חדשות הקזינו האחרונות — בונוסים חדשים, קזינו חדשים, טיפים מקצועיים ומדריכים למשחקי הימור אונליין. עדכונים שוטפים עבור שחקנים ישראלים.",
  alternates: {
    canonical: `${SITE_URL}/news`,
  },
  openGraph: {
    title: "חדשות קזינו 2026 - עדכונים שוטפים",
    description: "עקבו אחר חדשות הקזינו האחרונות — בונוסים חדשים, קזינו חדשים, טיפים מקצועיים ומדריכים למשחקי הימור אונליין.",
    url: `${SITE_URL}/news`,
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630 }],
    type: "website",
  },
  robots: "index, follow",
};

async function getNewsData() {
  try {
    const [posts, casinos] = await Promise.all([
      client.fetch<BlogPost[]>(POSTS_QUERY),
      client.fetch<Casino[]>(FEATURED_CASINOS_QUERY),
    ]);
    return {
      posts: posts ?? [],
      casinos: casinos ?? [],
    };
  } catch {
    return { posts: [], casinos: [] };
  }
}

export default async function NewsPage() {
  const { posts, casinos } = await getNewsData();
  const recentPosts = posts.slice(0, 5);
  const topCasinos = casinos.slice(0, 6);

  return (
    <div className="min-h-screen bg-background">
      <PageHero
        title="תמיד צעד אחד לפני כולם"
        subtitle="עדכונים שוטפים מעולם הקזינו — בונוסים חדשים, קזינו חדשים וטיפים שלא תמצאו בשום מקום אחר"
        badge="חדשות קזינו"
      />
      <Breadcrumb items={[{ label: "דף הבית", href: "/" }, { label: "חדשות" }]} />

      <div className="mx-auto max-w-7xl px-4 pb-20">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Main Content - Articles Grid */}
          <div className="lg:col-span-2">
            <div className="grid gap-8 grid-cols-1 md:grid-cols-2">
              {posts.map((post) => (
                <article
                  key={post._id}
                  className="group flex flex-col rounded-2xl overflow-hidden bg-card/40 border border-border-glass/30 hover:border-accent/50 transition-all duration-300 hover:shadow-2xl hover:shadow-accent/10"
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden bg-gradient-to-br from-accent/20 to-transparent">
                    {post.featuredImage ? (
                      <Image
                        src={urlFor(post.featuredImage).url()}
                        alt={post.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-5xl bg-gradient-to-br from-accent/10 to-accent/5">
                        📰
                      </div>
                    )}
                    {/* Category Tag */}
                    {post.categories && post.categories[0] && (
                      <div className="absolute top-4 right-4 inline-flex items-center gap-2 bg-accent/90 text-white px-3 py-1 rounded-lg text-xs font-bold">
                        <span className="w-2 h-2 bg-white rounded-full" />
                        {post.categories[0].name}
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 flex flex-col p-5 gap-3">
                    <div className="flex items-center gap-3 text-xs text-text-muted/70 font-medium">
                      <time dateTime={post.publishedAt}>
                        {post.publishedAt
                          ? formatDate(new Date(post.publishedAt))
                          : "עכשיו"}
                      </time>
                      <span>•</span>
                      <span>👁️ {viewsCount(post._id)} צפיות</span>
                    </div>

                    <h3 className="font-heading text-lg font-black text-text-primary group-hover:text-accent transition-colors line-clamp-2">
                      <Link href={`/blog/${post.slug.current}`}>
                        {post.title}
                      </Link>
                    </h3>

                    <p className="text-sm text-text-muted line-clamp-2 flex-1">
                      {post.excerpt || "מאמר חדש בקטגוריית קזינו אונליין"}
                    </p>

                    <Link
                      href={`/blog/${post.slug.current}`}
                      className="text-accent hover:text-accent-light font-bold text-sm transition-colors flex items-center gap-2 self-start mt-auto"
                    >
                      קרא עוד
                      <span>→</span>
                    </Link>
                  </div>
                </article>
              ))}
            </div>

          </div>

          {/* Sidebar */}
          <div className="flex flex-col gap-8">
            {/* About This Category */}
            <div className="rounded-2xl bg-gradient-to-br from-accent/10 to-transparent border border-accent/20 p-6">
              <h3 className="font-heading text-lg font-black text-text-primary mb-3">
                אודות חדשות קזינו
              </h3>
              <p className="text-sm text-text-muted leading-relaxed">
                בחדשות הקזינו תמצאו את העדכונים העדכנית ביותר מעולם ההימורים
                האונליין. מטיפים לשחקנים, דרך כללים משפטיים, ועד להערכות
                אתרים חדשים.
              </p>
            </div>

            {/* חדשות אחרונות */}
            {recentPosts.length > 0 && (
              <div className="rounded-2xl bg-card/50 border border-border-glass/30 overflow-hidden">
                {/* Header */}
                <div className="px-5 py-4 border-b border-border-glass/20 flex items-center gap-2">
                  <span className="text-accent text-lg">🔴</span>
                  <h3 className="font-heading text-base font-black text-text-primary">
                    חדשות אחרונות
                  </h3>
                </div>

                {/* News list */}
                <div className="divide-y divide-border-glass/15">
                  {recentPosts.map((post) => (
                    <Link
                      key={post._id}
                      href={`/blog/${post.slug.current}`}
                      className="flex gap-3 p-4 hover:bg-accent/5 transition-colors group"
                    >
                      {/* Thumbnail */}
                      <div className="flex-shrink-0 w-[90px] h-[90px] rounded-lg overflow-hidden bg-gradient-to-br from-card-light to-card border border-border-glass/20">
                        {post.featuredImage ? (
                          <Image
                            src={urlFor(post.featuredImage).url()}
                            alt={post.title}
                            width={90}
                            height={90}
                            sizes="90px"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-3xl bg-gradient-to-br from-accent/10 to-accent/5">
                            📰
                          </div>
                        )}
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                        <p className="font-heading text-sm font-bold text-text-primary group-hover:text-accent transition-colors line-clamp-3 leading-snug">
                          {post.title}
                        </p>
                        <div className="flex items-center gap-1.5 mt-2">
                          <svg className="w-3 h-3 text-text-muted/50 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
                          </svg>
                          <time className="text-xs text-text-muted/60">
                            {post.publishedAt
                              ? formatDate(new Date(post.publishedAt))
                              : "עכשיו"}
                          </time>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

                {/* Footer */}
                <div className="px-5 py-3 border-t border-border-glass/20 text-center">
                  <Link
                    href="/news"
                    className="text-xs text-accent hover:text-accent-light font-bold transition-colors"
                  >
                    צפה בכל החדשות →
                  </Link>
                </div>
              </div>
            )}

            {/* קזינו מובילים */}
            {topCasinos.length > 0 && (
              <div className="rounded-2xl bg-card/50 border border-border-glass/30 overflow-hidden">
                {/* Header */}
                <div className="px-5 py-4 border-b border-border-glass/20 flex items-center gap-2">
                  <span className="text-accent text-lg">💎</span>
                  <h3 className="font-heading text-base font-black text-text-primary">
                    קזינו מובילים
                  </h3>
                </div>

                {/* Casino list */}
                <div className="divide-y divide-border-glass/15">
                  {topCasinos.map((casino) => (
                    <Link
                      key={casino._id}
                      href={`/casinos/${casino.slug.current}`}
                      className="flex gap-3 p-4 hover:bg-accent/5 transition-colors group"
                    >
                      {/* Logo */}
                      <div className="flex-shrink-0 w-[72px] h-[72px] rounded-lg overflow-hidden bg-gradient-to-br from-card-light to-card border border-border-glass/20">
                        {casino.logo ? (
                          <Image
                            src={urlFor(casino.logo).width(144).height(144).url()}
                            alt={casino.name}
                            width={72}
                            height={72}
                            className="w-full h-full object-contain p-1"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-2xl">
                            🎰
                          </div>
                        )}
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-heading font-black text-sm text-text-primary group-hover:text-accent transition-colors truncate">
                          {casino.name}
                        </h4>
                        <div className="mt-0.5 mb-1.5" dir="ltr">
                          <StarRating rating={casino.rating} size="sm" />
                        </div>
                        <p className="text-xs text-text-muted leading-relaxed line-clamp-2">
                          {casino.bonusTitle && casino.bonusAmount
                            ? `${casino.bonusTitle}: ${casino.bonusAmount}`
                            : casino.description}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>

                {/* Footer link */}
                <div className="px-5 py-3 border-t border-border-glass/20 text-center">
                  <Link
                    href="/casinos"
                    className="text-xs text-accent hover:text-accent-light font-bold transition-colors"
                  >
                    צפה בכל בתי הקזינו →
                  </Link>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
