import React from "react";
const MeetingsCard = () => {
  return (
    <div className="card mb-3">
      <div className="card-body d-flex flex-column justify-content-center text-center">
        <h5 className="card-title">
          <span>Completed meetings</span>
        </h5>
        <h5>//Количество встреч</h5>
        {/* className="display-1" */}
      </div>
    </div>
  );
};

export default MeetingsCard;
