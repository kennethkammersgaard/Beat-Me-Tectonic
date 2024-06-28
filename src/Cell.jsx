import React from "react";
import PropTypes from "prop-types";

function Cell({ style, onClick, children }) {
  return (
    <div
      style={{
        ...style,
        userSelect: "none",
      }}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

Cell.propTypes = {
  style: PropTypes.object,
  onClick: PropTypes.func,
  children: PropTypes.node,
};

export default Cell;
