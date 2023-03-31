import { useState, memo } from "react";
import {
  RadioGroup,
  Stack,
  FormControlLabel,
  FormControl,
} from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import Radio from "@mui/material/Radio";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { LazyLoadImage } from "react-lazy-load-image-component";

import { addToCart } from "../../../store/features/cartSlice";
import AlertMessage from "../../Shared/AlertMessage";
import Loading from "../../Loading/Loading";

const DetailsProduct = ({ product }) => {
  const [quantityMax, setQuantityMax] = useState(null);
  const [alert, setAlert] = useState(null);
  const { admin } = useSelector((state) => state.auth);
  const { isLoading } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      shoeId: product?._id,
      name: product?.name,
      brand: product?.brand,
      price: product?.price,
      size: "",
      quantity: 1,
      quantityMax: quantityMax,
      image: product?.image[0],
    },
    enableReinitialize: true,
    onSubmit: async (values, { resetForm }) => {
      if (values.size === "") {
        setAlert({
          type: "error",
          status: "Error",
          message: "Please choose size to adding cart!",
        });
        return setTimeout(() => setAlert(null), 5000);
      }

      try {
        const newItem = await dispatch(addToCart(admin._id, values));

        if (newItem.success) {
          setAlert({
            type: "success",
            status: "Success",
            message: "Added cart successfully !",
          });
          setTimeout(() => {
            setAlert(null);
          }, 1500);
        }
        console.log(newItem);
      } catch (error) {
        console.log(error);
      }
      resetForm({
        values: {
          shoeId: product?._id,
          name: product?.name,
          brand: product?.brand,
          price: product?.price,
          size: "",
          quantity: 1,
          image: product?.image[0],
        },
      });
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    formik.handleSubmit(e);
  };
  const handleIncrease = () => {
    formik.setFieldValue("quantity", formik.values.quantity + 1);
  };
  const handleDecrease = () => {
    formik.setFieldValue("quantity", Math.max(formik.values.quantity - 1, 1));
  };
  const handleOnClick = (size) => {
    const max = product.variants.find((variant) => variant.size === size);
    setQuantityMax(max.quantity);
  };

  return (
    <>
      <Loading loading={isLoading} />
      <AlertMessage info={alert} />
      <div className="product-images">
        {product?.image.map((img, index) => (
          <LazyLoadImage
            src={img}
            alt={product?.name}
            key={index}
            effect="opacity"
          />
        ))}
        {/* <img src={img} alt={product?.name} key={index} /> */}
      </div>
      <form className="product-info" onSubmit={handleSubmit}>
        <h1 className="product-info-name">{product?.name}</h1>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <span className="product-info-brand">
            Brand: <b>{product?.brand}</b>
          </span>
          <span className="product-info-code">
            Code: <b>{product?.code}</b>
          </span>
        </Stack>
        <h2 className="product-info-price">{product?.price}</h2>
        <div className="product-info-size">
          <p>Select your size: </p>
          <FormControl sx={{ mt: 3, paddingLeft: "12px" }}>
            <RadioGroup
              name="size"
              sx={{ flexDirection: "row", rowGap: 1 }}
              value={formik.values.size}
              onChange={formik.handleChange}
            >
              {product?.variants.map((variant, i) => (
                <FormControlLabel
                  key={i}
                  value={variant.size}
                  label={variant.size}
                  control={<Radio />}
                  sx={{
                    background: "#f2f2fd",
                    borderRadius: "8px",
                    padding: "8px 10px",
                    paddingRight: "20px",
                    width: "100px",
                  }}
                  onClick={() => handleOnClick(variant.size)}
                  style={
                    variant.quantity < 0
                      ? { opacity: 0.5, pointerEvents: "none" }
                      : {}
                  }
                />
              ))}
            </RadioGroup>
          </FormControl>
        </div>
        <div className="product-info-quantity">
          <p>Select quantity: {quantityMax && <b>{quantityMax} products</b>}</p>
          <div className="quantity-box">
            <button
              onClick={handleDecrease}
              aria-label="Decrease Quantity"
              type="reset"
            >
              <RemoveIcon />
            </button>
            <input
              type="number"
              name="quantity"
              value={formik.values.quantity}
              onChange={formik.handleChange}
              min={1}
              max={quantityMax}
              aria-label=""
              placeholder="Quantity"
            />
            <button
              onClick={handleIncrease}
              aria-label="Increase Quantity"
              type="reset"
            >
              <AddIcon />
            </button>
          </div>
        </div>
        <div className="product-info-btn">
          <button className="add-to-cart" type="submit">
            Add To Cart
          </button>
          <button className="favourite">Favourite</button>
        </div>
        <div className="product-info-desc">
          <p>Description: </p>
          <span>{product?.description}</span>
        </div>
      </form>
    </>
  );
};

export default memo(DetailsProduct);
