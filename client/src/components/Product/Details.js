import React, { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import {
  RadioGroup,
  Stack,
  FormControlLabel,
  FormControl,
} from "@mui/material";
import Radio from "@mui/material/Radio";

import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";

import PageTitle from "../PageTitle";
import { ProductContext } from "../../contexts/ProductContext";

const DetailsProduct = ({
  product,
  quantity,
  handleDecrease,
  handleIncrease,
}) => {
  return (
    <>
      <div className="product-images">
        {product?.image.map((img, index) => (
          <img src={img} alt={product?.name} key={index} />
        ))}
      </div>
      <div className="product-info">
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
          <p>Select your size:</p>
          <FormControl sx={{ mt: 3, paddingLeft: "12px" }}>
            <RadioGroup
              name="radio-buttons-group"
              sx={{ flexDirection: "row", rowGap: 1 }}
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
          <p>Select quantity:</p>
          <div className="quantity-box">
            <button onClick={handleDecrease}>
              <RemoveIcon />
            </button>
            <span>{quantity}</span>
            <button onClick={handleIncrease}>
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
      </div>
    </>
  );
};

const Details = () => {
  const { id } = useParams();
  const productRef = useRef(null);

  const {
    productState: { product },
    detailsProduct,
  } = useContext(ProductContext);

  const [quantity, setQuantity] = useState(1);

  const handleIncrease = () => setQuantity(quantity + 1);
  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
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
      <PageTitle title="Product Details" />
      <section className="product-details">
        <h4 className="content-title">ID: {id}</h4>
        <div className="product-details-content">
          {product && (
            <DetailsProduct
              product={product}
              quantity={quantity}
              handleDecrease={handleDecrease}
              handleIncrease={handleIncrease}
            />
          )}
        </div>
      </section>
    </>
  );
};

export default Details;
