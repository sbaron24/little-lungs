"use client";

import React, { useEffect, useState } from "react";
import { postGoogleAqiForecast } from "../lib/api";
import { parksData } from "../lib/data"; //added the location data to closest parks for easy access 
import { closestParks } from "../lib/data";

const ParkRecommendations = ({ selectedPark }) => {
  const [airQualityData, setAirQualityData] = useState([]);

  const getAirQualityForParks = async () => {
    const aqData = await Promise.all(
      closestParks[selectedPark].map(async (park) => {
        const data = await postGoogleAqiForecast(
          park.latitude,
          park.longitude,
          5
        );
        const color = data.hourlyForecasts[0].indexes[0].color
        const rgbColor = `rgb(${color.red}, ${color.green}, ${color.blue})`;
        return {
          name: park.name,
          airQuality: data.hourlyForecasts[0].indexes[0].aqi,
          color: rgbColor,
          distance: park.distance
        };
      })
    );

    const sortedParks = aqData.sort((a, b) => {
      return b.airQuality - a.airQuality;
    });
    setAirQualityData(sortedParks);
  };

  useEffect(() => {
    if (selectedPark) {
      getAirQualityForParks();
    }
  }, [selectedPark]);

  
    //todo: only show if AQ is better than current park 
  return (
    <div>
      <h2> Safest Parks Nearby </h2>
      <div>
        {airQualityData.slice(0,3).map((park, index) => (
          <div
            style={{
              padding: "10px",
              border: "1px solid #ddd",
              borderRadius: "8px",
              marginBottom: "10px",
            }}
          >
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
                <strong>Distance:</strong> {park.distance} km away{" "}
              </li>
              <li>
                <strong>Air Quality:</strong> <span style ={{ color: park.rgbColor }}> {park.airQuality}{" "}</span>
              </li>
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ParkRecommendations;
