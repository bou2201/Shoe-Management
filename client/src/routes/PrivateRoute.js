import { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { SyncLoader } from "react-spinners";
import { AuthContext } from "../contexts/AuthContext";

const PrivateRoute = () => {
  const {
    authState: { isLoading, isAuthenticated },
  } = useContext(AuthContext);

  if (isLoading) {
    return <SyncLoader color={"#368dd6"} margin={10} size={25} />;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
