import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

import DetailsProduct from "./DetailsProduct";
import PageTitle from "../../Shared/PageTitle";
import { fetchShoeDetails } from "../../../store/features/productSlice";
import Loading from "../../Loading/Loading";

const Details = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const productRef = useRef(null);
  const { product, isLoading } = useSelector((state) => state.product);

  useEffect(() => {
    if (id !== productRef.current) {
      dispatch(fetchShoeDetails(id));
      productRef.current = id;
    }
  }, [id, dispatch]);

  useEffect(() => {
    document.title = `${product?.name}`;
  }, [product?.name]);

  return (
    <>
      <Loading loading={isLoading}/>
      <PageTitle title="Product Details" />
      <section className="product-details">
        <h4 className="content-title">ID: {id}</h4>
        <div className="product-details-content">
          {product && (
            <DetailsProduct product={product} />
          )}
        </div>
      </section>
    </>
  );
};

export default Details;
