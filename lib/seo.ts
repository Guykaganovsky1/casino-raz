const SITE_NAME = "Ask Gamblers";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://askgamblers.co.il";
const SITE_DESCRIPTION = "המדריך המלא לקזינו אונליין";

export interface ArticlePost {
  title: string;
  slug: { current: string };
  excerpt?: string;
  publishedAt?: string;
  modifiedAt?: string;
  author?: {
    name: string;
    image?: string;
  };
  featuredImage?: string;
  body?: unknown;
}

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export function generateArticleSchema(post: ArticlePost) {
  const articleUrl = `${SITE_URL}/blog/${post.slug.current}`;

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": articleUrl,
    },
    headline: post.title,
    description: post.excerpt || SITE_DESCRIPTION,
    image: post.featuredImage ? [post.featuredImage] : undefined,
    datePublished: post.publishedAt,
    dateModified: post.modifiedAt || post.publishedAt,
    author: post.author
      ? {
          "@type": "Person",
          name: post.author.name,
          image: post.author.image,
        }
      : {
          "@type": "Organization",
          name: SITE_NAME,
          url: SITE_URL,
        },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.svg`,
        width: 600,
        height: 120,
      },
    },
    inLanguage: "he-IL",
    isAccessibleForFree: true,
  };
}

export function generateBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${SITE_URL}${item.url}`,
    })),
  };
}

export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/og-image.png`,
      width: 1200,
      height: 630,
    },
    description: SITE_DESCRIPTION,
    inLanguage: "he-IL",
    areaServed: "IL",
    knowsAbout: ["Online Casino", "Casino Bonuses", "Online Gambling", "קזינו אונליין", "בונוסי קזינו"],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      availableLanguage: ["Hebrew", "English"],
    },
  };
}

export function generateWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    inLanguage: "he-IL",
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
  };
}

export function organizationJsonLd() {
  return generateOrganizationSchema();
}

export function webSiteJsonLd() {
  return generateWebSiteSchema();
}

export interface FAQItem {
  question: string;
  answer: string;
}

export function generateFAQSchema(faqs: FAQItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}
