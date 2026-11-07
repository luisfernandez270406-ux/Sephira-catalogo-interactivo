import { useState } from "react";
import { useForm } from "../../hooks/useForm";
import { useCart } from "../../hooks/useCart";
import { ORDER_STATUSES } from "../../constants/orderStatus";
import { formatPrice } from "../../utils/format";
import FormField from "../ui/FormField";
import Button from "../ui/Button";
import OrderItemsEditor from "./OrderItemsEditor";

const validate = ({ customerName, customerEmail }) => {
  const errors = {};

  if (!customerName.trim()) {
    errors.customerName = "El nombre del cliente es obligatorio";
  }
  if (customerEmail.trim() && !/^\S+@\S+\.\S+$/.test(customerEmail.trim())) {
    errors.customerEmail = "Ingresa un correo válido";
  }

  return errors;
};

const OrderForm = ({ order, products, onSubmit, onCancel, serverError }) => {
  const cart = useCart();
  const [cartError, setCartError] = useState("");

  const { values, errors, submitting, handleChange, handleSubmit } = useForm(
    {
      customerName: order?.customerName ?? "",
      customerEmail: order?.customerEmail ?? "",
      status: order?.status ?? "pendiente",
    },
    validate
  );

  const submit = async (formValues) => {
    if (order) {
      await onSubmit(formValues);
      return;
    }

    if (cart.items.length === 0) {
      setCartError("Agrega al menos un producto al pedido");
      return;
    }

    setCartError("");
    await onSubmit({
      customerName: formValues.customerName,
      customerEmail: formValues.customerEmail,
      items: cart.items.map(({ _id, quantity }) => ({ product: _id, quantity })),
    });
  };

  return (
    <form onSubmit={handleSubmit(submit)} noValidate>
      <FormField
        label="Cliente"
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

      {order ? (
        <>
          <FormField
            label="Estado"
            name="status"
            as="select"
            value={values.status}
            onChange={handleChange}
          >
            {ORDER_STATUSES.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </FormField>

          <p className="mb-1 text-sm font-medium">Productos (no editables)</p>
          <ul className="mb-4 divide-y divide-ink/10 rounded-lg border border-ink/10 text-sm">
            {order.items.map(({ product, name, price, quantity }) => (
              <li key={product} className="flex justify-between gap-2 px-3 py-2">
                <span>
                  {quantity} × {name}
                </span>
                <span className="font-semibold">{formatPrice(price * quantity)}</span>
              </li>
            ))}
          </ul>
          <p className="mb-4 text-right text-sm">
            Total: <span className="text-base font-bold text-primary-dark">{formatPrice(order.total)}</span>
          </p>
        </>
      ) : (
        <>
          <OrderItemsEditor products={products} cart={cart} />
          {cartError && <p className="mb-4 text-xs text-red-600">{cartError}</p>}
        </>
      )}

      {serverError && (
        <p className="mb-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{serverError}</p>
      )}

      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit" disabled={submitting}>
          {submitting ? "Guardando..." : order ? "Guardar cambios" : "Crear pedido"}
        </Button>
      </div>
    </form>
  );
};

export default OrderForm;