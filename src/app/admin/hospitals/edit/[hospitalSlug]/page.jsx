import { hospitals } from "@/data/hospitals";
import EntityForm from "@/components/forms/EntityForm";

export default async function EditHospitalPage({
  params,
}) {
  const { hospitalSlug } = await params;

  const hospital = hospitals.find(
    (h) => h.slug === hospitalSlug
  );

  if (!hospital) {
    return <div>Hospital not found</div>;
  }

  return (
    <EntityForm
      title="Hospital"
      mode="edit"
      initialData={hospital}
      redirectPath="/admin/hospitals"
      fields={[
        { name: "name", label: "Hospital Name" },
        { name: "type", label: "Type" },
        { name: "district", label: "District" },
        { name: "taluka", label: "Taluka" },
        { name: "beds", label: "Beds" },
        { name: "address", label: "Address" },
      ]}
    />
  );
}