import React, { useState, useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { SyncLoader } from "react-spinners";
import { Container } from "@mui/material";

import Banner from "../../assets/login-banner.png";
import Logo from "../../assets/logo.png";

import { AuthContext } from "../../contexts/AuthContext";
import AlertMessage from "./AlertMessage";
import LoginForm from "./LoginForm";

const initialState = { email: "", password: "" };

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    document.title = "Login";
  }, [location]);

  const {
    login,
    authState: { isLoading, isAuthenticated },
  } = useContext(AuthContext);

  let loading;
  if (isLoading) {
    loading = (
      <div className="spinner">
        <SyncLoader color={"#6f6af8"} margin={10} loading={loading} size={25} />
      </div>
    );
  }

  useEffect(() => {
    if (isAuthenticated) {
      setTimeout(() => {
        return navigate("/dashboard");
      }, 1000);
    }
  });

  const [formData, setFormData] = useState(initialState);
  const [alert, setAlert] = useState(null);

  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const { email, password } = formData;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const loginData = await login(formData);

      if (!loginData.success) {
        setAlert({
          type: "error",
          status: "Error",
          message: "Incorrect your email or password - Try again",
        });
        setTimeout(() => setAlert(null), 3000);
      } else {
        setAlert({
          type: "success",
          status: "Success",
          message: "Logged in to the system!",
        });
        setTimeout(() => setAlert(null), 1000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="login">
      {loading}

      <AlertMessage info={alert} />

      <Container maxWidth="lg">
        <div className="login-layout">
          <div className="login-layout-banner">
            <img src={Banner} alt="login-banner" />
          </div>
          <div className="login-layout-form">
            <div className="login-logo">
              <img src={Logo} alt="login-logo" />
            </div>
            <h1 className="login-title">Hello Welcome !</h1>
            <span className="login-desc">
              Welcome back, Please enter your details.
            </span>
            <LoginForm
              handleOnChange={handleOnChange}
              handleSubmit={handleSubmit}
              email={email}
              password={password}
            />
            <p className="login-copyright">
              Copyright @ 2023 - <span>Chucnguyen</span>
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Login;
