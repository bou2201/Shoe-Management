import React from "react";
import { Link } from "react-router-dom";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { Stack } from "@mui/material";

const hrStyle = {
  background: "#302C61",
  width: "100%",
  height: "0.5px",
  opacity: 0.2,
  margin: "15px 0",
};

const CardItem = ({ currentItems }) => {
  return (
    <section className="product-list">
      {currentItems &&
        currentItems.map((currentItem) => (
          <Link
            to={`/dashboard/product/${currentItem?._id}`}
            key={currentItem._id}
          >
            <div className="product-card">
              <div className="product-card-image">
                <img src={currentItem.image[0]} alt="" />
              </div>
              <div
                style={{
                  paddingTop: "15px",
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                }}
              >
                <div className="product-card-name">
                  <p>{currentItem.brand}</p>
                  <h4>{currentItem.name}</h4>
                </div>
                <Stack sx={{ marginTop: "auto" }}>
                  <hr style={hrStyle} />
                  <div className="product-card-price">
                    <span>{currentItem.price}</span>
                    <div className="product-icons">
                      <button className="product-icons-btn">
                        <ShoppingBagOutlinedIcon />
                      </button>
                      <button className="product-icons-btn">
                        <FavoriteBorderOutlinedIcon />
                      </button>
                    </div>
                  </div>
                </Stack>
              </div>
            </div>
          </Link>
        ))}
    </section>
  );
};

export default CardItem;
