import React from "react";

import PropTypes from "prop-types";
const CardWrapper = ({ children }) => {
  return (
    <div className="card m-4 ">
      <div className="card-body">{children}</div>
    </div>
  );
};

CardWrapper.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default CardWrapper;
