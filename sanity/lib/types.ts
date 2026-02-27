/**
 * Sanity Document Types
 * Comprehensive TypeScript interfaces for all Sanity documents
 */

import type { Image as SanityImage } from "sanity";

// Common slug type from Sanity
export interface SanitySlug {
  _type: "slug";
  current: string;
}

// Portable Text block
export interface PortableTextBlock {
  _type: "block";
  _key: string;
  style: "normal" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "blockquote";
  children: Array<{
    _type: "span";
    _key: string;
    text: string;
    marks: string[];
  }>;
  markDefs: Array<{
    _type: string;
    _key: string;
    [key: string]: unknown;
  }>;
}

// Author document
export interface Author {
  _id: string;
  _type: "author";
  name: string;
  avatar?: SanityImage;
  bio?: string;
}

// Category document
export interface Category {
  _id: string;
  _type: "category";
  name: string;
  slug: SanitySlug;
  description?: string;
  icon?: SanityImage;
  casinoCount?: number;
  postCount?: number;
}

// Category with nested casinos and posts (from CATEGORY_BY_SLUG_QUERY)
export interface CategoryDetail extends Category {
  casinos?: Array<{
    _id: string;
    name: string;
    slug: SanitySlug;
    logo?: SanityImage;
    rating: number;
    description: string;
    bonusTitle?: string;
    bonusAmount?: string;
  }>;
  posts?: Array<{
    _id: string;
    title: string;
    slug: SanitySlug;
    featuredImage?: SanityImage;
    publishedAt: string;
    author?: Author;
  }>;
}

// FAQ item for casinos
export interface FAQItem {
  question: string;
  answer: string;
}

// Casino document
export interface Casino {
  _id: string;
  _type: "casino";
  name: string;
  slug: SanitySlug;
  logo?: SanityImage;
  icon?: string;
  rating: number;
  description: string;
  seoTitle?: string;
  seoDescription?: string;
  bonusTitle?: string;
  bonusAmount?: string;
  wageringRequirement?: string;
  pros?: string[];
  cons?: string[];
  faqs?: FAQItem[];
  affiliateLink?: string;
  featured?: boolean;
  clicks?: number;
  faqs?: FAQItem[];
  categories?: Array<{
    _id: string;
    name: string;
    slug: SanitySlug;
  }>;
}

// Blog post document
export interface BlogPost {
  _id: string;
  _type: "post";
  title: string;
  slug: SanitySlug;
  featuredImage?: SanityImage;
  body?: PortableTextBlock[];
  excerpt?: string;
  publishedAt: string;
  modifiedAt?: string;
  seoTitle?: string;
  seoDescription?: string;
  author?: Author;
  categories?: Array<{
    _id: string;
    name: string;
    slug: SanitySlug;
  }>;
  // Mega-guide fields
  isMegaGuide?: boolean;
  targetKeyword?: string;
  keywords?: string[];
  relatedCasinos?: Casino[];
  estimatedReadTime?: number;
}

// Software Provider document
export interface SoftwareProvider {
  _id: string;
  _type: "softwareProvider";
  name: string;
  slug: SanitySlug;
  logo?: SanityImage;
  description?: string;
  featured?: boolean;
}

// Query response types
export type CasinoQueryResult = Omit<Casino, "slug"> & {
  slug: SanitySlug;
};

export type BlogPostQueryResult = Omit<BlogPost, "slug"> & {
  slug: SanitySlug;
};

export type CategoryQueryResult = Omit<Category, "slug"> & {
  slug: SanitySlug;
};

export type SoftwareProviderQueryResult = Omit<SoftwareProvider, "slug"> & {
  slug: SanitySlug;
};

// Array types for queries returning multiple documents
export type CasinoList = Casino[];
export type BlogPostList = BlogPost[];
export type CategoryList = Category[];
export type SoftwareProviderList = SoftwareProvider[];

// FAQ Item for casino pages
export interface FAQItem {
  question: string;
  answer: string;
}

// Re-export SanityImage for consumer modules
export type { SanityImage };
