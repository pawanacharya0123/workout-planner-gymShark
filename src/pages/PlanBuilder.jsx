import React, { useEffect, useState } from "react";
import Exercise from "../components/Exercise";
import Plan from "../components/Plan";
import Workout from "../components/Workout";
import { useLocation } from "react-router-dom";
import MessageBanner from "../components/MessageBanner";
import useMessageReducer from "../utils/customHooks/useMessageReducer";
import { useSelector } from "react-redux";
import { selectPlanById } from "../features/plan/planSlice";

const PlanBuilder = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [selectedWorkout, setSelectedWorkout] = useState(null);

  const location = useLocation();
  const redirectedPlanId = location.state?.selectedPlan;

  const plan = useSelector((state) => selectPlanById(state, redirectedPlanId));

  const [messageState, dispatchMessage] = useMessageReducer();

  useEffect(() => {
    if (location.state?.message) {
      dispatchMessage({ type: "SET_WARNING", payload: location.state.message });
    }
    if (plan) {
      setSelectedPlan(plan);
    }
  }, [location.state]);

  return (
    <div style={{ padding: "1rem" }}>
      {messageState.success && (
        <MessageBanner type="success" message={messageState.success} />
      )}
      {messageState.warning && (
        <MessageBanner type="warning" message={messageState.warning} />
      )}

      {!selectedPlan && (
        <Plan
          setSelectedPlan={setSelectedPlan}
          dispatchMessage={dispatchMessage}
        />
      )}

      {selectedPlan && !selectedWorkout && (
        <Workout
          selectedPlan={selectedPlan}
          setSelectedWorkout={setSelectedWorkout}
          setSelectedPlan={setSelectedPlan}
          dispatchMessage={dispatchMessage}
        />
      )}

      {selectedWorkout && (
        <Exercise
          selectedWorkout={selectedWorkout}
          setSelectedWorkout={setSelectedWorkout}
          dispatchMessage={dispatchMessage}
        />
      )}
    </div>
  );
};

export default PlanBuilder;
