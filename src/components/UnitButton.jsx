import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleUnit } from "../features/unit/unitSlice";

const UnitButton = () => {
  const dispatch = useDispatch();
  const unit = useSelector((state) => state.unit.unit);
  return (
    <button
      onClick={() => dispatch(toggleUnit())}
      className="p-2 bg-gray-200 dark:bg-gray-800 rounded"
    >
      {unit === "kg" ? "Switch to lbs" : "Switch to kg"}
    </button>
  );
};

export default UnitButton;
