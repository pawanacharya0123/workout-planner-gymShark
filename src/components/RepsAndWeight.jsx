import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addSetToExercise, deleteSet } from "../features/workout/sessionSlice";

const RepsAndWeight = ({
  setId,
  exercise,
  sessionId,
  onDeleteComponent,
  onSaveComponent,
}) => {
  // const [setId, setSetId] = useState("");
  const [reps, setReps] = useState("");
  const [weight, setWeight] = useState("");
  const [saved, setSaved] = useState(false);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   setSetId(crypto.randomUUID());
  // }, []);

  const handleDeleteSet = () => {
    dispatch(
      deleteSet({
        sessionId,
        exercise,
        setId,
      })
    );
    onDeleteComponent(setId);
  };

  const onSaveSetClickHandle = () => {
    dispatch(
      addSetToExercise({
        sessionId,
        exercise,
        setId,
        reps,
        weight,
      })
    );
    if (!saved) {
      setSaved(true);
      onSaveComponent();
    }
  };

  return (
    <section>
      <input
        type="number"
        name="reps"
        placeholder="Reps"
        value={reps}
        required
        onChange={(e) => setReps(e.currentTarget.value)}
      />
      <input
        type="number"
        name="weight"
        placeholder="Weight"
        value={weight}
        required
        onChange={(e) => setWeight(e.currentTarget.value)}
      />
      <button type="btn" onClick={onSaveSetClickHandle}>
        {!saved ? "Save" : "Update"} Set
      </button>
      {saved && <button onClick={handleDeleteSet}>❌</button>}
    </section>
  );
};

export default RepsAndWeight;
