import React from "react";
import EmptyImage from "../assets/empty.png";

const Empty = () => {
  return (
    <div className="empty-page">
      <div className="empty-page-image">
        <img src={EmptyImage} alt="" />
      </div>
      <p>No Content Yet !</p>
    </div>
  );
};

export default Empty;
