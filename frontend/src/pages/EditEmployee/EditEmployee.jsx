import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { FiArrowLeft, FiEdit3, FiCheckCircle, FiAlertCircle } from "react-icons/fi";

import EmployeeForm from "../../components/EmployeeForm/EmployeeForm";
import { getEmployeeById, updateEmployee } from "../../services/employeeService";

function Toast({ message, type }) {
  return (
    <div className={`toast ${type === "success" ? "toast-ok" : "toast-err"}`}>
      {type === "success"
        ? <FiCheckCircle size={15} />
        : <FiAlertCircle size={15} />}
      {message}
    </div>
  );
}

export default function EditEmployee() {
  const { id }                  = useParams();
  const navigate                = useNavigate();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading]   = useState(true);
  const [toast, setToast]       = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const r = await getEmployeeById(id);
        setEmployee(r.data.data ?? r.data);
      } catch (e) { console.error(e); }
      finally { setLoading(false); }
    })();
  }, [id]);

  const handleUpdate = async (data) => {
    try {
      await updateEmployee(id, data);
      setToast({ msg: "Employee updated successfully!", type: "success" });
      setTimeout(() => navigate("/"), 1500);
    } catch (err) {
      console.error(err);
      setToast({ msg: "Update failed. Please try again.", type: "error" });
      setTimeout(() => setToast(null), 3000);
    }
  };

  if (loading) {
    return (
      <div className="page-wrapper">
        <div className="page-content" style={{ maxWidth: 860 }}>
          <div className="loader">
            <div className="spinner" />
            <p style={{ fontSize: 13, color: "var(--text-4)" }}>Loading employee…</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-wrapper">
      <div className="page-content" style={{ maxWidth: 860 }}>

        {/* Breadcrumb */}
        <div className="breadcrumb">
          <Link to="/">Dashboard</Link>
          <span>›</span>
          <span>Edit Employee</span>
        </div>

        {/* Header */}
        <div className="page-header">
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 4 }}>
              <div style={{
                width: 38, height: 38, borderRadius: 10, flexShrink: 0,
                background: "var(--amber-bg)",
                border: "1px solid var(--amber-border)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <FiEdit3 size={16} color="var(--amber)" />
              </div>
              <h1 className="page-title">Edit Employee</h1>
            </div>
            {employee && (
              <p className="page-sub">
                Editing record for{" "}
                <strong style={{ color: "var(--text-2)" }}>{employee.name}</strong>
                {" "}·{" "}
                <span style={{ color: "var(--brand)" }}>{employee.department}</span>
              </p>
            )}
          </div>
          <Link to="/" className="btn btn-secondary">
            <FiArrowLeft size={14} /> Back
          </Link>
        </div>

        {/* Employee identity strip */}
        {employee && (
          <div style={{
            display: "flex", alignItems: "center", gap: 12,
            background: "var(--gray-50)",
            border: "1px solid var(--border)",
            borderRadius: 10, padding: "12px 16px",
            marginBottom: 20,
          }}>
            <div style={{
              width: 40, height: 40, borderRadius: 10,
              background: "var(--brand)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontWeight: 800, fontSize: 14, color: "#fff",
              flexShrink: 0, letterSpacing: ".02em",
            }}>
              {employee.name?.split(" ").slice(0,2).map(w=>w[0]).join("").toUpperCase()}
            </div>
            <div>
              <div style={{ fontWeight: 600, fontSize: 14, color: "var(--gray-900)" }}>
                {employee.name}
              </div>
              <div style={{ fontSize: 12, color: "var(--text-4)" }}>
                {employee.designation} · {employee.department}
              </div>
            </div>
            <div style={{ marginLeft: "auto" }}>
              <span style={{
                display: "inline-flex", alignItems: "center", gap: 5,
                background: "var(--green-bg)", border: "1px solid var(--green-border)",
                borderRadius: 99, padding: "3px 10px",
                fontSize: 11, fontWeight: 600, color: "var(--green)",
              }}>
                <span style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--green)" }} />
                Active
              </span>
            </div>
          </div>
        )}

        {employee && <EmployeeForm initialData={employee} onSubmit={handleUpdate} />}

        {toast && <Toast message={toast.msg} type={toast.type} />}
      </div>
    </div>
  );
}
