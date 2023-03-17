import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Container } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";

import Banner from "../../assets/login-banner.png";
import Logo from "../../assets/logo.png";

import AlertMessage from "../Shared/AlertMessage";
import LoginForm from "./LoginForm";

import { login } from "../../store/features/authSlice";

const Login = () => {
  const authState = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [alert, setAlert] = useState(null);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const loginData = await dispatch(login(values));

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
      resetForm({ values: { email: "", password: "" } });
    },
  });

  useEffect(() => {
    document.title = "Login";
  }, [location]);

  useEffect(() => {
    if (authState.isAuthenticated) {
      setTimeout(() => {
        return navigate("/dashboard");
      }, 1000);
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    formik.handleSubmit(e);
  };

  return (
    <>
      <section className="login">
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
                handleOnChange={formik.handleChange}
                handleSubmit={handleSubmit}
                email={formik.values.email}
                password={formik.values.password}
                errorEmail={
                  formik.touched.email && Boolean(formik.errors.email)
                }
                errorPassword={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                textEmail={formik.touched.email && formik.errors.email}
                textPassword={formik.touched.password && formik.errors.password}
              />
              <p className="login-copyright">
                Copyright @ 2023 - <span>Chucnguyen</span>
              </p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default Login;
