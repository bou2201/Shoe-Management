import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Empty from "../Empty";
import PageTitle from "../PageTitle";

const Cart = () => {
  const location = useLocation();

  useEffect(() => {
    document.title = "Cart - Shoe Management";
  }, [location]);

  return (
    <>
      <PageTitle title="Cart" />
      <section className="cart-content">
        <h4 className="content-title">All Items: 0</h4>
        <Empty />
      </section>
    </>
  );
};

export default Cart;
