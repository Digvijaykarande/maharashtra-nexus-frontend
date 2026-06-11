import { notFound } from "next/navigation";

import HierarchyPage from "@/components/admin/HierarchyPage";

import { districts } from "@/data/districts";
import { coordinates } from "@/data/coordinates";

export default async function DistrictPage({
  params,
}) {
  const { slug } = await params;

  const district = districts.find(
    (d) => d.slug === slug
  );

  if (!district) {
    notFound();
  }

  const coords =
    coordinates[slug] || {
      lat: 19.7515,
      lng: 75.7139,
    };

  return (
    <HierarchyPage
      title={district.name}
      description={
        district.description ||
        "Administrative district of Maharashtra."
      }
      stats={[
        {
          label: "Talukas",
          value: district.talukas || 0,
        },
        {
          label: "Villages",
          value: district.villages || 0,
        },
        {
          label: "Population",
          value:
            district.population?.toLocaleString() || 0,
        },
      ]}
      mapProps={{
        lat: coords.lat,
        lng: coords.lng,
        slug: district.slug,
        placeName: district.name,
        mode: "single",
      }}
      createTitle="Create Taluka"
      exploreTitle="Explore Talukas"
      createHref="/admin/talukas/create"
      exploreHref="/admin/talukas/list"
    />
  );
}