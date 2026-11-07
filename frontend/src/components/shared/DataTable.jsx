import Button from "../ui/Button";

const DataTable = ({ columns, rows, loading, emptyMessage = "No hay registros", onEdit, onDelete }) => {
  const hasActions = Boolean(onEdit || onDelete);
  const totalColumns = columns.length + (hasActions ? 1 : 0);

  return (
    <div className="overflow-x-auto rounded-xl bg-white shadow-sm">
      <table className="w-full text-left text-sm">
        <thead className="bg-primary-dark text-white">
          <tr>
            {columns.map(({ key, label }) => (
              <th key={key} className="px-4 py-3 font-semibold">
                {label}
              </th>
            ))}
            {hasActions && <th className="px-4 py-3 text-right font-semibold">Acciones</th>}
          </tr>
        </thead>

        <tbody>
          {loading && rows.length === 0 ? (
            <tr>
              <td colSpan={totalColumns} className="px-4 py-8 text-center text-ink/60">
                Cargando...
              </td>
            </tr>
          ) : rows.length === 0 ? (
            <tr>
              <td colSpan={totalColumns} className="px-4 py-8 text-center text-ink/60">
                {emptyMessage}
              </td>
            </tr>
          ) : (
            rows.map((row) => (
              <tr key={row._id} className="border-t border-ink/10 hover:bg-surface">
                {columns.map(({ key, render }) => (
                  <td key={key} className="px-4 py-3">
                    {render ? render(row) : row[key]}
                  </td>
                ))}
                {hasActions && (
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      {onEdit && (
                        <Button variant="outline" onClick={() => onEdit(row)}>
                          Editar
                        </Button>
                      )}
                      {onDelete && (
                        <Button variant="danger" onClick={() => onDelete(row)}>
                          Eliminar
                        </Button>
                      )}
                    </div>
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;