import { configureStore } from "@reduxjs/toolkit";
import planReducer from "../features/plan/planSlice";
import sessionReducer from "../features/workout/sessionSlice";
import { loadState, saveState } from "../utils/localstorage";
import themeReducer from "../features/theme/themeSlice";
import unitReducer from "../features/unit/unitSlice";

const persistedState = loadState();

export const store = configureStore({
  reducer: {
    plan: planReducer,
    session: sessionReducer,
    theme: themeReducer,
    unit: unitReducer,
  },
  preloadedState: persistedState, // 👈 load from localStorage
});

// Save to localStorage on state change
store.subscribe(() => {
  saveState(store.getState());
});
