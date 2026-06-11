import EntityTable from "@/components/admin/EntityTable";
import { cities } from "@/data/cities";

export default function CitiesListPage() {
  return (
    <EntityTable
      title="Cities"
      data={cities}
      createHref="/admin/cities/create"
      editBasePath="/admin/cities/edit"
    />
  );
}