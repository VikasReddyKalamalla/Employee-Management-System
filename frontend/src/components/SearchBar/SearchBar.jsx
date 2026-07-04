import { Link } from "react-router-dom";
import { FiSearch, FiUserPlus } from "react-icons/fi";

export default function SearchBar({ searchTerm, onSearch }) {
  return (
    <div className="toolbar">
      <div className="search-box">
        <FiSearch size={15} color="var(--text-4)" style={{ flexShrink: 0 }} />
        <input
          type="text"
          placeholder="Search name, email, department…"
          value={searchTerm}
          onChange={(e) => onSearch(e.target.value)}
          aria-label="Search employees"
        />
        {searchTerm && (
          <button className="search-clear" onClick={() => onSearch("")} aria-label="Clear">
            ×
          </button>
        )}
      </div>

      <Link to="/add" className="btn btn-primary">
        <FiUserPlus size={14} />
        Add Employee
      </Link>
    </div>
  );
}
