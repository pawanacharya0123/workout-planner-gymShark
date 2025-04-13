import React, { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addPlan, updatePlan } from "../features/plan/planSlice";
const defaultEditMode = {
  mode: false,
  plan: {},
};

const Plan = ({ setSelectedPlan }) => {
  const planRef = useRef();
  const plans = useSelector((state) => state.plan.plans);
  const dispatch = useDispatch();

  const [editMode, setEditMode] = useState(defaultEditMode);

  const handlePlanSubmit = (e) => {
    e.preventDefault();

    const plan = {
      id: editMode.mode ? editMode.plan.id : crypto.randomUUID(),
      name: planRef.current.value,
    };

    editMode.mode ? dispatch(updatePlan(plan)) : dispatch(addPlan(plan));
    setSelectedPlan(plan);

    planRef.current.value = "";
  };

  const editbuttonClickHandler = (planToEdit) => {
    planRef.current.value = planToEdit.name;
    setEditMode(() => ({
      mode: true,
      plan: planToEdit,
    }));
  };

  return (
    <section>
      <h2>Create a Plan</h2>
      <form onSubmit={handlePlanSubmit}>
        <span> Plan Name (eg. Push Pull Leg)</span>
        <br />
        <input
          name="planName"
          placeholder="Create a workout plan"
          required
          ref={planRef}
        />
        <button type="submit">
          {" "}
          {editMode?.mode ? "Update Plan" : "Create Plan"}
        </button>
      </form>
      <ul>
        {plans.map((plan) => (
          <li key={plan.id}>
            <span onClick={() => setSelectedPlan(plan)} className="clickable">
              {plan.name.toUpperCase()}
            </span>
            {"      "}
            <button onClick={() => editbuttonClickHandler(plan)}>Edit</button>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Plan;
