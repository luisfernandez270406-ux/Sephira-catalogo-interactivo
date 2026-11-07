import { useForm } from "../../hooks/useForm";
import FormField from "../ui/FormField";
import Button from "../ui/Button";

const validate = (values) => {
  const errors = {};
  if (!values.name.trim()) {
    errors.name = "El nombre es obligatorio";
  }
  return errors;
};

const CategoryForm = ({ category, onSubmit, onCancel, serverError }) => {
  const { values, errors, submitting, handleChange, handleSubmit } = useForm(
    {
      name: category?.name ?? "",
      description: category?.description ?? "",
    },
    validate
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <FormField
        label="Nombre"
        name="name"
        value={values.name}
        onChange={handleChange}
        error={errors.name}
      />
      <FormField
        label="Descripción"
        name="description"
        as="textarea"
        rows={3}
        value={values.description}
        onChange={handleChange}
      />

      {serverError && (
        <p className="mb-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{serverError}</p>
      )}

      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit" disabled={submitting}>
          {submitting ? "Guardando..." : category ? "Guardar cambios" : "Crear categoría"}
        </Button>
      </div>
    </form>
  );
};

export default CategoryForm;