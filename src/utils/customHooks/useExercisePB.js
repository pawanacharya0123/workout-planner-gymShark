import { useSelector } from "react-redux";

const useExercisePB = () => {
  return useSelector((state) => state.pb);
};

export default useExercisePB;
