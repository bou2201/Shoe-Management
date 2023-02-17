import React from "react";
import { useParams } from "react-router-dom";
import {
  RadioGroup,
  Stack,
  FormControlLabel,
  FormControl,
} from "@mui/material";
import Radio from "@mui/material/Radio";

import PageTitle from "../PageTitle";
import Image from "../../assets/Brooklyn-Cream.jpg";

const Details = () => {
  const { id } = useParams();

  return (
    <>
      <PageTitle title="Product Details" />
      <section className="product-details">
        <h4 className="content-title">ID: {id}</h4>
        <div className="product-details-content">
          <div className="product-images">
            {Array.from(Array(6)).map((_, index) => (
              <img src={Image} alt="" />
            ))}
          </div>
          <div className="product-info">
            <h1 className="product-info-name">AF1 Brooklyn Bray</h1>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <span className="product-info-brand">
                Brand: <b>Nike</b>
              </span>
              <span className="product-info-code">
                Code: <b>AWFK124F2T</b>
              </span>
            </Stack>
            <h2 className="product-info-price">$123.25</h2>
            <div className="product-info-size">
              <p>Select your size:</p>
              <FormControl sx={{ mt: 3 }}>
                <RadioGroup
                  name="radio-buttons-group"
                  sx={{ flexDirection: "row", rowGap: 1 }}
                >
                  {Array.from(Array(9)).map((_, index) => (
                    <FormControlLabel
                      value={`36 + ${index}`}
                      label={index + 36}
                      control={<Radio />}
                      sx={{
                        background: "#f2f2fd",
                        borderRadius: "8px",
                        padding: "8px 10px",
                        paddingRight: "20px",
                        width: "100px",
                      }}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </div>
            <div className="product-info-btn">
              <button className="add-to-cart" type="submit">
                Add To Cart
              </button>
              <button className="favourite">Favourite</button>
            </div>
            <div className="product-info-desc">
              <p>Description: </p>
              <span>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Et
                aliquid voluptatem debitis consequuntur! Rem possimus aspernatur
                ullam explicabo facere sint ut expedita, quisquam vero
                architecto tempore illo, unde reprehenderit nobis?
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Details;
