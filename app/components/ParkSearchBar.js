import React, { useState } from "react";

const ParkSearchBar = ({ parksData }) => {
  const [searchResults, setParkSearchResults] = useState(parksData);

  const handleSearch = (e) => {
    const searchResults = parksData.filter((park) =>
      park.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setParkSearchResults(searchResults);
  };

  const ParkCard = ({ park }) => {
    const { name } = park;
    return (
      <div className="w-full p-4 border-b-2 border-gray-200">
        <h2 className="text-xl">{name}</h2>
      </div>
    );
  };

  const parkCards = searchResults.map((park) => (
    <ParkCard key={park.id} park={park} />
  ));

  return (
    <>
      <div>
        <input
          type="text"
          placeholder="Search for a park"
          className="w-full p-2 border-2 border-gray-200"
          onChange={handleSearch}
        />
        <ul className="w-full overflow-scroll h-64">{parkCards}</ul>
      </div>
    </>
  );
};

export default ParkSearchBar;
