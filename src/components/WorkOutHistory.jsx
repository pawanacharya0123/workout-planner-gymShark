import React from "react";
import { useSelector, useDispatch } from "react-redux";

const WorkOutHistory = ({ workoutProp }) => {
  //   const dispatch = useDispatch();

  const workouts = useSelector((state) => state.session.workoutSessions)
    .filter(
      (wk) =>
        wk.workoutId === workoutProp.id &&
        Array.isArray(wk.exercises) &&
        wk.exercises.length > 0
    )
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 1);

  // console.log(workouts);

  return (
    <div>
      <h2>🏋️ {workoutProp.name.toUpperCase()} Workout Summary</h2>
      {workouts.map((workout, workoutIndex) => {
        const date = new Date(workout.date);
        const formattedDate = date.toLocaleDateString();
        const formattedTime = date.toLocaleTimeString();

        return (
          <div
            key={workout.id || workoutIndex}
            style={{ marginBottom: "2rem" }}
          >
            <h3>
              📅 {workoutProp.name.toUpperCase()}: Workout #{workoutIndex + 1}
            </h3>
            <p>
              <strong>Date:</strong> {formattedDate} | <strong>Time:</strong>{" "}
              {formattedTime}
            </p>

            {workout.exercises.map((exercise, exIndex) => (
              <div key={exIndex} style={{ marginLeft: "1rem" }}>
                <h4>
                  🔸 Exercise #{exIndex + 1}: {exercise.exercise}
                </h4>
                <ul>
                  {exercise.sets.map((set, setIndex) => (
                    <li key={set.setId || setIndex}>
                      🏋️ Set {setIndex + 1}: {set.reps} reps @ {set.weight}kg
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <hr />
          </div>
        );
      })}
    </div>
  );
};

export default WorkOutHistory;
