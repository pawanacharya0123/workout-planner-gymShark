import React from "react";
import WeeklyProgress from "../components/Analytics/WeeklyProgress";
import ExercisePB from "../components/Analytics/ExercisePB";
const Home = () => {
  return (
    <div className="analytics-page p-4">
      <h1 className="text-4xl font-bold text-center mb-8 flex items-center justify-center gap-2 text-gray-800 dark:text-white">
        📊 <span>Analytics</span>
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div className="lg:col-span-1 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-4">This Week Progress</h3>
          <WeeklyProgress />
        </div>

        <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">DeadLift PB</h3>
            <ExercisePB exerciseName={"Deadlift"} filterOn={"weight"} />
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Squat PB</h3>
            <ExercisePB exerciseName={"Squat"} filterOn={"weight"} />
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Benchpress PB</h3>
            <ExercisePB exerciseName={"Bench Press"} filterOn={"weight"} />
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Pull Ups PB</h3>
            <ExercisePB exerciseName={"Pull-ups"} filterOn={"reps"} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
