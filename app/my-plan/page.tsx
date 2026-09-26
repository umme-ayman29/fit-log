"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePlan, PlanItem } from "../components/PlanProvider";

type Tab = "today" | "saved";
type SortKey = "duration" | "calories" | "rating";

const SORT_LABELS: Record<SortKey, string> = {
  duration: "Duration",
  calories: "Calories",
  rating: "Rating",
};

export default function MyPlanPage() {
  const { plan, saved, loaded, removeFromPlan, removeFromSaved, markDone } =
    usePlan();
  const [tab, setTab] = useState<Tab>("today");
  const [sortKey, setSortKey] = useState<SortKey>("duration");
  const [sortOpen, setSortOpen] = useState(false);

  const activeList = tab === "today" ? plan : saved;

  const sortedList = useMemo(() => {
    const list = [...activeList];
    list.sort((a, b) => {
      if (sortKey === "duration") return a.duration - b.duration;
      if (sortKey === "calories") return a.caloriesBurned - b.caloriesBurned;
      return b.rating - a.rating;
    });
    return list;
  }, [activeList, sortKey]);

  const totalExercises = plan.length;
  const totalMinutes = plan.reduce((sum, w) => sum + w.duration, 0);
  const totalCalories = plan.reduce((sum, w) => sum + w.caloriesBurned, 0);

  return (
    <section className="mx-auto max-w-[1400px] px-5 py-10 sm:px-8 lg:py-14">
      <h1 className="text-3xl font-extrabold uppercase text-white sm:text-4xl">
        My Plan
      </h1>
      <p className="mt-1 text-sm text-white/50">
        Cap of five lifts for today. Finish them, then load more.
      </p>

      <div className="mt-6 grid grid-cols-1 divide-y divide-white/10 rounded-xl border border-white/10 bg-[#15171C] sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        <Stat label="Exercises" value={totalExercises} accent />
        <Stat label="Minutes" value={totalMinutes} />
        <Stat label="Calories" value={totalCalories} />
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="inline-flex w-fit rounded-full border border-white/10 bg-[#15171C] p-1">
          <button
            onClick={() => setTab("today")}
            className={`rounded-full px-4 py-1.5 text-xs font-bold uppercase transition-colors sm:text-sm ${
              tab === "today"
                ? "bg-white text-[#0F1115]"
                : "text-white/60 hover:text-white"
            }`}
          >
            Today&apos;s Plan
          </button>
          <button
            onClick={() => setTab("saved")}
            className={`rounded-full px-4 py-1.5 text-xs font-bold uppercase transition-colors sm:text-sm ${
              tab === "saved"
                ? "bg-white text-[#0F1115]"
                : "text-white/60 hover:text-white"
            }`}
          >
            Saved
          </button>
        </div>

        <div className="relative w-fit">
          <button
            onClick={() => setSortOpen((v) => !v)}
            className="flex items-center gap-2 rounded-lg border border-white/10 bg-[#15171C] px-3 py-2 text-xs font-medium text-white/80 sm:text-sm"
          >
            <span className="text-white/40">Sort By</span>
            {SORT_LABELS[sortKey]}
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>
          {sortOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setSortOpen(false)} />
              <div className="absolute right-0 z-20 mt-2 w-36 overflow-hidden rounded-lg border border-white/10 bg-[#15171C] shadow-xl">
                {(Object.keys(SORT_LABELS) as SortKey[]).map((key) => (
                  <button
                    key={key}
                    onClick={() => {
                      setSortKey(key);
                      setSortOpen(false);
                    }}
                    className={`block w-full px-3 py-2 text-left text-xs sm:text-sm ${
                      sortKey === key
                        ? "bg-[#A3E635]/10 text-[#A3E635]"
                        : "text-white/70 hover:bg-white/5"
                    }`}
                  >
                    {SORT_LABELS[key]}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      <div className="mt-5">
        {!loaded ? (
          <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-white/10 py-20">
            <div className="h-9 w-9 animate-spin rounded-full border-4 border-white/10 border-t-[#A3E635]" />
            <p className="text-sm text-white/50">Loading workouts…</p>
          </div>
        ) : sortedList.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="flex flex-col gap-3">
            {sortedList.map((item) => (
              <PlanRow
                key={item.id}
                item={item}
                tab={tab}
                onRemove={() =>
                  tab === "today" ? removeFromPlan(item.id) : removeFromSaved(item.id)
                }
                onMarkDone={tab === "today" ? () => markDone(item.id) : undefined}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function Stat({ label, value, accent }: { label: string; value: number; accent?: boolean }) {
  return (
    <div className="px-5 py-4">
      <p className="text-xs uppercase tracking-wide text-white/40">{label}</p>
      <p className={`mt-1 text-2xl font-extrabold ${accent ? "text-[#A3E635]" : "text-white"}`}>
        {value}
      </p>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-white/15 py-20 text-center">
      <h3 className="text-lg font-extrabold uppercase text-white">Nothing here yet</h3>
      <p className="max-w-xs text-sm text-white/50">
        Browse the library and add a lift to get today moving.
      </p>
      <Link
        href="/"
        className="mt-2 rounded-full bg-[#A3E635] px-5 py-2.5 text-xs font-bold uppercase tracking-wide text-[#0F1115] transition-transform hover:scale-[1.03] sm:text-sm"
      >
        Go to workouts
      </Link>
    </div>
  );
}

function PlanRow({
  item,
  tab,
  onRemove,
  onMarkDone,
}: {
  item: PlanItem;
  tab: Tab;
  onRemove: () => void;
  onMarkDone?: () => void;
}) {
  return (
    <div className="flex flex-col gap-4 rounded-xl border border-white/10 bg-[#15171C] p-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-4">
        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg">
          <Image src={item.image} alt={item.name} fill sizes="64px" className="object-cover" />
        </div>
        <div>
          <h3 className={`text-sm font-bold uppercase sm:text-base ${item.done ? "text-white/40 line-through" : "text-white"}`}>
            {item.name}
          </h3>
          <p className="text-xs text-white/50">{item.equipment}</p>
          <div className="mt-1 flex items-center gap-3 text-xs text-white/60">
            <span className="flex items-center gap-1">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="9" />
                <path d="M12 7v5l3 3" />
              </svg>
              {item.duration} min
            </span>
            <span className="flex items-center gap-1">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2c1 3-2 4-2 7a4 4 0 0 0 8 0c0-1-.5-2-1-3 1 4-1 5-2 5-2 0-2-2-1-4-2 1-3 3-3 5a5 5 0 0 0 10 0c0-5-4-6-7-10z" />
              </svg>
              {item.caloriesBurned} kcal
            </span>
            <span className="flex items-center gap-1">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="#A3E635">
                <path d="M12 2.5l2.9 6.2 6.8.7-5.1 4.6 1.5 6.7L12 17.3l-6.1 3.4 1.5-6.7-5.1-4.6 6.8-.7z" />
              </svg>
              {item.rating}
            </span>
          </div>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-2 self-end sm:self-auto">
        <Link
          href={`/workout/${item.id}`}
          className="rounded-lg border border-white/20 px-3 py-2 text-xs font-bold uppercase text-white transition-colors hover:border-[#A3E635] sm:text-sm"
        >
          View Details
        </Link>

        {tab === "today" && onMarkDone && (
          <button
            onClick={onMarkDone}
            className={`flex items-center gap-1 rounded-lg px-3 py-2 text-xs font-bold uppercase transition-colors sm:text-sm ${
              item.done ? "bg-white/10 text-white/60" : "bg-[#A3E635] text-[#0F1115] hover:scale-[1.03]"
            }`}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <path d="M5 13l4 4L19 7" />
            </svg>
            {item.done ? "Done" : "Mark as Done"}
          </button>
        )}

        <button
          onClick={onRemove}
          aria-label="Remove"
          className="flex h-8 w-8 items-center justify-center rounded-lg text-white/40 transition-colors hover:bg-white/10 hover:text-white"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}