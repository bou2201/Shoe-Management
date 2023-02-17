import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

import { Grid } from "@mui/material";

import Banner from "../../assets/login-banner.png";
import RegisterForm from "./RegisterForm";
import PageTitle from "../PageTitle";

const Register = () => {
  const location = useLocation();

  useEffect(() => {
    document.title = "Register - Shoe Management";
  }, [location]);

  return (
    <>
      <PageTitle title="Register" />
      <section className="register-form">
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
            <RegisterForm />
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
