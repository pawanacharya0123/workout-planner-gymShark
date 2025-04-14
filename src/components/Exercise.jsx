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

const Exercise = ({
  selectedWorkout,
  setSelectedWorkout,
  setSuccessMessage,
}) => {
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
    setSuccessMessage("Exercises successfully updated!");
    setSelectedWorkout(null);
  };

  return (
    <section className="p-6 max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800 dark:text-white">
        Select Exercises for "{selectedWorkout.name.toUpperCase()}"
      </h2>

      <button
        onClick={() => setSelectedWorkout(null)}
        className="mb-4 py-2 px-4 bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-white rounded-md hover:bg-gray-400 dark:hover:bg-gray-500"
      >
        Back
      </button>

      <form onSubmit={handleSelectExercise} className="space-y-4">
        <div className="space-y-2">
          {dummyExercises.map((ex, idx) => (
            <label
              key={idx}
              className="flex items-center space-x-2 text-sm text-gray-700 dark:text-gray-300"
            >
              <input
                type="checkbox"
                name="exercises"
                value={ex}
                defaultChecked={exercises.some(
                  (e) => e.workoutId === selectedWorkout.id && e.name === ex
                )}
                className="form-checkbox h-4 w-4 text-blue-500 focus:ring-2 focus:ring-blue-500"
              />
              <span>{ex}</span>
            </label>
          ))}
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-blue-600 dark:hover:bg-blue-700"
        >
          Submit Exercises
        </button>
      </form>

      {exercises.length > 0 && (
        <div className="mt-8">
          <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">
            Selected Exercises:
          </h3>
          <ul className="space-y-2">
            {exercises
              .filter((ex) => ex.workoutId == selectedWorkout.id)
              .map((ex, idx) => (
                <li
                  key={idx}
                  className="text-gray-800 dark:text-white p-2 rounded-md bg-gray-100 dark:bg-gray-700"
                >
                  {ex.name}
                </li>
              ))}
          </ul>
        </div>
      )}
    </section>

    // <section>
    //   <h2>Select Exercises for "{selectedWorkout.name.toUpperCase()}"</h2>
    //   <button
    //     onClick={() => setSelectedWorkout(null)}
    //     style={{
    //       marginBottom: "1rem",
    //       background: "#ddd",
    //       padding: "0.5rem 1rem",
    //     }}
    //   >
    //     Back
    //   </button>
    //   <form onSubmit={handleSelectExercise}>
    //     {dummyExercises.map((ex, idx) => (
    //       <label key={idx} style={{ display: "block", marginBottom: "0.5rem" }}>
    //         <input
    //           type="checkbox"
    //           name="exercises"
    //           value={ex}
    //           defaultChecked={exercises.some(
    //             (e) => e.workoutId === selectedWorkout.id && e.name === ex
    //           )}
    //         />
    //         {` ${ex}`}
    //       </label>
    //     ))}
    //     <button type="submit" style={{ marginTop: "1rem" }}>
    //       Submit Exercises
    //     </button>
    //   </form>

    //   {exercises.length > 0 && (
    //     <>
    //       <h3>Selected Exercises:</h3>
    //       <ul>
    //         {exercises
    //           .filter((ex) => ex.workoutId == selectedWorkout.id)
    //           .map((ex, idx) => (
    //             <li key={idx}>{ex.name}</li>
    //           ))}
    //       </ul>
    //     </>
    //   )}
    // </section>
  );
};

export default Exercise;
