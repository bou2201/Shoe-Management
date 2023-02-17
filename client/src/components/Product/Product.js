import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

import BasicTabs from "./BasicTabs";
import PageTitle from "../PageTitle";

const Product = () => {
  const location = useLocation();

  useEffect(() => {
    document.title = "Product - Shoe Management";
  }, [location]);

  return (
    <>
      <PageTitle title="Product" />
      <section className="product-content">
        <h4 className="content-title">All Shoes</h4>
        <BasicTabs />
      </section>
    </>
  );
};

export default Product;
