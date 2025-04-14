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

  useEffect(() => {
    if (warningMessage) {
      const timer = setTimeout(() => {
        setWarningMessage(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [warningMessage]);

  return (
    <div style={{ padding: "1rem" }}>
      {warningMessage && (
        <div className="bg-yellow-100 dark:bg-yellow-950 border border-yellow-400 dark:border-yellow-800 text-yellow-800 dark:text-yellow-200 px-4 py-3 rounded relative mb-4">
          ⚠️ {warningMessage}
        </div>
      )}

      {!selectedPlan && <Plan setSelectedPlan={setSelectedPlan} />}

      {selectedPlan && !selectedWorkout && (
        <Workout
          selectedPlan={selectedPlan}
          setSelectedWorkout={setSelectedWorkout}
          setSelectedPlan={setSelectedPlan}
        />
      )}

      {selectedWorkout && (
        <Exercise
          selectedWorkout={selectedWorkout}
          setSelectedWorkout={setSelectedWorkout}
          setSelectedPlan={setSelectedPlan}
        />
      )}
    </div>
  );
};

export default PlanBuilder;
