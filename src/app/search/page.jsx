"use client";

import { useState } from "react";
import Link from "next/link";

import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/layout/Footer";
import Container from "@/components/layout/Container";

import { Search } from "lucide-react";

import { divisions } from "@/data/divisions";
import { districts } from "@/data/districts";

export default function SearchPage() {
  const [query, setQuery] = useState("");

  const divisionResults = divisions.filter((division) =>
    division.name
      .toLowerCase()
      .includes(query.toLowerCase())
  );

  const districtResults = districts.filter((district) =>
    district.name
      .toLowerCase()
      .includes(query.toLowerCase())
  );

  return (
    <>
      <Navbar />

      <main>

        {/* Hero */}
        <section className="py-24">
          <Container>

            <div className="mx-auto max-w-4xl text-center">

              <span className="rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1 text-sm font-medium text-emerald-700">
                Maharashtra Search
              </span>

              <h1 className="mt-6 text-5xl font-bold lg:text-7xl">
                Search Administrative Data
              </h1>

              <p className="mt-6 text-lg text-slate-600">
                Search divisions, districts and administrative regions.
              </p>

            </div>

          </Container>
        </section>

        {/* Search Input */}
        <section className="pb-12">
          <Container>

            <div className="mx-auto max-w-3xl">

              <div className="flex items-center gap-3 rounded-2xl border border-black-200 bg-white px-5 py-4 shadow-sm">

                <Search
                  size={20}
                  className="text-slate-400"
                />

                <input
                  type="text"
                  placeholder="Search divisions or districts..."
                  value={query}
                  onChange={(e) =>
                    setQuery(e.target.value)
                  }
                  className="w-full outline-none"
                />

              </div>

            </div>

          </Container>
        </section>

        {/* Results */}
        <section className="pb-24">
          <Container>

            {query && (

              <div className="grid gap-10 lg:grid-cols-2">

                {/* Divisions */}
                <div>

                  <h2 className="text-2xl font-bold">
                    Divisions
                  </h2>

                  <div className="mt-6 space-y-4">

                    {divisionResults.map((division) => (

                      <Link
                        key={division.slug}
                        href={`/divisions/${division.slug}`}
                        className="block rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-emerald-300 hover:shadow-lg"
                      >
                        <h3 className="font-semibold">
                          {division.name}
                        </h3>
                      </Link>

                    ))}

                  </div>

                </div>

                {/* Districts */}
                <div>

                  <h2 className="text-2xl font-bold">
                    Districts
                  </h2>

                  <div className="mt-6 space-y-4">

                    {districtResults.map((district) => (

                      <Link
                        key={district.slug}
                        href={`/districts/${district.slug}`}
                        className="block rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-emerald-300 hover:shadow-lg"
                      >
                        <h3 className="font-semibold">
                          {district.name}
                        </h3>

                        <p className="mt-2 text-sm text-slate-500">
                          Headquarters: {district.headquarters}
                        </p>
                      </Link>

                    ))}

                  </div>

                </div>

              </div>

            )}

          </Container>
        </section>

      </main>

      <Footer />
    </>
  );
}