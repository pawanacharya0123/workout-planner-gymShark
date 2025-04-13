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
  // console.log(filteredSortedWorkoutSessions);

  const firstSession = filteredSortedWorkoutSessions[0];
  const workoutId = firstSession?.workoutId;
  const planId = workouts.find((wk) => wk.id === workoutId)?.planId;

  return (
    <div>
      <h1>Plan Page</h1>
      <ul>
        {sortedPlans.map((plan) => (
          <li key={plan.id}>
            <Link to={`/workout/${plan.id}`} key={plan.id}>
              <h3 style={{ fontWeight: "bold" }}>
                {plan.name.toUpperCase()}
                <span style={{ color: "#888" }}> →</span>
                <br />
                {planId === plan.id ? "(active)" : ""}
              </h3>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Plan;
