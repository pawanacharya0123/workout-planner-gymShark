import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";
import WorkOutHistory from "../components/WorkOutHistory";

const Workout = () => {
  const { planId } = useParams();
  const navigate = useNavigate();

  const workouts = useSelector((state) => state.plan.workouts).filter(
    (workout) => workout.planId == planId
  );

  // if (workouts.length === 0) {
  //   setWarningMessage("Add workout to the Plan");
  // }

  return (
    <div>
      <h2>
        <button onClick={() => navigate(-1)}>Back</button>
      </h2>
      {workouts.length === 0 && (
        <div className="alert">Add workout to the Plan</div>
      )}
      {/* <WorkOutHistory planId={planId} /> */}
      <ul>
        {workouts.map((workout) => (
          <>
            <li key={workout.id}>
              <WorkOutHistory workoutProp={workout} />
              <Link to={`/exercise/${workout.id}`} key={workout.id}>
                <h3 style={{ fontWeight: "bold" }}>
                  {workout.name.toUpperCase()}{" "}
                  <span style={{ color: "#888" }}>→ Start Workout</span>
                </h3>
              </Link>
            </li>
            <hr />
          </>
        ))}
      </ul>
    </div>
  );
};

export default Workout;
