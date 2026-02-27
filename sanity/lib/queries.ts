import { groq } from "next-sanity";

// Casino queries
export const CASINOS_QUERY = groq`
  *[_type == "casino"] | order(rating desc) {
    _id,
    name,
    slug,
    logo,
    rating,
    description,
    bonusTitle,
    bonusAmount,
    featured,
    categories[]->{ _id, name, slug }
  }
`;

export const FEATURED_CASINOS_QUERY = groq`
  *[_type == "casino" && featured == true] | order(rating desc) [0...6] {
    _id,
    name,
    slug,
    logo,
    rating,
    description,
    bonusTitle,
    bonusAmount,
    categories[]->{ _id, name, slug }
  }
`;

export const CASINO_BY_SLUG_QUERY = groq`
  *[_type == "casino" && slug.current == $slug][0] {
    _id,
    name,
    slug,
    logo,
    rating,
    description,
    seoTitle,
    seoDescription,
    pros,
    cons,
    bonusTitle,
    bonusAmount,
    wageringRequirement,
    affiliateLink,
    featured,
    clicks,
    faqs,
    categories[]->{ _id, name, slug }
  }
`;

// Blog post queries
export const POSTS_QUERY = groq`
  *[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    featuredImage,
    publishedAt,
    author->{ name, avatar },
    categories[]->{ _id, name, slug },
    "excerpt": pt::text(body)[0..150] + "..."
  }
`;

export const LATEST_POSTS_QUERY = groq`
  *[_type == "post"] | order(publishedAt desc) [0...3] {
    _id,
    title,
    slug,
    featuredImage,
    publishedAt,
    author->{ name, avatar },
    categories[]->{ _id, name, slug }
  }
`;

export const POST_BY_SLUG_QUERY = groq`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    featuredImage,
    publishedAt,
    "modifiedAt": _updatedAt,
    body,
    seoTitle,
    seoDescription,
    author->{ name, avatar, bio },
    categories[]->{ _id, name, slug },
    isMegaGuide,
    targetKeyword,
    keywords,
    estimatedReadTime,
    relatedCasinos[]->{
      _id,
      name,
      slug,
      logo,
      rating,
      description,
      bonusTitle,
      bonusAmount,
      pros,
      cons,
      featured,
      categories[]->{ _id, name, slug }
    }
  }
`;

// Category queries
export const CATEGORIES_QUERY = groq`
  *[_type == "category"] | order(name asc) {
    _id,
    name,
    slug,
    description,
    icon,
    "casinoCount": count(*[_type == "casino" && references(^._id)]),
    "postCount": count(*[_type == "post" && references(^._id)])
  }
`;

export const CATEGORY_BY_SLUG_QUERY = groq`
  *[_type == "category" && slug.current == $slug][0] {
    _id,
    name,
    slug,
    description,
    icon,
    "casinos": *[_type == "casino" && references(^._id)] | order(rating desc) {
      _id, name, slug, logo, rating, description, bonusTitle, bonusAmount
    },
    "posts": *[_type == "post" && references(^._id)] | order(publishedAt desc) {
      _id, title, slug, featuredImage, publishedAt,
      author->{ name, avatar }
    }
  }
`;

// Software Provider queries
export const FEATURED_SOFTWARE_PROVIDERS_QUERY = groq`
  *[_type == "softwareProvider" && featured == true] | order(name asc) [0...12] {
    _id,
    name,
    slug,
    logo,
    description
  }
`;

// Affiliate redirect
export const CASINO_AFFILIATE_QUERY = groq`
  *[_type == "casino" && slug.current == $slug][0] {
    _id,
    affiliateLink,
    clicks
  }
`;

// Related posts query (posts in same categories)
export const RELATED_POSTS_QUERY = groq`
  *[_type == "post" && slug.current != $currentSlug && count(categories[@._ref in $categoryIds]) > 0] 
  | order(publishedAt desc) [0...3] {
    _id,
    title,
    slug,
    featuredImage,
    publishedAt,
    author->{ name, avatar },
    categories[]->{ _id, name, slug }
  }
`;

// Adjacent posts for navigation (prev/next)
export const ADJACENT_POSTS_QUERY = groq`
  {
    "prev": *[_type == "post" && publishedAt < $publishedAt] | order(publishedAt desc) [0] {
      _id, title, slug
    },
    "next": *[_type == "post" && publishedAt > $publishedAt] | order(publishedAt asc) [0] {
      _id, title, slug
    }
  }
`;

// Related casinos query (casinos in same categories)
export const RELATED_CASINOS_QUERY = groq`
  *[_type == "casino" && count(categories[@._ref in $categoryIds]) > 0]
  | order(rating desc) [0...4] {
    _id,
    name,
    slug,
    logo,
    rating,
    description,
    bonusTitle,
    bonusAmount,
    categories[]->{ _id, name, slug }
  }
`;

// Search queries
export const SEARCH_CASINOS_QUERY = groq`
  *[_type == "casino" && (name match $query || description match $query)] | order(rating desc) {
    _id,
    name,
    slug,
    logo,
    rating,
    description,
    bonusTitle,
    bonusAmount,
    featured,
    categories[]->{ _id, name, slug }
  }
`;

export const SEARCH_POSTS_QUERY = groq`
  *[_type == "post" && (title match $query || pt::text(body) match $query)] | order(publishedAt desc) {
    _id,
    title,
    slug,
    featuredImage,
    publishedAt,
    author->{ name, avatar },
    categories[]->{ _id, name, slug },
    "excerpt": pt::text(body)[0..150] + "..."
  }
`;
