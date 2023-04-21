import React, { useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.json";
import "../style.css";
import { Link } from "react-router-dom";

const SideBar = () => {
  const [active, setActive] = useState(1);
  return (
    <div className="d-flex w-auto">
      <div className="sidebar d-flex justify-content-between flex-column bg-dark text-white p-3 ps-3 pe-5 vh-100">
        <div>
          {/* text-white */}
          <a href="#" className="p-3 text-decoration-none text-white">
            {/* <i className="bi bi-code-slash fs-4 me-4"></i> */}
            <span className="fs-4">Каменск-Шахтинское ЛПУМГ</span>
          </a>
          <hr className="text-white mt-2" />
          <ul className="nav nav-pills flex-column mt-2">
            <li
              className={active === 1 ? `active nav-item p-2` : "nav-item p-2"}
              onClick={() => setActive(1)}
            >
              <Link to="/home" className="p-1">
                <i className="bi bi-speedometer2 me-3 fs-5"></i>
                <span>Dashboard</span>
              </Link>
            </li>
            <li
              className={active === 2 ? `active nav-item p-2` : "nav-item p-2"}
              onClick={() => setActive(2)}
            >
              <Link to="/users" className="p-1">
                <i className="bi bi-people me-3 fs-5"></i>
                <span>Users</span>
              </Link>
            </li>
            <li
              className={active === 3 ? `active nav-item p-2` : "nav-item p-2"}
              onClick={() => setActive(3)}
            >
              <Link to="/tests" className="p-1">
                <i className="bi bi-table me-3 fs-5"></i>
                <span>Tests</span>
              </Link>
            </li>
            <li
              className={active === 4 ? `active nav-item p-2` : "nav-item p-2"}
              onClick={() => setActive(4)}
            >
              <Link to="/reports" className="p-1">
                <i className="bi bi-grid me-3 fs-5"></i>
                <span>Reports</span>
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <hr className="text-white" />
          <div className="nav-item p-2">
            <a href="#" className="p-1 activetext-decoration-none text-white">
              <i className="bi bi-person-circle me-3 fs-5"></i>
              <span>dj</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
