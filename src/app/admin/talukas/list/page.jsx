import EntityTable from "@/components/admin/EntityTable";
import { talukas } from "@/data/talukas";

export default function TalukasListPage() {
  return (
    <EntityTable
  title="Talukas"
  data={talukas}
  createHref="/admin/talukas/create"
  editBasePath="/admin/talukas/edit"
  viewBasePath="/admin/talukas"
/>
  );
}