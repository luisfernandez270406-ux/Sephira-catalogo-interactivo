const FormField = ({ label, name, value, onChange, error, type = "text", as = "input", children, ...props }) => {
  const Component = as;

  return (
    <div className="mb-4">
      <label htmlFor={name} className="mb-1 block text-sm font-medium">
        {label}
      </label>
      <Component
        id={name}
        name={name}
        type={as === "input" ? type : undefined}
        value={value}
        onChange={onChange}
        className={`w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary ${
          error ? "border-red-500" : "border-ink/20"
        }`}
        {...props}
      >
        {children}
      </Component>
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
};

export default FormField;
