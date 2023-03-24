import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

import { addShoe } from "../../../store/features/productSlice";
import CreateForm from "./CreateForm";
import PageTitle from "../../Shared/PageTitle";
import AlertMessage from "../../Shared/AlertMessage";

const initVariants = [
  { size: "36", quantity: null || 10 },
  { size: "37", quantity: null || 10 },
  { size: "38", quantity: null || 10 },
  { size: "39", quantity: null || 10 },
  { size: "40", quantity: null || 10 },
  { size: "41", quantity: null || 10 },
  { size: "42", quantity: null || 10 },
  { size: "43", quantity: null || 10 },
  { size: "44", quantity: null || 10 },
];

const Create = () => {
  const [alert, setAlert] = useState(null);
  const location = useLocation();
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.product);

  console.log(isLoading);

  useEffect(() => {
    document.title = "Create Product - Shoe Management";
  }, [location]);

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      brand: "",
      price: "",
      variants: initVariants,
      image: [],
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      price: Yup.string().required("Price is required"),
      brand: Yup.string().required("Brand is required"),
      description: Yup.string().required("Description is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      if (values.image < 1) {
        setAlert({
          type: "error",
          status: "Error",
          message: "You must choose at least 1 image.",
        });
        return setTimeout(() => setAlert(null), 5000);
      }

      try {
        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("description", values.description);
        formData.append("brand", values.brand);
        formData.append("price", values.price);
        values.image.forEach((img) => {
          formData.append("image", img);
        });
        formData.append("variants", JSON.stringify(values.variants));

        const newProduct = await dispatch(addShoe(formData));
        if (!newProduct.success) {
          setAlert({
            type: "error",
            status: "Error",
            message: "Failed to create product ...",
          });
          setTimeout(() => setAlert(null), 5000);
        } else {
          setAlert({
            type: "success",
            status: "Success",
            message: "Created product successfully!",
          });
          setTimeout(() => setAlert(null), 5000);
        }
        console.log(newProduct);
      } catch (error) {
        console.log(error);
      }
      resetForm({
        values: {
          name: "",
          description: "",
          brand: "",
          price: "",
          variants: initVariants,
          image: [],
        },
      });
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    formik.handleSubmit(e);
  };

  const handleOnChangePrice = (e) => {
    const { value } = e.target;
    const formattedValue = `${value}`;
    formik.setFieldValue("price", formattedValue);
  };

  return (
    <>
      <AlertMessage info={alert} />
      <PageTitle title="Create product" />
      <section className="product-content">
        <CreateForm
          handleSubmit={handleSubmit}
          handleOnChangePrice={handleOnChangePrice}
          handleOnChange={formik.handleChange}
          setFieldValue={formik.setFieldValue}
          name={formik.values.name}
          brand={formik.values.brand}
          price={formik.values.price}
          description={formik.values.description}
          image={formik.values.image}
          variants={formik.values.variants}
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

export default Create;
