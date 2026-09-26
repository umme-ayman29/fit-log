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
      <div className="mx-auto flex h-[64px] max-w-[1400px] items-center justify-between gap-2 px-3 sm:h-[72px] sm:px-5 lg:px-8">
        {/* LEFT - LOGO */}
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <Image
            src="/logo.png"
            alt="FitLog logo"
            width={38}
            height={38}
            className="h-[28px] w-[28px] object-contain sm:h-[38px] sm:w-[38px]"
            priority
          />
          <span className="text-base font-extrabold tracking-[0.08em] text-white sm:text-xl">
            FITLOG
          </span>
        </Link>

        {/* CENTER - NAV LINKS */}
        <nav className="flex shrink-0 items-center gap-1 sm:gap-2">
          <Link
            href="/#library"
            className={`whitespace-nowrap rounded-full px-2.5 py-1.5 text-xs font-bold !no-underline transition-colors sm:px-4 sm:text-sm ${
              isWorkoutsActive
                ? "bg-[#A3E635]/20 !text-[#A3E635]"
                : "!text-gray-300 hover:!text-white"
            }`}
          >
            Workouts
          </Link>

          <Link
            href="/my-plan"
            className={`whitespace-nowrap rounded-full px-2.5 py-1.5 text-xs font-bold !no-underline transition-colors sm:px-4 sm:text-sm ${
              isMyPlanActive
                ? "bg-[#A3E635]/20 !text-[#A3E635]"
                : "!text-gray-300 hover:!text-white"
            }`}
          >
            My Plan
          </Link>
        </nav>

        {/* RIGHT - PLAN + SAVED */}
        <div className="flex shrink-0 items-center gap-3 sm:gap-5">
          <Link
            href="/my-plan"
            className="flex items-center gap-1.5 sm:gap-2"
            aria-label="Today's plan count"
          >
            <span className="hidden text-sm font-medium text-white/80 sm:inline">
              Plan
            </span>
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#A3E635] text-xs font-extrabold text-[#0F1115]">
              {planCount}
            </span>
          </Link>

          <Link
            href="/my-plan"
            className="flex items-center gap-1.5 sm:gap-2"
            aria-label="Saved count"
          >
            <span className="hidden text-sm font-medium text-white/80 sm:inline">
              Saved
            </span>
            <span className="flex h-6 w-6 items-center justify-center rounded-full border border-white/30 text-xs font-extrabold text-white">
              {savedCount}
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}