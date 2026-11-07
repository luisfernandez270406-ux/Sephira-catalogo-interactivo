import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchOrders,
  addOrder,
  editOrder,
  removeOrder,
} from "../store/slices/ordersSlice";
import { fetchProducts } from "../store/slices/productsSlice";
import { useModal } from "../hooks/useModal";
import { ORDER_STATUSES, STATUS_STYLES } from "../constants/orderStatus";
import { formatPrice } from "../utils/format";
import PageHeader from "../components/ui/PageHeader";
import Button from "../components/ui/Button";
import Modal from "../components/ui/Modal";
import DataTable from "../components/shared/DataTable";
import OrderForm from "../components/orders/OrderForm";

const getMessage = (error) => (typeof error === "string" ? error : error.message);

const Orders = () => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.orders);
  const products = useSelector((state) => state.products.items);
  const modal = useModal();

  const [statusFilter, setStatusFilter] = useState("");
  const [formError, setFormError] = useState("");
  const [actionError, setActionError] = useState("");

  useEffect(() => {
    dispatch(fetchOrders());
    dispatch(fetchProducts());
  }, [dispatch]);

  const filteredOrders = useMemo(
    () => items.filter(({ status }) => !statusFilter || status === statusFilter),
    [items, statusFilter]
  );

  const openModal = (order = null) => {
    setFormError("");
    modal.open(order);
  };

  const handleSave = async (values) => {
    try {
      if (modal.data) {
        await dispatch(editOrder({ id: modal.data._id, ...values })).unwrap();
      } else {
        await dispatch(addOrder(values)).unwrap();
      }
      modal.close();
    } catch (err) {
      setFormError(getMessage(err));
    }
  };

  const handleStatusChange = async (order, status) => {
    setActionError("");
    try {
      await dispatch(editOrder({ id: order._id, status })).unwrap();
    } catch (err) {
      setActionError(getMessage(err));
    }
  };

  const handleDelete = async (order) => {
    if (!window.confirm(`¿Eliminar el pedido de "${order.customerName}"?`)) return;

    setActionError("");
    try {
      await dispatch(removeOrder(order._id)).unwrap();
    } catch (err) {
      setActionError(getMessage(err));
    }
  };

  const columns = [
    {
      key: "customerName",
      label: "Cliente",
      render: ({ customerName, customerEmail }) => (
        <div>
          <p className="font-medium">{customerName}</p>
          {customerEmail && <p className="text-xs text-ink/60">{customerEmail}</p>}
        </div>
      ),
    },
    {
      key: "items",
      label: "Unidades",
      render: ({ items: orderItems }) =>
        orderItems.reduce((sum, { quantity }) => sum + quantity, 0),
    },
    { key: "total", label: "Total", render: ({ total }) => formatPrice(total) },
    {
      key: "status",
      label: "Estado",
      render: (order) => (
        <select
          value={order.status}
          onChange={(event) => handleStatusChange(order, event.target.value)}
          className={`rounded-full px-2 py-1 text-xs font-semibold outline-none ${STATUS_STYLES[order.status]}`}
        >
          {ORDER_STATUSES.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      ),
    },
    {
      key: "createdAt",
      label: "Fecha",
      render: ({ createdAt }) => new Date(createdAt).toLocaleDateString("es-VE"),
    },
  ];

  return (
    <>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <PageHeader title="Pedidos" subtitle="Consulta y actualiza pedidos" />
        <Button variant="accent" onClick={() => openModal()}>
          + Nuevo pedido
        </Button>
      </div>

      <div className="mb-4 flex flex-wrap items-center gap-3">
        <select
          value={statusFilter}
          onChange={(event) => setStatusFilter(event.target.value)}
          className="w-full rounded-lg border border-ink/20 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary sm:w-56"
        >
          <option value="">Todos los estados</option>
          {ORDER_STATUSES.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
        <p className="text-sm text-ink/60">
          Mostrando {filteredOrders.length} de {items.length}
        </p>
      </div>

      {(error || actionError) && (
        <p className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
          {actionError || error}
        </p>
      )}

      <DataTable
        columns={columns}
        rows={filteredOrders}
        loading={loading}
        emptyMessage={
          items.length === 0 ? "Aún no hay pedidos" : "Ningún pedido coincide con el filtro"
        }
        onEdit={openModal}
        onDelete={handleDelete}
      />

      <Modal
        isOpen={modal.isOpen}
        title={modal.data ? "Detalle del pedido" : "Nuevo pedido"}
        onClose={modal.close}
      >
        <OrderForm
          order={modal.data}
          products={products}
          onSubmit={handleSave}
          onCancel={modal.close}
          serverError={formError}
        />
      </Modal>
    </>
  );
};

export default Orders;