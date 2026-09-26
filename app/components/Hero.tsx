import Image from "next/image";

export default function Hero() {
  return (
    <section className="mx-auto max-w-[1400px] px-5 pt-8 sm:px-8">
      <div className="relative overflow-hidden rounded-2xl bg-[#15171C] px-6 py-10 sm:px-10 sm:py-14 md:px-14">
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2">
          <div>
            <p className="mb-3 text-xs font-bold tracking-[0.15em] text-[#A3E635]">
              WORKOUT LIBRARY
            </p>

            <h1 className="text-4xl font-extrabold uppercase leading-[1.05] text-white sm:text-5xl">
              Train with intent.
              <br />
              Log every set.
            </h1>

            <p className="mt-4 max-w-md text-sm leading-relaxed text-white/60 sm:text-base">
              FitLog is a dark, no-nonsense gym companion: pick a lift, lock
              it into today&apos;s plan, and watch the week&apos;s work add
              up.
            </p>

            <a href="#library" className="mt-6 inline-block rounded-lg bg-[#A3E635] px-5 py-3 text-sm font-bold uppercase tracking-wide text-[#0F1115] transition-transform hover:scale-[1.03]">
              Browse Workouts
            </a>
          </div>

          <div className="relative mx-auto h-[220px] w-[220px] sm:h-[280px] sm:w-[280px]">
            <Image
              src="/banner.png"
              alt="FitLog hero illustration"
              fill
              sizes="280px"
              className="object-contain"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}