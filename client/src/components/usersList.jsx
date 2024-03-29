import React from "react";
import userService from "../services/user.service";

const UsersList = () => {
  // const users = await  userService.get()
  // console.log(users);
  return (
    // <div className="d-flex">
    <div className="p-3 bg-light">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 col-sm-6 col-md-4 col-lg-3 p-3 bg-light">
            <div className="d-flex justify-content-between p-4 align-items-center bg-white border border-secondary shadow-sm">
              <i className="bi bi-currency-dollar fs-1 text-success"></i>
              <div>
                <span>Sales</span>
                <h2>234</h2>
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-md-4 col-lg-3 p-3 bg-light">
            <div className="d-flex justify-content-between p-4 align-items-center bg-white border border-secondary shadow-sm">
              <i className="bi bi-truck fs-1 text-primary"></i>
              <div>
                <span>Delivery</span>
                <h2>240</h2>
              </div>
            </div>
          </div>{" "}
          <div className="col-12 col-sm-6 col-md-4 col-lg-3 p-3 bg-light">
            <div className="d-flex justify-content-between p-4 align-items-center bg-white border border-secondary shadow-sm">
              <i className="bi bi-graph-up fs-1 text-danger"></i>
              <div>
                <span>Increace</span>
                <h2>20%</h2>
              </div>
            </div>
          </div>
          <h1>USERS</h1>
        </div>
      </div>
    </div>
  );
};

export default UsersList;
