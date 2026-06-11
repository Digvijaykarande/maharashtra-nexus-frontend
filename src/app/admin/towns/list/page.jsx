import EntityTable from "@/components/admin/EntityTable";
import { towns } from "@/data/towns";

export default function TownsListPage() {
  return (
    <EntityTable
      title="Towns"
      data={towns}
      createHref="/admin/towns/create"
      editBasePath="/admin/towns/edit"
    />
  );
}