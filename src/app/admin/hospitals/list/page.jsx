import EntityTable from "@/components/admin/EntityTable";
import { hospitals } from "@/data/hospitals";

export default function HospitalsListPage() {
  return (
    <EntityTable
      title="Hospitals"
      data={hospitals}
      createHref="/admin/hospitals/create"
      editBasePath="/admin/hospitals/edit"
    />
  );
}