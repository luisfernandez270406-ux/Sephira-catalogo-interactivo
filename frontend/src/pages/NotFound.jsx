import { Link } from "react-router-dom";

const NotFound = () => (
  <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
    <p className="text-6xl font-bold text-primary-dark">404</p>
    <p className="mt-2 text-ink/70">La página que buscas no existe.</p>
    <Link
      to="/"
      className="mt-6 rounded-lg bg-primary px-6 py-2 text-sm font-semibold text-white hover:bg-primary-dark"
    >
      Volver al inicio
    </Link>
  </div>
);

export default NotFound;