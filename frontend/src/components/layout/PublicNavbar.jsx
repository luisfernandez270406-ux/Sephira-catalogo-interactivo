import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/slices/authSlice";
import { selectCartCount } from "../../store/slices/cartSlice";

const linkClass = ({ isActive }) =>
  `text-sm font-medium transition-colors ${
    isActive ? "text-accent" : "text-white/80 hover:text-white"
  }`;

const PublicNavbar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const cartCount = useSelector(selectCartCount);

  return (
    <header className="bg-primary-dark text-white">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3">
        <Link to="/" className="text-xl font-bold tracking-widest">
          SÉPHIRA
        </Link>

        <nav className="flex flex-wrap items-center gap-4">
          <NavLink to="/tienda" className={linkClass}>
            Tienda
          </NavLink>
          <NavLink to="/carrito" className={linkClass}>
            🛒 Carrito ({cartCount})
          </NavLink>

          {user?.role === "admin" && (
            <NavLink to="/admin" className={linkClass}>
              Panel
            </NavLink>
          )}

          {user ? (
            <>
              <span className="hidden text-sm text-white/70 sm:inline">{user.name}</span>
              <button
                onClick={() => dispatch(logout())}
                className="rounded-lg bg-accent px-3 py-1.5 text-sm font-semibold"
              >
                Cerrar sesión
              </button>
            </>
          ) : (
            <Link to="/login" className="rounded-lg bg-accent px-3 py-1.5 text-sm font-semibold">
              Iniciar sesión
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default PublicNavbar;