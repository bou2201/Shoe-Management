import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import PageTitle from "../Shared/PageTitle";
import Empty from "../Shared/Empty";

const Order = () => {
  const location = useLocation();

  useEffect(() => {
    document.title = "Orders - Shoe Management";
  }, [location]);
  return (
    <>
      <PageTitle title="Orders" />
      <section className="order-content">
        <h4 className="content-title">Total Orders</h4>
        <Empty />
      </section>
    </>
  );
};

export default Order;
