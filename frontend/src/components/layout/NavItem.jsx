import { NavLink } from "react-router-dom";

const NavItem = ({ label, icon, to, end = false, onClick }) => (
  <NavLink
    to={to}
    end={end}
    onClick={onClick}
    className={({ isActive }) =>
      `flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm font-medium transition-colors ${
        isActive ? "bg-accent text-white" : "text-white/80 hover:bg-white/10 hover:text-white"
      }`
    }
  >
    <span aria-hidden="true">{icon}</span>
    {label}
  </NavLink>
);

export default NavItem;