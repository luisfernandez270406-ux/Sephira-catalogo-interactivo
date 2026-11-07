import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  addProduct,
  editProduct,
  removeProduct,
} from "../store/slices/productsSlice";
import { fetchCategories } from "../store/slices/categoriesSlice";
import { useModal } from "../hooks/useModal";
import { useDebounce } from "../hooks/useDebounce";
import { formatPrice } from "../utils/format";
import PageHeader from "../components/ui/PageHeader";
import Button from "../components/ui/Button";
import Modal from "../components/ui/Modal";
import DataTable from "../components/shared/DataTable";
import ProductForm from "../components/products/ProductForm";

const columns = [
  {
    key: "image",
    label: "Imagen",
    render: ({ image, name }) =>
      image ? (
        <img src={image} alt={name} className="h-12 w-12 rounded-md bg-white object-contain" />
      ) : (
        <span className="text-ink/40">—</span>
      ),
  },
  { key: "name", label: "Nombre" },
  { key: "category", label: "Categoría", render: ({ category }) => category?.name ?? "—" },
  { key: "price", label: "Precio", render: ({ price }) => formatPrice(price) },
  {
    key: "stock",
    label: "Stock",
    render: ({ stock }) => (
      <span
        className={`rounded-full px-2 py-1 text-xs font-semibold ${
          stock < 5 ? "bg-red-100 text-red-700" : "bg-primary/10 text-primary-dark"
        }`}
      >
        {stock}
      </span>
    ),
  },
];

const getMessage = (error) => (typeof error === "string" ? error : error.message);

const Products = () => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.products);
  const categories = useSelector((state) => state.categories.items);
  const modal = useModal();

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [formError, setFormError] = useState("");
  const [actionError, setActionError] = useState("");

  const debouncedSearch = useDebounce(search);

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategories());
  }, [dispatch]);

  const filteredProducts = useMemo(
    () =>
      items.filter(({ name, category }) => {
        const matchesName = name.toLowerCase().includes(debouncedSearch.trim().toLowerCase());
        const matchesCategory = !categoryFilter || category?._id === categoryFilter;
        return matchesName && matchesCategory;
      }),
    [items, debouncedSearch, categoryFilter]
  );

  const openModal = (product = null) => {
    setFormError("");
    modal.open(product);
  };

  const handleSave = async (values) => {
    const payload = {
      ...values,
      price: Number(values.price),
      stock: Number(values.stock),
    };

    try {
      if (modal.data) {
        await dispatch(editProduct({ id: modal.data._id, ...payload })).unwrap();
      } else {
        await dispatch(addProduct(payload)).unwrap();
      }
      modal.close();
    } catch (err) {
      setFormError(getMessage(err));
    }
  };

  const handleDelete = async (product) => {
    if (!window.confirm(`¿Eliminar el producto "${product.name}"?`)) return;

    setActionError("");
    try {
      await dispatch(removeProduct(product._id)).unwrap();
    } catch (err) {
      setActionError(getMessage(err));
    }
  };

  return (
    <>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <PageHeader title="Productos" subtitle="Gestiona tu catálogo" />
        <Button variant="accent" onClick={() => openModal()}>
          + Nuevo producto
        </Button>
      </div>

      <div className="mb-4 flex flex-wrap gap-3">
        <input
          type="search"
          placeholder="Buscar por nombre..."
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
          Mostrando {filteredProducts.length} de {items.length}
        </p>
      </div>

      {(error || actionError) && (
        <p className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
          {actionError || error}
        </p>
      )}

      <DataTable
        columns={columns}
        rows={filteredProducts}
        loading={loading}
        emptyMessage={
          items.length === 0 ? "Aún no hay productos" : "Ningún producto coincide con los filtros"
        }
        onEdit={openModal}
        onDelete={handleDelete}
      />

      <Modal
        isOpen={modal.isOpen}
        title={modal.data ? "Editar producto" : "Nuevo producto"}
        onClose={modal.close}
      >
        <ProductForm
          product={modal.data}
          categories={categories}
          onSubmit={handleSave}
          onCancel={modal.close}
          serverError={formError}
        />
      </Modal>
    </>
  );
};

export default Products;