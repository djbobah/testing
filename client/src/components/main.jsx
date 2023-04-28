import React, { useEffect, useState } from "react";
import SideBar from "./sideBar";
import NavBar from "./navBar";
import Home from "./home";
import UsersList from "./usersList";
import TestsList from "./testsList";
import Reports from "./reports";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const Main = () => {
  const [toggle, setToggle] = useState(false);
  const toggleHandler = () => {
    setToggle(!toggle);
  };

  useEffect(() => {
    const handleSize = () => {
      if (window.innerWidth < 768) {
        setToggle(false);
      }
    };
    window.addEventListener("resize", handleSize);
    return () => {
      window.removeEventListener("resize", handleSize);
    };
  }, []);
  return (
    <div className="d-flex">
      <div className={toggle ? "d-none" : "w-auto position-fixed"}>
        <SideBar />
      </div>
      <div className={toggle ? "d-none" : "invisible"}>
        <SideBar />
      </div>
      <div className="col">
        <NavBar onToggle={toggleHandler} />
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/home" element={<Home />} /> */}
          <Route exact path="/users" element={<UsersList />} />
          <Route exact path="/tests" element={<TestsList />} />
          <Route exact path="/reports" element={<Reports />} />
        </Routes>
      </div>
    </div>
  );
};

export default Main;