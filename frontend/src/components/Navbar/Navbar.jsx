import { Link, useLocation } from "react-router-dom";
import { FiGrid, FiUserPlus, FiShield } from "react-icons/fi";

export default function Navbar() {
  const { pathname } = useLocation();

  return (
    <header style={{
      position: "sticky", top: 0, zIndex: 100,
      height: "var(--navbar-h)",
      background: "#fff",
      borderBottom: "1px solid var(--border)",
      boxShadow: "0 1px 4px rgba(0,0,0,.06)",
    }}>
      <div style={{
        maxWidth: 1240, margin: "0 auto",
        padding: "0 24px", height: "100%",
        display: "flex", alignItems: "center",
        justifyContent: "space-between", gap: 16,
      }}>

        {/* Brand */}
        <Link to="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 34, height: 34, borderRadius: 9,
            background: "var(--brand)",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 2px 8px rgba(37,99,235,.35)",
            flexShrink: 0,
          }}>
            <FiShield size={17} color="#fff" />
          </div>
          <div>
            <div style={{
              fontWeight: 800, fontSize: 15,
              color: "var(--gray-900)", letterSpacing: "-.02em",
              lineHeight: 1.1,
            }}>
              <span style={{ color: "var(--brand)" }}>EMS</span>
            </div>
            <div style={{ fontSize: 10, color: "var(--text-4)", fontWeight: 500, letterSpacing: ".03em" }}>
              EMPLOYEE MANAGEMENT
            </div>
          </div>
        </Link>

        {/* Nav */}
        <nav style={{ display: "flex", alignItems: "center", gap: 2 }}>
          <NavItem to="/"    label="Dashboard"    icon={<FiGrid     size={14} />} active={pathname === "/"} />
          <NavItem to="/add" label="Add Employee" icon={<FiUserPlus size={14} />} active={pathname === "/add"} />
        </nav>

        {/* Right */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{
            display: "flex", alignItems: "center", gap: 6,
            padding: "5px 12px",
            background: "var(--gray-50)",
            border: "1px solid var(--border)",
            borderRadius: 99,
          }}>
            <span style={{
              width: 6, height: 6, borderRadius: "50%",
              background: "var(--green)",
            }} />
            <span style={{ fontSize: 12, fontWeight: 600, color: "var(--text-3)" }}>
              HR Admin
            </span>
          </div>
        </div>

      </div>
    </header>
  );
}

function NavItem({ to, label, icon, active }) {
  return (
    <Link to={to} style={{
      display: "flex", alignItems: "center", gap: 6,
      padding: "6px 13px", borderRadius: 7,
      fontSize: 13, fontWeight: 500,
      textDecoration: "none",
      transition: "all .15s",
      background: active ? "var(--brand-light)" : "transparent",
      color: active ? "var(--brand-dark)" : "var(--text-3)",
      fontWeight: active ? 600 : 500,
    }}>
      {icon}
      {label}
    </Link>
  );
}
