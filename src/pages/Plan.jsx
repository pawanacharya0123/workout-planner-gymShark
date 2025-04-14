import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const Plan = () => {
  const navigate = useNavigate();
  const plans = useSelector((state) => state.plan.plans);

  useEffect(() => {
    if (plans.length === 0)
      navigate("/create", {
        state: {
          message: "Redirect message: No plans found!, Create a Plan here.",
        },
      });
  }, [plans, navigate]);

  const workouts = useSelector((state) => state.plan.workouts);

  const workoutSessions = useSelector((state) => state.session.workoutSessions);
  const filteredSortedWorkoutSessions = workoutSessions
    .slice()
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .filter((wk) => wk.exercises.length >= 1);

  const sortedPlanIdArrayList = filteredSortedWorkoutSessions.map(
    (wk) => workouts.find((workout) => workout.id === wk.workoutId)["planId"]
  );
  const sortedPlansArray = Array.from(new Set(sortedPlanIdArrayList));

  const sortedPlans = [
    ...sortedPlansArray
      .map((id) => plans.find((plan) => plan.id === id))
      .filter(Boolean),
    ...plans.filter((plan) => !sortedPlansArray.includes(plan.id)),
  ];

  const firstSession = filteredSortedWorkoutSessions[0];
  const workoutId = firstSession?.workoutId;
  const planId = workouts.find((wk) => wk.id === workoutId)?.planId;

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white">
        Plan Page
      </h1>
      <ul className="space-y-4">
        {sortedPlans.map((plan) => (
          <li key={plan.id}>
            <Link
              to={`/workout/${plan.id}`}
              className="block bg-white dark:bg-gray-800 p-4 rounded-lg shadow hover:shadow-md transition duration-200"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                    {plan.name.toUpperCase()}{" "}
                  </h3>
                  {planId === plan.id && (
                    <span className="text-sm text-green-600 dark:text-green-400 font-medium">
                      Active
                    </span>
                  )}
                </div>
                <span className="text-2xl text-gray-400 dark:text-gray-500">
                  →
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Plan;
