import React from "react";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import Image from "../../assets/login-banner.png";

const hrStyle = {
  background: "#302C61",
  width: "100%",
  height: "0.5px",
  opacity: 0.2,
  margin: "15px 0",
};

const ProductCard = () => {
  return (
    <section className="product-list">
      {Array.from(Array(6)).map((_, index) => (
        <div className="product-card">
          <div className="product-card-image">
            <img src={Image} alt="" />
          </div>
          <div style={{ paddingTop: "15px" }}>
            <div className="product-card-name">
              <p>Nike</p>
              <h4>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam
                ea cumque praesentium autem
              </h4>
            </div>
            <hr style={hrStyle} />
            <div className="product-card-price">
              <span>$53</span>
              <div className="product-icons">
                <button className="product-icons-btn">
                  <ShoppingBagOutlinedIcon />
                </button>
                <button className="product-icons-btn">
                  <FavoriteBorderOutlinedIcon />
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default ProductCard;
