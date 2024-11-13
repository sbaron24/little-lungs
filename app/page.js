import ParkSearchBar from "./components/ParkSearchBar";
import ParkInfo from "./components/ParkInfo";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <ParkSearchBar />
        <ParkInfo
          park={{
            name: "Łazienki Park",
            latitude: 52.2154,
            longitude: 21.0355,
          }}
        />
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
    </div>
  );
}
