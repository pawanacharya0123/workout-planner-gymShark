import { useSelector } from "react-redux";

const useWorkouts = () => {
  return useSelector((state) => state.plan.workouts);
};

export default useWorkouts;
