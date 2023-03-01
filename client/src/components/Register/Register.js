import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

import { Grid } from "@mui/material";

import Banner from "../../assets/login-banner.png";
import RegisterForm from "./RegisterForm";
import PageTitle from "../PageTitle";
import { AuthContext } from "../../contexts/AuthContext";
import AlertMessage from "../AlertMessage";

// const initialState = {
//   firstName: "",
//   lastName: "",
//   email: "",
//   password: "",
//   confirmPassword: "",
// };

const Register = () => {
  const { register } = useContext(AuthContext);
  const location = useLocation();
  const [alert, setAlert] = useState(null);

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("It is required"),
      lastName: Yup.string().required("It is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("It is required"),
      password: Yup.string().required("It is required"),
      confirmPassword: Yup.string().required("It is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      if (values.password !== values.confirmPassword) {
        setAlert({
          type: "error",
          status: "Error",
          message: "Your password does not match !",
        });
        setTimeout(() => setAlert(null), 5000);
        return;
      }

      try {
        const registerData = await register(values);

        if (!registerData.success) {
          setAlert({
            type: "error",
            status: "Error",
            message: "Something error, your account is not registered",
          });
          setTimeout(() => setAlert(null), 3000);
        } else {
          setAlert({
            type: "success",
            status: "Success",
            message: "Successfully Registered !",
          });
          setTimeout(() => setAlert(null), 3000);
        }
      } catch (error) {
        console.log(error);
      }

      resetForm({
        values: {
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          confirmPassword: "",
        },
      });
    },
  });

  useEffect(() => {
    document.title = "Register - Shoe Management";
  }, [location]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    formik.handleSubmit(e);
  };

  return (
    <>
      <PageTitle title="Register" />
      <section className="register-form">
        <AlertMessage info={alert} />
        <h4 className="content-title">Create new account</h4>
        <Grid
          container
          columns={12}
          sx={{
            alignItems: "center",
            background: "#f2f2fd",
            borderRadius: 5,
            overflow: "hidden",
            margrinTop: 10,
          }}
        >
          <Grid
            item
            md={6}
            xs={12}
            sx={{ padding: { md: "40px", xs: "40px 20px" } }}
          >
            <RegisterForm
              handleOnChange={formik.handleChange}
              handleSubmit={handleSubmit}
              firstName={formik.values.firstName}
              lastName={formik.values.lastName}
              email={formik.values.email}
              password={formik.values.password}
              confirmPassword={formik.values.confirmPassword}
              errorFirstName={
                formik.touched.firstName && Boolean(formik.errors.firstName)
              }
              errorLastName={
                formik.touched.lastName && Boolean(formik.errors.lastName)
              }
              errorEmail={formik.touched.email && Boolean(formik.errors.email)}
              errorPassword={
                formik.touched.password && Boolean(formik.errors.password)
              }
              errorConfirm={
                formik.touched.confirmPassword &&
                Boolean(formik.errors.confirmPassword)
              }
              textFirstName={
                formik.touched.firstName && formik.errors.firstName
              }
              textLastName={formik.touched.lastName && formik.errors.lastName}
              textEmail={formik.touched.email && formik.errors.email}
              textPassword={formik.touched.password && formik.errors.password}
              textConfirm={
                formik.touched.confirmPassword && formik.errors.confirmPassword
              }
            />
          </Grid>
          <Grid
            item
            md={6}
            xs={12}
            sx={{
              display: {
                md: "grid",
                xs: "none",
              },
              overflow: "hidden",
            }}
          >
            <div className="register-banner">
              <img src={Banner} alt="" />
            </div>
          </Grid>
        </Grid>
      </section>
    </>
  );
};

export default Register;
