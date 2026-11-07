const VARIANTS = {
  primary: "bg-primary text-white hover:bg-primary-dark",
  accent: "bg-accent text-white hover:brightness-110",
  outline: "border border-ink/20 text-ink hover:bg-ink/5",
  danger: "bg-red-600 text-white hover:bg-red-700",
};

const Button = ({ variant = "primary", type = "button", className = "", children, ...props }) => (
  <button
    type={type}
    className={`rounded-lg px-4 py-2 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-50 ${VARIANTS[variant]} ${className}`}
    {...props}
  >
    {children}
  </button>
);

export default Button;