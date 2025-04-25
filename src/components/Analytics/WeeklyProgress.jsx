import React from "react";
import { datesWithDays } from "../../utils/getWeekDates";
import { useSelector } from "react-redux";

const WeeklyProgress = () => {
  const weekDates = datesWithDays();
  const workoutSessions = useSelector((state) => state.session.workoutSessions);
  return (
    <div className="space-y-4">
      {weekDates.map(({ date, day }) => {
        const dateFromWeekDates = new Date(date).toLocaleString().split(",")[0];
        const workoutsForTheDay = workoutSessions.filter((wk) => {
          const dateFromWorkoutSession = new Date(wk.date)
            .toLocaleString()
            .split(",")[0];

          return (
            dateFromWorkoutSession === dateFromWeekDates &&
            wk.exercises.length > 0
          );
        }).length;

        return (
          <div
            key={date}
            className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md"
          >
            <div className="flex justify-between items-center">
              <span
                className={`text-lg sm:text-xl font-medium ${
                  workoutsForTheDay === 0
                    ? "text-gray-400"
                    : "text-gray-800 dark:text-white"
                }`}
              >
                <span className="font-bold">{workoutsForTheDay}</span> Workouts
              </span>
              <span className="text-sm text-gray-500">
                {`${day.slice(0, 3).toUpperCase()},
                ${new Date(date).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                })}`}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default WeeklyProgress;
