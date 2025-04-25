import { useReducer, useEffect } from "react";

const initialMessageState = { warning: null, success: null };

function messageReducer(state, action) {
  switch (action.type) {
    case "SET_SUCCESS":
      return { ...state, success: action.payload };
    case "SET_WARNING":
      return { ...state, warning: action.payload };
    case "CLEAR":
      return { success: null, warning: null };
    default:
      return state;
  }
}

export default function useMessageReducer(timeout = 3000) {
  const [state, dispatch] = useReducer(messageReducer, initialMessageState);

  useEffect(() => {
    if (state.warning || state.success) {
      const timer = setTimeout(() => dispatch({ type: "CLEAR" }), timeout);
      return () => clearTimeout(timer);
    }
  }, [state, timeout]);

  return [state, dispatch];
}
