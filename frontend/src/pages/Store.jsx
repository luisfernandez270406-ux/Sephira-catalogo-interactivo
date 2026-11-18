import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../store/slices/productsSlice";
import { fetchCategories } from "../store/slices/categoriesSlice";
import { addToCart } from "../store/slices/cartSlice";
import { useDebounce } from "../hooks/useDebounce";
import PageHeader from "../components/ui/PageHeader";
import ProductCard from "../components/store/ProductCard";

const Store = () => {
  const dispatch = useDispatch();
  const { items: products, loading, error } = useSelector((state) => state.products);
  const categories = useSelector((state) => state.categories.items);
  const cartItems = useSelector((state) => state.cart.items);

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const debouncedSearch = useDebounce(search);

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategories());
  }, [dispatch]);

  const filteredProducts = useMemo(
    () =>
      products.filter(({ name, category }) => {
        const matchesName = name.toLowerCase().includes(debouncedSearch.trim().toLowerCase());
        const matchesCategory = !categoryFilter || category?._id === categoryFilter;
        return matchesName && matchesCategory;
      }),
    [products, debouncedSearch, categoryFilter]
  );

  const quantityInCart = (id) => cartItems.find((item) => item._id === id)?.quantity ?? 0;

  return (
    <>
      <PageHeader title="Tienda" subtitle="Descubre nuestros productos" />

      <div className="mb-6 flex flex-wrap gap-3">
        <input
          type="search"
          placeholder="Buscar productos..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          className="w-full rounded-lg border border-ink/20 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary sm:w-72"
        />
        <select
          value={categoryFilter}
          onChange={(event) => setCategoryFilter(event.target.value)}
          className="w-full rounded-lg border border-ink/20 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary sm:w-56"
        >
          <option value="">Todas las categorías</option>
          {categories.map(({ _id, name }) => (
            <option key={_id} value={_id}>
              {name}
            </option>
          ))}
        </select>
        <p className="self-center text-sm text-ink/60">
          {filteredProducts.length} producto(s)
        </p>
      </div>

      {error && (
        <p className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
      )}

      {loading && products.length === 0 ? (
        <p className="text-ink/60">Cargando productos...</p>
      ) : filteredProducts.length === 0 ? (
        <p className="text-ink/60">No se encontraron productos.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              quantityInCart={quantityInCart(product._id)}
              onAdd={(item) => dispatch(addToCart(item))}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default Store;