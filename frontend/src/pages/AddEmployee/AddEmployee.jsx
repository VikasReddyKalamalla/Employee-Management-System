import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FiArrowLeft, FiUserPlus, FiCheckCircle, FiAlertCircle, FiInfo } from "react-icons/fi";

import EmployeeForm from "../../components/EmployeeForm/EmployeeForm";
import { createEmployee } from "../../services/employeeService";

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

export default function AddEmployee() {
  const navigate = useNavigate();
  const [toast, setToast] = useState(null);

  const handleCreate = async (data) => {
    try {
      await createEmployee(data);
      setToast({ msg: "Employee added successfully!", type: "success" });
      setTimeout(() => navigate("/"), 1500);
    } catch (err) {
      console.error(err);
      setToast({ msg: "Failed to add employee. Please try again.", type: "error" });
      setTimeout(() => setToast(null), 3000);
    }
  };

  return (
    <div className="page-wrapper">
      <div className="page-content" style={{ maxWidth: 860 }}>

        {/* Breadcrumb */}
        <div className="breadcrumb">
          <Link to="/">Dashboard</Link>
          <span>›</span>
          <span>Add Employee</span>
        </div>

        {/* Header */}
        <div className="page-header">
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 4 }}>
              <div style={{
                width: 38, height: 38, borderRadius: 10, flexShrink: 0,
                background: "var(--brand-light)",
                border: "1px solid var(--brand-mid)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <FiUserPlus size={17} color="var(--brand)" />
              </div>
              <h1 className="page-title">Add New Employee</h1>
            </div>
            <p className="page-sub">Fill in the form below to onboard a new team member.</p>
          </div>
          <Link to="/" className="btn btn-secondary">
            <FiArrowLeft size={14} /> Back
          </Link>
        </div>

        {/* Info banner */}
        <div className="info-banner">
          <FiInfo size={15} color="var(--brand)" style={{ flexShrink: 0, marginTop: 1 }} />
          <p>
            All fields are required. Enter the gross annual salary in INR.
            The employee will appear in the dashboard immediately after saving.
          </p>
        </div>

        <EmployeeForm onSubmit={handleCreate} />

        {toast && <Toast message={toast.msg} type={toast.type} />}
      </div>
    </div>
  );
}
