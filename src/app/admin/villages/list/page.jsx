import EntityTable from "@/components/admin/EntityTable";
import { villages } from "@/data/villages";

export default function VillagesListPage() {
  return (
    <EntityTable
  title="Villages"
  data={villages}
  createHref="/admin/villages/create"
  editBasePath="/admin/villages/edit"
  viewBasePath="/admin/villages"
/>
  );
}