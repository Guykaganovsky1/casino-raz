"use client";

import Link from "next/link";
import Image from "next/image";
import { Casino } from "@/sanity/lib/types";
import { urlFor } from "@/sanity/lib/image";
import { StarRating } from "@/components/ui/star-rating";
import { Button } from "@/components/ui/button";

interface CasinoComparisonTableProps {
  casinos: Casino[];
}

export function CasinoComparisonTable({ casinos }: CasinoComparisonTableProps) {
  if (!casinos || casinos.length === 0) {
    return null;
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-border-glass bg-card-light/30">
      <table className="w-full">
        <thead>
          <tr className="border-b border-border-glass bg-card">
            <th className="px-4 py-4 text-right font-heading font-black text-text-primary">
              קזינו
            </th>
            <th className="px-4 py-4 text-center font-heading font-black text-text-primary">
              דירוג
            </th>
            <th className="px-4 py-4 text-center font-heading font-black text-text-primary">
              בונוס
            </th>
            <th className="px-4 py-4 text-center font-heading font-black text-text-primary">
              שפות
            </th>
            <th className="px-4 py-4 text-center font-heading font-black text-text-primary">
              פעולה
            </th>
          </tr>
        </thead>
        <tbody>
          {casinos.map((casino, idx) => (
            <tr
              key={casino._id}
              className={`border-b border-border-glass transition-colors hover:bg-card-light/50 ${
                idx % 2 === 0 ? "bg-transparent" : "bg-card/30"
              }`}
            >
              {/* Casino Name + Logo */}
              <td className="px-4 py-4">
                <div className="flex items-center gap-3">
                  {casino.logo && (
                    <div className="relative h-10 w-16 flex-shrink-0">
                      <Image
                        src={urlFor(casino.logo).width(64).url()}
                        alt={casino.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                  )}
                  <span className="font-bold text-text-primary">
                    {casino.name}
                  </span>
                </div>
              </td>

              {/* Rating */}
              <td className="px-4 py-4 text-center">
                <div className="flex justify-center gap-2">
                  <StarRating rating={casino.rating || 0} size="sm" />
                  <span className="font-bold text-accent text-sm">
                    {(casino.rating || 0).toFixed(1)}/10
                  </span>
                </div>
              </td>

              {/* Bonus Amount */}
              <td className="px-4 py-4 text-center">
                <div className="inline-block rounded-lg bg-accent/20 px-3 py-1">
                  <span className="font-black text-accent text-sm">
                    {casino.bonusAmount || "בונוס"}
                  </span>
                </div>
              </td>

              {/* Languages */}
              <td className="px-4 py-4 text-center">
                <span className="text-sm text-text-secondary">
                  עברית + אנגלית
                </span>
              </td>

              {/* CTA Button */}
              <td className="px-4 py-4 text-center">
                <Button
                  href={`/go/${casino.slug.current}`}
                  variant="primary"
                  className="whitespace-nowrap"
                >
                  שחק עכשיו
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Mobile-friendly version (card layout) */}
      <div className="md:hidden space-y-4 p-4">
        {casinos.map((casino) => (
          <div
            key={casino._id}
            className="rounded-lg border border-border-glass bg-card-light/50 p-4"
          >
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                {casino.logo && (
                  <div className="relative h-10 w-16 flex-shrink-0">
                    <Image
                      src={urlFor(casino.logo).width(64).url()}
                      alt={casino.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                )}
                <div>
                  <p className="font-bold text-text-primary">{casino.name}</p>
                  <div className="flex items-center gap-1">
                    <StarRating rating={casino.rating || 0} size="sm" />
                    <span className="text-xs text-accent font-bold">
                      {(casino.rating || 0).toFixed(1)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-3 space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-text-muted">בונוס:</span>
                <span className="font-bold text-accent">
                  {casino.bonusAmount}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-muted">שפות:</span>
                <span>עברית + אנגלית</span>
              </div>
            </div>

            <Button href={`/go/${casino.slug.current}`} variant="primary" className="w-full">
              שחק עכשיו
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
