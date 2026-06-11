import EntityForm from "./EntityForm";

export default function EditEntityForm(
  props
) {
  return (
    <EntityForm
      {...props}
      mode="edit"
    />
  );
}