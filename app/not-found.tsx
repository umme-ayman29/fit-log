import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[70vh] max-w-[1400px] flex-col items-center justify-center px-5 text-center sm:px-8">
      <p className="text-xs font-bold tracking-[0.15em] text-[#A3E635]">
        ERROR 404
      </p>
      <h1 className="mt-3 text-4xl font-extrabold uppercase text-white sm:text-5xl">
        Page Not Found
      </h1>
      <p className="mt-4 max-w-md text-sm text-white/60 sm:text-base">
        The page you&apos;re looking for doesn&apos;t exist or has been moved. Let&apos;s get you back to training.
      </p>
      <Link
        href="/"
        className="mt-6 inline-block rounded-lg bg-[#A3E635] px-5 py-3 text-sm font-bold uppercase tracking-wide text-[#0F1115] transition-transform hover:scale-[1.03]"
      >
        Back to Workouts
      </Link>
    </section>
  );
}