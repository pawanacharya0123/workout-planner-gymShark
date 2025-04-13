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

  // const handleAddSet = (exerciseName) => {
  //   setExerciseSets((prev) => ({
  //     ...prev,
  //     [exerciseName]: (prev[exerciseName] || 0) + 1,
  //   }));
  // };

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
    <div>
      <h1>Exercise Page</h1>
      <h2>
        <button onClick={() => navigate(-1)}>Back</button>
      </h2>
      <ul>
        {exercises.map((exercise, idx) => (
          <div key={`${idx}-${exercise}`}>
            <li>
              {exercise.name}

              {setIdsByExercise[exercise.name]?.map((setId) => (
                <RepsAndWeight
                  key={setId}
                  setId={setId}
                  exercise={exercise.name}
                  sessionId={sessionId}
                  onDeleteComponent={(setId) =>
                    handleDeleteSetComponent(exercise.name, setId)
                  }
                  onSaveComponent={() => handleAddSetComponent(exercise.name)}
                />
              ))}

              {/* <RepsAndWeight
                exercise={exercise.name}
                sessionId={sessionId}
                handleAddSet={handleAddSet}
              />

              {[...Array(exerciseSets[exercise.name] || 0)].map((_, setIdx) => (
                <RepsAndWeight
                  exercise={exercise.name}
                  sessionId={sessionId}
                  handleAddSet={handleAddSet}
                />
              ))} */}
            </li>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default Exercise;
