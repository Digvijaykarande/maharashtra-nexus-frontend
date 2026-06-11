export const citiesByTaluka = {
  haveli: [
    {
      slug: "pune-city",
      name: "Pune City",
      type: "Municipal Corporation",

      state: "Maharashtra",
      division: "Pune",
      district: "Pune",
      taluka: "Haveli",
      talukaSlug: "haveli",

      population: 7400000,
      malePopulation: 3800000,
      femalePopulation: 3600000,

      hospitals: 150,
      schools: 450,
      colleges: 120,

      latitude: 18.5204,
      longitude: 73.8567,

      address:
        "Pune City, Pune District, Maharashtra",

      lastUpdated: "2026-03-01",
    },
  ],
};

export const cities =
  Object.values(citiesByTaluka).flat();
