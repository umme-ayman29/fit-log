import Image from "next/image";
import { notFound } from "next/navigation";
import { getWorkoutById } from "@/lib/api";
import DetailActions from "@/app/components/DetailActions";

export default async function WorkoutDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const workout = await getWorkoutById(id);

  if (!workout) {
    notFound();
  }

  const specs = [
    { label: "Equipment", value: workout.equipment },
    { label: "Difficulty", value: workout.difficulty },
    { label: "Sets", value: workout.sets },
    { label: "Reps", value: workout.reps },
    { label: "Duration", value: `${workout.duration} min` },
    { label: "Calories", value: `${workout.caloriesBurned} kcal` },
    { label: "Rating", value: workout.rating },
  ];

  return (
    <section className="mx-auto grid max-w-[1400px] grid-cols-1 gap-10 px-5 py-10 sm:px-8 md:grid-cols-2 lg:py-14">
      <div className="relative h-72 w-full overflow-hidden rounded-2xl sm:h-96 md:h-full">
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
          priority
        />
      </div>

      <div>
        <h1 className="text-3xl font-extrabold uppercase text-white sm:text-4xl">
          {workout.name}
        </h1>
        <p className="mt-3 max-w-md text-sm text-white/60">
          {workout.description}
        </p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {workout.muscleGroups.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-[#A3E635]/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-[#A3E635]"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-6 divide-y divide-white/10 rounded-xl border border-white/10">
          {specs.map((spec) => (
            <div
              key={spec.label}
              className="flex items-center justify-between px-4 py-3 text-sm"
            >
              <span className="uppercase tracking-wide text-white/50">
                {spec.label}
              </span>
              <span className="font-semibold text-white">{spec.value}</span>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <h2 className="text-sm font-bold uppercase tracking-wide text-white">
            Instructions
          </h2>
          <ol className="mt-3 space-y-2 text-sm text-white/60">
            {workout.instructions.map((step, i) => (
              <li key={i} className="flex gap-2">
                <span className="font-bold text-[#A3E635]">{i + 1}.</span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-7">
          <DetailActions workout={workout} />
        </div>
      </div>
    </section>
  );
}