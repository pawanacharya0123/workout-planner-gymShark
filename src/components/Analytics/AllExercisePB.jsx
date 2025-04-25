import React from "react";
import { useDispatch } from "react-redux";
import { removePB } from "../../features/analytics/pbBoardSlice";
import ExercisePB from "./ExercisePB";
import useExercisePB from "../../utils/customHooks/useExercisePB";

const AllExercisePB = () => {
  const exercisePBList = useExercisePB();
  const dispatch = useDispatch();
  const handleRemovePB = (ex) => {
    dispatch(removePB(ex));
  };
  return (
    <>
      {exercisePBList.map((ex) => (
        <div
          className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-md text-sm"
          key={ex}
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-md">{ex}</h3>
            <button
              onClick={() => handleRemovePB(ex)}
              className="text-gray-500 hover:text-red-600 transition"
              aria-label="Remove Exercise"
            >
              ❌
            </button>
          </div>
          <ExercisePB
            exerciseName={ex}
            filterOn={ex === "Pull-ups" ? "reps" : "weight"}
          />
        </div>
      ))}
    </>
  );
};

export default AllExercisePB;
