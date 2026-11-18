import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../store/slices/authSlice";
import { useForm } from "../hooks/useForm";
import FormField from "../components/ui/FormField";
import Button from "../components/ui/Button";

const validate = ({ name, email, password, confirm }) => {
  const errors = {};
  if (!name.trim()) errors.name = "El nombre es obligatorio";
  if (!/^\S+@\S+\.\S+$/.test(email.trim())) errors.email = "Ingresa un correo válido";
  if (password.length < 6) errors.password = "Mínimo 6 caracteres";
  if (confirm !== password) errors.confirm = "Las contraseñas no coinciden";
  return errors;
};

const getMessage = (error) => (typeof error === "string" ? error : error.message);

const Register = () => {
  const dispatch = useDispatch();
  const { token, user } = useSelector((state) => state.auth);
  const [serverError, setServerError] = useState("");

  const { values, errors, submitting, handleChange, handleSubmit } = useForm(
    { name: "", email: "", password: "", confirm: "" },
    validate
  );

  if (token && user) {
    return <Navigate to={user.role === "admin" ? "/admin" : "/tienda"} replace />;
  }

  const handleRegister = async ({ name, email, password }) => {
    setServerError("");
    try {
      await dispatch(registerUser({ name, email, password })).unwrap();
    } catch (err) {
      setServerError(getMessage(err));
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-sm">
        <h1 className="text-center text-3xl font-bold tracking-widest text-primary-dark">SÉPHIRA</h1>
        <p className="mb-6 mt-1 text-center text-sm text-ink/70">Crea tu cuenta</p>

        <form onSubmit={handleSubmit(handleRegister)} noValidate>
          <FormField label="Nombre" name="name" value={values.name} onChange={handleChange} error={errors.name} />
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
          <FormField
            label="Confirmar contraseña"
            name="confirm"
            type="password"
            value={values.confirm}
            onChange={handleChange}
            error={errors.confirm}
          />

          {serverError && (
            <p className="mb-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{serverError}</p>
          )}

          <Button type="submit" className="w-full" disabled={submitting}>
            {submitting ? "Creando cuenta..." : "Registrarme"}
          </Button>
        </form>

        <p className="mt-4 text-center text-sm">
          ¿Ya tienes cuenta?{" "}
          <Link to="/login" className="font-semibold text-primary underline">
            Inicia sesión
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;