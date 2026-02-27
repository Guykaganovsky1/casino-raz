import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import { client } from "@/sanity/lib/client";
import {
  POST_BY_SLUG_QUERY,
  FEATURED_CASINOS_QUERY,
  RELATED_POSTS_QUERY,
  ADJACENT_POSTS_QUERY,
  RELATED_CASINOS_QUERY
} from "@/sanity/lib/queries";
import { BlogPost, Casino, SanityImage } from "@/sanity/lib/types";
import { urlFor } from "@/sanity/lib/image";
import { StarRating } from "@/components/ui/star-rating";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { BlogCard } from "@/components/ui/blog-card";
import { Button } from "@/components/ui/button";
import { SocialShare } from "@/components/ui/social-share";
import { generateArticleSchema, generateBreadcrumbSchema } from "@/lib/seo";
import { BlogGuideLayout } from "@/components/sections/blog-guide-layout";

export const revalidate = 60;

interface Props {
  params: Promise<{ slug: string }>;
}

interface AdjacentPost {
  _id: string;
  title: string;
  slug: { current: string };
}

interface AdjacentPosts {
  prev: AdjacentPost | null;
  next: AdjacentPost | null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await client.fetch<BlogPost>(POST_BY_SLUG_QUERY, { slug });
  if (!post) return {};
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://askgamblers.co.il";
  const title = post.seoTitle || post.title;
  const description = post.seoDescription || post.excerpt || "";
  return {
    title: `${title} | Ask Gamblers`,
    description,
    alternates: {
      canonical: `${baseUrl}/blog/${slug}`,
    },
    openGraph: {
      title,
      description,
      type: "article",
      url: `${baseUrl}/blog/${slug}`,
      publishedTime: post.publishedAt,
      modifiedTime: post.modifiedAt || post.publishedAt,
      authors: post.author?.name ? [post.author.name] : undefined,
    },
  };
}

