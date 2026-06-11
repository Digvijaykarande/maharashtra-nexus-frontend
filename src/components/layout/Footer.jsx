import Link from "next/link";
import Container from "./Container";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <Container>
        <div className="grid gap-12 py-10 md:grid-cols-4">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500 font-bold text-white">
                MN
              </div>

              <span className="font-bold text-lg">
                Maharashtra Nexus
              </span>
            </div>

            <p className="mt-4 text-slate-600">
              Administrative Intelligence Platform
              for Maharashtra.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h4 className="font-semibold">
              Explore
            </h4>

            <div className="mt-4 flex flex-col gap-3 text-slate-600">
              <Link href="/divisions">Divisions</Link>
              <Link href="#">Districts</Link>
              <Link href="#">Talukas</Link>
              <Link href="#">Villages</Link>
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold">
              Company
            </h4>

            <div className="mt-4 flex flex-col gap-3 text-slate-600">
              <Link href="/about">About</Link>
              <Link href="/contact">Contact</Link>
            </div>
          </div>

          {/* Stats */}
          <div>
            <h4 className="font-semibold">
              Network
            </h4>

            <div className="mt-4 space-y-3 text-slate-600">
              <p>36 Districts</p>
              <p>358 Talukas</p>
              <p>43K+ Villages</p>
            </div>
          </div>

        </div>

        <div className="border-t border-slate-200 py-4 text-center text-sm text-slate-500">
          © 2026 Maharashtra Nexus. All rights reserved.
        </div>
      </Container>
    </footer>
  );
}