import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addOrder } from "../store/slices/ordersSlice";
import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart,
  selectCartCount,
  selectCartTotal,
} from "../store/slices/cartSlice";
import { useForm } from "../hooks/useForm";
import { formatPrice } from "../utils/format";
import PageHeader from "../components/ui/PageHeader";
import FormField from "../components/ui/FormField";
import Button from "../components/ui/Button";

const validate = ({ customerName, customerEmail }) => {
  const errors = {};
  if (!customerName.trim()) errors.customerName = "Tu nombre es obligatorio";
  if (customerEmail.trim() && !/^\S+@\S+\.\S+$/.test(customerEmail.trim())) {
    errors.customerEmail = "Ingresa un correo válido";
  }
  return errors;
};

const getMessage = (error) => (typeof error === "string" ? error : error.message);

const Cart = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);
  const count = useSelector(selectCartCount);
  const total = useSelector(selectCartTotal);
  const user = useSelector((state) => state.auth.user);

  const [serverError, setServerError] = useState("");
  const [confirmation, setConfirmation] = useState(null);

  const { values, errors, submitting, handleChange, handleSubmit } = useForm(
    { customerName: user?.name ?? "", customerEmail: user?.email ?? "" },
    validate
  );

  const handleCheckout = async (formValues) => {
    setServerError("");
    try {
      const order = await dispatch(
        addOrder({
          ...formValues,
          items: items.map(({ _id, quantity }) => ({ product: _id, quantity })),
        })
      ).unwrap();

      setConfirmation({ name: order.customerName, total: order.total });
      dispatch(clearCart());
    } catch (err) {
      setServerError(getMessage(err));
    }
  };

  if (confirmation) {
    return (
      <div className="mx-auto max-w-md rounded-xl bg-white p-8 text-center shadow-sm">
        <p className="text-5xl" aria-hidden="true">
          ✅
        </p>
        <h1 className="mt-2 text-2xl font-bold text-primary-dark">¡Pedido realizado!</h1>
        <p className="mt-2 text-sm text-ink/70">
          Gracias, {confirmation.name}. Tu pedido por {formatPrice(confirmation.total)} quedó
          registrado como pendiente.
        </p>
        <Link
          to="/tienda"
          className="mt-6 inline-block rounded-lg bg-primary px-6 py-2 text-sm font-semibold text-white hover:bg-primary-dark"
        >
          Seguir comprando
        </Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <>
        <PageHeader title="Carrito" subtitle="Tus productos seleccionados" />
        <div className="rounded-xl bg-white p-8 text-center shadow-sm">
          <p className="text-ink/70">Tu carrito está vacío.</p>
          <Link
            to="/tienda"
            className="mt-4 inline-block rounded-lg bg-primary px-6 py-2 text-sm font-semibold text-white hover:bg-primary-dark"
          >
            Ir a la tienda
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <PageHeader title="Carrito" subtitle={`${count} unidad(es) en tu carrito`} />

      <div className="grid gap-6 lg:grid-cols-3">
        <section className="lg:col-span-2">
          <ul className="divide-y divide-ink/10 rounded-xl bg-white shadow-sm">
            {items.map(({ _id, name, price, image, quantity, stock }) => (
              <li key={_id} className="flex flex-wrap items-center gap-3 p-4">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center">
                  {image ? (
                    <img src={image} alt={name} className="h-full object-contain" />
                  ) : (
                    <span aria-hidden="true">🛍️</span>
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold">{name}</p>
                  <p className="text-xs text-ink/60">{formatPrice(price)} c/u</p>
                </div>

                <div className="flex items-center gap-1">
                  <Button
                    variant="outline"
                    className="px-2 py-1"
                    onClick={() => dispatch(decreaseQuantity(_id))}
                  >
                    −
                  </Button>
                  <span className="w-8 text-center text-sm">{quantity}</span>
                  <Button
                    variant="outline"
                    className="px-2 py-1"
                    disabled={quantity >= stock}
                    onClick={() => dispatch(increaseQuantity(_id))}
                  >
                    +
                  </Button>
                </div>

                <p className="w-24 text-right text-sm font-semibold">
                  {formatPrice(price * quantity)}
                </p>
                <button
                  onClick={() => dispatch(removeFromCart(_id))}
                  aria-label={`Quitar ${name}`}
                  className="text-xl text-red-600 hover:text-red-800"
                >
                  ×
                </button>
              </li>
            ))}
          </ul>

          <Button variant="outline" className="mt-4" onClick={() => dispatch(clearCart())}>
            Vaciar carrito
          </Button>
        </section>

        <section className="h-fit rounded-xl bg-white p-5 shadow-sm">
          <h2 className="mb-1 font-bold text-primary-dark">Resumen</h2>
          <p className="mb-4 text-2xl font-bold">{formatPrice(total)}</p>

          <form onSubmit={handleSubmit(handleCheckout)} noValidate>
            <FormField
              label="Nombre"
              name="customerName"
              value={values.customerName}
              onChange={handleChange}
              error={errors.customerName}
            />
            <FormField
              label="Correo (opcional)"
              name="customerEmail"
              type="email"
              value={values.customerEmail}
              onChange={handleChange}
              error={errors.customerEmail}
            />

            {serverError && (
              <p className="mb-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
                {serverError}
              </p>
            )}

            <Button type="submit" className="w-full" disabled={submitting}>
              {submitting ? "Procesando..." : "Confirmar pedido"}
            </Button>
          </form>
        </section>
      </div>
    </>
  );
};

export default Cart;