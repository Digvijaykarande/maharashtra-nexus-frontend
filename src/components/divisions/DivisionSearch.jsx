"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search } from "lucide-react";

export default function DivisionSearch({
  divisions,
  districts,
}) {
  const [query, setQuery] = useState("");

  const searchTerm =
    query.trim().toLowerCase();

  const divisionResults = useMemo(
    () =>
      searchTerm
        ? divisions.filter((d) =>
            d.name
              .toLowerCase()
              .includes(searchTerm)
          )
        : [],
    [searchTerm, divisions]
  );

  const districtResults = useMemo(
    () =>
      searchTerm
        ? districts.filter((d) =>
            d.name
              .toLowerCase()
              .includes(searchTerm)
          )
        : [],
    [searchTerm, districts]
  );

  return (
    <div className="relative mx-auto max-w-xl">
      {/* your search JSX here */}
    </div>
  );
}