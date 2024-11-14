"use client";

import { useState } from "react";
import ParkSearchBar from "./components/ParkSearchBar";
import ParkInfo from "./components/ParkInfo";
import CurrentPosition from "./components/CurrentLocation";
import { parksData } from "./lib/data";

export default function Home() {
  const [selectedPark, setSelectedPark] = useState(parksData[0]);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start w-full">
        <div className="flex w-full gap-8">
          <div
            className="w-1/3"
            style={{ border: "1px dotted", borderRadius: "1px" }}
          >
            <ParkSearchBar />
          </div>
          <div className="w-2/3 p-8">
            <ParkInfo park={selectedPark} />
          </div>
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
    </div>
  );
}
