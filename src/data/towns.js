export const townsByTaluka = {
  haveli: [
    {
      slug: "uruli-kanchan",
      name: "Uruli Kanchan",
      type: "Census Town",
      state: "Maharashtra",
      division: "Pune",
      district: "Pune",
      taluka: "Haveli",
      talukaSlug: "haveli", // Added to fix your array filter query match
      population: 30000,
      malePopulation: 15600,
      femalePopulation: 14400,
      hospitals: 4,
      schools: 12,
      colleges: 2,
      latitude: 18.4893,
      longitude: 74.1350,
      address: "Uruli Kanchan, Haveli Taluka, Pune District, Maharashtra",
      lastUpdated: "2026-03-01",
    },
  ],

  mulshi: [
    {
      slug: "paud",
      name: "Paud",
      type: "Taluka Headquarters",
      state: "Maharashtra",
      division: "Pune",
      district: "Pune",
      taluka: "Mulshi",
      talukaSlug: "mulshi", // Added to fix your array filter query match
      population: 18000,
      malePopulation: 9300,
      femalePopulation: 8700,
      hospitals: 2,
      schools: 6,
      colleges: 1,
      latitude: 18.5244,
      longitude: 73.6182,
      address: "Paud, Mulshi Taluka, Pune District, Maharashtra",
      lastUpdated: "2026-03-01",
    },
  ],
};

export const towns = Object.values(townsByTaluka).flat();