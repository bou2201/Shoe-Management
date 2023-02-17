import React from "react";
import { SyncLoader } from "react-spinners";

const Loading = ({ loading }) => {
  return (
    <div className="spinner">
      <SyncLoader color={"#6f6af8"} margin={10} loading={loading} size={25} />
    </div>
  );
};

export default Loading;
