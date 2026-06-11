export const schoolsByVillage = {
  wagholi: [
    {
      id: 1,
      slug: "zp-primary-school",
      name: "ZP Primary School",

      board: "State Board",

      district: "Pune",
      taluka: "Haveli",
      village: "Wagholi",

      medium: "Marathi",

      address: "Wagholi, Pune",
    },

    {
      id: 2,
      slug: "podar-international-school",
      name: "Podar International School",

      board: "CBSE",

      district: "Pune",
      taluka: "Haveli",
      village: "Wagholi",

      medium: "English",

      address: "Wagholi, Pune",
    },
  ],
};

export const schools =
  Object.values(schoolsByVillage).flat();