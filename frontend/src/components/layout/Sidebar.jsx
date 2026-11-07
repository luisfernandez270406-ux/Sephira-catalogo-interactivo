import { useDispatch, useSelector } from "react-redux";
import { setView, closeSidebar } from "../../store/slices/uiSlice";
import { NAV_ITEMS } from "../../constants/navigation";
import NavItem from "./NavItem";

const Sidebar = () => {
  const dispatch = useDispatch();
  const { currentView, sidebarOpen } = useSelector((state) => state.ui);

  return (
    <>
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 md:hidden"
          onClick={() => dispatch(closeSidebar())}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col bg-primary-dark p-4 text-white transition-transform md:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          onClick={() => dispatch(setView("landing"))}
          className="mb-8 px-4 py-2 text-left text-2xl font-bold tracking-widest"
        >
          SÉPHIRA
        </button>

        <nav className="flex flex-1 flex-col gap-1">
          {NAV_ITEMS.map(({ id, label, icon }) => (
            <NavItem
              key={id}
              label={label}
              icon={icon}
              active={currentView === id}
              onClick={() => dispatch(setView(id))}
            />
          ))}
        </nav>

        <p className="px-4 text-xs text-white/50">Panel de administración</p>
      </aside>
    </>
  );
};

export default Sidebar;