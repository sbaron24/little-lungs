"use client";

import { useState } from "react";
import ParkSearchBar from "./components/ParkSearchBar";
import ParkInfo from "./components/ParkInfo";
// import useCurrentLocation from "./components/useCurrentLocation";
import { parksData } from "./lib/data";

export default function Home() {
  const [selectedPark, setSelectedPark] = useState(parksData[0]);
  const [selectedAge, setSelectedAge] = useState("");
  const [selectedHealthCondition, setSelectedHealthCondition] = useState("");

  // const { latitude, longitude } = useCurrentLocation();

  const handleSelectAge = (age) => {
    setSelectedAge(age);
  };

  const handleSelectHealthCondition = (condition) => {
    setSelectedHealthCondition(condition);
  };

  const AgeDropdown = ({ onChange, selectedAge }) => {
    const ageOptions = ["", "0-1", "1-2", "3-5", "6-12", "13-18"];

    return (
      <div className="m-4">
        <label>
          Select an age
          <select
            onChange={(e) => onChange(e.target.value)}
            value={selectedAge}
          >
            {ageOptions.map((age, index) => (
              <option key={index} value={age}>
                {age}
              </option>
            ))}
          </select>
        </label>
      </div>
    );
  };

  const HealthConditionDropdown = ({ onChange, selectedHealthCondition }) => {
    const healthConditions = [
      "",
      "Asthma",
      "Bronchitis",
      "Allergic Rhinitis",
      "Reduced Lung Function",
      "Respiratory Infections",
    ];

    return (
      <div className="m-4">
        <label>
          Select a health condition
          <select
            onChange={(e) => onChange(e.target.value)}
            value={selectedHealthCondition}
          >
            {healthConditions.map((condition, index) => (
              <option key={index} value={condition}>
                {condition}
              </option>
            ))}
          </select>
        </label>
      </div>
    );
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-sans">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start w-full">
        <p>
          This is a demo app from the Software for Climate bootcamp, run by{" "}
          <span style={{ color: "blue" }}>
            <a href="https://www.terra.do/">Terra.do</a>
          </span>
          . The team came together to build a prototype of an application that
          helps parents in Warsaw, Poland decide which parks (searchable in the
          search bar below) have the best air quality for their child. Parents
          can select their child's age, their condition, and receive
          personalized recomendations from the World Health Organization given
          their child's information.
        </p>
        <div className="flex w-full gap-8">
          <div className="w-1/3 border border-dotted rounded">
            <div className="mb-5">
              <AgeDropdown
                onChange={(age) => handleSelectAge(age)}
                selectedAge={selectedAge}
              />
              <HealthConditionDropdown
                selectedHealthCondition={selectedHealthCondition}
                onChange={(condition) => handleSelectHealthCondition(condition)}
              />
            </div>
            <ParkSearchBar
              parksData={parksData}
              handleParkSelect={(park) => setSelectedPark(park)}
              selectedAge={selectedAge}
            />
          </div>
          <div className="w-2/3 p-8">
            <ParkInfo
              park={selectedPark}
              selectedAge={selectedAge}
              selectedHealthCondition={selectedHealthCondition}
            />
          </div>
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
    </div>
  );
}
