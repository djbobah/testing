import React, { useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.json";
import "../style.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getCurrentUser } from "../store/users";

const SideBar = () => {
  const [active, setActive] = useState(1);
  const currentUser = useSelector(getCurrentUser());
  return (
    <div
      className="sidebar d-flex justify-content-between flex-column bg-primary  text-white p-3 ps-3 pe-4 vh-100"
      // style={{ backgroundColor: "#121194" }}
    >
      <div>
        {/* text-white */}
        <a href="#" className="p-3 text-decoration-none text-white">
          {/* <i className="bi bi-code-slash fs-4 me-4"></i> */}
          {/* <span className="fs-4">Каменск</span> */}
        </a>
        <hr className="text-white mt-2" />
        <ul className="nav nav-pills flex-column mt-2">
          <Link to="/main/home" className="p-1 text-decoration-none text-white">
            <li
              className={
                active === 1 ? `active nav-item p-1 m-1` : "nav-item p-1"
              }
              onClick={() => setActive(1)}
            >
              <i className="bi bi-speedometer2 me-3 fs-5"></i>
              <span>Тесты</span>
            </li>
          </Link>
          {currentUser.roles !== "user" && (
            <>
              {/* {" "}
              <Link
                to="/main/home"
                className="p-1 text-decoration-none text-white"
              >
                <li
                  className={
                    active === 2 ? `active nav-item p-1 ` : "nav-item p-1"
                  }
                  onClick={() => setActive(2)}
                >
                  <i className="bi bi-pencil-square me-3 fs-5"></i>
                  <span>Менеджер тестов</span>
                </li>
              </Link> */}
              <Link
                to="/main/users"
                className="p-1 text-decoration-none text-white"
              >
                <li
                  className={
                    active === 3 ? `active nav-item p-1 ` : "nav-item p-1"
                  }
                  onClick={() => setActive(3)}
                >
                  <i className="bi bi-people me-3 fs-5"></i>
                  <span>Пользователи</span>
                </li>
              </Link>
            </>
          )}

          {/* <Link
            to="/main/tests"
            className="p-1 text-decoration-none text-white"
          >
            <li
              className={active === 4 ? `active nav-item p-1 ` : "nav-item p-1"}
              onClick={() => setActive(4)}
            >
              <i className="bi bi-table me-3 fs-5"></i>
              <span>Tests</span>
            </li>
          </Link> */}
          <Link
            to="/main/reports"
            className="p-1 text-decoration-none text-white"
          >
            <li
              className={active === 5 ? `active nav-item p-1 ` : "nav-item p-1"}
              onClick={() => setActive(5)}
            >
              <i className="bi bi-grid me-3 fs-5"></i>
              <span>Отчеты</span>
            </li>{" "}
          </Link>
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
  );
};

export default SideBar;
