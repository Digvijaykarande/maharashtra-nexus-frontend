export const talukasByDistrict = {
  pune: [
    { slug: "haveli", name: "Haveli", headquarters: "Wagholi", villages: 300, cities: 2, towns: 5, population: "1.8M", district: "pune" },
    { slug: "mulshi", name: "Mulshi", headquarters: "Paud", villages: 150, cities: 1, towns: 3, population: "450K", district: "pune" },
    { slug: "baramati", name: "Baramati", headquarters: "Baramati", villages: 120, cities: 1, towns: 2, population: "650K", district: "pune" },
    { slug: "maval", name: "Maval", headquarters: "Lonavala", villages: 180, cities: 2, towns: 4, population: "500K", district: "pune" },
    { slug: "junnar", name: "Junnar", headquarters: "Junnar", villages: 175, cities: 1, towns: 3, population: "400K", district: "pune" },
    { slug: "khed", name: "Khed", headquarters: "Rajgurunagar", villages: 210, cities: 1, towns: 3, population: "580K", district: "pune" },
    { slug: "ambegaon", name: "Ambegaon", headquarters: "Manchar", villages: 140, cities: 0, towns: 2, population: "300K", district: "pune" },
    { slug: "shirur", name: "Shirur", headquarters: "Shirur", villages: 115, cities: 1, towns: 2, population: "420K", district: "pune" },
    { slug: "daund", name: "Daund", headquarters: "Daund", villages: 102, cities: 1, towns: 2, population: "490K", district: "pune" },
    { slug: "indapur", name: "Indapur", headquarters: "Indapur", villages: 142, cities: 1, towns: 2, population: "530K", district: "pune" },
    { slug: "purandar", name: "Purandar", headquarters: "Saswad", villages: 110, cities: 1, towns: 2, population: "270K", district: "pune" },
    { slug: "velhe", name: "Velhe", headquarters: "Velhe", villages: 130, cities: 0, towns: 1, population: "80K", district: "pune" },
    { slug: "bhor", name: "Bhor", headquarters: "Bhor", villages: 190, cities: 1, towns: 1, population: "210K", district: "pune" },
  ],
  nashik: [
    { slug: "nashik", name: "Nashik", headquarters: "Nashik", villages: 155, cities: 1, towns: 4, population: "2.5M", district: "nashik" },
    { slug: "malegaon", name: "Malegaon", headquarters: "Malegaon", villages: 140, cities: 1, towns: 2, population: "900K", district: "nashik" },
    { slug: "niphad", name: "Niphad", headquarters: "Niphad", villages: 133, cities: 0, towns: 3, population: "550K", district: "nashik" },
    { slug: "sinnar", name: "Sinnar", headquarters: "Sinnar", villages: 112, cities: 1, towns: 2, population: "380K", district: "nashik" },
  ],
  nagpur: [
    { slug: "nagpur-urban", name: "Nagpur Urban", headquarters: "Nagpur", villages: 0, cities: 1, towns: 1, population: "2.4M", district: "nagpur" },
    { slug: "nagpur-rural", name: "Nagpur Rural", headquarters: "Nagpur", villages: 145, cities: 0, towns: 2, population: "350K", district: "nagpur" },
    { slug: "kamptee", name: "Kamptee", headquarters: "Kamptee", villages: 82, cities: 1, towns: 1, population: "280K", district: "nagpur" },
  ],
  "chhatrapati-sambhajinagar": [
    { slug: "sambhajinagar", name: "Chhatrapati Sambhajinagar", headquarters: "Chhatrapati Sambhajinagar", villages: 162, cities: 1, towns: 3, population: "1.6M", district: "chhatrapati-sambhajinagar" },
    { slug: "vaijapur", name: "Vaijapur", headquarters: "Vaijapur", villages: 124, cities: 1, towns: 1, population: "320K", district: "chhatrapati-sambhajinagar" },
    { slug: "gangapur", name: "Gangapur", headquarters: "Gangapur", villages: 130, cities: 1, towns: 2, population: "350K", district: "chhatrapati-sambhajinagar" },
  ],
};

export const talukas = Object.values(talukasByDistrict).flat();