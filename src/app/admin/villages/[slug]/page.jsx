import { notFound } from "next/navigation";

import HierarchyPage from "@/components/admin/HierarchyPage";

import { villages } from "@/data/villages";
import { coordinates } from "@/data/coordinates";

export default async function VillagePage({
  params,
}) {
  const { slug } = await params;

  const village = villages.find(
    (v) => v.slug === slug
  );

  if (!village) {
    notFound();
  }

  const coords =
    coordinates[slug] || {
      lat: 19.7515,
      lng: 75.7139,
    };

  return (
    <HierarchyPage
      title={village.name}
      description={
        village.description ||
        "Village administrative information."
      }
      stats={[
        {
          label: "Population",
          value:
            village.population?.toLocaleString() || 0,
        },
        {
          label: "Hospitals",
          value: village.hospitals || 0,
        },
        {
          label: "Schools",
          value: village.schools || 0,
        },
      ]}
      mapProps={{
        lat: coords.lat,
        lng: coords.lng,
        slug: village.slug,
        placeName: village.name,
        mode: "single",
      }}
      createTitle="Create Hospital"
      exploreTitle="Explore Hospitals"
      createHref="/admin/hospitals/create"
      exploreHref="/admin/hospitals/list"
    />
  );
}