import React from "react";
import WeeklyProgress from "../components/Analytics/WeeklyProgress";
import SetExcercisePB from "../components/Analytics/SetExcercisePB";
import AllExercisePB from "../components/Analytics/AllExercisePB";

const Home = () => {
  return (
    <div className="analytics-page p-4">
      <h1 className="text-4xl font-bold text-center mb-8 flex items-center justify-center gap-2 text-gray-800 dark:text-white">
        📊 <span>Analytics</span>
      </h1>

      <div className="flex flex-col lg:flex-row gap-4">
        {/* Left: Weekly Progress (natural height) */}
        <div className="lg:w-1/4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-4">This Week Progress</h3>
          <WeeklyProgress />
        </div>

        {/* Right: PB Cards */}
        <div className="lg:w-3/4">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 overflow-y-auto max-h-[700px] pr-2">
            <AllExercisePB />

            {/* Add New PB */}
            <div className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg p-3 shadow-md text-sm">
              <SetExcercisePB />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
