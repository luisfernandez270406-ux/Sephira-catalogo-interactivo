import { useState } from "react";
import Button from "../ui/Button";
import { formatPrice } from "../../utils/format";

const OrderItemsEditor = ({ products, cart }) => {
  const [selectedId, setSelectedId] = useState("");

  const available = products.filter(({ stock }) => stock > 0);

  const handleAdd = () => {
    const product = products.find(({ _id }) => _id === selectedId);
    if (!product) return;
    cart.addItem(product);
    setSelectedId("");
  };

  return (
    <div className="mb-4">
      <p className="mb-1 text-sm font-medium">Productos del pedido</p>

      <div className="flex gap-2">
        <select
          value={selectedId}
          onChange={(event) => setSelectedId(event.target.value)}
          className="min-w-0 flex-1 rounded-lg border border-ink/20 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="">Selecciona un producto</option>
          {available.map(({ _id, name, price, stock }) => (
            <option key={_id} value={_id}>
              {name} — {formatPrice(price)} ({stock} disp.)
            </option>
          ))}
        </select>
        <Button variant="accent" onClick={handleAdd} disabled={!selectedId}>
          Agregar
        </Button>
      </div>

      <ul className="mt-3 divide-y divide-ink/10 rounded-lg border border-ink/10">
        {cart.items.length === 0 ? (
          <li className="px-3 py-4 text-center text-sm text-ink/60">Aún no hay productos</li>
        ) : (
          cart.items.map(({ _id, name, price, quantity, stock }) => (
            <li key={_id} className="flex items-center gap-2 px-3 py-2 text-sm">
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium">{name}</p>
                <p className="text-xs text-ink/60">{formatPrice(price)} c/u</p>
              </div>

              <div className="flex items-center gap-1">
                <Button variant="outline" className="px-2 py-1" onClick={() => cart.decrease(_id)}>
                  −
                </Button>
                <span className="w-6 text-center">{quantity}</span>
                <Button
                  variant="outline"
                  className="px-2 py-1"
                  disabled={quantity >= stock}
                  onClick={() => cart.increase(_id)}
                >
                  +
                </Button>
              </div>

              <span className="w-20 text-right font-semibold">{formatPrice(price * quantity)}</span>
              <button
                type="button"
                onClick={() => cart.removeItem(_id)}
                aria-label={`Quitar ${name}`}
                className="text-lg text-red-600 hover:text-red-800"
              >
                ×
              </button>
            </li>
          ))
        )}
      </ul>

      <p className="mt-2 text-right text-sm">
        {cart.totalItems} unidad(es) · Total:{" "}
        <span className="text-base font-bold text-primary-dark">{formatPrice(cart.totalPrice)}</span>
      </p>
    </div>
  );
};

export default OrderItemsEditor;