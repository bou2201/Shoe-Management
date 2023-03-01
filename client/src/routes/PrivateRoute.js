import { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { SyncLoader } from "react-spinners";
import { AuthContext } from "../contexts/AuthContext";

const PrivateRoute = () => {
  const {
    authState: { isLoading, isAuthenticated },
  } = useContext(AuthContext);

  if (isLoading) {
    return (
      <div className="spinner">
        <SyncLoader color={"#6f6af8"} margin={10} size={25} />
      </div>
    );
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
