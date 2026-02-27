import { defineField, defineType } from "sanity";

export default defineType({
  name: "post",
  title: "פוסט",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "כותרת",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "author",
      title: "כותב",
      type: "reference",
      to: [{ type: "author" }],
    }),
    defineField({
      name: "featuredImage",
      title: "תמונה ראשית",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "categories",
      title: "קטגוריות",
      type: "array",
      of: [{ type: "reference", to: [{ type: "category" }] }],
    }),
    defineField({
      name: "publishedAt",
      title: "תאריך פרסום",
      type: "datetime",
    }),
    defineField({
      name: "body",
      title: "תוכן",
      type: "array",
      of: [
        { type: "block" },
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            {
              name: "alt",
              type: "string",
              title: "טקסט חלופי",
            },
          ],
        },
      ],
    }),
    defineField({
      name: "seoTitle",
      title: "כותרת SEO",
      type: "string",
    }),
    defineField({
      name: "seoDescription",
      title: "תיאור SEO",
      type: "text",
      validation: (rule) => rule.max(160),
    }),
    defineField({
      name: "isMegaGuide",
      title: "מדריך ענק (3500+ מילים)",
      type: "boolean",
      description: "הפעל עבור פוסטים בעלי אורך 3500+ מילים עם טבלת השוואה וכרטיסי קזינו",
      initialValue: false,
    }),
    defineField({
      name: "targetKeyword",
      title: "מילת מפתח ראשית",
      type: "string",
      description: "המילה/ביטוי המרכזי שאתה ממטרה (לדוג' 'קזינו אונליין בישראל')",
    }),
    defineField({
      name: "keywords",
      title: "מילות מפתח משניות",
      type: "array",
      of: [{ type: "string" }],
      description: "ביטויים נוספים להשלגת (לדוג' 'בונוסי קזינו', 'קזינו בטוח')",
    }),
    defineField({
      name: "relatedCasinos",
      title: "קזינו להתאים",
      type: "array",
      of: [{ type: "reference", to: [{ type: "casino" }] }],
      description: "בחר את הקזינו להציג כקרטיסים ובטבלת השוואה",
    }),
    defineField({
      name: "estimatedReadTime",
      title: "זמן קריאה משוער (דקות)",
      type: "number",
      description: "יחושב אוטומטית (בעדכון הפוסט)",
    }),
  ],
});
