import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  base: "/workout-planner-gymShark/", // ✅ Add this line
  plugins: [react()],
});
