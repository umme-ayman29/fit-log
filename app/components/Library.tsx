"use client";

import { useEffect, useState } from "react";
import { Workout } from "@/lib/types";
import WorkoutCard from "./WorkoutCard";

export default function Library() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("https://api.abcz.workers.dev/api/fitlog")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((data: Workout[]) => {
        setWorkouts(data);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  return (
    <section
      id="library"
      className="mx-auto max-w-[1400px] px-5 py-12 sm:px-8 lg:py-16"
    >
      <div className="mb-8">
        <h2 className="text-2xl font-bold uppercase text-white sm:text-3xl">
          The Library
        </h2>
        <p className="mt-1 text-sm text-white/50">
          Twelve lifts covering every major muscle group.
        </p>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center gap-3 py-20">
          <div className="h-9 w-9 animate-spin rounded-full border-4 border-white/10 border-t-[#A3E635]" />
          <p className="text-sm text-white/50">Loading workouts…</p>
        </div>
      ) : error ? (
        <p className="py-20 text-center text-sm text-white/50">
          Couldn&apos;t load workouts. Please try again later.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {workouts.map((workout) => (
            <WorkoutCard key={workout.id} workout={workout} />
          ))}
        </div>
      )}
    </section>
  );
}