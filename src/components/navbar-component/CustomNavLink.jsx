import { NavLink, useLocation } from "react-router-dom";

const CustomNavLink = ({ to, children }) => {
  const location = useLocation();
  const path = location.pathname;

  // Define all routes where this link should be active
  const isActive =
    path === "/plan" ||
    path.startsWith("/workout/") ||
    path.startsWith("/exercise/");

  return (
    <NavLink
      to={to}
      className={
        isActive
          ? "text-blue-500 font-semibold border-b-2 border-blue-500"
          : "text-gray-700 dark:text-gray-300 hover:text-blue-400"
      }
    >
      {children}
    </NavLink>
  );
};

export default CustomNavLink;
