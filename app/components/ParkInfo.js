"use client";

import React, { useEffect, useState } from "react";
import { postGoogleAqiForecast } from "../lib/api";

const ParkInfo = ({ park }) => {
  const { name, latitude, longitude, aqiParam, airTempParam } = park;
  const [aqiForecasts, setAqiForecasts] = useState(
    aqiParam ?? {
      current: null,
      twoHours: null,
      fourHours: null,
      sixHours: null,
    }
  );
  const [airTemp, setAirTemp] = useState(airTempParam ?? null);
  const [airTempTwoHours, setAirTempTwoHours] = useState(null);
  const [airTempFourHours, setAirTempFourHours] = useState(null);
  const [airTempSixHours, setAirTempSixHours] = useState(null);

  useEffect(() => {
    if (!aqiForecasts.current) {
      postGoogleAqiForecast(latitude, longitude, 6).then((response) => {
        console.log("response", response);
        setAqiForecasts({
          current: response.hourlyForecasts[0].indexes[0].aqi,
          twoHours: response.hourlyForecasts[2].indexes[0].aqi,
          fourHours: response.hourlyForecasts[4].indexes[0].aqi,
          sixHours: response.hourlyForecasts[6].indexes[0].aqi,
        });
      });
    }
  }, []);

  const Loading = () => {
    return <span className="text-xs">Loading...</span>;
  };

  return (
    <div>
      <div className="mb-4">
        <h1 className="text-4xl">{name}</h1>
        <p>Latitude: {latitude}</p>
        <p>Longitude: {longitude}</p>
      </div>
      <hr className="mb-4 mt-4" />
      <div>
        <div>
          <h2 className="text-3xl">
            <table className="w-full text-center">
              <thead>
                <tr>
                  <th className="w-1/12"></th>
                  <th>Now</th>
                  <th>2 hours</th>
                  <th>4 hours</th>
                  <th>6 hours</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="text-right">AQI</td>
                  <td>{aqiForecasts.current ?? <Loading />}</td>
                  <td>{aqiForecasts.twoHours ?? <Loading />}</td>
                  <td>{aqiForecasts.fourHours ?? <Loading />}</td>
                  <td>{aqiForecasts.sixHours ?? <Loading />}</td>
                </tr>
                <tr>
                  <td className="text-right">Temp</td>
                  <td>{airTemp ?? 72}</td>
                  <td>{airTempTwoHours ?? 72}</td>
                  <td>{airTempFourHours ?? 72}</td>
                  <td>{airTempSixHours ?? 72}</td>
                </tr>
              </tbody>
            </table>
          </h2>
        </div>
        <br />
        <p className="text-sm">{" Hydrate often"}</p>
      </div>
    </div>
  );
};

export default ParkInfo;
