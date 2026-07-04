import { useState, useEffect } from "react";
import {
  FiUser, FiMail, FiPhone, FiGrid,
  FiBriefcase, FiDollarSign, FiSave, FiRefreshCw,
} from "react-icons/fi";

const EMPTY = { name: "", email: "", phone: "", department: "", designation: "", salary: "" };

const FIELDS = [
  { name: "name",        label: "Full Name",           type: "text",   icon: <FiUser      size={12} />, placeholder: "e.g. Rahul Sharma"    },
  { name: "email",       label: "Email Address",        type: "email",  icon: <FiMail      size={12} />, placeholder: "rahul@company.com"    },
  { name: "phone",       label: "Phone Number",         type: "tel",    icon: <FiPhone     size={12} />, placeholder: "9876543210"           },
  { name: "department",  label: "Department",           type: "text",   icon: <FiGrid      size={12} />, placeholder: "e.g. Engineering"     },
  { name: "designation", label: "Designation",          type: "text",   icon: <FiBriefcase size={12} />, placeholder: "e.g. Senior Developer"},
  { name: "salary",      label: "Annual Salary (₹)",   type: "number", icon: <FiDollarSign size={12}/>, placeholder: "e.g. 800000", hint: "Gross annual salary in INR" },
];

export default function EmployeeForm({ onSubmit, initialData = {} }) {
  const [form, setForm] = useState(EMPTY);

  useEffect(() => {
    if (initialData && Object.keys(initialData).length > 0) {
      setForm({
        name:        initialData.name        || "",
        email:       initialData.email       || "",
        phone:       initialData.phone       || "",
        department:  initialData.department  || "",
        designation: initialData.designation || "",
        salary:      initialData.salary      || "",
      });
    }
  }, [initialData]);

  const onChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const onReset  = () => setForm(EMPTY);
  const handleSubmit = (e) => { e.preventDefault(); onSubmit(form); };

  const isEditing = !!(initialData?._id);

  return (
    <div className="form-card">

      <div className="section-label">Employee Information</div>

      <form onSubmit={handleSubmit} noValidate>
        <div className="form-grid">
          {FIELDS.map((f) => (
            <div className="form-group" key={f.name}>
              <label className="form-label" htmlFor={f.name}>
                {f.icon}
                {f.label}
              </label>
              <input
                id={f.name}
                className="form-input"
                type={f.type}
                name={f.name}
                placeholder={f.placeholder}
                value={form[f.name]}
                onChange={onChange}
                required
                min={f.type === "number" ? "0" : undefined}
                autoComplete={f.name === "email" ? "email" : f.name === "name" ? "name" : "off"}
              />
              {f.hint && <span className="form-hint">{f.hint}</span>}
            </div>
          ))}
        </div>

        <div className="form-divider" />

        <div className="form-actions">
          <button type="submit" className="btn btn-success">
            <FiSave size={14} />
            {isEditing ? "Update Employee" : "Save Employee"}
          </button>
          <button type="button" className="btn btn-secondary" onClick={onReset}>
            <FiRefreshCw size={13} />
            Reset
          </button>
        </div>
      </form>

    </div>
  );
}
