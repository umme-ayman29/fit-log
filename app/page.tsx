"use client";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0F1115]">
      <Navbar />

      <section className="pt-[72px]">
        <Hero />

        {/* এরপর Library section এখানে বসবে, id="library" সহ */}
      </section>
    </main>
  );
}