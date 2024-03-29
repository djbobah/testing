import React from "react";
import "bootstrap/dist/js/bootstrap.bundle";
import { useAuth } from "./hooks/useAuth";
import NavProfile from "./ui/navProfile";
import { Link } from "react-router-dom";

const NavBar = ({ onToggle }) => {
  const { currentUser } = useAuth();
  return (
    // <div className="container">
    // <nav
    //   className="navbar  navbar-expand-lg navbar-light "
    //   style={{ backgroundColor: "#121194" }}
    // >
    //   <div className=" container container-fluid">
    //     <a className="navbar-brand text-white" href="#">
    //       Каменск-Шахтинское ЛПУМГ
    //     </a>
    //   </div>
    // </nav>
    // </div>
    <nav
      className="navbar navbar-expand-lg navbar-dark bg-primary fixed-top"
      // style={{ backgroundColor: "#121194" }}
    >
      <div className="container-fluid">
        <Link to="/main/home" className="navbar-brand d-none d-md-block">
          Kamensk
        </Link>
        <a className="navbar-brand d-block d-md-none" onClick={onToggle}>
          <i className="bi bi-justify"></i>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo01"
          aria-controls="navbarTogglerDemo01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          {/* <a className="navbar-brand" href="#">
            Dashboard
          </a> */}
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {currentUser ? (
              <NavProfile />
            ) : (
              <li className="nav-item border rounded">
                <Link
                  className="nav-link text-white"
                  aria-current="page"
                  to="/login"
                >
                  Log in
                </Link>
              </li>
            )}

            {/* {currentUser && (
              <li className="nav-item border mx-2 rounded">
                <a className="nav-link text-white" aria-current="page" href="#">
                  Logout
                </a>
              </li>
            )} */}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
