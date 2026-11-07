const Modal = ({ isOpen, title, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-xl bg-white p-6 shadow-xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-primary-dark">{title}</h2>
          <button
            onClick={onClose}
            aria-label="Cerrar"
            className="text-2xl leading-none text-ink/50 hover:text-ink"
          >
            ×
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;