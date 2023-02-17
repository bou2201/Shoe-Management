import React from "react";
import { Container } from "@mui/material";
import Navbar from "../Navbar/Navbar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <div className="layout-bg"></div>
      <Container maxWidth="xl" className="wrapper-container">
        <Navbar />
        <div className="wrapper-padding">
          <Outlet />
        </div>
      </Container>
    </>
  );
};

export default Layout;
