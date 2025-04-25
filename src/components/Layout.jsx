import React from "react";
import { NavLink } from "react-router-dom";
import { Outlet } from "react-router-dom";
import ThemeButton from "./ThemeButton";
import CustomNavLink from "./navbar-component/CustomNavLink";
import UnitButton from "./UnitButton";

const Layout = () => {
  return (
    <div>
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex space-x-6">
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "text-blue-500 font-semibold border-b-2 border-blue-500"
                  : "text-gray-700 dark:text-gray-300 hover:text-blue-400"
              }
              to="/"
            >
              {" "}
              Analytics{" "}
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "text-blue-500 font-semibold border-b-2 border-blue-500"
                  : "text-gray-700 dark:text-gray-300 hover:text-blue-400"
              }
              to="/create"
            >
              {" "}
              Create Plan{" "}
            </NavLink>
            <CustomNavLink to="/plan">Start workout</CustomNavLink>
          </div>

          <div className="flex items-center gap-2">
            <UnitButton />
            <ThemeButton />
          </div>
        </div>
      </nav>

      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
