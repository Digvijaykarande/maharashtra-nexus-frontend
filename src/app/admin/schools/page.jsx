import EntityLandingPage from "@/components/admin/EntityLandingPage";
import {School}from "lucide-react"
export default function SchoolsPage() {
  return (
    <EntityLandingPage
      title="School"
      shortCode="SC"
      icon={School}
      description="Manage school records."
      createHref="/admin/schools/create"
      listHref="/admin/schools/list"
      stats={[
        {
          label: "Schools",
          value: 65000,
        },
        {
          label: "Students",
          value: "2Cr+",
        },
        {
          label: "Teachers",
          value: "8L+",
        },
      ]}
    />
  );
}