"use client";

import React, { useState } from "react";

const ParkInfo = ({ park }) => {
  const { name, latitude, longitude } = park;
  const [aqi, setAqi] = useState("Fair");
  return (
    <div>
      <h1>{name}</h1>
      <p>Latitude: {latitude}</p>
      <p>Longitude: {longitude}</p>
      <p>AQI: {aqi} </p>
    </div>
  );
};

export default ParkInfo;
