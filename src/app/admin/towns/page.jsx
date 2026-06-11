import EntityLandingPage from "@/components/admin/EntityLandingPage";
import { MapPinned } from "lucide-react";
export default function TownsPage() {
  return (
    <EntityLandingPage
      title="Town"
      shortCode="TW"
      icon={MapPinned}
      description="Manage town records."
      createHref="/admin/towns/create"
      listHref="/admin/towns/list"
      stats={[
        {
          label: "Towns",
          value: 900,
        },
        {
          label: "Population",
          value: "2Cr+",
        },
        {
          label: "Schools",
          value: 22000,
        },
      ]}
    />
  );
}