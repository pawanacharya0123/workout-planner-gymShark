import { useSelector } from "react-redux";

const useUnit = () => {
  return useSelector((state) => state.unit.unit);
};

export default useUnit;
