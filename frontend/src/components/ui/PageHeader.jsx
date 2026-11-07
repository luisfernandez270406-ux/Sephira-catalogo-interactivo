const PageHeader = ({ title, subtitle }) => (
  <div className="mb-6">
    <h1 className="text-2xl font-bold text-primary-dark">{title}</h1>
    {subtitle && <p className="mt-1 text-sm text-ink/70">{subtitle}</p>}
  </div>
);

export default PageHeader;