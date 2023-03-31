import React from "react";
import { HashLoader } from "react-spinners";

const Loading = ({ loading }) => {
  return !loading ? (
    <></>
  ) : (
    <div className="wrapper-spinner">
      <div className="spinner">
        <HashLoader
          color={"#6f6af8"}
          loading={loading}
          size={60}
          speedMultiplier={0.8}
        />
        <h3>Loading ...</h3>
      </div>
    </div>
  );
};

export default Loading;
