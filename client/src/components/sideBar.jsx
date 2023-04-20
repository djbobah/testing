import React from "react";
import "bootstrap-icons/font/bootstrap-icons.json";
import "../style.css";

const SideBar = () => {
  return (
    <div className="sidebar d-flex justify-content-between flex-column bg-dark text-white p-3 ps-3 pe-5 vh-100">
      <div>
        {/* text-white */}
        <a href="#" className="p-3 ">
          <i className="bi bi-code-slash fs-4 me-4"></i>
          <span className="fs-4">Панель управления</span>
        </a>
        <hr className="text-white mt-2" />
        <ul className="nav nav-pills flex-column mt-2">
          <li className="nav-item p-2">
            <a href="#" className="p-1">
              <i className="bi bi-speedometer2 me-3 fs-5"></i>
              <span>Dashboard</span>
            </a>
          </li>
          <li className="nav-item p-2">
            <a href="#" className="p-1">
              <i className="bi bi-people me-3 fs-5"></i>
              <span>Users</span>
            </a>
          </li>
          <li className="nav-item p-2">
            <a href="#" className="p-1">
              <i className="bi bi-table me-3 fs-5"></i>
              <span>Orders</span>
            </a>
          </li>
          <li className="nav-item p-2">
            <a href="#" className="p-1">
              <i className="bi bi-grid me-3 fs-5"></i>
              <span>Reports</span>
            </a>
          </li>
        </ul>
      </div>
      <div>
        <hr className="text-white" />
        <div className="nav-item p-2">
          <a href="#" className="p-1">
            <i className="bi bi-person-circle me-3 fs-5"></i>
            <span>dj</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
