"use client";

import { Workout } from "@/lib/types";
import { usePlan } from "./PlanProvider";

export default function DetailActions({ workout }: { workout: Workout }) {
  const { addToPlan, addToSaved, isPlanFull } = usePlan();

  return (
    <div className="flex flex-wrap gap-3">
      <button
        onClick={() => addToPlan(workout)}
        disabled={isPlanFull}
        title={isPlanFull ? "Today's plan is full (5/5)" : undefined}
        className="rounded-lg bg-[#A3E635] px-5 py-3 text-sm font-bold uppercase tracking-wide text-[#0F1115] transition-transform hover:scale-[1.03] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100"
      >
        Add to today&apos;s plan
      </button>

      <button
        onClick={() => addToSaved(workout)}
        className="rounded-lg border border-white/20 px-5 py-3 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:border-[#A3E635]"
      >
        Save for later
      </button>
    </div>
  );
}