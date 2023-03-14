import React, { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Grid } from "@mui/material";

import Overview from "./Overview";
import CalendarComponent from "./Calendar";
import Location from "./Location";
import PageTitle from "../Shared/PageTitle";
import { AuthContext } from "../../contexts/AuthContext";

const Dashboard = () => {
  const location = useLocation();
  const {
    authState: {
      admin: { name },
    },
  } = useContext(AuthContext);

  useEffect(() => {
    document.title = "Dashboard - Shoe Management";
  }, [location]);

  return (
    <>
      <PageTitle title="Dashboard" name={name} />
      <section className="dashboard-content">
        <Overview />
        <Grid container spacing={5} columns={12} sx={{ overflow: "hidden" }}>
          <Grid item xl={4} lg={5} md={6} xs={12}>
            <CalendarComponent />
          </Grid>
          <Grid item xl={8} lg={7} md={6} xs={12}>
            <Location />
          </Grid>
        </Grid>
      </section>
    </>
  );
};

export default Dashboard;
