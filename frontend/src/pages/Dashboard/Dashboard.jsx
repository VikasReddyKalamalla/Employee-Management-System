import { useEffect, useState, useMemo } from "react";
import {
  FiUsers, FiLayers, FiDollarSign, FiSearch,
  FiCheckCircle, FiAlertCircle,
} from "react-icons/fi";

import EmployeeTable from "../../components/EmployeeTable/EmployeeTable";
import SearchBar     from "../../components/SearchBar/SearchBar";
import ConfirmDialog from "../../components/ConfirmDialog/ConfirmDialog";
import { getEmployees, deleteEmployee } from "../../services/employeeService";

/* ── Stat card ──────────────────────────────────────── */
const STATS_CONFIG = [
  {
    key: "total",
    label: "Total Employees",
    icon: FiUsers,
    accent: "#2563eb",
    bg: "#eff6ff",
    iconColor: "#2563eb",
  },
  {
    key: "departments",
    label: "Departments",
    icon: FiLayers,
    accent: "#7c3aed",
    bg: "#f5f3ff",
    iconColor: "#7c3aed",
  },
  {
    key: "payroll",
    label: "Annual Payroll",
    icon: FiDollarSign,
    accent: "#16a34a",
    bg: "#f0fdf4",
    iconColor: "#16a34a",
  },
  {
    key: "filtered",
    label: "Showing Now",
    icon: FiSearch,
    accent: "#d97706",
    bg: "#fffbeb",
    iconColor: "#d97706",
  },
];

function StatCard({ label, value, sub, accent, bg, iconColor, Icon }) {
  return (
    <div className="stat-card">
      <div
        className="stat-card-accent"
        style={{ background: accent }}
      />
      <div className="stat-icon" style={{ background: bg }}>
        <Icon size={18} color={iconColor} />
      </div>
      <div className="stat-value">{value}</div>
      <div className="stat-label">{label}</div>
      {sub && (
        <div className="stat-sub">
          <span style={{ color: iconColor, fontWeight: 600 }}>●</span>
          {sub}
        </div>
      )}
    </div>
  );
}

/* ── Toast ──────────────────────────────────────────── */
function Toast({ message, type, onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 3000);
    return () => clearTimeout(t);
  }, [onDone]);
  return (
    <div className={`toast ${type === "success" ? "toast-ok" : "toast-err"}`}>
      {type === "success"
        ? <FiCheckCircle size={15} />
        : <FiAlertCircle size={15} />}
      {message}
    </div>
  );
}

/* ── Dashboard ──────────────────────────────────────── */
export default function Dashboard() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading]     = useState(true);
  const [search, setSearch]       = useState("");
  const [showDlg, setShowDlg]     = useState(false);
  const [selected, setSelected]   = useState(null);
  const [toast, setToast]         = useState(null);

  useEffect(() => {
    let ok = true;
    (async () => {
      try {
        const r = await getEmployees();
        if (ok) setEmployees(r.data.data ?? r.data);
      } catch (e) { console.error(e); }
      finally { if (ok) setLoading(false); }
    })();
    return () => { ok = false; };
  }, []);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return q
      ? employees.filter(e =>
          [e.name, e.email, e.department, e.designation]
            .some(f => f?.toLowerCase().includes(q))
        )
      : employees;
  }, [employees, search]);

  const totalSalary  = employees.reduce((s, e) => s + Number(e.salary || 0), 0);
  const departments  = new Set(employees.map(e => e.department).filter(Boolean)).size;

  const statsValues = {
    total:       employees.length,
    departments: departments,
    payroll:     `₹${(totalSalary / 100000).toFixed(1)}L`,
    filtered:    filtered.length,
  };

  const statsSub = {
    total:       "active headcount",
    departments: "distinct teams",
    payroll:     "annual gross",
    filtered:    search ? "matching query" : "all employees",
  };

  const handleDelete = (emp)  => { setSelected(emp); setShowDlg(true); };
  const cancelDelete = ()     => { setShowDlg(false); setSelected(null); };

  const confirmDelete = async () => {
    try {
      await deleteEmployee(selected._id);
      setEmployees(p => p.filter(e => e._id !== selected._id));
      setToast({ msg: `${selected.name} was removed successfully.`, type: "success" });
    } catch {
      setToast({ msg: "Could not delete employee. Please try again.", type: "error" });
    } finally { cancelDelete(); }
  };

  return (
    <div className="page-wrapper">
      <div className="page-content">

        {/* ── Header ── */}
        <div className="page-header">
          <div>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              background: "var(--brand-light)", border: "1px solid var(--brand-mid)",
              borderRadius: 99, padding: "3px 10px", marginBottom: 8,
            }}>
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--brand)" }} />
              <span style={{ fontSize: 11, fontWeight: 700, color: "var(--brand)", letterSpacing: ".05em", textTransform: "uppercase" }}>
                HR Dashboard
              </span>
            </div>
            <h1 className="page-title">Workforce Overview</h1>
            <p className="page-sub">
              Manage employees, track headcount, and keep your team records up to date.
            </p>
          </div>
        </div>

        {/* ── Stats ── */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))",
          gap: 14, marginBottom: 28,
        }}>
          {STATS_CONFIG.map(s => (
            <StatCard
              key={s.key}
              label={s.label}
              value={statsValues[s.key]}
              sub={statsSub[s.key]}
              accent={s.accent}
              bg={s.bg}
              iconColor={s.iconColor}
              Icon={s.icon}
            />
          ))}
        </div>

        {/* ── Search + Add ── */}
        <SearchBar searchTerm={search} onSearch={setSearch} />

        {/* ── Table ── */}
        {loading ? (
          <div className="loader">
            <div className="spinner" />
            <p style={{ fontSize: 13, color: "var(--text-4)" }}>Loading employee records…</p>
          </div>
        ) : (
          <EmployeeTable employees={filtered} onDelete={handleDelete} />
        )}

        {/* ── Confirm dialog ── */}
        <ConfirmDialog
          show={showDlg}
          title="Delete Employee"
          message={`You're about to permanently remove ${selected?.name || "this employee"} from all records.`}
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />

        {/* ── Toast ── */}
        {toast && (
          <Toast
            message={toast.msg}
            type={toast.type}
            onDone={() => setToast(null)}
          />
        )}

      </div>
    </div>
  );
}
