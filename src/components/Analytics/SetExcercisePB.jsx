import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addPB } from "../../features/analytics/pbBoardSlice";
import { EXERCISE_LIST } from "../../utils/listOfExercises";
import useExercisePB from "../../utils/customHooks/useExercisePB";

const SetExcercisePB = () => {
  const dispatch = useDispatch();
  const exercisePBList = useExercisePB();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleAddPB = (exercise) => {
    dispatch(addPB(exercise));
    setShowDropdown(false);
  };

  const exerciseToMap = EXERCISE_LIST.filter(
    (ex) => !exercisePBList.includes(ex)
  );

  //   console.log(exercisePBList);
  return (
    <div className=" flex items-center justify-center">
      <div className="flex flex-col items-center">
        {!showDropdown ? (
          <button
            onClick={() => setShowDropdown(true)}
            className="text-5xl font-bold text-white bg-blue-600 rounded-full w-16 h-16 flex items-center justify-center shadow-lg hover:bg-blue-700 transition"
            aria-label="Add Exercise"
          >
            +
          </button>
        ) : (
          <div className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg p-2 shadow-md w-64">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-md font-semibold mb-2 text-center">
                Select (Monthly Review)
              </h3>
              <button
                onClick={() => setShowDropdown(false)}
                className="text-gray-500 hover:text-red-600 transition"
                aria-label="Remove Exercise"
              >
                ❌
              </button>
            </div>
            <ul>
              {exerciseToMap.length === 0 ? (
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  All exercises are added!
                </p>
              ) : (
                exerciseToMap.map((exercise) => (
                  <li key={exercise}>
                    <button
                      onClick={() => handleAddPB(exercise)}
                      className="w-full text-left px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                    >
                      {exercise}
                    </button>
                  </li>
                ))
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default SetExcercisePB;
