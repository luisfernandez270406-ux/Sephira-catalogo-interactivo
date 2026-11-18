import Button from "../ui/Button";
import { formatPrice } from "../../utils/format";

const ProductCard = ({ product, quantityInCart, onAdd }) => {
  const { name, price, image, stock, category } = product;
  const soldOut = stock <= 0;
  const maxReached = quantityInCart >= stock;

  return (
    <article className="flex flex-col overflow-hidden rounded-xl bg-white shadow-sm">
      <div className="flex h-48 items-center justify-center bg-white p-4">
        {image ? (
          <img src={image} alt={name} className="h-full object-contain" />
        ) : (
          <span className="text-4xl" aria-hidden="true">
            🛍️
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4">
        <p className="text-xs font-medium uppercase tracking-wide text-primary">
          {category?.name ?? "Sin categoría"}
        </p>
        <h3 className="mt-1 line-clamp-2 flex-1 text-sm font-semibold">{name}</h3>
        <p className="mt-2 text-lg font-bold text-primary-dark">{formatPrice(price)}</p>
        <p className="text-xs text-ink/60">{soldOut ? "Agotado" : `${stock} disponibles`}</p>

        <Button
          variant="accent"
          className="mt-3"
          disabled={soldOut || maxReached}
          onClick={() => onAdd(product)}
        >
          {soldOut ? "Agotado" : maxReached ? "Máximo en el carrito" : "Agregar al carrito"}
        </Button>
      </div>
    </article>
  );
};

export default ProductCard;