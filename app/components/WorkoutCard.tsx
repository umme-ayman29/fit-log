import Link from "next/link";
import Image from "next/image";
import { Workout } from "@/lib/types";

export default function WorkoutCard({ workout }: { workout: Workout }) {
  return (
    <Link
      href={`/workout/${workout.id}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-white/10 bg-[#15171C] transition-colors hover:border-[#A3E635]/50"
    >
      <div className="relative h-40 w-full overflow-hidden">
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          sizes="(max-width: 768px) 100vw, 300px"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex flex-wrap gap-1.5">
          {workout.muscleGroups.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-[#A3E635]/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-[#A3E635]"
            >
              {tag}
            </span>
          ))}
        </div>

        <h3 className="text-base font-bold uppercase text-white">
          {workout.name}
        </h3>
        <p className="text-xs text-white/50">{workout.equipment}</p>

        <div className="mt-auto flex items-center gap-3 pt-2 text-xs text-white/60">
          <span className="flex items-center gap-1">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="9" />
              <path d="M12 7v5l3 3" />
            </svg>
            {workout.duration} min
          </span>
          <span className="flex items-center gap-1">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2c1 3-2 4-2 7a4 4 0 0 0 8 0c0-1-.5-2-1-3 1 4-1 5-2 5-2 0-2-2-1-4-2 1-3 3-3 5a5 5 0 0 0 10 0c0-5-4-6-7-10z" />
            </svg>
            {workout.caloriesBurned} kcal
          </span>
          <span className="flex items-center gap-1">
  <svg width="13" height="13" viewBox="0 0 24 24" fill="#A3E635">
    <path d="M12 2.5l2.9 6.2 6.8.7-5.1 4.6 1.5 6.7L12 17.3l-6.1 3.4 1.5-6.7-5.1-4.6 6.8-.7z" />
  </svg>
  {workout.rating}
</span>
        </div>
      </div>
    </Link>
  );
}