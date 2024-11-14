"use client";

import React, { useState, useEffect } from "react";

const CurrentPosition = () => {
  const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting location: ", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);
  return (
    <div>
      <p>Current user latitude: {location.latitude}</p>
      <p>Current user longitude: {location.longitude}</p>
    </div>
  );
};

export default CurrentPosition;
