import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Exercise from "./pages/Exercise";
import Home from "./pages/Home";
import Plan from "./pages/Plan";
import PlanBuilder from "./pages/PlanBuilder";
import Workout from "./pages/Workout";
import { useSelector } from "react-redux";

function App() {
  // const theme = useSelector((state) => state.theme.mode);

  // useEffect(() => {
  //   document.documentElement.classList.remove("light", "dark");
  //   document.documentElement.classList.add(theme);
  // }, [theme]);

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/create" element={<PlanBuilder />} />

          <Route path="/plan" element={<Plan />} />
          <Route path="/workout/:planId" element={<Workout />} />
          <Route path="/exercise/:workoutId" element={<Exercise />} />

          <Route path="*" element={<h1>404 - Page Not Found</h1>} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