const portableTextComponents = {
  types: {
    image: ({ value }: { value: SanityImage }) => (
      <div className="my-10 overflow-hidden rounded-xl">
        <Image
          src={urlFor(value).width(800).url()}
          alt={typeof value.alt === "string" ? value.alt : ""}
          width={800}
          height={450}
          className="w-full object-cover"
          loading="lazy"
          sizes="(max-width: 768px) 100vw, 800px"
        />
      </div>
    ),
  },
  block: {
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2 className="mt-10 mb-4 font-heading text-2xl font-black text-text-primary">{children}</h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 className="mt-8 mb-3 font-heading text-xl font-bold text-text-primary">{children}</h3>
    ),
    blockquote: ({ children }: { children?: React.ReactNode }) => (
      <blockquote className="border-r-4 border-accent pr-6 py-2 my-8 italic text-text-secondary bg-card-light/30 rounded-lg">
        {children}
      </blockquote>
    ),
  },
};

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const [post, topCasinos] = await Promise.all([
    client.fetch<BlogPost>(POST_BY_SLUG_QUERY, { slug }),
    client.fetch<Casino[]>(FEATURED_CASINOS_QUERY),
  ]);

  if (!post) notFound();

  // Fetch related posts and adjacent posts
  const categoryIds = post.categories?.map((c) => c._id) || [];
  const [relatedPosts, adjacentPosts, relatedCasinos] = await Promise.all([
    categoryIds.length > 0
      ? client.fetch<BlogPost[]>(RELATED_POSTS_QUERY, {
          currentSlug: slug,
          categoryIds
        })
      : [],
    post.publishedAt
      ? client.fetch<AdjacentPosts>(ADJACENT_POSTS_QUERY, {
          publishedAt: post.publishedAt
        })
      : { prev: null, next: null },
    categoryIds.length > 0
      ? client.fetch<Casino[]>(RELATED_CASINOS_QUERY, {
          categoryIds
        })
      : [],
  ]);

  const postUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'https://askgamblers.co.il'}/blog/${slug}`;

  return (
    <>
      {/* SECTION 1: Hero - Centered */}
      <div className="relative w-full h-[350px] md:h-[450px] overflow-hidden">
        {/* Background - Image or Placeholder */}
        {post.featuredImage ? (
          <>
            <Image
              src={urlFor(post.featuredImage).width(1400).url()}
              alt={post.title}
              fill
              sizes="100vw"
              className="object-cover"
              priority
            />
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/70" />
          </>
        ) : (
          /* Placeholder Gradient Background */
          <div className="absolute inset-0 bg-gradient-to-br from-accent/30 via-card to-background">
            {/* Decorative Elements */}
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-accent/20 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
            {/* Pattern Overlay */}
            <div className="absolute inset-0 opacity-10" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }} />
          </div>
        )}

        {/* Hero Content - Centered */}
        <div className="absolute inset-0 flex items-center justify-center px-4">
          <div className="max-w-3xl w-full text-center">
            {/* Category Badge */}
            {post.categories && post.categories.length > 0 && (
              <div className="mb-4">
                <span className="inline-block rounded-full bg-accent px-4 py-1.5 text-sm font-bold text-white">
                  {post.categories[0].name}
                </span>
              </div>
            )}
            {/* Title */}
            <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-black leading-tight text-white mb-6">
              {post.title}
            </h1>
            {/* Metadata */}
            <div className="flex items-center justify-center gap-4 text-sm text-white/80">
              {post.author && (
                <>
                  <span className="font-medium">{post.author.name}</span>
                  <span>•</span>
                </>
              )}
              {post.publishedAt && (
                <time>{new Date(post.publishedAt).toLocaleDateString("he-IL")}</time>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 2: Breadcrumb */}
      <Breadcrumb items={[{ label: "דף הבית", href: "/" }, { label: "בלוג", href: "/blog" }, { label: post.title }]} />

      {/* SECTION 3: Main Content with Sidebar */}
      <div className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid gap-12 lg:grid-cols-[1fr_340px]">
          {/* Main Content */}
          <article>
            {/* Article Content */}
            <div className="prose prose-invert max-w-none">
              {post.body && <PortableText value={post.body} components={portableTextComponents} />}
            </div>

            {/* Categories/Tags Section */}
            {post.categories && post.categories.length > 0 && (
              <div className="mt-12 pt-8 border-t border-border-glass">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="text-sm font-bold text-text-secondary">קטגוריות:</span>
                  {post.categories.map((category) => (
                    <Link
                      key={category._id}
                      href={`/categories/${category.slug.current}`}
                      className="px-4 py-2 rounded-full bg-card-light border border-border-glass text-sm text-text-secondary hover:border-accent/50 hover:text-accent transition-colors"
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Social Share */}
            <div className="mt-8 pt-8 border-t border-border-glass">
              <SocialShare url={postUrl} title={post.title} />
            </div>

            {/* Author Box */}
            {post.author && (
              <div className="mt-12 p-6 rounded-2xl bg-gradient-to-br from-card-light to-card border border-border-glass">
                <div className="flex items-start gap-4">
                  {/* Author Avatar */}
                  {post.author.avatar ? (
                    <div className="flex-shrink-0 w-16 h-16 rounded-full overflow-hidden bg-accent/20">
                      <Image
                        src={urlFor(post.author.avatar).width(128).height(128).url()}
                        alt={post.author.name}
                        width={128}
                        height={128}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    /* Avatar Placeholder */
                    <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-br from-accent to-accent-light flex items-center justify-center">
                      <span className="text-2xl font-bold text-white">
                        {post.author.name?.charAt(0) || '?'}
                      </span>
                    </div>
                  )}
                  {/* Author Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs text-accent font-bold">הכותב</span>
                    </div>
                    <h3 className="font-heading text-lg font-bold text-text-primary mb-2">
                      {post.author.name}
                    </h3>
                    {post.author.bio && (
                      <p className="text-sm text-text-secondary leading-relaxed">
                        {post.author.bio}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Post Navigation (Prev/Next) */}
            <div className="mt-12 pt-8 border-t border-border-glass">
              <div className="grid gap-4 md:grid-cols-2">
                {/* Previous Post */}
                <div className={`${adjacentPosts.prev ? '' : 'invisible'}`}>
                  <span className="text-xs text-text-muted mb-2 block">← הכתבה הקודמת</span>
                  {adjacentPosts.prev && (
                    <Link
                      href={`/blog/${adjacentPosts.prev.slug.current}`}
                      className="group block p-4 rounded-xl bg-card-light border border-border-glass hover:border-accent/50 transition-colors"
                    >
                      <h4 className="font-heading font-bold text-text-primary group-hover:text-accent transition-colors line-clamp-2">
                        {adjacentPosts.prev.title}
                      </h4>
                    </Link>
                  )}
                </div>
                {/* Next Post */}
                <div className={`text-left ${adjacentPosts.next ? '' : 'invisible'}`}>
                  <span className="text-xs text-text-muted mb-2 block">הכתבה הבאה →</span>
                  {adjacentPosts.next && (
                    <Link
                      href={`/blog/${adjacentPosts.next.slug.current}`}
                      className="group block p-4 rounded-xl bg-card-light border border-border-glass hover:border-accent/50 transition-colors"
                    >
                      <h4 className="font-heading font-bold text-text-primary group-hover:text-accent transition-colors line-clamp-2">
                        {adjacentPosts.next.title}
                      </h4>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-8">
              {/* Recommended Casinos Widget */}
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-1 h-6 bg-accent rounded" />
                  <h3 className="font-heading text-lg font-black text-text-primary">קזינו מומלצים</h3>
                </div>

                <div className="space-y-4">
                  {topCasinos.slice(0, 4).map((casino) => (
                    <div key={casino._id} className="group rounded-lg border border-border-card bg-card-light/50 p-4 hover:bg-card-light transition-colors">
                      <div className="flex gap-3">
                        {/* Casino Logo */}
                        {casino.logo && (
                          <div className="flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden bg-gradient-to-br from-accent to-accent-light flex items-center justify-center">
                            <Image
                              src={urlFor(casino.logo).width(80).height(80).url()}
                              alt={casino.name}
                              width={80}
                              height={80}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}

                        {/* Casino Info */}
                        <div className="flex-1 min-w-0">
                          <h4 className="font-heading font-bold text-text-primary text-sm truncate">{casino.name}</h4>
                          <div className="mt-1 flex items-center gap-1">
                            <StarRating rating={casino.rating} size="sm" />
                          </div>
                          {casino.bonusTitle && casino.bonusAmount && (
                            <p className="mt-2 text-xs text-accent font-medium">
                              {casino.bonusTitle} {casino.bonusAmount}
                            </p>
                          )}
                        </div>
                      </div>
                      
                      {/* CTA Button */}
                      <div className="mt-3">
                        <Button href={`/go/${casino.slug.current}`} variant="primary" className="w-full text-xs py-2">
                          שחק עכשיו
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* SECTION 4: Related Casinos */}
      {relatedCasinos.length > 0 && (
        <section className="py-16 bg-accent/5">
          <div className="mx-auto max-w-7xl px-4">
            {/* Section Title */}
            <div className="flex items-center gap-2 mb-10">
              <div className="w-1 h-8 bg-accent rounded" />
              <h2 className="font-heading text-2xl md:text-3xl font-black text-text-primary">
                קזינו מומלצים לכתבה זו
              </h2>
            </div>

            {/* Casinos Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {relatedCasinos.map((casino) => (
                <Link
                  key={casino._id}
                  href={`/casinos/${casino.slug.current}`}
                  className="group rounded-xl border border-border-glass bg-card-light/50 p-4 hover:bg-card-light hover:border-accent/50 transition-all"
                >
                  <div className="flex flex-col gap-3">
                    {casino.logo && (
                      <div className="w-full h-12 relative overflow-hidden rounded-lg bg-card flex items-center justify-center">
                        <Image
                          src={urlFor(casino.logo).width(200).height(100).url()}
                          alt={casino.name}
                          fill
                          className="object-contain"
                        />
                      </div>
                    )}
                    <div>
                      <h3 className="font-heading font-bold text-text-primary text-sm group-hover:text-accent transition-colors truncate">
                        {casino.name}
                      </h3>
                      <div className="mt-1 flex items-center justify-between">
                        <StarRating rating={casino.rating} size="sm" />
                        <span className="text-xs font-medium text-accent">
                          {casino.rating} ⭐
                        </span>
                      </div>
                    </div>
                    {casino.bonusAmount && (
                      <div className="text-xs text-accent font-medium pt-2 border-t border-border-glass/50">
                        {casino.bonusTitle} {casino.bonusAmount}
                      </div>
                    )}
                    <Button
                      href={`/go/${casino.slug.current}`}
                      variant="primary"
                      className="w-full text-xs py-2"
                      rel="nofollow sponsored"
                    >
                      בחר קזינו
                    </Button>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* SECTION 5: Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-16 bg-card/50">
          <div className="mx-auto max-w-7xl px-4">
            {/* Section Title */}
            <div className="flex items-center gap-2 mb-10">
              <div className="w-1 h-8 bg-accent rounded" />
              <h2 className="font-heading text-2xl md:text-3xl font-black text-text-primary">
                כתבות קשורות
              </h2>
            </div>

            {/* Posts Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map((relatedPost, index) => (
                <BlogCard
                  key={relatedPost._id}
                  title={relatedPost.title}
                  slug={relatedPost.slug}
                  featuredImage={relatedPost.featuredImage}
                  publishedAt={relatedPost.publishedAt}
                  author={relatedPost.author}
                  index={index}
                />
              ))}
            </div>
          </div>
        </section>
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            generateArticleSchema({
              title: post.title,
              slug: post.slug,
              excerpt: post.seoDescription || post.excerpt,
              publishedAt: post.publishedAt,
              author: post.author
                ? {
                    name: post.author.name,
                    image: post.author.avatar
                      ? urlFor(post.author.avatar).width(128).height(128).url()
                      : undefined,
                  }
                : undefined,
              featuredImage: post.featuredImage
                ? urlFor(post.featuredImage).width(1200).url()
                : undefined,
              body: post.body,
            })
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            generateBreadcrumbSchema([
              { name: "דף הבית", url: "/" },
              { name: "בלוג", url: "/blog" },
              { name: post.title, url: `/blog/${post.slug.current}` },
            ])
          ),
        }}
      />
    </>
  );
}
