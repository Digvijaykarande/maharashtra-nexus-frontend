"use client";
import dynamic from "next/dynamic";

const VillageMap = dynamic(() => import("./VillageMap"), { ssr: false });

export default function VillageMapWrapper({ lat, lng, divisionSlug, placeName, mode = "division" }) {
  return (
    <VillageMap
      lat={lat}
      lng={lng}
      divisionSlug={divisionSlug}
      placeName={placeName}
      mode={mode}
    />
  );
}