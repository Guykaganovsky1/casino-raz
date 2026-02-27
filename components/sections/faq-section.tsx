"use client";

import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "האם קזינו אונליין חוקי בישראל?",
    answer: "נכון ל-2026, אין רגולציה רשמית על קזינו אונליין בישראל, אך שחקנים רבים פונים לאתרים עם רישיון בינלאומי חוקי. כל עוד אתם בוחרים קזינו עם רישיון Curacao או MGA — אתם בידיים טובות. אנחנו ממליצים רק על אתרים עם רישיון תקף ומוכר."
  },
  {
    question: "איך בוחרים קזינו אונליין בטוח?",
    answer: "לפני שנרשמים לקזינו כלשהו, בדקו את הדברים הבאים: 1) האם יש רישיון חוקי (Curacao, MGA)? 2) האם יש תמיכה בעברית? 3) אילו שיטות תשלום קיימות? 4) מה תנאי הבונוסים? 5) האם יש ביקורות חיוביות משחקנים אחרים? כל בתי הקזינו באתר שלנו עברו את כל הבדיקות האלה."
  },
  {
    question: "אילו שיטות תשלום מקובלות בקזינו אונליין?",
    answer: "רוב בתי הקזינו המובילים מקבלים: כרטיסי אשראי בינלאומיים (ויזה, מאסטרקארד), העברות בנקאיות, ארנקים דיגיטליים (Skrill, Neteller), ומטבעות קריפטוגרפיים (Bitcoin, Ethereum, USDT). חשוב לבדוק זמני עיבוד ועמלות לפני בחירת שיטת תשלום."
  },
  {
    question: "מה זה בונוס הרשמה ואיך מממשים אותו?",
    answer: "בונוס הרשמה הוא הטבה שמקבלים עם הפקדה ראשונה, בדרך כלל התאמה של 100%-200% מסכום ההפקדה + סיבובים חינם. חשוב לקרוא את תנאי הבונוס — במיוחד את דרישות ההימור (Wagering Requirements) שקובעות כמה פעמים צריך להמר על הכסף לפני שניתן למשוך אותו."
  },
  {
    question: "כמה זמן לוקח לקבל את הכסף אחרי זכייה?",
    answer: "זמן המשיכה תלוי בשיטת התשלום ובקזינו עצמו. קריפטו — מיידי עד 24 שעות. ארנקים דיגיטליים — 24-48 שעות. העברות בנקאיות — 3-7 ימי עסקים. כרטיסי אשראי — 3-5 ימי עסקים. אנחנו ממליצים על קזינו עם זמני משיכה מהירים."
  }
];

function FAQItem({ item, index }: { item: FAQItem; index: number }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="animate-fade-in border border-border-glass rounded-xl overflow-hidden bg-card-light/30"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 text-right hover:bg-card-light/50 transition-colors"
        aria-expanded={isOpen}
      >
        <span className="font-heading font-bold text-text-primary pr-4">{item.question}</span>
        <span
          className="text-accent flex-shrink-0 transition-transform duration-200"
          style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </button>
      <div
        className="overflow-hidden transition-all duration-300"
        style={{ maxHeight: isOpen ? '2000px' : '0', opacity: isOpen ? 1 : 0 }}
      >
        <p className="px-5 pb-5 text-text-secondary leading-relaxed">{item.answer}</p>
      </div>
    </div>
  );
}

export function FAQSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-24">
      {/* Section Header */}
      <div className="flex items-center gap-2 mb-10">
        <div className="w-1 h-8 bg-accent rounded" />
        <h2 className="font-heading text-2xl md:text-3xl font-black text-text-primary">
          שאלות נפוצות על קזינו אונליין בישראל
        </h2>
      </div>

      {/* FAQ Items */}
      <div className="space-y-4">
        {faqData.map((item, index) => (
          <FAQItem key={index} item={item} index={index} />
        ))}
      </div>

      {/* Schema Markup for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqData.map((item) => ({
              "@type": "Question",
              "name": item.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": item.answer
              }
            }))
          })
        }}
      />
    </section>
  );
}
