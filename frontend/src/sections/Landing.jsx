import { useDispatch } from "react-redux";
import { setView } from "../store/slices/uiSlice";

const Landing = () => {
  const dispatch = useDispatch();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-linear-to-br from-primary-dark to-primary px-6 text-center text-white">
      <h1 className="text-5xl font-bold tracking-widest md:text-7xl">SÉPHIRA</h1>
      <p className="mt-4 max-w-xl text-lg text-white/85">
        Administra tu catálogo, tus categorías y tus pedidos desde un solo panel.
      </p>
      <button
        onClick={() => dispatch(setView("dashboard"))}
        className="mt-8 rounded-lg bg-accent px-8 py-3 font-semibold text-white shadow-lg transition hover:brightness-110"
      >
        Entrar al panel
      </button>
    </div>
  );
};

export default Landing;