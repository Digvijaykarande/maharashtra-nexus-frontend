export const collegesByVillage = {
  wagholi: [
    {
      id: 1,
      slug: "wagholi-arts-college",

      name: "Wagholi Arts College",
      stream: "Arts",

      district: "Pune",
      taluka: "Haveli",
      village: "Wagholi",

      address: "Wagholi, Pune",
    },

    {
      id: 2,
      slug: "wagholi-engineering-institute",

      name: "Wagholi Engineering Institute",
      stream: "Engineering",

      district: "Pune",
      taluka: "Haveli",
      village: "Wagholi",

      address: "Wagholi, Pune",
    },
  ],
};

export const colleges =
  Object.values(collegesByVillage).flat();