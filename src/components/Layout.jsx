import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Outlet } from "react-router-dom";
// import { useEffect } from "react";
import ThemeButton from "./ThemeButton";
import CustomNavLink from "./navbar-component/CustomNavLink";

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
          {/* <NavLink
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
            to="/plan"
          >
            {" "}
            Start workout{" "}
          </NavLink> */}
        </div>

        <ThemeButton />
      </nav>

      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
