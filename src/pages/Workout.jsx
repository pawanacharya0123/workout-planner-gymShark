import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";
import WorkOutHistory from "../components/WorkOutHistory";
import useWorkouts from "../utils/customHooks/useWorkouts";

const Workout = () => {
  const { planId } = useParams();

  if (!planId) {
    return (
      <div className="text-center mt-8 text-red-500">
        Invalid Plan ID. Please go back and select a valid plan.
      </div>
    );
  }

  const navigate = useNavigate();

  const workouts = useWorkouts();
  const workoutsAssociatedWithThePlan = useMemo(
    () => workouts.filter((workout) => workout.planId == planId),
    [workouts, planId]
  );

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="flex items-center mb-6">
        <button
          onClick={() => navigate(-1)}
          className="text-blue-600 dark:text-blue-400 hover:underline"
        >
          ← Back
        </button>
        <h2 className="text-2xl font-bold ml-4 text-gray-800 dark:text-white">
          Workouts
        </h2>
      </div>

      {workoutsAssociatedWithThePlan.length === 0 && (
        <div className="bg-yellow-100 dark:bg-yellow-300 text-yellow-800 dark:text-yellow-900 p-4 rounded-lg mb-6">
          <Link
            to={"/create"}
            state={{
              message:
                "Redirect message: No workouts found!, Create a workout here",
              selectedPlan: planId,
            }}
          >
            Add a workout to the plan to get started!
          </Link>
        </div>
      )}

      <ul className="space-y-6">
        {workoutsAssociatedWithThePlan.map((workout) => (
          <li key={workout.id}>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow hover:shadow-md transition duration-200">
              <div className="flex justify-center">
                <WorkOutHistory workoutProp={workout} />
              </div>
              <Link to={`/exercise/${workout.id}`}>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mt-2 flex justify-between items-center">
                  {workout.name.toUpperCase()}
                  <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
                    → Start Workout
                  </span>
                </h3>
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Workout;
