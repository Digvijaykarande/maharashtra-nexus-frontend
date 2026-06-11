import EntityLandingPage from "@/components/admin/EntityLandingPage";
import {Building}from "lucide-react";
export default function CitiesPage() {
  return (
    <EntityLandingPage
      title="City"
      shortCode="CT"
      icon={Building}
      description="Manage urban city records."
      createHref="/admin/cities/create"
      listHref="/admin/cities/list"
      stats={[
        {
          label: "Cities",
          value: 520,
        },
        {
          label: "Population",
          value: "7Cr+",
        },
        {
          label: "Hospitals",
          value: 8000,
        },
      ]}
    />
  );
}