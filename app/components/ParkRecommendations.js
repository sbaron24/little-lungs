"use client";

import React, { useEffect, useState } from "react";
import { postGoogleAqiForecast } from "../lib/api";
import { parksData } from "../lib/data";

const ParkRecommendations = ({ park }) => {
  const [airQualityData, setAirQualityData] = useState([]);

  const getAirQualityForParks = async () => {
    const aqData = await Promise.all(
      parksData.map(async (park) => {
        const data = await postGoogleAqiForecast(
          park.latitude,
          park.longitude,
          5
        );
        return {
          name: park.name,
          airQuality: data.hourlyForecasts[0].indexes[0].aqi,
        };
      })
    );
    console.log("aqData: ", aqData);
    const sortedParks = aqData.sort((a, b) => {
      return b.airQuality - a.airQuality;
    });
    setAirQualityData(sortedParks);
  };

  useEffect(() => {
    if (park) {
      getAirQualityForParks();
    }
  }, [park]);

  return (
    <div>
      <h2> Safer Parks Nearby </h2>
      <div
        style={{
          padding: "10px",
          border: "1px solid #ddd",
          borderRadius: "8px",
          marginBottom: "10px",
        }}
      >
        {airQualityData.map((park, index) => (
          <div>
            {/* Park Title*/}
            <h3 style={{ textAlign: "left" }}> {park.name} </h3>

            {/* Information List */}
            <ul
              style={{
                listStyleType: " none",
                paddingLeft: "20px",
                margin: 0,
                textAlign: "left",
              }}
            >
              <li>
                <strong>Distance:</strong> {"distance"} km away{" "}
              </li>
              <li>
                <strong>Air Quality:</strong> {park.airQuality}{" "}
              </li>
              <li>
                <strong>Temperature:</strong> {"temperature"}{" "}
              </li>
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ParkRecommendations;
