export const parksData = [
  {
    id: "lazienki",
    name: "Łazienki Park",
    latitude: 52.2154,
    longitude: 21.0355,
  },
  {
    id: "saxon-garden",
    name: "Saxon Garden",
    latitude: 52.2401,
    longitude: 21.0123,
  },
  {
    id: "skaryszewski",
    name: "Skaryszewski Park",
    latitude: 52.2423,
    longitude: 21.052,
  },
  {
    id: "ujazdowski",
    name: "Ujazdowski Park",
    latitude: 52.2229,
    longitude: 21.0271,
  },
  {
    id: "multimedia-fountain",
    name: "Multimedia Fountain Park",
    latitude: 52.2542,
    longitude: 21.0113,
  },
  {
    id: "pole-mokotowskie",
    name: "Pole Mokotowskie",
    latitude: 52.2108,
    longitude: 21.0039,
  },
  {
    id: "krasinski",
    name: "Krasinski Garden",
    latitude: 52.2447,
    longitude: 21.0027,
  },
  {
    id: "agrykola",
    name: "Agrykola Park",
    latitude: 52.2187,
    longitude: 21.0316,
  },
  {
    id: "moczydlo",
    name: "Moczydło Park",
    latitude: 52.2389,
    longitude: 20.9539,
  },
  {
    id: "szczesliwicki",
    name: "Szczęśliwicki Park",
    latitude: 52.2083,
    longitude: 20.9644,
  },
  {
    id: "brodnowski",
    name: "Bródnowski Park",
    latitude: 52.2903,
    longitude: 21.0419,
  },
  { id: "praski", name: "Praski Park", latitude: 52.2539, longitude: 21.0352 },
  {
    id: "kepa-potocka",
    name: "Kepa Potocka Park",
    latitude: 52.2783,
    longitude: 20.9789,
  },
  {
    id: "wilanow",
    name: "Royal Wilanów Park",
    latitude: 52.1651,
    longitude: 21.0903,
  },
  {
    id: "promenada",
    name: "Promenada Park",
    latitude: 52.1989,
    longitude: 21.0436,
  },
  {
    id: "morskie-oko",
    name: "Morskie Oko Park",
    latitude: 52.2031,
    longitude: 21.0273,
  },
  {
    id: "rydza-smiglego",
    name: "Marszałka Edwarda Rydza-Śmigłego Park",
    latitude: 52.2275,
    longitude: 21.0283,
  },
  {
    id: "jordan-zoliborz",
    name: "Jordan Park Żoliborz",
    latitude: 52.2686,
    longitude: 20.9906,
  },
  {
    id: "arkadia",
    name: "Arkadia Park",
    latitude: 52.2597,
    longitude: 21.0022,
  },
  {
    id: "gorka-szczesliwicka",
    name: "Górka Szczęśliwicka Park",
    latitude: 52.2058,
    longitude: 20.9595,
  },
];

export const AQI_LEVEL_INFO = Object.freeze([
  {
    index: 1,
    description: "Very good",
    hex: "#4cbb17",
    message: "The air near this park is clean and safe for children",
  },
  {
    index: 2,
    description: "Good",
    hex: "#6ee077",
    message:
      "The air near this park may cause mild respiratory issues and infections for children under 5 years old or with asthma, allergies or heart conditions.",
  },
  {
    index: 3,
    description: "Moderate",
    hex: "#ffde21",
    message:
      "The air near this park may cause respiratory issues and infections for all children, especially those under 5 with asthma, allergies or heart conditions.",
  },
  {
    index: 4,
    description: "Poor",
    hex: "#ff991c",
    message:
      "The air near this park is unsafe for all children, especially those under 5 or with asthma, allergies or heart conditions.",
  },
  {
    index: 5,
    description: "Very poor",
    hex: "#ff991c",
    message:
      "The air near this park is dangerous for all children and can lead to serious health issues.",
  },
]);

export const AQI_POLLUTANT_RANGES = {
  no2: ["0,9.9999", "10,19.9999", "20,24.9999", "25,50.9999", ",51"],
  o3: ["0,59.9999", "60,99.9999", "100,119.9999", "120,139.9999", ",140"],
  so2: ["0,19.9999", "20,39.9999", "40,99.9999", "100,199.9999", ",200"],
  pm10: ["0,14.9999", "15,29.9999", "30,44.9999", "45,74.9999", ",75"],
  pm25: ["0,4.9999", "5,9.9999", "10,14.9999", "15,24.9999", ",25"],
};

// const ageMessages = {
//   no2: [],
//   o3: [],
//   so2: [],
//   pm10: [],
//   pm25: [],
// };

export const closestParks = {
  "Łazienki Park": [
    {name: "Agrykola Park", latitude: 52.2187, longitude: 21.0316, distance: 0.45},
    {name: "Ujazdowski Park", latitude: 52.2229,longitude: 21.0271, distance: 1.01},
    {name: "Marszałka Edwarda Rydza-Śmigłego Park", latitude: 52.2275, longitude: 21.0283, distance: 1.43},
    {name: "Morskie Oko Park", latitude: 52.2031, longitude: 21.0273, distance: 1.48},
    {name: "Promenada Park", latitude: 52.1989, longitude: 21.0436, distance: 1.92},
  ],
  "Saxon Garden": [
    {name: "Krasinski Garden", latitude: 52.2447, longitude: 21.0027, distance: 0.83},
    {name: "Multimedia Fountain Park", latitude: 52.2542, longitude: 21.0113, distance: 1.57},
    {name: "Marszałka Edwarda Rydza-Śmigłego Park", latitude: 52.2275, longitude: 21.0283, distance: 1.77},
    {name: "Ujazdowski Park", latitude: 52.2229,longitude: 21.0271, distance: 2.16},
    {name: "Praski Park", latitude: 52.2539, longitude: 21.0352, distance: 2.19},
  ],
  "Skaryszewski Park": [
    {name: "Praski Park", latitude: 52.2539, longitude: 21.0352, distance: 1.72},
    {name: "Marszałka Edwarda Rydza-Śmigłego Park", latitude: 52.2275, longitude: 21.0283, distance: 2.31},
    {name: "Saxon Garden", latitude: 52.2401, longitude: 21.0123, distance: 2.71},
    {name: "Ujazdowski Park", latitude: 52.2229,longitude: 21.0271, distance: 2.74},
    {name: "Agrykola Park", latitude: 52.2187, longitude: 21.0316, distance: 2.97},
  ],
  "Ujazdowski Park": [
    {name: "Marszałka Edwarda Rydza-Śmigłego Park", latitude: 52.2275, longitude: 21.0283, distance: .52},
    {name: "Agrykola Park", latitude: 52.2187, longitude: 21.0316, distance: 0.56},
    {name: "Łazienki Park", latitude: 52.2154, longitude: 21.0355, distance: 1.01},
    {name: "Pole Mokotowskie", latitude: 52.2108, longitude: 21.0039,distance: 2.08},
    {name: "Saxon Garden", latitude: 52.2401, longitude: 21.0123, distance: 2.16},
  ],
  "Multimedia Fountain Park": [
    {name: "Arkadia Park", latitude: 52.2597, longitude: 21.0022, distance: 0.87},
    {name: "Krasinski Garden", latitude: 52.2447, longitude: 21.0027, distance: 1.21},
    {name: "Saxon Garden", latitude: 52.2401, longitude: 21.0123, distance: 1.57},
    {name: "Praski Park", latitude: 52.2539, longitude: 21.0352, distance: 1.63},
    {name: "Jordan Park Żoliborz", latitude: 52.2686, longitude: 20.9906, distance: 2.13},
  ],
};
