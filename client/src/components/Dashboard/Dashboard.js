import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

import { Grid } from "@mui/material";

import Overview from "./Overview";
import CalendarComponent from "./Calendar";
import Location from "./Location";
import PageTitle from "../PageTitle";

const Dashboard = () => {
  const location = useLocation();

  useEffect(() => {
    document.title = "Dashboard - Shoe Management";
  }, [location]);

  return (
    <>
      <PageTitle title="Dashboard" />
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
