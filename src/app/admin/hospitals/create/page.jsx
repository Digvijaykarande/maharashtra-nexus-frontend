import EntityForm from "@/components/forms/EntityForm";

export default function CreateHospitalPage() {
  return (
    <EntityForm
      title="Hospital"
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