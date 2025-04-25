import { useSelector } from "react-redux";

const usePlans = () => {
  return useSelector((state) => state.plan.plans);
};

export default usePlans;
