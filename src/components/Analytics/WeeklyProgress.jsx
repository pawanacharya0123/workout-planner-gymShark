import React from "react";
import { datesWithDays } from "../../utils/getWeekDates";
import { useSelector } from "react-redux";

const WeeklyProgress = () => {
  const weekDates = datesWithDays();
  const workoutSessions = useSelector((state) => state.session.workoutSessions);
  return (
    <div className="space-y-4">
      {weekDates.map((dayInfo) => {
        const workoutsForTheDay = workoutSessions.filter(
          (wk) =>
            new Date(wk.date).toLocaleString().split(",")[0] ===
              new Date(dayInfo.date).toLocaleString().split(",")[0] &&
            wk.exercises.length > 0
        ).length;

        return (
          <div
            key={dayInfo.date}
            className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md"
          >
            <div className="flex justify-between items-center">
              <span className="text-xl">
                <span className="font-semibold">{workoutsForTheDay}</span>{" "}
                Workouts
              </span>
              <span className="text-sm text-gray-500">
                {`${dayInfo.day.slice(0, 3).toUpperCase()},
                ${new Date(dayInfo.date).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  // timeZone: "UTC",
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
