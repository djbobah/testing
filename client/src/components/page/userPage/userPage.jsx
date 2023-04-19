import React from "react";
import UserCard from "../../ui/userCard";
import QualitiesCard from "../../ui/qualitiesCard";
import MeetingsCard from "../../ui/meetingsCard";
import Comments from "../../ui/comments";

const UserPage = () => {
  // if (user) {
  return (
    <div className="container mt-3">
      <div className="row gutters-sm">
        <div className="col-md-4 mb-3">
          <UserCard />
          <QualitiesCard />
          <MeetingsCard />
        </div>
        <div className="col-md-8">
          <Comments />
        </div>
      </div>
    </div>
  );
  // } else {
  //   return <h1>Loading</h1>;
  // }
};

export default UserPage;
