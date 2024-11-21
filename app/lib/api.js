import { fetchWeatherApi } from "openmeteo";
import moment from "moment-timezone";
import { convertPPBtoMicrogramsVolume, getPollutantLevels } from "./utilities";
/**
 * Posts the air quality forecast to the Google Air Quality API.o *
 * @param {number} latitude - The latitude of the location.
 * @param {number} longitude - The longitude of the location.
 * @param {number} forecastHoursAhead - The number of hours ahead for the forecast.
 * @returns {Promise<Object>} The air quality forecast.
 * @throws Will throw an error if the fetch operation fails.
 */

export async function postGoogleAqiForecast(
  latitude,
  longitude,
  forecastHoursAhead
) {
  const url = "https://airquality.googleapis.com/v1/forecast:lookup";

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
  const queryUrl = `${url}?key=${apiKey}`;
  const startTime = moment.utc().add(1, "hour").startOf("hour").format();
  const endTime = moment(startTime)
    .utc()
    .add(forecastHoursAhead, "hours")
    .format();

  const data = {
    location: {
      latitude,
      longitude,
    },
    period: {
      startTime,
      endTime,
    },
    extraComputations: [
      "HEALTH_RECOMMENDATIONS",
      "DOMINANT_POLLUTANT_CONCENTRATION",
      "POLLUTANT_CONCENTRATION",
      "POLLUTANT_ADDITIONAL_INFO",
    ],
  };

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  try {
    const response = await fetch(queryUrl, options);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

/**
 * Posts the air quality forecast to the Google Air Quality API.o *
 * @param {number} latitude - The latitude of the location.
 * @param {number} longitude - The longitude of the location.
 * @param {number} forecastHoursAhead - The number of hours ahead for the forecast.
 * @returns {Promise<Object>} The air quality forecast.
 * @throws Will throw an error if the fetch operation fails.
 */

/**
 * Gets air temperature in C from Open Meteo API for next 8 hours window
 * @param {*} latitude
 * @param {*} longitude
 * @returns hashmap with keys time and temp_c representing temperature for next 8 hours
 */
export async function postOpenMeteoWeatherForecast(latitude, longitude) {
  const params = {
    latitude: latitude,
    longitude: longitude,
    hourly: ["temperature_2m", "surface_pressure"],
    forecast_hours: 8,
  };
  const url = "https://api.open-meteo.com/v1/forecast";
  const responses = await fetchWeatherApi(url, params);

  // Helper function to form time ranges
  const range = (start, stop, step) =>
    Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);

  // Process first location. Add a for-loop for multiple locations or weather models
  const response = responses[0];

  // Attributes for timezone and location
  const utcOffsetSeconds = response.utcOffsetSeconds();

  const hourly = response.hourly();
  let h = hourly.time();

  // Note: The order of weather variables in the URL query and the indices below need to match!
  const weatherData = {
    dateTime: range(
      Number(hourly.time()),
      Number(hourly.timeEnd()),
      hourly.interval()
    ).map((t) => moment.utc(new Date((t + utcOffsetSeconds) * 1000)).format()),
    temperature2m: hourly.variables(0)?.valuesArray() || [],
    surfacePressure: hourly.variables(1).valuesArray(),
  };

  return weatherData;
}

/**
 * Fetches and combines air quality and temperature data from APIs by datetime for 6 hours ahead
 * @param {number} latitude
 * @param {number} longitude
 * @returns hashmap for dateTime, tempC, and air quality data
 */
export async function getAllConditionData(latitude, longitude) {
  let openTempData = await postOpenMeteoWeatherForecast(latitude, longitude);
  let googleAirData = await postGoogleAqiForecast(latitude, longitude, 5);

  let conditions = [];
  let i = 0;
  for (i = 0; i < openTempData.dateTime.length; i++) {
    const matchingAirData = googleAirData.hourlyForecasts.filter(
      (forecast) => forecast.dateTime == openTempData.dateTime[i]
    )[0];

    // No air data found for weather hour; move on to next hour
    if (matchingAirData === undefined) {
      continue;
    }

    const convertedApiPollutants = convertPPBtoMicrogramsVolume(
      matchingAirData?.pollutants,
      openTempData.surfacePressure[i]
    );

    const pollutantLevels = getPollutantLevels(convertedApiPollutants);
    let condition = {
      dateTime: openTempData.dateTime[i],
      tempC: openTempData.temperature2m[i],
      aqiDataIndex: matchingAirData?.indexes[0],
      pollutantLevels,
      dominantPollutant: pollutantLevels[0],
    };
    conditions.push(condition);
  }

  return conditions.filter(
    (condition) =>
      condition.aqiDataIndex && condition.dateTime && condition.tempC
  );
}
