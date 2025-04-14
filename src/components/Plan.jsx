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
    // console.log(plan);

    editMode.mode ? dispatch(updatePlan(plan)) : dispatch(addPlan(plan));

    setEditMode(defaultEditMode);
    planRef.current.value = "";
    setSelectedPlan(plan);
  };

  const editbuttonClickHandler = (planToEdit) => {
    planRef.current.value = planToEdit.name;
    setEditMode(() => ({
      mode: true,
      plan: planToEdit,
    }));
    // console.log(planToEdit);
  };

  return (
    <section className="p-6 max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800 dark:text-white">
        {editMode?.mode ? "Update a Plan" : "Create a Plan"}
      </h2>

      <form onSubmit={handlePlanSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="planName"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Plan Name (e.g., Push Pull Leg)
          </label>
          <input
            name="planName"
            id="planName"
            placeholder="Create a workout plan"
            required
            ref={planRef}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-blue-600 dark:hover:bg-blue-700"
        >
          {editMode?.mode ? "Update Plan" : "Create Plan"}
        </button>
      </form>

      <div className="mt-8">
        <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">
          {plans.length ? "Your Plans" : "No plans available"}
        </h3>
        <ul className="space-y-4">
          {plans.map((plan, idx) => (
            <li
              key={idx}
              className="flex justify-between items-center bg-gray-100 dark:bg-gray-700 p-4 rounded-md"
            >
              <span
                onClick={() => setSelectedPlan(plan)}
                className="text-lg font-semibold text-gray-800 dark:text-white cursor-pointer hover:text-blue-500"
              >
                {plan.name.toUpperCase()}
              </span>
              <button
                onClick={() => editbuttonClickHandler(plan)}
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

export default Plan;
