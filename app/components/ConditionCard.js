"use client";

import { convertUTCTimeStr } from "../lib/utilities";

const ConditionCard = ({ condition, isSelected, handleClick }) => {
  return (
    <div
      className={`p-4 border-2 border-gray-200 flex flex-row ${
        isSelected ? "bg-stone-200" : "white"
      }`}
      onClick={handleClick}
    >
      <div>
        <h3>{convertUTCTimeStr(condition.dateTime)}</h3>
        <p style={{ color: condition?.dominantPollutant?.hex }}>
          {condition.dominantPollutant.description}
        </p>
      </div>
    </div>
  );
};

export default ConditionCard;
