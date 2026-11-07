const StatCard = ({ title, value, icon, highlight = false }) => (
  <div className={`rounded-xl p-5 shadow-sm ${highlight ? "bg-primary-dark text-white" : "bg-white"}`}>
    <div className="flex items-center justify-between">
      <p className={`text-sm font-medium ${highlight ? "text-white/80" : "text-ink/60"}`}>{title}</p>
      <span className="text-2xl" aria-hidden="true">
        {icon}
      </span>
    </div>
    <p className="mt-2 text-3xl font-bold">{value}</p>
  </div>
);

export default StatCard;