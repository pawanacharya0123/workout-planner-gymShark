import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addSetToExercise, deleteSet } from "../features/workout/sessionSlice";

const RepsAndWeight = ({
  setId,
  exercise,
  sessionId,
  onDeleteComponent,
  onSaveComponent,
}) => {
  // const [setId, setSetId] = useState("");
  const [reps, setReps] = useState("");
  const [weight, setWeight] = useState("");
  const [saved, setSaved] = useState(false);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   setSetId(crypto.randomUUID());
  // }, []);

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
    dispatch(
      addSetToExercise({
        sessionId,
        exercise,
        setId,
        reps,
        weight,
      })
    );
    if (!saved) {
      setSaved(true);
      onSaveComponent();
    }
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
        required
        onChange={(e) => setWeight(e.currentTarget.value)}
      />
      <button
        type="button"
        onClick={onSaveSetClickHandle}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        {!saved ? "Save" : "Update"} Set
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
