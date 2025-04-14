import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import RepsAndWeight from "../components/RepsAndWeight";
import { startSession } from "../features/workout/sessionSlice";

const Exercise = () => {
  const { workoutId } = useParams();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const exercises = useSelector((state) => state.plan.exercises).filter(
    (exercise) => exercise.workoutId == workoutId
  );

  const [sessionId, setSessionId] = useState(null);
  // const [exerciseSets, setExerciseSets] = useState({});

  const [setIdsByExercise, setSetIdsByExercise] = useState({});

  useEffect(() => {
    const newSessionId = crypto.randomUUID();
    setSessionId(newSessionId);

    dispatch(
      startSession({
        id: newSessionId,
        workoutId,
        date: new Date().toISOString(),
        exercises: [],
      })
    );
  }, []);

  useEffect(() => {
    const initalExerciseState = {};
    exercises.map((exercise) => {
      initalExerciseState[exercise.name] = [crypto.randomUUID()];
    });
    setSetIdsByExercise(initalExerciseState);
  }, []);

  const handleAddSetComponent = (exerciseName) => {
    setSetIdsByExercise((prev) => ({
      ...prev,
      [exerciseName]: [...prev[exerciseName], crypto.randomUUID()],
    }));
  };

  const handleDeleteSetComponent = (exerciseName, setId) => {
    setSetIdsByExercise((prev) => ({
      ...prev,
      [exerciseName]: prev[exerciseName].filter((id) => id !== setId),
    }));
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6">💪 Exercise Page</h1>

      <div className="mb-6">
        <button
          onClick={() => navigate(-1)}
          className="bg-gray-300 dark:bg-gray-700 text-black dark:text-white px-4 py-2 rounded hover:bg-gray-400 dark:hover:bg-gray-600"
        >
          ← Back
        </button>
      </div>
      <ul className="space-y-6">
        {exercises.map((exercise, idx) => (
          <div key={`${idx}-${exercise}`}>
            <li
              key={`${idx}-${exercise.name}`}
              className="bg-white dark:bg-gray-800 shadow-md p-4 rounded-lg"
            >
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-3">
                🏋️ {exercise.name}
              </h2>
              <div className="space-y-4">
                {setIdsByExercise[exercise.name]?.map((setId) => (
                  <div key={setId} className="flex justify-center w-full">
                    <RepsAndWeight
                      key={setId}
                      setId={setId}
                      exercise={exercise.name}
                      sessionId={sessionId}
                      onDeleteComponent={(setId) =>
                        handleDeleteSetComponent(exercise.name, setId)
                      }
                      onSaveComponent={() =>
                        handleAddSetComponent(exercise.name)
                      }
                    />
                  </div>
                ))}
              </div>
            </li>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default Exercise;
