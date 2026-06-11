import EntityLandingPage from "@/components/admin/EntityLandingPage";
import { Home } from "lucide-react";
import { villages } from "@/data/villages";

export default function VillagesPage() {
  return (
    <EntityLandingPage
      title="Village"
      shortCode="VG"
      icon={Home}
      description="Manage village records and demographics."
      createHref="/admin/villages/create"
      listHref="/admin/villages/list"
      stats={[
        {
          label: "Villages",
          value: villages.length,
        },
        {
          label: "Hospitals",
          value: 12000,
        },
        {
          label: "Schools",
          value: 65000,
        },
      ]}
    />
  );
}