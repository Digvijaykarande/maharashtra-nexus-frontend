import EntityTable from "@/components/admin/EntityTable";
import { colleges } from "@/data/colleges";

export default function CollegesListPage() {
  return (
    <EntityTable
      title="Colleges"
      data={colleges}
      createHref="/admin/colleges/create"
      editBasePath="/admin/colleges/edit"
    />
  );
}