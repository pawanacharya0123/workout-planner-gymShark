import { useSelector } from "react-redux";

const useExercises = () => {
  return useSelector((state) => state.plan.exercises);
};

export default useExercises;
