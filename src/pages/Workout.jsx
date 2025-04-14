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

      {workouts.length === 0 && (
        <div className="bg-yellow-100 dark:bg-yellow-300 text-yellow-800 dark:text-yellow-900 p-4 rounded-lg mb-6">
          Add a workout to the plan to get started!
        </div>
      )}

      <ul className="space-y-6">
        {workouts.map((workout) => (
          <li key={workout.id}>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow hover:shadow-md transition duration-200">
              {/* <WorkOutHistory workoutProp={workout} /> */}
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

    // <div>
    //   <h2>
    //     <button onClick={() => navigate(-1)}>Back</button>
    //   </h2>
    //   {workouts.length === 0 && (
    //     <div className="alert">Add workout to the Plan</div>
    //   )}
    //   <ul>
    //     {workouts.map((workout) => (
    //       <>
    //         <li key={workout.id}>
    //           <WorkOutHistory workoutProp={workout} />
    //           <Link to={`/exercise/${workout.id}`} key={workout.id}>
    //             <h3 style={{ fontWeight: "bold" }}>
    //               {workout.name.toUpperCase()}{" "}
    //               <span style={{ color: "#888" }}>→ Start Workout</span>
    //             </h3>
    //           </Link>
    //         </li>
    //         <hr />
    //       </>
    //     ))}
    //   </ul>
    // </div>
  );
};

export default Workout;
