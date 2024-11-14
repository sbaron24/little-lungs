"use client";

import React, { useEffect, useState } from "react";
import { googleAqiRequest } from "../lib/api";

const ParkInfo = ({ park }) => {
  console.log("ParkInfo", park);
  const { name, latitude, longitude, aqiParam, airTempParam } = park;
  const [aqi, setAqi] = useState(aqiParam ?? null);
  const [airTemp, setAirTemp] = useState(airTempParam ?? null);

  //   useEffect(() => {
  //     if (!aqi) {
  //       googleAqiRequest(latitude, longitude).then((response) => {
  //         setAqi(response.indexes[0].aqi);
  //       });
  //     }
  //   });

  return (
    <div>
      <div className="mb-4">
        <h1 className="text-4xl">{name}</h1>
        <p>Latitude: {latitude}</p>
        <p>Longitude: {longitude}</p>
      </div>
      <hr className="mb-4 mt-4" />
      <div>
        <h2 className="text-3xl">
          AQI <span className="text-green-500">{aqi ?? 72}</span>
        </h2>
        <p className="text-sm">
          <span>
            <span class="font-medium">Primary </span>
            {"PM2.5"}
          </span>
        </p>
        <br />
        <p className="text-sm">
          {" The air near this park is clean and safe for children"}
        </p>

        <hr className="mb-4 mt-4" />
        <h2 className="text-3xl">
          Air Temp{" "}
          <span className="text-orange-500">
            {airTemp ?? 25}
            <span className="text-orange-500 text-sm">&#8451;</span>
          </span>
        </h2>
        <br />
        <p className="text-sm">{" Hydrate often"}</p>
      </div>
    </div>
  );
};

export default ParkInfo;
