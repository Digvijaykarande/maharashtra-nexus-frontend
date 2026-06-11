import EntityTable from "@/components/admin/EntityTable";
import { districts } from "@/data/districts";

export default function DistrictsListPage() {
  return (
    <EntityTable
  title="Districts"
  data={districts}
  createHref="/admin/districts/create"
  editBasePath="/admin/districts/edit"
  viewBasePath="/admin/districts"
/>
  );
}