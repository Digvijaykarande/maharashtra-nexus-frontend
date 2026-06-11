import EntityLandingPage from "@/components/admin/EntityLandingPage";
import { Landmark } from "lucide-react";
import { talukas } from "@/data/talukas";
import { villages } from "@/data/villages";

export default function TalukasPage() {
  return (
    <EntityLandingPage
      title="Taluka"
      shortCode="TL"
      icon={Landmark}
      description="Manage talukas and their villages."

      createHref="/admin/talukas/create"

      listHref="/admin/talukas/list"

      stats={[
        {
          label: "Talukas",
          value: talukas.length,
        },
        {
          label: "Villages",
          value: villages.length,
        },
        {
          label: "Cities",
          value: 520,
        },
      ]}
    />
  );
}