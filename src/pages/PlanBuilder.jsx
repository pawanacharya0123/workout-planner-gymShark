import React, { useEffect, useState } from "react";
import Exercise from "../components/Exercise";
import Plan from "../components/Plan";
import Workout from "../components/Workout";
import { useLocation } from "react-router-dom";

const PlanBuilder = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [selectedWorkout, setSelectedWorkout] = useState(null);

  const location = useLocation();
  const [warningMessage, setWarningMessage] = useState(
    location.state?.message || null
  );
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    // console.log("here");
    if (warningMessage || successMessage) {
      const timer = setTimeout(() => {
        setWarningMessage(null);
        setSuccessMessage(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [warningMessage, successMessage]);

  return (
    <div style={{ padding: "1rem" }}>
      {warningMessage && (
        <div className="bg-yellow-100 dark:bg-yellow-950 border border-yellow-400 dark:border-yellow-800 text-yellow-800 dark:text-yellow-200 px-4 py-3 rounded relative mb-4">
          ⚠️ {warningMessage}
        </div>
      )}
      {successMessage && (
        <div className="bg-green-100 dark:bg-green-950 border border-green-400 dark:border-green-800 text-green-800 dark:text-green-200 px-4 py-3 rounded relative mb-4">
          ✅ {successMessage}
        </div>
      )}

      {!selectedPlan && (
        <Plan
          setSelectedPlan={setSelectedPlan}
          setSuccessMessage={setSuccessMessage}
        />
      )}

      {selectedPlan && !selectedWorkout && (
        <Workout
          selectedPlan={selectedPlan}
          setSelectedWorkout={setSelectedWorkout}
          setSelectedPlan={setSelectedPlan}
          setSuccessMessage={setSuccessMessage}
        />
      )}

      {selectedWorkout && (
        <Exercise
          selectedWorkout={selectedWorkout}
          setSelectedWorkout={setSelectedWorkout}
          // setSelectedPlan={setSelectedPlan}
          setSuccessMessage={setSuccessMessage}
        />
      )}
    </div>
  );
};

export default PlanBuilder;
