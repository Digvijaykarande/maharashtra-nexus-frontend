import { notFound } from "next/navigation";

import HierarchyPage from "@/components/admin/HierarchyPage";

import { talukas } from "@/data/talukas";
import { coordinates } from "@/data/coordinates";

export default async function TalukaPage({
  params,
}) {
  const { slug } = await params;

  const taluka = talukas.find(
    (t) => t.slug === slug
  );

  if (!taluka) {
    notFound();
  }

  const coords =
    coordinates[slug] || {
      lat: 19.7515,
      lng: 75.7139,
    };

  return (
    <HierarchyPage
      title={taluka.name}
      description={
        taluka.description ||
        `${taluka.name} Taluka`
      }
      stats={[
        {
          label: "Villages",
          value: taluka.villages || 0,
        },
        {
          label: "Population",
          value:
            taluka.population?.toLocaleString() || 0,
        },
        {
          label: "Hospitals",
          value: taluka.hospitals || 0,
        },
      ]}
      mapProps={{
        lat: coords.lat,
        lng: coords.lng,
        slug: taluka.slug,
        placeName: taluka.name,
        mode: "single",
      }}
      createTitle="Create Village"
      exploreTitle="Explore Villages"
      createHref="/admin/villages/create"
      exploreHref="/admin/villages/list"
    />
  );
}