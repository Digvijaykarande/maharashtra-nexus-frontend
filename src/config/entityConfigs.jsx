export const entityConfigs = {
  divisions: {
    title: "Divisions",
    columns: [
      "name",
      "headquarters",
      "districts",
      "talukas",
      "villages",
    ],
  },

  districts: {
    title: "Districts",
    columns: [
      "name",
      "division",
      "headquarters",
      "talukas",
    ],
  },

  talukas: {
    title: "Talukas",
    columns: [
      "name",
      "district",
      "villages",
      "cities",
      "towns",
      "population",
    ],
  },
};