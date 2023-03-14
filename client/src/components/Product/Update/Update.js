import React, { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

import { ProductContext } from "../../../contexts/ProductContext";
import UpdateForm from "./UpdateForm";
import PageTitle from "../../Shared/PageTitle";
import AlertMessage from "../../Shared/AlertMessage";

const Update = () => {
  const { id } = useParams();
  const productRef = useRef(null);
  const [alert, setAlert] = useState(null);
  const {
    productState: { product },
    detailsProduct,
    updateProduct,
  } = useContext(ProductContext);

  const formik = useFormik({
    initialValues: {
      name: product?.name,
      description: product?.description,
      brand: product?.brand,
      price: product?.price,
      variants: product?.variants,
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      price: Yup.string().required("Price is required"),
      brand: Yup.string().required("Brand is required"),
      description: Yup.string().required("Description is required"),
    }),
    onSubmit: async (values) => {
      try {
        values.variants = JSON.stringify(values.variants);
        const updated = await updateProduct({ _id: id, ...values });

        if (!updated.success) {
          setAlert({
            type: "error",
            status: "Error",
            message: "Failed to update product ...",
          });
          setTimeout(() => setAlert(null), 5000);
        } else {
          setAlert({
            type: "success",
            status: "Success",
            message: "Updated product successfully!",
          });
          setTimeout(() => setAlert(null), 5000);
        }
        console.log(updated);
      } catch (error) {
        console.log(error);
      }
      values.variants = JSON.parse(values.variants);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    formik.handleSubmit(e);
  };

  useEffect(() => {
    if (id !== productRef.current) {
      detailsProduct(id);
      productRef.current = id;
    }
  }, [id, detailsProduct]);

  useEffect(() => {
    document.title = `${product?.name}`;
  }, [product?.name]);

  return (
    <>
      <AlertMessage info={alert} />
      <PageTitle title="Update Product" />
      <section className="product-update">
        <UpdateForm
          handleSubmit={handleSubmit}
          handleOnChange={formik.handleChange}
          name={formik.values?.name}
          brand={formik.values?.brand}
          price={Number(
            formik.values.price && formik.values?.price.replace(/[^0-9.]+/g, "")
          )}
          description={formik.values?.description}
          variants={formik.values?.variants}
          image={product?.image}
          status={product?.status}
          code={product?.code}
          createdAt={product?.createdAt}
          updateAt={product?.updateAt}
          textName={formik.touched.name && formik.errors.name}
          textBrand={formik.touched.brand && formik.errors.brand}
          textPrice={formik.touched.price && formik.errors.price}
          textDesc={formik.touched.description && formik.errors.description}
          errorName={formik.touched.name && Boolean(formik.errors.name)}
          errorBrand={formik.touched.brand && Boolean(formik.errors.brand)}
          errorPrice={formik.touched.price && Boolean(formik.errors.price)}
          errorDesc={
            formik.touched.description && Boolean(formik.errors.description)
          }
        />
      </section>
    </>
  );
};

export default Update;
