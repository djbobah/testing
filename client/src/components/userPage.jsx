import React from "react";
import UserCard from "./ui/userCard";
import NumberTestsCard from "./ui/numberTestsCard";
// import QualitiesCard from "./ui/qualitiesCard";
import Comments from "./ui/userProfileDetails";
const UserPage = () => {
  return (
    // <div className="gy-5">
    <div className="container " style={{ marginTop: "70px" }}>
      <div className="row gutters-sm">
        <div className="col-md-4 mb-3">
          <UserCard />
          <NumberTestsCard />
          {/* <QualitiesCard /> */}
        </div>
        <div className="col-md-8">
          <Comments />
        </div>
      </div>
      {/* <div className="position-relative">
        <div className="position-absolute  bottom-0 end-0">
          <button className="btn btn-primary me-2">Сохранить</button>
          <button className="btn btn-secondary">Отмена</button>
        </div>
      </div> */}
    </div>
    // </div>
  );
};

export default UserPage;
