import { FiAlertTriangle, FiX } from "react-icons/fi";

export default function ConfirmDialog({ show, title, message, onConfirm, onCancel }) {
  if (!show) return null;

  return (
    <div className="overlay" onClick={onCancel}>
      <div
        className="dialog"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="dlg-title"
      >
        {/* Close button */}
        <button
          onClick={onCancel}
          aria-label="Close"
          style={{
            position: "absolute", top: 16, right: 16,
            background: "var(--gray-100)", border: "none",
            borderRadius: 6, width: 28, height: 28,
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer", color: "var(--text-3)",
            transition: "var(--t)",
          }}
          onMouseEnter={e => e.currentTarget.style.background = "var(--gray-200)"}
          onMouseLeave={e => e.currentTarget.style.background = "var(--gray-100)"}
        >
          <FiX size={14} />
        </button>

        {/* Icon */}
        <div className="dialog-icon">
          <FiAlertTriangle size={20} color="var(--red)" />
        </div>

        <div className="dialog-title" id="dlg-title">{title}</div>
        <p  className="dialog-body">{message}</p>
        <p  className="dialog-note">This action cannot be undone.</p>

        <div className="dialog-actions">
          <button className="btn btn-secondary" onClick={onCancel}>
            Cancel
          </button>
          <button className="btn btn-danger" onClick={onConfirm}>
            <FiAlertTriangle size={13} />
            Delete Employee
          </button>
        </div>
      </div>
    </div>
  );
}
