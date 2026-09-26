"use client";

import { usePlan } from "./PlanProvider";

export default function Toast() {
  const { toastMessage } = usePlan();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-5 left-1/2 z-[100] -translate-x-1/2 rounded-lg border border-white/10 bg-[#15171C] px-4 py-3 text-sm font-medium text-white shadow-xl sm:bottom-6 sm:left-auto sm:right-5 sm:translate-x-0">
      {toastMessage}
    </div>
  );
}