"use client";

const GeneralRecommendation = ({ condition }) => {
  return (
    <div>
      {condition ? (
        <div>
          <strong>
            <span style={{ color: condition?.dominantPollutant?.hex }}>
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
                      style={{ color: pollutant?.hex }}
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

export default GeneralRecommendation;
