import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Grid } from "@mui/material";

import { register } from "../../store/features/authSlice";
import RegisterForm from "./RegisterForm";
import PageTitle from "../Shared/PageTitle";
import AlertMessage from "../Shared/AlertMessage";

const Register = () => {
  const location = useLocation();
  const [alert, setAlert] = useState(null);

  const dispatch = useDispatch();

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
        const registerData = await dispatch(register(values));

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
        console.log(registerData);
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

            margrinTop: 10,
          }}
        >
          <Grid
            item
            md={6}
            xs={12}
            sx={{
              padding: {
                md: "40px",
                xs: "40px 20px",
              },
              background: "#f2f2fd",
              borderRadius: 5,
              overflow: "hidden",
              boxShadow: "rgba(0, 0, 0, 0.04) 0px 3px 5px",
            }}
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
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                alt=""
              />
            </div>
          </Grid>
        </Grid>
      </section>
    </>
  );
};

export default Register;
