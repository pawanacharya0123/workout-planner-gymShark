import React from "react";
import WeeklyProgress from "../components/Analytics/WeeklyProgress";
import ExercisePB from "../components/Analytics/ExercisePB";
const Home = () => {
  // console.log(workoutSessions);
  // console.log(
  //   workoutSessions.filter(
  //     (wk) => new Date(wk.date).toISOString().split("T")[0] === "2025-04-11"
  //   ).length
  // );
  return (
    <div className="analytics-page">
      <h1>Analytics Page</h1>
      <div className="grid-container">
        <div className="card">
          <h3> Weekly Progress </h3>
          <WeeklyProgress />
        </div>

        <div className="card">
          <h3>DeadLift PB </h3>
          <ExercisePB exerciseName={"Deadlift"} filterOn={"weight"} />
        </div>

        <div className="card">
          <h3>Benchpress PB</h3>
          <ExercisePB exerciseName={"Squat"} filterOn={"weight"} />
        </div>
        <div className="card">
          <h3>Benchpress PB</h3>
          <ExercisePB exerciseName={"Bench Press"} filterOn={"weight"} />
        </div>
        <div className="card">
          <h3>Pull Ups PB</h3>
          <ExercisePB exerciseName={"Pull-ups"} filterOn={"reps"} />
        </div>
        {/* Add more cards as needed */}
      </div>
    </div>
  );
};

export default Home;
