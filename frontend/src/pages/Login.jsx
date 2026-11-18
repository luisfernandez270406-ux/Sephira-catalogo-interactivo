import { useState } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../store/slices/authSlice";
import { useForm } from "../hooks/useForm";
import FormField from "../components/ui/FormField";
import Button from "../components/ui/Button";

const validate = ({ email, password }) => {
  const errors = {};
  if (!email.trim()) errors.email = "El correo es obligatorio";
  if (!password) errors.password = "La contraseña es obligatoria";
  return errors;
};

const getMessage = (error) => (typeof error === "string" ? error : error.message);

const Login = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { token, user } = useSelector((state) => state.auth);
  const [serverError, setServerError] = useState("");

  const { values, errors, submitting, handleChange, handleSubmit } = useForm(
    { email: "", password: "" },
    validate
  );

  if (token && user) {
    const destination = user.role === "admin" ? (location.state?.from?.pathname ?? "/admin") : "/";
    return <Navigate to={destination} replace />;
  }

  const handleLogin = async (formValues) => {
    setServerError("");
    try {
      await dispatch(loginUser(formValues)).unwrap();
    } catch (err) {
      setServerError(getMessage(err));
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-sm">
        <h1 className="text-center text-3xl font-bold tracking-widest text-primary-dark">SÉPHIRA</h1>
        <p className="mb-6 mt-1 text-center text-sm text-ink/70">Inicia sesión para continuar</p>

        <form onSubmit={handleSubmit(handleLogin)} noValidate>
          <FormField
            label="Correo"
            name="email"
            type="email"
            value={values.email}
            onChange={handleChange}
            error={errors.email}
          />
          <FormField
            label="Contraseña"
            name="password"
            type="password"
            value={values.password}
            onChange={handleChange}
            error={errors.password}
          />

          {serverError && (
            <p className="mb-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{serverError}</p>
          )}

          <Button type="submit" className="w-full" disabled={submitting}>
            {submitting ? "Ingresando..." : "Iniciar sesión"}
          </Button>
        </form>

        <p className="mt-4 text-center text-sm">
          ¿No tienes cuenta?{" "}
          <Link to="/registro" className="font-semibold text-primary underline">
            Regístrate
          </Link>
        </p>
        <p className="mt-2 text-center text-sm">
          <Link to="/" className="text-ink/60 underline">
            Volver al inicio
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;