import React, { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addWorkout, updateWorkout } from "../features/plan/planSlice";

const defaultEditMode = {
  mode: false,
  workout: {},
};

const Workout = ({
  selectedPlan,
  setSelectedWorkout,
  setSelectedPlan,
  setSuccessMessage,
}) => {
  const workoutRef = useRef();

  const workouts = useSelector((state) => state.plan.workouts);
  const workoutForThePlan = workouts.filter(
    (w) => w.planId === selectedPlan.id
  );
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

    setSuccessMessage(
      editMode.mode
        ? "Workout successfully updated!"
        : "Workout successfully added!"
    );
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
    <section className="p-6 max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800 dark:text-white">
        Create a Workout for "{selectedPlan.name.toUpperCase()}"
      </h2>

      <button
        onClick={() => setSelectedPlan(null)}
        className="mb-4 py-2 px-4 bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-white rounded-md hover:bg-gray-400 dark:hover:bg-gray-500"
      >
        Back
      </button>

      <form onSubmit={handleCreateWorkout} className="space-y-4">
        <div>
          <label
            htmlFor="workoutName"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Workout Name (e.g., Push Day)
          </label>
          <input
            name="workoutName"
            id="workoutName"
            placeholder="Enter workout name"
            required
            ref={workoutRef}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-blue-600 dark:hover:bg-blue-700"
        >
          {editMode?.mode ? "Update Workout" : "Create Workout"}
        </button>
      </form>

      <div className="mt-8">
        <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">
          {workoutForThePlan.length ? "Your Workouts" : "No workout available"}
        </h3>
        <ul className="space-y-4">
          {workoutForThePlan.map((workout) => (
            <li
              key={workout.id}
              className="flex justify-between items-center bg-gray-100 dark:bg-gray-700 p-4 rounded-md"
            >
              <span
                onClick={() => setSelectedWorkout(workout)}
                className="text-lg font-semibold text-gray-800 dark:text-white cursor-pointer hover:text-blue-500"
              >
                {workout.name.toUpperCase()}
              </span>
              <button
                onClick={() => editbuttonClickHandler(workout)}
                className="px-4 py-2 text-sm text-white bg-yellow-500 rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 dark:bg-yellow-600 dark:hover:bg-yellow-700"
              >
                Edit
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Workout;
