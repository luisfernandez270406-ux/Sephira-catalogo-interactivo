import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCategories,
  addCategory,
  editCategory,
  removeCategory,
} from "../store/slices/categoriesSlice";
import { useModal } from "../hooks/useModal";
import PageHeader from "../components/ui/PageHeader";
import Button from "../components/ui/Button";
import Modal from "../components/ui/Modal";
import DataTable from "../components/shared/DataTable";
import CategoryForm from "../components/categories/CategoryForm";

const columns = [
  { key: "name", label: "Nombre" },
  { key: "description", label: "Descripción", render: ({ description }) => description || "—" },
  {
    key: "createdAt",
    label: "Creada",
    render: ({ createdAt }) => new Date(createdAt).toLocaleDateString("es-VE"),
  },
];

const getMessage = (error) => (typeof error === "string" ? error : error.message);

const Categories = () => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.categories);
  const modal = useModal();
  const [formError, setFormError] = useState("");
  const [actionError, setActionError] = useState("");

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const openModal = (category = null) => {
    setFormError("");
    modal.open(category);
  };

  const handleSave = async (values) => {
    try {
      if (modal.data) {
        await dispatch(editCategory({ id: modal.data._id, ...values })).unwrap();
      } else {
        await dispatch(addCategory(values)).unwrap();
      }
      modal.close();
    } catch (err) {
      setFormError(getMessage(err));
    }
  };

  const handleDelete = async (category) => {
    if (!window.confirm(`¿Eliminar la categoría "${category.name}"?`)) return;

    setActionError("");
    try {
      await dispatch(removeCategory(category._id)).unwrap();
    } catch (err) {
      setActionError(getMessage(err));
    }
  };

  return (
    <>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <PageHeader title="Categorías" subtitle="Organiza tus productos" />
        <Button variant="accent" onClick={() => openModal()}>
          + Nueva categoría
        </Button>
      </div>

      {(error || actionError) && (
        <p className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
          {actionError || error}
        </p>
      )}

      <DataTable
        columns={columns}
        rows={items}
        loading={loading}
        emptyMessage="Aún no hay categorías"
        onEdit={openModal}
        onDelete={handleDelete}
      />

      <Modal
        isOpen={modal.isOpen}
        title={modal.data ? "Editar categoría" : "Nueva categoría"}
        onClose={modal.close}
      >
        <CategoryForm
          category={modal.data}
          onSubmit={handleSave}
          onCancel={modal.close}
          serverError={formError}
        />
      </Modal>
    </>
  );
};

export default Categories;