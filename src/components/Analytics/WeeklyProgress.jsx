import React from "react";
import { datesWithDays } from "../../utils/getWeekDates";
import { useSelector } from "react-redux";

const WeeklyProgress = () => {
  const weekDates = datesWithDays();
  const workoutSessions = useSelector((state) => state.session.workoutSessions);
  return (
    <>
      {weekDates.map((dayInfo) => (
        <div key={dayInfo.date}>
          {
            workoutSessions.filter(
              (wk) =>
                new Date(wk.date).toISOString().split("T")[0] ===
                new Date(dayInfo.date).toISOString().split("T")[0]
            ).length
          }
          {"  "}exercises ON <strong>{dayInfo.day}</strong>:{" "}
          {new Date(dayInfo.date).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
          })}{" "}
        </div>
      ))}
    </>
  );
};

export default WeeklyProgress;
