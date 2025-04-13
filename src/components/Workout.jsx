import React, { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addWorkout, updateWorkout } from "../features/plan/planSlice";

const defaultEditMode = {
  mode: false,
  workout: {},
};

const Workout = ({ selectedPlan, setSelectedWorkout, setSelectedPlan }) => {
  const workoutRef = useRef();

  const workouts = useSelector((state) => state.plan.workouts);
  const dispatch = useDispatch();

  const [editMode, setEditMode] = useState(defaultEditMode);

  const handleCreateWorkout = (e) => {
    e.preventDefault();
    const workout = {
      id: editMode?.mode ? editMode?.workout.id : crypto.randomUUID(),
      planId: selectedPlan.id,
      name: workoutRef.current.value,
    };

    editMode?.mode
      ? dispatch(updateWorkout(workout))
      : dispatch(addWorkout(workout));
    // setWorkouts([...workouts, workout]);
    setSelectedWorkout(workout);

    workoutRef.current.value = "";
  };
  const editbuttonClickHandler = (workoutToEdit) => {
    workoutRef.current.value = workoutToEdit.name;
    setEditMode(() => ({
      mode: true,
      workout: workoutToEdit,
    }));
  };

  return (
    <section>
      <h2>Create a Workout for "{selectedPlan.name.toUpperCase()}"</h2>
      <button
        onClick={() => setSelectedPlan(null)}
        style={{
          marginBottom: "1rem",
          background: "#ddd",
          padding: "0.5rem 1rem",
        }}
      >
        Back
      </button>
      <form onSubmit={handleCreateWorkout}>
        <span>" Workout name eg. Push Day"</span>
        <br />
        <input
          name="workoutName"
          placeholder="Enter workout name"
          required
          ref={workoutRef}
        />
        <button type="submit">
          {editMode?.mode ? "Update Workout" : "Create Workout"}
        </button>
      </form>
      <ul>
        {workouts
          .filter((w) => w.planId === selectedPlan.id)
          .map((workout) => (
            <li key={workout.id}>
              <span
                onClick={() => setSelectedWorkout(workout)}
                className="clickable"
              >
                {workout.name.toUpperCase()}
              </span>
              {"      "}
              <button onClick={() => editbuttonClickHandler(workout)}>
                Edit
              </button>
            </li>
          ))}
      </ul>
    </section>
  );
};

export default Workout;
