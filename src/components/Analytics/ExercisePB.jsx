import React from "react";
import { useSelector } from "react-redux";
import { groupWeightByDate } from "../../utils/groupWeightByDate";

const ExercisePB = ({ exerciseName, filterOn }) => {
  const current = new Date();
  const currentDate = current.toISOString().split("T")[0];

  const pastDate = new Date();
  pastDate.setDate(pastDate.getDate() - 30);
  const pastDateFormatted = pastDate.toISOString().split("T")[0];

  const allWorkoutSessions = useSelector(
    (state) => state.session.workoutSessions
  );
  const workoutSessions = allWorkoutSessions.filter(
    (wk) =>
      new Date(wk.date).toISOString().split("T")[0] >= pastDateFormatted &&
      new Date(wk.date).toISOString().split("T")[0] <= currentDate
  );

  const datesWithWeights = workoutSessions
    .map((wk) => {
      const match = wk.exercises?.filter((ex) => ex.exercise === exerciseName);

      if (match.length === 0) return null;

      const weights = match[0].sets.map((set) => Number(set[filterOn]) || 0);

      const getMaxWeight = weights.length > 0 ? Math.max(...weights) : 0;

      return {
        date: new Date(wk.date),
        weight: getMaxWeight,
      };
    })
    .filter(Boolean);

  const groupDatesWithWeights = groupWeightByDate(datesWithWeights);

  return (
    <div>
      {/* {exerciseName} */}
      <div>
        {groupDatesWithWeights.map((dateWithWeight) => (
          <p>
            {dateWithWeight.date}- <strong>{dateWithWeight.weight}</strong>{" "}
            {filterOn === "weight" ? "KGs" : "Reps"}
          </p>
        ))}
      </div>
    </div>
  );
};

export default ExercisePB;
