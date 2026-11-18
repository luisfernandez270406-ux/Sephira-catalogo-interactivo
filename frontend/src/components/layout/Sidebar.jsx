import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { closeSidebar } from "../../store/slices/uiSlice";
import { logout } from "../../store/slices/authSlice";
import { NAV_ITEMS } from "../../constants/navigation";
import NavItem from "./NavItem";
import Button from "../ui/Button";

const Sidebar = () => {
  const dispatch = useDispatch();
  const sidebarOpen = useSelector((state) => state.ui.sidebarOpen);
  const user = useSelector((state) => state.auth.user);

  const handleClose = () => dispatch(closeSidebar());

  return (
    <>
      {sidebarOpen && (
        <div className="fixed inset-0 z-30 bg-black/40 md:hidden" onClick={handleClose} />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col bg-primary-dark p-4 text-white transition-transform md:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Link
          to="/"
          onClick={handleClose}
          className="mb-8 px-4 py-2 text-2xl font-bold tracking-widest"
        >
          SÉPHIRA
        </Link>

        <nav className="flex flex-1 flex-col gap-1">
          {NAV_ITEMS.map(({ id, label, icon, to, end }) => (
            <NavItem
              key={id}
              label={label}
              icon={icon}
              to={to}
              end={end}
              onClick={handleClose}
            />
          ))}
        </nav>

        <div className="border-t border-white/10 pt-4">
          <p className="truncate px-4 text-sm font-medium">{user?.name}</p>
          <p className="mb-3 truncate px-4 text-xs text-white/60">{user?.email}</p>
          <Button variant="accent" className="w-full" onClick={() => dispatch(logout())}>
            Cerrar sesión
          </Button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;