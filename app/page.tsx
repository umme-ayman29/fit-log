"use client";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Library from "./components/Library";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0F1115]">
      <Navbar />

      <section className="pt-[64px] sm:pt-[72px]">
        <Hero />
        <Library />
      </section>
    </main>
  );
}