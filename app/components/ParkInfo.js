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

  const GeneralRecommendation = ({ condition }) => {
    return (
      <div>
        {condition ? (
          <div>
            <strong>
              <span className={`text-[${condition.dominantPollutant.hex}]`}>
                {condition.dominantPollutant.description}{" "}
              </span>
            </strong>
            <span>{condition.dominantPollutant.message}</span>
            <div>
              {condition.pollutantLevels.map((pollutant) => {
                return (
                  <span key={`${pollutant?.code}`}>
                    <strong>
                      <span
                        className={`text-[${pollutant?.hex}]`}
                      >{`${pollutant?.code.toUpperCase()} `}</span>
                    </strong>
                    <span>
                      <strong>{pollutant?.concentration.toFixed(2)} </strong>
                    </span>
                  </span>
                );
              })}
            </div>
          </div>
        ) : (
          <p>Select a condition</p>
        )}
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
          {conditionCards.length == 0 ? null : (
            <GeneralRecommendation condition={selectedCondition} />
          )}
        </div>
      </div>
      {/* <ParkRecommendations park={park} /> */}
    </div>
  );
};

export default ParkInfo;
