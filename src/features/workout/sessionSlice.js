import { createSlice } from "@reduxjs/toolkit";

const sessionSlice = createSlice({
  name: "session",
  initialState: {
    workoutSessions: [],
  },
  reducers: {
    startSession: (state, action) => {
      state.workoutSessions.push(action.payload);
    },
    deleteSet: (state, action) => {
      const { sessionId, exercise, setId } = action.payload;

      const session = state.workoutSessions.find(
        (session) => session.id === sessionId
      );
      if (!session) return;
      let exerciseEntry = session.exercises.find(
        (ex) => ex.exercise === exercise
      );

      if (!exerciseEntry) return;
      if (
        exerciseEntry.sets.length === 1 &&
        exerciseEntry.sets.some((set) => set.setId === setId)
      ) {
        session.exercises = session.exercises.filter(
          (ex) => ex.exercise != exercise
        );
        return;
      }
      exerciseEntry.sets = exerciseEntry.sets.filter(
        (set) => set.setId != setId
      );
    },
    addSetToExercise: (state, action) => {
      const { sessionId, exercise, setId, reps, weight } = action.payload;
      const session = state.workoutSessions.find(
        (session) => session.id === sessionId
      );
      if (session) {
        let exerciseEntry = session.exercises.find(
          (ex) => ex.exercise === exercise
        );
        if (!exerciseEntry) {
          session.exercises.push({
            exercise,
            sets: [{ setId, reps, weight }],
          });
        } else {
          let setEntry = exerciseEntry.sets.find((set) => set.setId == setId);
          if (setEntry) {
            setEntry.reps = reps;
            setEntry.weight = weight;
          } else {
            exerciseEntry.sets.push({ setId, reps, weight });
          }
        }
      }
    },
  },
});

export const { startSession, addSetToExercise, deleteSet } =
  sessionSlice.actions;
export default sessionSlice.reducer;
