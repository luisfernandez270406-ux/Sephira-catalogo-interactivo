import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Landing = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-linear-to-br from-primary-dark to-primary px-6 text-center text-white">
      <h1 className="text-5xl font-bold tracking-widest md:text-7xl">SÉPHIRA</h1>
      <p className="mt-4 max-w-xl text-lg text-white/85">
        Administra tu catálogo, tus categorías y tus pedidos desde un solo panel.
      </p>

      {user && <p className="mt-4 text-sm text-white/80">Sesión iniciada como {user.name}</p>}

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          to="/admin"
          className="rounded-lg bg-accent px-8 py-3 font-semibold text-white shadow-lg transition hover:brightness-110"
        >
          Entrar al panel
        </Link>
        {!user && (
          <Link
            to="/login"
            className="rounded-lg border border-white/60 px-8 py-3 font-semibold text-white transition hover:bg-white/10"
          >
            Iniciar sesión
          </Link>
        )}
      </div>
    </div>
  );
};

export default Landing;