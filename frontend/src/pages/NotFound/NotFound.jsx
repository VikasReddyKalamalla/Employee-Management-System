import { Link } from "react-router-dom";
import { FiArrowLeft, FiHome, FiAlertCircle } from "react-icons/fi";

export default function NotFound() {
  return (
    <div style={{
      minHeight: "calc(100vh - var(--navbar-h))",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "40px 24px",
      background: "var(--bg)",
    }}>
      <div style={{ textAlign: "center", maxWidth: 440 }}>

        {/* Big number */}
        <div className="not-found-code">404</div>

        {/* Icon */}
        <div style={{
          width: 52, height: 52, borderRadius: 13,
          background: "var(--red-bg)",
          border: "1px solid var(--red-border)",
          display: "flex", alignItems: "center", justifyContent: "center",
          margin: "16px auto 20px",
        }}>
          <FiAlertCircle size={22} color="var(--red)" />
        </div>

        <h2 className="not-found-title">Page not found</h2>
        <p className="not-found-body">
          The page you're looking for doesn't exist or has been moved.
          Head back to the dashboard to continue.
        </p>

        {/* Divider with icon */}
        <div style={{
          display: "flex", alignItems: "center", gap: 12,
          margin: "0 auto 28px", maxWidth: 280,
        }}>
          <div style={{ flex: 1, height: 1, background: "var(--gray-200)" }} />
          <span style={{ fontSize: 12, color: "var(--text-4)", fontWeight: 500 }}>
            CDC EMS
          </span>
          <div style={{ flex: 1, height: 1, background: "var(--gray-200)" }} />
        </div>

        <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
          <Link to="/" className="btn btn-primary">
            <FiHome size={14} />
            Go to Dashboard
          </Link>
          <button className="btn btn-secondary" onClick={() => window.history.back()}>
            <FiArrowLeft size={14} />
            Go Back
          </button>
        </div>

      </div>
    </div>
  );
}
