import React from "react";
import { useSelector } from "react-redux";

const WorkOutHistory = ({ workoutProp }) => {
  const workouts = useSelector((state) => state.session.workoutSessions)
    .filter(
      (wk) =>
        wk.workoutId === workoutProp.id &&
        Array.isArray(wk.exercises) &&
        wk.exercises.length > 0
    )
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 1);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-6 text-center text-gray-800 dark:text-white">
        🏋️ {workoutProp.name.toUpperCase()}
        {" : "}
        {workouts.length > 0 ? "Workout Summary" : "No Summary"}
      </h2>

      <div className="space-y-8">
        {workouts.map((workout, workoutIndex) => {
          const date = new Date(workout.date);
          const formattedDate = date.toLocaleDateString();
          const formattedTime = date.toLocaleTimeString();

          return (
            <div
              key={workout.id || workoutIndex}
              className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md"
            >
              <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2">
                📅 {workoutProp.name.toUpperCase()}: Workout #{workoutIndex + 1}
              </h3>

              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                <span className="font-semibold">Date:</span> {formattedDate} |{" "}
                <span className="font-semibold">Time:</span> {formattedTime}
              </p>

              {workout.exercises.map((exercise, exIndex) => (
                <div key={exIndex} className="ml-4 mb-4">
                  <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    🔸 Exercise #{exIndex + 1}: {exercise.exercise}
                  </h4>
                  <ul className="list-disc ml-6 text-gray-600 dark:text-gray-400 text-sm space-y-1">
                    {exercise.sets.map((set, setIndex) => (
                      <li key={set.setId || setIndex}>
                        🏋️ Set {setIndex + 1}: {set.reps} reps @ {set.weight}kg
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WorkOutHistory;
