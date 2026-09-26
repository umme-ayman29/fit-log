import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full bg-[#0F1115]">
      <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-3 border-t border-white/10 px-5 py-6 text-center sm:flex-row sm:px-8 sm:text-left">
        <div className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="FitLog logo"
            width={22}
            height={22}
            className="h-[20px] w-[20px] object-contain"
          />
          <span className="text-sm font-extrabold tracking-[0.08em] text-white">
            FITLOG
          </span>
        </div>

        <p className="text-xs text-white/40">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}