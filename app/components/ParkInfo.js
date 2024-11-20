"use client";

import React, { useEffect, useState } from "react";
import { getAllConditionData } from "../lib/api";
import ConditionCard from "./ConditionCard";

const ParkInfo = ({ park }) => {
  const { name, latitude, longitude, aqiParam, airTempParam } = park;
  const [conditionData, setConditionData] = useState([]);
  const [selectedCondition, setSelectedCondition] = useState("");
  const handleClick = (condition) => {
    setSelectedCondition(condition);
  };

  useEffect(() => {
    getAllConditionData(latitude, longitude).then((response) => {
      setConditionData(response);
    });
  }, [latitude, longitude]);

  let conditionCards = conditionData.map((condition) => (
    <ConditionCard
      key={condition.dateTime}
      condition={condition}
      isSelected={condition.dateTime == selectedCondition.dateTime}
      handleClick={() => handleClick(condition)}
    />
  ));

  const Loading = () => {
    return <span className="text-sm">Loading...</span>;
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
        <div className="flex flex-row space-x-5">
          {conditionCards.length == 0 ? <Loading /> : conditionCards}
        </div>
        <br />
        <div>
          <h2 className="font-medium">Health recommendations</h2>
          {selectedCondition?.aqiHealth
            ? selectedCondition.aqiHealth.children
            : null}
        </div>
      </div>
    </div>
  );
};

export default ParkInfo;
