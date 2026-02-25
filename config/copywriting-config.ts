/**
 * Copywriting Configuration
 * Benefit-focused copy for all major sections and CTAs
 * Based on copywriting best practices: AIDA, PAS, and USP frameworks
 */

export const SECTION_COPY = {
  // Casino section
  casinos: {
    heading: '10 קזינו אונליין מאושרים — נבדקו, דורגו ואושרו',
    subheading: 'בחרו מקזינו בדוקים ומדורגים',
    cta: 'גלו את כל 25 בתי הקזינו',
    description: 'כל קזינו בדוק, מדורג וממומלץ על ידי מומחים',
  },

  // Categories section
  categories: {
    heading: 'מצאו את המשחק המושלם שלכם',
    subheading: 'סוגי משחקים עבור כל שחקן',
    description: 'משחקים מהמפתחים המובילים בעולם',
  },

  // Blog section
  blog: {
    heading: 'טיפים מנצחים — המדריך השלם לשחקנים ישראלים 2026',
    subheading: 'למדו מחכמים של קזינו',
    cta: 'קראו כל המאמרים',
    description: 'אסטרטגיות, בונוסים וטיפים שנוצחים',
  },

  // Software providers section
  softwareProviders: {
    heading: 'משחקים מהמפתחים המובילים בעולם',
    subheading: 'הטכנולוגיה מאחורי הניצחון',
    description: 'טכנולוגיה מובטחת, משחקים יוצאי דופן',
  },
};

/**
 * Improved CTAs with benefit statements
 * These should replace generic "Learn More" type buttons
 */
export const CTA_COPY = {
  // Casino CTAs
  casino: {
    primary: 'שחקו בביטחון היום',
    secondary: 'קראו ביקורת מלאה',
    viewAll: 'גלו את כל 25 בתי הקזינו',
  },

  // Blog CTAs
  blog: {
    primary: 'קראו הטיפים',
    secondary: 'שמרו את זה',
    viewAll: 'קראו 50+ מאמרים',
  },

  // Software provider CTAs
  softwareProvider: {
    primary: 'צפו בגיימס',
    secondary: 'למדו עוד',
  },

  // Navigation CTAs
  navigation: {
    allCasinos: 'גלו את כל 25 בתי הקזינו',
    allPosts: 'קראו כל המאמרים',
    allCategories: 'בחרו משחק',
  },
};

/**
 * Hero Section Copy
 * Main value proposition with emotional resonance
 */
export const HERO_COPY = {
  headline: 'קזינו אונליין בטוח ורווחי — הבחירה המושכלת של אלפי שחקנים',
  subheading:
    'אנחנו בדקנו כל פרט של כל קזינו. אתם מקבלים בחירה בטוחה, מובטחת ומדורגת על ידי מומחים אמיתיים. לא עוד בזבוז זמן וכסף על קזינו לא אמינים.',
  cta1: 'בחרו קזינו בטוח היום',
  cta2: 'גלו טיפים מנצחים',
};

/**
 * Power Words & Emotional Triggers
 * Use these in copy to increase resonance
 */
export const POWER_WORDS = {
  // Trust & Safety
  trust: ['בטוח', 'מובטח', 'מומלץ', 'מאומת', 'בדוק'],
  // Winning & Results
  winning: ['נוצח', 'רוויח', 'תוצאה', 'הצלחה', 'ניצחון'],
  // Exclusivity
  exclusive: ['אך', 'רק', 'דבר אחד', 'יחיד', 'בלעדי'],
  // Urgency
  urgency: ['היום', 'עכשיו', 'מיד', 'לפני שיסתיים', 'שנית זו'],
};

/**
 * Copy Scoring Framework
 * Use this to evaluate existing copy
 * Scale: 0-10 for each dimension
 */
export interface CopyScore {
  attention: number; // Does it stop scrollers?
  clarity: number; // Can they understand it in 5 seconds?
  persuasiveness: number; // Does it create desire/urgency?
  emotionalResonance: number; // Does it feel relatable?
  ctaStrength: number; // Is action clear and compelling?
  overall: number; // Average of above
}

/**
 * Copy Testing Variations
 * A/B test these to find winners
 */
export const AB_TEST_VARIATIONS = {
  heroHeadline: {
    control: 'קזינו אונליין בטוח ורווחי',
    curiosity: 'החלק הסודי של קזינו שחקנים משתמשים',
    benefit: 'בחרו קזינו שמעניקים ניצחונות אמיתיים',
    urgency: 'מצאו את קזינו המנצח שלכם — מיד',
  },

  casinoCTA: {
    control: 'שחקו עכשיו',
    benefit: 'שחקו בביטחון היום',
    outcome: 'התחילו לנצח',
    urgency: 'הצטרפו עוד היום',
  },

  blogHeading: {
    control: 'מאמרים אחרונים',
    curiosity: 'סודות וטיפים מנצחים',
    benefit: 'למדו לנצח',
    emotion: 'הסיפורים של הניצחונות',
  },
};

/**
 * Messaging Framework for Different Channels
 */
export const CHANNEL_MESSAGING = {
  // Homepage - Lead with benefit & safety
  homepage: {
    primaryMessage: 'בטוח, מובטח, ורווחי',
    emotionalHook: 'לא עוד אי ודאות או הפסדים מיותרים',
    cta: 'בחרו קזינו בטוח היום',
  },

  // Email campaigns - Add urgency
  email: {
    subject: '[Variation 1] סוד בונוס 3:1 שקזינו לא רוצה שתדעו',
    subject2: '[Variation 2] כיצד 5,000 שחקנים הכפילו את הזכיות שלהם',
    primaryMessage: 'הטיפים החדשים שלנו מעניקים תוצאות',
  },

  // Social media - Emotional & urgent
  social: {
    hook: '🎰 5,000 שחקנים כבר בחרו בטוח. אתה הבא?',
    benefit: '⭐ קזינו בדוקים = ניצחונות ממשיים',
    cta: 'צא לראות איך »',
  },
};
