import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addSetToExercise, deleteSet } from "../features/workout/sessionSlice";

const RepsAndWeight = ({
  setId,
  exercise,
  sessionId,
  onDeleteComponent,
  onSaveComponent,
}) => {
  const [reps, setReps] = useState("");
  const [weight, setWeight] = useState("");
  const [saved, setSaved] = useState(false);
  const [updateLock, setUpdateLock] = useState(false);
  const dispatch = useDispatch();
  const unit = useSelector((state) => state.unit.unit);

  // Track previous reps and weight
  const prevRepsRef = useRef("");
  const prevWeightRef = useRef("");

  const handleDeleteSet = () => {
    dispatch(
      deleteSet({
        sessionId,
        exercise,
        setId,
      })
    );
    onDeleteComponent(setId);
  };

  const onSaveSetClickHandle = () => {
    if (updateLock) {
      setUpdateLock(false);
      return;
    }
    if (reps == "" || weight == "") return null;

    const repsChanged = reps !== prevRepsRef.current;
    const weightChanged = weight !== prevWeightRef.current;

    // Restrict save/update if neither reps nor weight changed
    if (!repsChanged && !weightChanged) {
      setUpdateLock(true);
      return;
    }

    // Save new values
    prevRepsRef.current = reps;
    prevWeightRef.current = weight;

    console.log("here");

    dispatch(
      addSetToExercise({
        sessionId,
        exercise,
        setId,
        reps,
        weight,
        unit: unit,
      })
    );
    if (!saved) {
      setSaved(true);
      onSaveComponent();
    }
    setUpdateLock(true);
  };

  return (
    <section className="flex flex-col sm:flex-row items-center justify-center gap-2 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md w-fit">
      <input
        className={
          !saved
            ? "bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-100 rounded px-3 py-2 w-24 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            : "input-field"
        }
        type="number"
        name="reps"
        placeholder="Reps"
        value={reps}
        min={0}
        required
        onChange={(e) => setReps(e.currentTarget.value)}
      />

      <input
        className={
          !saved
            ? "bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-100 rounded px-3 py-2 w-24 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            : "input-field"
        }
        type="number"
        name="weight"
        placeholder="Weight"
        value={weight}
        min={0}
        required
        onChange={(e) => setWeight(e.currentTarget.value)}
      />
      <span className="px-2 text-sm font-medium text-gray-700 dark:text-gray-300">
        {unit}
      </span>
      <button
        type="button"
        onClick={onSaveSetClickHandle}
        // className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        className={`px-4 py-2 rounded transition text-white ${
          updateLock ? "bg-gray-400 " : "bg-blue-600 hover:bg-blue-700"
        }`}
        // disabled={updateLock}
      >
        {!saved ? "Save Set" : updateLock ? "Click to Unlock" : "Update Set"}
      </button>
      {saved && (
        <button
          onClick={handleDeleteSet}
          className="text-red-500 hover:text-red-700 text-xl"
        >
          ❌
        </button>
      )}
    </section>
  );
};

export default RepsAndWeight;
