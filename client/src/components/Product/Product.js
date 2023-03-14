import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import BasicTabs from "./Tabs/BasicTabs";
import PageTitle from "../Shared/PageTitle";
import { Button, Stack } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const Product = () => {
  const location = useLocation();

  useEffect(() => {
    document.title = "Product - Shoe Management";
  }, [location]);

  return (
    <>
      <PageTitle title="Product" />
      <section className="product-content">
        <Stack
          sx={{
            justifyContent: "space-between",
            flexDirection: "row",
            alignItems: "flex-start",
          }}
        >
          <h4 className="content-title">All Shoes</h4>
          <Link to="create">
            <Button variant="contained" startIcon={<AddIcon />} size="large">
              Add Product
            </Button>
          </Link>
        </Stack>
        <BasicTabs />
      </section>
    </>
  );
};

export default Product;
