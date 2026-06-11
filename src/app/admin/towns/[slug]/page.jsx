import { towns } from "@/data/towns";
import AdminDetailsPage from "@/components/admin/AdminDetailsPage";

export default async function Page({
  params,
}) {
  const { slug } = await params;

  const town = towns.find(
    (t) => t.slug === slug
  );

  if (!town)
    return <div>Town Not Found</div>;

  return (
    <AdminDetailsPage
      title={town.name}
      subtitle="Town Details"
      data={town}
      basePath="/admin/towns"
      stats={[
        {
          title: "Population",
          value: town.population,
        },
      ]}
    />
  );
}