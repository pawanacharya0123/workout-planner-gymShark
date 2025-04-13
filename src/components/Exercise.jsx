import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addExercises } from "../features/plan/planSlice";

const dummyExercises = [
  "Bench Press",
  "Squat",
  "Deadlift",
  "Overhead Press",
  "Pull-ups",
  "Rows",
];

const Exercise = ({ selectedWorkout, setSelectedWorkout, setSelectedPlan }) => {
  const exercises = useSelector((state) => state.plan.exercises);
  const dispatch = useDispatch();

  const handleSelectExercise = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const selectedExerciseNames = formData.getAll("exercises");

    const selectedExercises = selectedExerciseNames.map((exercise) => ({
      workoutId: selectedWorkout.id,
      name: exercise,
    }));

    dispatch(
      addExercises({
        workoutId: selectedWorkout.id,
        exercises: selectedExercises,
      })
    );

    setSelectedWorkout(null);
  };

  return (
    <section>
      <h2>Select Exercises for "{selectedWorkout.name.toUpperCase()}"</h2>
      <button
        onClick={() => setSelectedWorkout(null)}
        style={{
          marginBottom: "1rem",
          background: "#ddd",
          padding: "0.5rem 1rem",
        }}
      >
        Back
      </button>
      <form onSubmit={handleSelectExercise}>
        {dummyExercises.map((ex, idx) => (
          <label key={idx} style={{ display: "block", marginBottom: "0.5rem" }}>
            <input
              type="checkbox"
              name="exercises"
              value={ex}
              defaultChecked={exercises.some(
                (e) => e.workoutId === selectedWorkout.id && e.name === ex
              )}
            />
            {` ${ex}`}
          </label>
        ))}
        <button type="submit" style={{ marginTop: "1rem" }}>
          Submit Exercises
        </button>
      </form>

      {exercises.length > 0 && (
        <>
          <h3>Selected Exercises:</h3>
          <ul>
            {exercises
              .filter((ex) => ex.workoutId == selectedWorkout.id)
              .map((ex, idx) => (
                <li key={idx}>{ex.name}</li>
              ))}
          </ul>
        </>
      )}
    </section>
  );
};

export default Exercise;
