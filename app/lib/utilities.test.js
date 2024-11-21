import { convertPPBtoMicrogramsVolume, MOLECULAR_WEIGHTS } from "./utilities";

let mockPollutants = [
  {
    code: "no2",
    concentration: {
      units: "PARTS_PER_BILLION",
      value: 64.64,
    },
  },
  {
    code: "pm10",
    concentration: {
      units: "MICROGRAMS_PER_CUBIC_METER",
      value: 300.3,
    },
  },
];
describe("pollutant conversion from ppb to micrograms per cubic meter", () => {
  const surfacePressure = 987.98;
  const convertedPollutants = convertPPBtoMicrogramsVolume(
    mockPollutants,
    surfacePressure
  );

  test("no2 converts", () => {
    const no2 = convertedPollutants.find(
      (pollutant) => pollutant.code == "no2"
    );
    expect(parseFloat(no2.concentration.value.toFixed(4))).toBe(129.4027);
  });
  test("pm10 does not convert", () => {
    const pm10 = convertedPollutants.find(
      (pollutant) => pollutant.code == "pm10"
    );
    expect(parseFloat(pm10.concentration.value)).toBe(
      mockPollutants[1].concentration.value
    );
  });
});
