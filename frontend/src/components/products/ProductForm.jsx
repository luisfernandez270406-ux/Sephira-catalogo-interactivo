import { useForm } from "../../hooks/useForm";
import FormField from "../ui/FormField";
import Button from "../ui/Button";

const validate = ({ name, price, stock, category }) => {
  const errors = {};

  if (!name.trim()) {
    errors.name = "El nombre es obligatorio";
  }
  if (price === "" || Number.isNaN(Number(price)) || Number(price) < 0) {
    errors.price = "Ingresa un precio válido (0 o mayor)";
  }
  if (stock === "" || !Number.isInteger(Number(stock)) || Number(stock) < 0) {
    errors.stock = "Ingresa un stock entero (0 o mayor)";
  }
  if (!category) {
    errors.category = "Selecciona una categoría";
  }

  return errors;
};

const ProductForm = ({ product, categories, onSubmit, onCancel, serverError }) => {
  const { values, errors, submitting, handleChange, handleSubmit } = useForm(
    {
      name: product?.name ?? "",
      description: product?.description ?? "",
      price: product ? String(product.price) : "",
      stock: product ? String(product.stock) : "",
      image: product?.image ?? "",
      category: product?.category?._id ?? "",
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
        label="Categoría"
        name="category"
        as="select"
        value={values.category}
        onChange={handleChange}
        error={errors.category}
      >
        <option value="">Selecciona una categoría</option>
        {categories.map(({ _id, name }) => (
          <option key={_id} value={_id}>
            {name}
          </option>
        ))}
      </FormField>

      <div className="grid grid-cols-2 gap-4">
        <FormField
          label="Precio (USD)"
          name="price"
          type="number"
          step="0.01"
          min="0"
          value={values.price}
          onChange={handleChange}
          error={errors.price}
        />
        <FormField
          label="Stock"
          name="stock"
          type="number"
          step="1"
          min="0"
          value={values.stock}
          onChange={handleChange}
          error={errors.stock}
        />
      </div>

      <FormField
        label="URL de la imagen (opcional)"
        name="image"
        value={values.image}
        onChange={handleChange}
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
          {submitting ? "Guardando..." : product ? "Guardar cambios" : "Crear producto"}
        </Button>
      </div>
    </form>
  );
};

export default ProductForm;