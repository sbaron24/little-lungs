"use client";

import React, { useEffect, useState } from "react";
import { getAllConditionData } from "../lib/api";
import ConditionCard from "./ConditionCard";
import ParkRecommendations from "./ParkRecommendations";

const ParkInfo = ({ park }) => {
  const { name, latitude, longitude } = park;
  const [conditionData, setConditionData] = useState([]);
  const [selectedCondition, setSelectedCondition] = useState("");
  const handleClick = (condition) => {
    setSelectedCondition(condition);
  };

  useEffect(() => {
    getAllConditionData(latitude, longitude).then((response) => {
      console.log("conditions: ", response);
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

  const GeneralRecommendation = ({}) => {
    const aqiLevelInfo = {
      description: "Very good",
      hex: "#4cbb17",
      message: "The air near this park is clean and safe for children",
    };

    return (
      <div>
        <h2>General Recommendation</h2>
        <p>
          <strong>
            <span className={`text-[${aqiLevelInfo.hex}]`}>
              {aqiLevelInfo.description}
            </span>
          </strong>
        </p>
      </div>
    );
  };

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
          <GeneralRecommendation />
          <h2 className="font-medium">Health recommendations</h2>
          {selectedCondition?.aqiHealth
            ? selectedCondition.aqiHealth.children
            : null}
        </div>
      </div>
      <ParkRecommendations park={park} />
    </div>
  );
};

export default ParkInfo;
