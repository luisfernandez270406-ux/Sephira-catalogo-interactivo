import { useDispatch } from "react-redux";
import { toggleSidebar } from "../../store/slices/uiSlice";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  const dispatch = useDispatch();

  return (
    <div className="min-h-screen">
      <Sidebar />

      <div className="md:ml-64">
        <header className="flex items-center gap-3 bg-white px-4 py-3 shadow-sm md:hidden">
          <button
            onClick={() => dispatch(toggleSidebar())}
            className="rounded-md p-2 text-2xl text-primary-dark"
            aria-label="Abrir menú"
          >
            ☰
          </button>
          <span className="font-bold tracking-widest text-primary-dark">SÉPHIRA</span>
        </header>

        <main className="p-4 md:p-8">{children}</main>
      </div>
    </div>
  );
};

export default Layout;