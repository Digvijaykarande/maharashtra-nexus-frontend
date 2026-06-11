import { cities } from "@/data/cities";
import AdminDetailsPage from "@/components/admin/AdminDetailsPage";

export default async function Page({
  params,
}) {
  const { slug } = await params;

  const city = cities.find(
    (c) => c.slug === slug
  );

  if (!city)
    return <div>City Not Found</div>;

  return (
    <AdminDetailsPage
      title={city.name}
      subtitle="City Details"
      data={city}
      basePath="/admin/cities"
      stats={[
        {
          title: "Population",
          value: city.population,
        },
      ]}
    />
  );
}