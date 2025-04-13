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
    <NavLink to={to} className={isActive ? "nav-link active" : "nav-link"}>
      {children}
    </NavLink>
  );
};

export default CustomNavLink;
