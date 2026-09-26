"use client";

import Navbar from "./components/Navbar";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F7F8FA]">
      <Navbar />

      {/* Navbar-এর নিচের content */}
      <section className="pt-[72px]">
        {/* তোমার Figma অনুযায়ী Hero/বাকি section এখানে থাকবে */}
      </section>
    </main>
  );
}