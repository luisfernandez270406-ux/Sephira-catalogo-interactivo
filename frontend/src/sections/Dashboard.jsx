import { useFetch } from "../hooks/useFetch";
import { statsService } from "../services/statsService";
import { orderService } from "../services/orderService";
import { ORDER_STATUSES, STATUS_BARS, STATUS_STYLES } from "../constants/orderStatus";
import { formatPrice } from "../utils/format";
import PageHeader from "../components/ui/PageHeader";
import Button from "../components/ui/Button";
import StatCard from "../components/shared/StatCard";
import DataTable from "../components/shared/DataTable";

const recentColumns = [
  { key: "customerName", label: "Cliente" },
  { key: "total", label: "Total", render: ({ total }) => formatPrice(total) },
  {
    key: "status",
    label: "Estado",
    render: ({ status }) => (
      <span className={`rounded-full px-2 py-1 text-xs font-semibold ${STATUS_STYLES[status]}`}>
        {status}
      </span>
    ),
  },
  {
    key: "createdAt",
    label: "Fecha",
    render: ({ createdAt }) => new Date(createdAt).toLocaleDateString("es-VE"),
  },
];

const Dashboard = () => {
  const stats = useFetch(statsService.get);
  const orders = useFetch(orderService.getAll);

  const refresh = () => {
    stats.refetch();
    orders.refetch();
  };

  const recentOrders = (orders.data ?? []).slice(0, 5);

  return (
    <>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <PageHeader title="Dashboard" subtitle="Resumen general de la tienda" />
        <Button variant="outline" onClick={refresh} disabled={stats.loading || orders.loading}>
          Actualizar
        </Button>
      </div>

      {stats.error && (
        <p className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{stats.error}</p>
      )}

      {!stats.data && stats.loading && <p className="text-ink/60">Cargando estadísticas...</p>}

      {stats.data && (
        <>
          <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard title="Ingresos" value={formatPrice(stats.data.revenue)} icon="💰" highlight />
            <StatCard title="Pedidos" value={stats.data.totalOrders} icon="📦" />
            <StatCard title="Productos" value={stats.data.totalProducts} icon="🛍️" />
            <StatCard title="Categorías" value={stats.data.totalCategories} icon="🏷️" />
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            <section className="rounded-xl bg-white p-5 shadow-sm">
              <h2 className="mb-4 font-bold text-primary-dark">Pedidos por estado</h2>
              <ul className="space-y-4">
                {ORDER_STATUSES.map((status) => {
                  const count = stats.data.ordersByStatus[status] ?? 0;
                  const percent = stats.data.totalOrders
                    ? (count / stats.data.totalOrders) * 100
                    : 0;

                  return (
                    <li key={status}>
                      <div className="mb-1 flex justify-between text-sm">
                        <span className="capitalize">{status}</span>
                        <span className="font-semibold">{count}</span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-surface">
                        <div
                          className={`h-full rounded-full ${STATUS_BARS[status]}`}
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                    </li>
                  );
                })}
              </ul>
              <p className="mt-4 text-xs text-ink/50">
                Los ingresos no incluyen pedidos cancelados.
              </p>
            </section>

            <section className="lg:col-span-2">
              <h2 className="mb-4 font-bold text-primary-dark">Últimos pedidos</h2>
              <DataTable
                columns={recentColumns}
                rows={recentOrders}
                loading={orders.loading}
                emptyMessage="Aún no hay pedidos"
              />
            </section>
          </div>
        </>
      )}
    </>
  );
};

export default Dashboard;