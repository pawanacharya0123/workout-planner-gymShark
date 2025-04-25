import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  plans: [],
  workouts: [],
  exercises: [],
};

const planSlice = createSlice({
  name: "plan",
  initialState,
  reducers: {
    addPlan: (state, action) => {
      state.plans.push(action.payload);
    },
    addWorkout: (state, action) => {
      state.workouts.push(action.payload);
    },
    addExercises: (state, action) => {
      const { workoutId, exercises } = action.payload;
      state.exercises = [
        ...state.exercises.filter(
          (exercise) => exercise.workoutId != workoutId
        ),
        ...exercises,
      ];
    },
    updatePlan: (state, action) => {
      const updatedPlan = action.payload;
      const index = state.plans.findIndex((plan) => plan.id === updatedPlan.id);
      console.log(index);
      if (index != -1) {
        state.plans[index] = updatedPlan;
      }
    },
    updateWorkout: (state, action) => {
      const updatedWorkout = action.payload;
      const index = state.workouts.findIndex(
        (workout) => workout.id === updatedWorkout.id
      );
      if (index != -1) {
        state.workouts[index] = updatedWorkout;
        // state.plans[index] = { ...state.plans[index], ...updatedPlan };
      }
    },
  },
});

export const { addPlan, addWorkout, addExercises, updatePlan, updateWorkout } =
  planSlice.actions;

export const selectPlanById = (state, planId) =>
  state.plan.plans.find((plan) => plan.id === planId);

export default planSlice.reducer;
