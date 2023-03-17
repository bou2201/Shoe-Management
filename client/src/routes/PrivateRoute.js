import { Outlet, Navigate } from "react-router-dom";
import { SyncLoader } from "react-spinners";

import { useSelector } from "react-redux";

const PrivateRoute = () => {
  // const {
  //   authState: { isLoading, isAuthenticated },
  // } = useContext(AuthContext);

  const authState = useSelector((state) => state.auth);

  if (authState.isLoading) {
    return (
      <div className="spinner">
        <SyncLoader color={"#6f6af8"} margin={10} size={25} />
      </div>
    );
  }

  return authState.isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
