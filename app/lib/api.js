import { topOfHourWarsawTime, getHoursAheadTime } from "./utilities";
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
  const startTime = topOfHourWarsawTime();
  const endTime = getHoursAheadTime(startTime, forecastHoursAhead);
  console.log("startTime", startTime);
  console.log("endTime", endTime);

  const data = {
    location: {
      latitude,
      longitude,
    },
    period: {
      startTime,
      endTime,
    },
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
