import moment from "moment-timezone";
import { AQI_POLLUTANT_RANGES, AQI_LEVEL_INFO } from "./data";

export const MOLECULAR_WEIGHTS = Object.freeze({
  no2: 46.01,
  o3: 48.0,
  so2: 64.07,
});

export function convertUTCTimeStr(string) {
  return moment(string).tz("Europe/Warsaw").format("h:mm a");
}

/**
 * Takes concentration hashmap from Googel AQI pollutants returns microgram per meter cubed
 * @param {Object} pollutants
 * @param {number} surfacePressure
 */
export function convertPPBtoMicrogramsVolume(pollutants, surfacePressure) {
  const adjustedMolarVol = 22.41 * (1013.25 / surfacePressure);
  return pollutants.map((pollutant) => {
    if (pollutant.concentration.units == "PARTS_PER_BILLION") {
      const ppb = pollutant.concentration.value;
      const molecularWeight = MOLECULAR_WEIGHTS["no2"];
      pollutant.concentration.value =
        ppb * (molecularWeight / adjustedMolarVol);
      pollutant.concentration.units = "MICROGRAMS_PER_CUBIC_METER";
    }

    return pollutant;
  });
}

/**
 * Gets AQI level, description and color given a pollutant and concentration
 * @param {string} code name of pollutant ex: o3, so2
 * @param {number} concentration
 * @returns Array of description, color, hex, message for AQI level
 */
export function getAqiInfo(code, concentration) {
  let result;
  try {
    if (AQI_POLLUTANT_RANGES[code] === undefined) {
      throw new Error("Pollutant not found");
    }

    if (concentration < 0) {
      throw new Error("Pollutant concentration must be a positive number");
    }
    AQI_POLLUTANT_RANGES[code].forEach((range, index) => {
      let [min, max] = range.split(",").map((m) => parseFloat(m));

      if (
        (isNaN(min) && concentration >= max) ||
        (concentration >= min && concentration <= max)
      ) {
        result = {
          code,
          concentration,
          ...AQI_LEVEL_INFO[index],
        };
      }
    });

    return result;
  } catch ({ name, message }) {
    console.error(message);
  }
}

/**
 * Retrurns pollutant info in descending order of AQI index (worst level first)
 * @param {Object} apiPollutants array from google AQI forecast response
 */
export function getPollutantLevels(apiPollutants) {
  return apiPollutants
    .map((pollutant) => {
      return getAqiInfo(pollutant.code, pollutant.concentration.value);
    })
    .filter(Boolean) // removes CO
    .sort((a, b) => b.index - a.index);
}
