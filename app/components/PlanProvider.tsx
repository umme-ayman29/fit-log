"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { Workout } from "@/lib/types";

export interface PlanItem extends Workout {
  done: boolean;
}

const PLAN_KEY = "fitlog:plan";
const SAVED_KEY = "fitlog:saved";
export const PLAN_CAP = 5;

interface PlanContextValue {
  plan: PlanItem[];
  saved: PlanItem[];
  loaded: boolean;
  isPlanFull: boolean;
  addToPlan: (workout: Workout) => void;
  addToSaved: (workout: Workout) => void;
  removeFromPlan: (id: number) => void;
  removeFromSaved: (id: number) => void;
  markDone: (id: number) => void;
  toastMessage: string | null;
  showToast: (text: string) => void;
}

const PlanContext = createContext<PlanContextValue | null>(null);

function readStorage(key: string): PlanItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function PlanProvider({ children }: { children: React.ReactNode }) {
  const [plan, setPlan] = useState<PlanItem[]>([]);
  const [saved, setSaved] = useState<PlanItem[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    setPlan(readStorage(PLAN_KEY));
    setSaved(readStorage(SAVED_KEY));
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) window.localStorage.setItem(PLAN_KEY, JSON.stringify(plan));
  }, [plan, loaded]);

  useEffect(() => {
    if (loaded) window.localStorage.setItem(SAVED_KEY, JSON.stringify(saved));
  }, [saved, loaded]);

  const showToast = useCallback((text: string) => {
    setToastMessage(text);
    setTimeout(() => setToastMessage(null), 2500);
  }, []);

  const isPlanFull = plan.length >= PLAN_CAP;

  const addToPlan = useCallback(
    (workout: Workout) => {
      setPlan((prev) => {
        if (prev.some((w) => w.id === workout.id)) {
          showToast(`${workout.name} is already in today's plan`);
          return prev;
        }
        if (prev.length >= PLAN_CAP) {
          showToast("Today's plan is full (5/5)");
          return prev;
        }
        showToast("Added to today's plan");
        return [...prev, { ...workout, done: false }];
      });
    },
    [showToast]
  );

  const addToSaved = useCallback(
    (workout: Workout) => {
      setSaved((prev) => {
        if (prev.some((w) => w.id === workout.id)) {
          showToast(`${workout.name} is already saved`);
          return prev;
        }
        showToast("Saved for later");
        return [...prev, { ...workout, done: false }];
      });
    },
    [showToast]
  );

  const removeFromPlan = useCallback(
    (id: number) => {
      setPlan((prev) => prev.filter((w) => w.id !== id));
      showToast("Removed from today's plan");
    },
    [showToast]
  );

  const removeFromSaved = useCallback(
    (id: number) => {
      setSaved((prev) => prev.filter((w) => w.id !== id));
      showToast("Removed from saved");
    },
    [showToast]
  );

  const markDone = useCallback(
    (id: number) => {
      setPlan((prev) =>
        prev.map((w) => (w.id === id ? { ...w, done: !w.done } : w))
      );
      showToast("Marked as done");
    },
    [showToast]
  );

  return (
    <PlanContext.Provider
      value={{
        plan,
        saved,
        loaded,
        isPlanFull,
        addToPlan,
        addToSaved,
        removeFromPlan,
        removeFromSaved,
        markDone,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </PlanContext.Provider>
  );
}

export function usePlan() {
  const ctx = useContext(PlanContext);
  if (!ctx) throw new Error("usePlan must be used within PlanProvider");
  return ctx;
}