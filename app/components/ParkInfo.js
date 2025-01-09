"use client";

import React, { useEffect, useState, use } from "react";
import { getAllConditionData } from "../lib/api";
import ConditionCard from "./ConditionCard";
import GeneralRecommendation from "./GeneralRecommendation";

const ParkInfo = ({ park, selectedAge, selectedHealthCondition }) => {
  const { name, latitude, longitude } = park;
  const [conditionData, setConditionData] = useState([]);
  const [selectedCondition, setSelectedCondition] = useState("");

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

  const AgeRecommendation = ({ selectedAge, condition }) => {
    let message;
    if (selectedAge == "3-5" && condition?.dominantPollutant?.index == 4) {
      message = (
        <div>
          <strong>3-5 years old:</strong>{" "}
          <span>
            Higher risk of respiratory discomfort; sensitive children may be
            affected. Avoid outdoor play; keep indoor air clean; consider using
            air purifiers.
          </span>
        </div>
      );
    }
    if (selectedAge == "3-5" && condition?.dominantPollutant.index == 5) {
      message = (
        <div>
          <strong>3-5 years old:</strong>{" "}
          <span>
            Significant risk of respiratory issues; all children are at risk.
            Stay indoors; create a clean air space; consult healthcare provider.
          </span>
        </div>
      );
    }

    return <div className="mt-3">{message}</div>;
  };
  const HealthConditionRecommendation = ({
    selectedHealthCondition,
    condition,
  }) => {
    let message;
    if (
      selectedHealthCondition == "Bronchitis" &&
      condition?.dominantPollutant.index <= 2 &&
      condition?.dominantPollutant.code == "no2"
    ) {
      message = (
        <div>
          <strong>Bronchitis</strong>{" "}
          <span>
            Exposure to nitrogen dioxide increases airway sensitivity and
            inflammation. Reduce exposure near traffic-heavy areas.
          </span>
        </div>
      );
    }
    if (
      selectedHealthCondition == "Bronchitis" &&
      condition?.dominantPollutant.index > 2 &&
      condition?.dominantPollutant.code == "no2"
    ) {
      message = (
        <div>
          <strong>Bronchitis</strong>{" "}
          <span>
            Triggers bronchitis symptoms such as coughing and breathing
            difficulties. Limit outdoor activities; ensure clean indoor air.
          </span>
        </div>
      );
    }
    if (
      selectedHealthCondition == "Bronchitis" &&
      condition?.dominantPollutant.index <= 2 &&
      condition?.dominantPollutant.code == "pm25"
    ) {
      message = (
        <div>
          <strong>Bronchitis</strong>{" "}
          <span>
            Long-term exposure may lead to airway irritation and chronic
            inflammation. Limit outdoor activities; ensure clean indoor air.
          </span>
        </div>
      );
    }
    if (
      selectedHealthCondition == "Bronchitis" &&
      condition?.dominantPollutant.index > 2 &&
      condition?.dominantPollutant.code == "pm25"
    ) {
      message = (
        <div>
          <strong>Bronchitis</strong>{" "}
          <span>
            Worsens bronchitis symptoms, causing persistent coughing and
            discomfort. Avoid outdoor activities; consult healthcare provider.
          </span>
        </div>
      );
    }

    return <div className="mt-3">{message}</div>;
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
      {selectedAge ? (
        <AgeRecommendation
          selectedAge={selectedAge}
          condition={selectedCondition}
        />
      ) : null}
      {selectedHealthCondition ? (
        <HealthConditionRecommendation
          selectedHealthCondition={selectedHealthCondition}
          condition={selectedCondition}
        />
      ) : null}
    </div>
  );
};

export default ParkInfo;
