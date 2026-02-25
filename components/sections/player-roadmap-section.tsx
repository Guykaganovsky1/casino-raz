"use client";

import { useInViewOnce } from "@/lib/animations";

const roadmapSteps = [
  {
    number: "1",
    title: "בדקו רישיון",
    description: "האם יש רישיון חוקי כמו Curacao או MGA? בלי רישיון — לא נכנסים.",
    icon: "📜"
  },
  {
    number: "2",
    title: "בדקו תמיכה בעברית",
    description: "האם האתר תומך בשפה העברית או באנגלית ברורה?",
    icon: "🗣️"
  },
  {
    number: "3",
    title: "בדקו שיטות תשלום",
    description: "אילו אפשרויות הפקדה ומשיכה קיימות? כרטיס אשראי, ביטקוין, ארנק דיגיטלי?",
    icon: "💳"
  },
  {
    number: "4",
    title: "בדקו את הבונוסים",
    description: "האם הבונוסים הגיוניים? בלי דרישות מוגזמות או אותיות קטנות מסובכות?",
    icon: "🎁"
  },
  {
    number: "5",
    title: "בדקו תמיכה בנייד",
    description: "האם יש תמיכה בנייד? רוב המשתמשים בארץ משחקים מהטלפון.",
    icon: "📱"
  }
];

export function PlayerRoadmapSection() {
  const { ref, isInView } = useInViewOnce(0.1);

  return (
    <section className="mx-auto max-w-7xl px-4 py-24 bg-card/30 rounded-3xl my-8">
      <div className="text-center mb-12">
        <span
          className={`inline-block px-4 py-2 rounded-full bg-accent/20 text-accent text-sm font-bold mb-4 ${isInView ? "animate-fade-in" : "opacity-0"}`}
        >
          מרגישים אבודים?
        </span>
        <h2 className="font-heading text-2xl md:text-3xl font-black text-text-primary mb-4">
          מפת הדרכים לשחקן הישראלי
        </h2>
        <p className="text-text-secondary max-w-2xl mx-auto leading-relaxed">
          עולם הקזינו אונליין יכול להיות מבלבל. הנה 5 הדברים שחייבים לבדוק לפני שבוחרים קזינו:
        </p>
      </div>

      <div ref={ref as React.RefObject<HTMLDivElement>} className="space-y-6">
        {roadmapSteps.map((step, index) => (
          <div
            key={step.number}
            className={`flex items-start gap-4 p-6 rounded-xl bg-card-light/50 border border-border-glass hover:border-accent/30 transition-colors ${isInView ? "animate-slide-up" : "opacity-0"}`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-accent/20 border-2 border-accent flex items-center justify-center">
              <span className="font-heading font-bold text-accent text-lg">{step.number}</span>
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">{step.icon}</span>
                <h3 className="font-heading font-bold text-text-primary text-lg">{step.title}</h3>
              </div>
              <p className="text-text-secondary leading-relaxed">{step.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div
        className={`mt-10 text-center ${isInView ? "animate-fade-in" : "opacity-0"}`}
        style={{ animationDelay: "0.6s" }}
      >
        <p className="text-text-secondary">
          רק קזינו שעומד בכל הקריטריונים האלה שווה את הזמן והכסף שלכם.
        </p>
      </div>
    </section>
  );
}