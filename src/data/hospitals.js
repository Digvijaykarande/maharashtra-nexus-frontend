export const hospitalsByVillage = [
  {
    id: 1,
    slug: "wagholi-rural-hospital",
    name: "Wagholi Rural Hospital",
    type: "Government",
    district: "Pune",
    taluka: "Haveli",
    beds: 100,
    address: "Wagholi, Pune",
  },

  {
    id: 2,
    slug: "care-multispeciality-hospital",
    name: "Care Multispeciality Hospital",
    type: "Private",
    district: "Pune",
    taluka: "Haveli",
    beds: 75,
    address: "Wagholi, Pune",
  },

  {
    id: 3,
    slug: "manjari-health-center",
    name: "Manjari Health Center",
    type: "Government",
    district: "Pune",
    taluka: "Haveli",
    beds: 40,
    address: "Manjari, Pune",
  },
];
export const hospitals =
  Object.values(hospitalsByVillage).flat();