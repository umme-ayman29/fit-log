"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavbarProps = {
  planCount?: number;
  savedCount?: number;
};

export default function Navbar({
  planCount = 0,
  savedCount = 0,
}: NavbarProps) {
  const pathname = usePathname();

  const isWorkoutsActive = pathname === "/";
  const isMyPlanActive = pathname === "/my-plan";

  return (
    <header className="fixed left-0 top-0 z-50 w-full bg-[#0F1115]">
      <div className="mx-auto flex h-[72px] max-w-[1400px] items-center px-5 sm:px-8">
        {/* LEFT - LOGO */}
        <div className="flex flex-1 items-center">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="FitLog logo"
              width={38}
              height={38}
              className="h-[38px] w-[38px] object-contain"
              priority
            />
            <span className="text-xl font-extrabold tracking-[0.08em] text-white">
              FITLOG
            </span>
          </Link>
        </div>

       {/* CENTER - NAV LINKS */}
<nav className="flex flex-none items-center gap-2">
  <Link
    href="/#library"
    className={`rounded-full px-4 py-1.5 text-sm font-bold !no-underline transition-colors ${
      isWorkoutsActive
        ? "bg-[#A3E635]/20 !text-[#A3E635]"
        : "!text-gray-300 hover:!text-white"
    }`}
  >
    Workouts
  </Link>

  <Link
    href="/my-plan"
    className={`rounded-full px-4 py-1.5 text-sm font-bold !no-underline transition-colors ${
      isMyPlanActive
        ? "bg-[#A3E635]/20 !text-[#A3E635]"
        : "!text-gray-300 hover:!text-white"
    }`}
  >
    My Plan
  </Link>
</nav>

        {/* RIGHT - PLAN + SAVED */}
        <div className="flex flex-1 items-center justify-end gap-5">
          <Link
            href="/my-plan"
            className="flex items-center gap-2"
            aria-label="Today's plan count"
          >
            <span className="text-sm font-medium text-white/80">Plan</span>
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#A3E635] text-xs font-extrabold text-[#0F1115]">
              {planCount}
            </span>
          </Link>

          <Link
            href="/my-plan"
            className="flex items-center gap-2"
            aria-label="Saved count"
          >
            <span className="text-sm font-medium text-white/80">Saved</span>
            <span className="flex h-6 w-6 items-center justify-center rounded-full border border-white/30 text-xs font-extrabold text-white">
              {savedCount}
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}