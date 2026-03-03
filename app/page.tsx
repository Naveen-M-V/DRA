import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#073a2f] p-6 text-white">
      <div className="w-full max-w-xl rounded-2xl border border-emerald-500/40 bg-emerald-950/70 p-8 text-center">
        <h1 className="font-serif-display text-4xl font-extrabold">DRA Projects</h1>
        <p className="mt-3 text-white/80">Select a landing page</p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <Link
            href="/secura"
            className="rounded-xl bg-[#FFB800] px-5 py-3 text-lg font-bold text-black"
          >
            DRA Secura
          </Link>
          <Link
            href="/inara"
            className="rounded-xl bg-[#FFB800] px-5 py-3 text-lg font-bold text-black"
          >
            DRA Inara
          </Link>
        </div>
      </div>
    </main>
  );
}
