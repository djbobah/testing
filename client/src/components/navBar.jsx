import React from "react";
import "bootstrap/dist/js/bootstrap.bundle";

const NavBar = ({ onToggle }) => {
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
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <a href="#" className="navbar-brand d-none d-md-block">
          Kamensk
        </a>
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
            <li className="nav-item border rounded">
              <a className="nav-link text-white" aria-current="page" href="#">
                Account
              </a>
            </li>
            <li className="nav-item border mx-2 rounded">
              <a className="nav-link text-white" aria-current="page" href="#">
                Logout
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
