import React, { useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { AuthContext } from "../../contexts/AuthContext";

const ErrorPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    document.title = "404 Not Found";
  }, [location]);

  const {
    authState: { isAuthenticated },
  } = useContext(AuthContext);

  const handleOnClick = () => {
    if (isAuthenticated) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="error-page">
      <div className="error-content">
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <span>Not Found ...</span>
        <Button variant="contained" size="large" onClick={handleOnClick}>
          Go Back Previous Page
        </Button>
      </div>
    </div>
  );
};

export default ErrorPage;
