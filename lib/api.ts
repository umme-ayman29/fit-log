import { Workout } from "./types";

export async function getWorkoutById(id: string): Promise<Workout | null> {
  try {
    const res = await fetch(`https://api.abcz.workers.dev/api/fitlog/${id}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    const data = await res.json();
    return Array.isArray(data) ? data[0] ?? null : data ?? null;
  } catch (err) {
    console.error("Fetch error:", err);
    return null;
  }
}