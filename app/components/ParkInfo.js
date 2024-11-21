"use client";

import React, { useEffect, useState } from "react";
import { getAllConditionData } from "../lib/api";
import ConditionCard from "./ConditionCard";
import GeneralRecommendation from "./GeneralRecommendation";

const ParkInfo = ({ park }) => {
  const { name, latitude, longitude } = park;
  const [conditionData, setConditionData] = useState([]);
  const [selectedCondition, setSelectedCondition] = useState("");
  // const [selectedAge, setSelectedAge] = useState(null);

  const handleClick = (condition) => {
    setSelectedCondition(condition);
  };

  useEffect(() => {
    // Nice to have -- setLoading while new park loads
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
          {conditionCards.length == 0 ? null : (
            <GeneralRecommendation condition={selectedCondition} />
          )}
        </div>
      </div>
      {/* <AgeRecommendation
        selectedAge={selectedAge}
        dominantPollutant={selectedCondition}
      /> */}
    </div>
  );
};

export default ParkInfo;
