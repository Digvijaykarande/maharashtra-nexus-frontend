import EntityTable from "@/components/admin/EntityTable";
import { schools } from "@/data/schools";

export default function SchoolsListPage() {
  return (
    <EntityTable
      title="Schools"
      data={schools}
      createHref="/admin/schools/create"
      editBasePath="/admin/schools/edit"
    />
  );
}