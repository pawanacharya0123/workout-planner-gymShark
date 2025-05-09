import React from "react";
import { useDispatch } from "react-redux";
import { toggleUnit } from "../features/unit/unitSlice";
import useUnit from "../utils/customHooks/useUnit";

const UnitButton = () => {
  const dispatch = useDispatch();
  const unit = useUnit();
  return (
    <button
      onClick={() => dispatch(toggleUnit())}
      className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg shadow-sm hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
    >
      {unit === "kg" ? "Switch to lbs" : "Switch to kg"}
    </button>
  );
};

export default UnitButton;
