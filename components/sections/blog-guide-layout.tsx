"use client";

import Link from "next/link";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { Casino, BlogPost, SanityImage } from "@/sanity/lib/types";
import { urlFor } from "@/sanity/lib/image";
import { StarRating } from "@/components/ui/star-rating";
import { Button } from "@/components/ui/button";
import { CasinoComparisonTable } from "@/components/ui/casino-comparison-table";

interface BlogGuideLayoutProps {
  post: BlogPost;
  casinos: Casino[];
  portableTextComponents: any;
  topCasinos: Casino[];
  relatedCasinos: Casino[];
}

export function BlogGuideLayout({
  post,
  casinos,
  portableTextComponents,
  topCasinos,
  relatedCasinos,
}: BlogGuideLayoutProps) {
  // Get featured casinos for this guide (from relatedCasinos or top casinos)
  const featuredCasinos = casinos.slice(0, 8);

  return (
    <div className="flex flex-col gap-0">
      {/* Hero Section */}
      {post.featuredImage && (
        <div className="relative h-96 w-full overflow-hidden rounded-b-2xl">
          <Image
            src={urlFor(post.featuredImage).width(1200).url()}
            alt={post.title}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/40 to-background/90" />
          <div className="absolute inset-0 flex items-end p-8">
            <div className="max-w-4xl">
              <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
                {post.title}
              </h1>
              {post.seoDescription && (
                <p className="text-lg text-gray-200 max-w-2xl">
                  {post.seoDescription}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="mx-auto max-w-6xl px-4 py-12">
        {/* Main Content Grid: Sidebar + Body */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Featured Casinos Cards */}
            {featuredCasinos.length > 0 && (
              <section className="mb-12">
                <h2 className="text-3xl font-black mb-8 text-text-primary">
                  🏆 {featuredCasinos.length} קזינו מובילים
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {featuredCasinos.map((casino) => (
                    <CasinoFeaturedCard key={casino._id} casino={casino} />
                  ))}
                </div>
              </section>
            )}

            {/* Comparison Table */}
            {featuredCasinos.length > 0 && (
              <section className="mb-12">
                <h2 className="text-3xl font-black mb-6 text-text-primary">
                  📊 טבלת השוואה
                </h2>
                <CasinoComparisonTable casinos={featuredCasinos} />
              </section>
            )}

            {/* Main Body Content */}
            <section className="mb-12 prose prose-lg dark:prose-invert max-w-none">
              <PortableText value={post.body || []} components={portableTextComponents} />
            </section>

            {/* CTA Section */}
            <section className="mb-12 bg-gradient-to-r from-card-light to-card border border-border-glass rounded-2xl p-8">
              <h3 className="text-2xl font-black mb-4 text-text-primary">
                🎮 התחל לשחק עכשיו
              </h3>
              <p className="text-text-secondary mb-6">
                בחר אחד מהקזינו המובילים שלנו והתחל עם בונוסים בלעדיים:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {featuredCasinos.slice(0, 4).map((casino) => (
                  <Link key={casino._id} href={`/go/${casino.slug.current}`} className="block">
                    <div className="w-full px-4 py-2 bg-accent hover:bg-accent/90 text-white font-bold rounded-lg transition-colors text-center text-sm">
                      {casino.name} - {casino.bonusAmount || "בונוס בלעדי"}
                    </div>
                  </Link>
                ))}
              </div>
            </section>

            {/* FAQ Section */}
            <section className="mb-12">
              <h2 className="text-3xl font-black mb-8 text-text-primary">
                ❓ שאלות נפוצות
              </h2>
              <div className="space-y-4">
                {/* FAQ items will be rendered from post.body or custom FAQ field */}
                <div className="bg-card-light/30 rounded-lg p-6 border border-border-glass">
                  <h3 className="font-bold text-lg mb-2 text-text-primary">
                    איך בוחרים קזינו בטוח?
                  </h3>
                  <p className="text-text-secondary">
                    בדוק רישיון תקף, תנאי משחק ברורים, ותמיכה בעברית. כל הקזינו באתר עברו בדיקה מקיפה.
                  </p>
                </div>
                <div className="bg-card-light/30 rounded-lg p-6 border border-border-glass">
                  <h3 className="font-bold text-lg mb-2 text-text-primary">
                    מה הם דרישות הימור (Wagering Requirements)?
                  </h3>
                  <p className="text-text-secondary">
                    דרישות ההימור קובעות כמה פעמים צריך להמר על סכום הבונוס לפני משיכת רווחים.
                  </p>
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Read Time */}
              {post.estimatedReadTime && (
                <div className="bg-card-light/50 rounded-lg p-4 text-center">
                  <p className="text-sm text-text-muted">זמן קריאה משוער</p>
                  <p className="text-2xl font-black text-accent">
                    {post.estimatedReadTime} דק'
                  </p>
                </div>
              )}

              {/* Top Casinos Sidebar */}
              <div className="bg-gradient-to-br from-card-light to-card border border-border-glass rounded-xl p-6">
                <h3 className="font-heading font-black text-lg mb-4 text-text-primary">
                  🎰 קזינו מוביל
                </h3>
                <div className="space-y-3">
                  {topCasinos.slice(0, 3).map((casino) => (
                    <div key={casino._id} className="text-center">
                      {casino.logo && (
                        <div className="relative h-16 mb-2">
                          <Image
                            src={urlFor(casino.logo).width(120).url()}
                            alt={casino.name}
                            fill
                            className="object-contain"
                          />
                        </div>
                      )}
                      <p className="font-bold text-sm mb-1">{casino.name}</p>
                      <StarRating rating={casino.rating || 0} size="sm" />
                      <p className="text-xs text-accent font-bold my-2">
                        {casino.bonusAmount}
                      </p>
                      <Button href={`/go/${casino.slug.current}`} variant="primary" className="w-full">
                        שחק עכשיו
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Related Articles */}
              {relatedCasinos.length > 0 && (
                <div className="bg-card-light/50 rounded-lg p-4">
                  <p className="text-sm font-bold text-text-primary mb-3">
                    📌 קזינו קשורים:
                  </p>
                  <div className="space-y-2">
                    {relatedCasinos.slice(0, 5).map((casino) => (
                      <Link
                        key={casino._id}
                        href={`/casinos/${casino.slug.current}`}
                        className="block text-sm text-accent hover:text-accent/80 transition-colors"
                      >
                        → {casino.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <section className="mx-auto max-w-6xl px-4 py-12 w-full">
        <div className="bg-gradient-to-r from-accent/20 to-accent/10 border border-accent rounded-2xl p-8 text-center">
          <h2 className="text-2xl md:text-3xl font-black mb-4 text-text-primary">
            מוכנים להתחיל?
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto mb-8">
            בחרו קזינו מהרשימה שלנו והתחילו לשחק עם בונוסים בלעדיים ותשלומים מאובטחים.
          </p>
          <Button href="/casinos" variant="primary">
            גלו את כל קזינו ה-VIP שלנו →
          </Button>
        </div>
      </section>
    </div>
  );
}

// Featured Casino Card Component
function CasinoFeaturedCard({ casino }: { casino: Casino }) {
  return (
    <div className="bg-card-light border border-border-glass rounded-xl overflow-hidden hover:border-accent/50 transition-all">
      {/* Logo */}
      <div className="h-24 bg-gradient-to-b from-card to-card-light flex items-center justify-center p-4">
        {casino.logo && (
          <Image
            src={urlFor(casino.logo).width(120).url()}
            alt={casino.name}
            width={120}
            height={60}
            className="object-contain"
          />
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-heading font-black text-lg mb-2">{casino.name}</h3>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <StarRating rating={casino.rating || 0} size="sm" />
          <span className="font-bold text-accent">
            {(casino.rating || 0).toFixed(1)}/10
          </span>
        </div>

        {/* Bonus */}
        {casino.bonusAmount && (
          <div className="bg-accent/20 rounded-lg p-3 mb-4 text-center">
            <p className="text-xs text-text-muted">בונוס ברכישה ראשונה</p>
            <p className="font-black text-accent text-lg">{casino.bonusAmount}</p>
          </div>
        )}

        {/* Pros/Cons */}
        <div className="space-y-2 mb-4 text-sm">
          {casino.pros && casino.pros.length > 0 && (
            <div className="flex gap-2">
              <span>✅</span>
              <span className="text-text-secondary">{casino.pros[0]}</span>
            </div>
          )}
          {casino.cons && casino.cons.length > 0 && (
            <div className="flex gap-2">
              <span>⚠️</span>
              <span className="text-text-secondary">{casino.cons[0]}</span>
            </div>
          )}
        </div>

        {/* CTA */}
        <Button href={`/go/${casino.slug.current}`} variant="primary" className="w-full">
          שחק עכשיו - {casino.bonusAmount}
        </Button>
      </div>
    </div>
  );
}
