export const districtsByDivision = {
  pune: [
    { slug: "pune", name: "Pune", headquarters: "Pune", talukas: 14 },
    { slug: "satara", name: "Satara", headquarters: "Satara", talukas: 11 },
    { slug: "sangli", name: "Sangli", headquarters: "Sangli", talukas: 10 },
    { slug: "solapur", name: "Solapur", headquarters: "Solapur", talukas: 11 },
    { slug: "kolhapur", name: "Kolhapur", headquarters: "Kolhapur", talukas: 12 },
  ],
  nagpur: [
    { slug: "nagpur", name: "Nagpur", headquarters: "Nagpur", talukas: 14 },
    { slug: "wardha", name: "Wardha", headquarters: "Wardha", talukas: 8 },
    { slug: "bhandara", name: "Bhandara", headquarters: "Bhandara", talukas: 7 },
    { slug: "gondia", name: "Gondia", headquarters: "Gondia", talukas: 8 },
    { slug: "chandrapur", name: "Chandrapur", headquarters: "Chandrapur", talukas: 15 },
    { slug: "gadchiroli", name: "Gadchiroli", headquarters: "Gadchiroli", talukas: 12 },
  ],
  nashik: [
    { slug: "nashik", name: "Nashik", headquarters: "Nashik", talukas: 15 },
    { slug: "ahilyanagar", name: "Ahilyanagar", headquarters: "Ahilyanagar", talukas: 14 },
    { slug: "dhule", name: "Dhule", headquarters: "Dhule", talukas: 4 },
    { slug: "nandurbar", name: "Nandurbar", headquarters: "Nandurbar", talukas: 6 },
    { slug: "jalgaon", name: "Jalgaon", headquarters: "Jalgaon", talukas: 15 },
  ],
  konkan: [
    { slug: "mumbai-city", name: "Mumbai City", headquarters: "Mumbai", talukas: 0 }, // Handled by city wards
    { slug: "mumbai-suburban", name: "Mumbai Suburban", headquarters: "Bandra", talukas: 3 },
    { slug: "thane", name: "Thane", headquarters: "Thane", talukas: 7 },
    { slug: "palghar", name: "Palghar", headquarters: "Palghar", talukas: 8 },
    { slug: "raigad", name: "Raigad", headquarters: "Alibag", talukas: 15 },
    { slug: "ratnagiri", name: "Ratnagiri", headquarters: "Ratnagiri", talukas: 9 },
    { slug: "sindhudurg", name: "Sindhudurg", headquarters: "Oros", talukas: 8 },
  ],
  amravati: [
    { slug: "amravati", name: "Amravati", headquarters: "Amravati", talukas: 14 },
    { slug: "akola", name: "Akola", headquarters: "Akola", talukas: 7 },
    { slug: "buldhana", name: "Buldhana", headquarters: "Buldhana", talukas: 13 },
    { slug: "washim", name: "Washim", headquarters: "Washim", talukas: 6 },
    { slug: "yavatmal", name: "Yavatmal", headquarters: "Yavatmal", talukas: 16 },
  ],
  sambhajinagar: [
    { slug: "chhatrapati-sambhajinagar", name: "Chhatrapati Sambhajinagar", headquarters: "Chhatrapati Sambhajinagar", talukas: 9 },
    { slug: "jalna", name: "Jalna", headquarters: "Jalna", talukas: 8 },
    { slug: "beed", name: "Beed", headquarters: "Beed", talukas: 11 },
    { slug: "dharashiv", name: "Dharashiv", headquarters: "Dharashiv", talukas: 8 },
    { slug: "latur", name: "Latur", headquarters: "Latur", talukas: 10 },
    { slug: "nanded", name: "Nanded", headquarters: "Nanded", talukas: 16 },
    { slug: "hingoli", name: "Hingoli", headquarters: "Hingoli", talukas: 5 },
    { slug: "parbhani", name: "Parbhani", headquarters: "Parbhani", talukas: 9 },
  ],
};

export const districts = Object.values(districtsByDivision).flat();