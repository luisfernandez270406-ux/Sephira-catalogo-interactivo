const NavItem = ({ label, icon, active, onClick }) => (
  <button
    onClick={onClick}
    className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm font-medium transition-colors ${
      active
        ? "bg-accent text-white"
        : "text-white/80 hover:bg-white/10 hover:text-white"
    }`}
  >
    <span aria-hidden="true">{icon}</span>
    {label}
  </button>
);

export default NavItem;