import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

const ErrorPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    document.title = "404 Not Found";
  }, [location]);

  return (
    <div className="error-page">
      <div className="error-content">
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <span>Not Found ...</span>
        <Button variant="contained" size="large" onClick={() => navigate(-1)}>
          Go Back Previous Page
        </Button>
      </div>
    </div>
  );
};

export default ErrorPage;
