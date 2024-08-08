import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "boxicons/css/boxicons.min.css";

const Sidebar = () => {
  return (
    <div
      className="sidebar bg-light border-end p-3"
      style={{ height: "100vh" }}
    >
      <h3 className="mb-4">Dashboard</h3>
      <ul className="nav flex-column">
        <li className="nav-item mb-2">
          <Link to="" className="nav-link">
            <i className="bx bxs-tachometer me-2"></i> Classes
          </Link>
        </li>
        <li className="nav-item">
          <Link to="studentsenroll" className="nav-link">
            <i className="bx bxs-tachometer me-2"></i> Students Enrollments
          </Link>
        </li>
        <li className="nav-item">
          <Link to="Withdrawal" className="nav-link">
            <i className="bx bxs-tachometer me-2"></i> Withdrawals
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
