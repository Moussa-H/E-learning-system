import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css"; // Import custom CSS

const Sidebar = () => {
  return (
    <div className="sidebar bg-light p-3">
      <h3 className="sidebar-header">Dashboard</h3>
      <ul className="nav flex-column">
        <li className="nav-item">
          <Link to="" className="nav-link">
            <i className="bx bxs-graduation"></i> Classes
          </Link>
        </li>
        <li className="nav-item">
          <Link to="enrollclasses" className="nav-link">
            <i className="bx bxs-graduation"></i> Enroll Classes
          </Link>
        </li>
        <li className="nav-item">
          <Link to="unenrollclasses" className="nav-link">
            <i className="bx bxs-log-out"></i> Unenroll Classes
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
