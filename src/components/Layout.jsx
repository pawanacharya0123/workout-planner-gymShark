import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Outlet } from "react-router-dom";
// import { useEffect } from "react";
import ThemeButton from "./ThemeButton";
import CustomNavLink from "./navbar-component/CustomNavLink";
import UnitButton from "./UnitButton";

const Layout = () => {
  // const location = useLocation();
  // const isActive = activePaths.includes(location.pathname);

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar">
        <div className="nav-links">
          <NavLink
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
            to="/"
          >
            {" "}
            Analytics{" "}
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
            to="/create"
          >
            {" "}
            Create Plan{" "}
          </NavLink>
          <CustomNavLink to="/plan">Start workout</CustomNavLink>
        </div>
        <div className="flex gap-2">
          <UnitButton />
          <ThemeButton />
        </div>
      </nav>

      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
