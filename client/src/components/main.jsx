import React, { useEffect, useState } from "react";
import SideBar from "./sideBar";
import NavBar from "./navBar";
import Home from "./home";
import UsersList from "./usersList";
import TestsList from "./testsList";
import Reports from "./reports";
import { Route, Routes } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import CreateTest from "./tests/createTest";

const Main = () => {
  const { currentUser } = useAuth();
  const [active, setActive] = useState(1);
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
  // return (
  //   <div className="d-flex">
  //     <div className={toggle ? "d-none" : "w-auto position-fixed"}>
  //       <SideBar />
  //     </div>
  //     <div className={toggle ? "d-none" : "invisible"}>
  //       <SideBar />
  //     </div>
  //     <div className="col">
  //       <NavBar onToggle={toggleHandler} />
  //       <Routes>
  //         <Route path="/" element={<Home />} />
  //         {/* <Route path="/home" element={<Home />} /> */}
  //         <Route exact path="/users" element={<UsersList />} />
  //         <Route exact path="/tests" element={<TestsList />} />
  //         <Route exact path="/reports" element={<Reports />} />
  //       </Routes>
  //     </div>
  //   </div>
  // );
  // console.log("currentUser main", currentUser);
  if (currentUser) {
    return (
      // <div className="d-flex w-auto">

      <>
        {/* <NavBar onToggle={toggleHandler} /> */}
        <div className="d-flex">
          {/* <div className="col"> */}
          {/* <div> */}
          <div className={toggle ? "d-none" : "w-auto position-fixed"}>
            <SideBar active={active} setActive={setActive} />
          </div>
          <div className={toggle ? "d-none" : ""}>
            <SideBar />
          </div>
          {/* </div> */}
          <div className="col mt-5">
            <Routes>
              <Route exact path="/home" element={<Home />} />
              <Route exact path="/createTest" element={<CreateTest />} />
              <Route exact path="/users" element={<UsersList />} />
              <Route exact path="/tests" element={<TestsList />} />
              <Route exact path="/reports" element={<Reports />} />
            </Routes>
          </div>
        </div>
        {/* </div> */}
      </>
    );
  } else return "Loading...";
};

export default Main;
