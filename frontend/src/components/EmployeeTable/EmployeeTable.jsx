import { Link } from "react-router-dom";
import { FiEdit2, FiTrash2, FiUsers } from "react-icons/fi";

/* 8 tasteful background colours for avatars — all muted, professional */
const AVATAR_BG = [
  "#2563eb", "#0891b2", "#7c3aed", "#d97706",
  "#16a34a", "#db2777", "#ea580c", "#64748b",
];

function getInitials(name = "") {
  return name.trim().split(/\s+/).slice(0, 2).map(w => w[0]).join("").toUpperCase() || "?";
}

function Avatar({ name, index }) {
  return (
    <span className="avatar" style={{ background: AVATAR_BG[index % AVATAR_BG.length] }}>
      {getInitials(name)}
    </span>
  );
}

export default function EmployeeTable({ employees, onDelete }) {
  if (!employees.length) {
    return (
      <div className="card">
        <div className="empty">
          <div className="empty-icon">
            <FiUsers size={22} color="var(--brand)" />
          </div>
          <p className="empty-title">No employees found</p>
          <p className="empty-body">Try a different search or add a new team member.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="card" style={{ overflow: "hidden" }}>

      {/* Header */}
      <div className="table-header">
        <span className="table-title">
          <span className="live-dot" />
          Employee Records
        </span>
        <span className="table-count">{employees.length} total</span>
      </div>

      {/* Table */}
      <div style={{ overflowX: "auto" }}>
        <table className="data-table">
          <thead>
            <tr>
              <th>Employee</th>
              <th>Contact</th>
              <th>Department</th>
              <th>Designation</th>
              <th>Salary</th>
              <th style={{ textAlign: "right" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp, i) => (
              <tr key={emp._id}>

                {/* Employee */}
                <td>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Avatar name={emp.name} index={i} />
                    <div>
                      <div style={{ fontWeight: 600, color: "var(--gray-900)", fontSize: 13 }}>
                        {emp.name}
                      </div>
                      <div style={{ fontSize: 11, color: "var(--text-4)", marginTop: 1 }}>
                        ID #{emp._id.slice(-6).toUpperCase()}
                      </div>
                    </div>
                  </div>
                </td>

                {/* Contact */}
                <td>
                  <div style={{ fontSize: 13, color: "var(--text-2)" }}>{emp.email}</div>
                  <div style={{ fontSize: 11, color: "var(--text-4)", marginTop: 2 }}>{emp.phone}</div>
                </td>

                {/* Department */}
                <td>
                  <span className="chip">
                    <span className="chip-dot" />
                    {emp.department}
                  </span>
                </td>

                {/* Designation */}
                <td style={{ color: "var(--text-2)", fontSize: 13 }}>
                  {emp.designation}
                </td>

                {/* Salary */}
                <td>
                  <span className="salary">
                    ₹{Number(emp.salary).toLocaleString("en-IN")}
                  </span>
                  <div style={{ fontSize: 10, color: "var(--text-4)", marginTop: 2 }}>per year</div>
                </td>

                {/* Actions */}
                <td>
                  <div style={{ display: "flex", gap: 6, justifyContent: "flex-end" }}>
                    <Link to={`/edit/${emp._id}`} className="btn-edit">
                      <FiEdit2 size={11} /> Edit
                    </Link>
                    <button className="btn-del" onClick={() => onDelete(emp)}>
                      <FiTrash2 size={11} /> Delete
                    </button>
                  </div>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="table-footer">
        <span>
          Showing <strong style={{ color: "var(--text-3)" }}>{employees.length}</strong>
          {" "}employee{employees.length !== 1 ? "s" : ""}
        </span>
        <span>CDC Employee Management System</span>
      </div>

    </div>
  );
}
