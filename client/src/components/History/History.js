import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Empty from "../Empty";
import PageTitle from "../PageTitle";

const History = () => {
  const location = useLocation();

  useEffect(() => {
    document.title = "History - Shoe Management";
  }, [location]);
  return (
    <>
      <PageTitle title="History" />
      <section className="history-content">
        <h4 className="content-title">Transaction History</h4>
        <Empty />
      </section>
    </>
  );
};

export default History;
