// Using fetch (built-in, modern approach):
export async function googleAqiRequest(currentLatitude, currentLongitude) {
  const url = "https://airquality.googleapis.com/v1/currentConditions:lookup";
  const apiKey = "AIzaSyBCFeMZ30ZJgnjPYQo4xYIS-Dn47siSNQ0";
  const queryUrl = `${url}?key=${apiKey}`;

  const data = {
    location: {
      latitude: currentLatitude,
      longitude: currentLongitude,
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
