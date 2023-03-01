import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { ProductContext } from "../../contexts/ProductContext";
import { Stack } from "@mui/material";

const hrStyle = {
  background: "#302C61",
  width: "100%",
  height: "0.5px",
  opacity: 0.2,
  margin: "15px 0",
};

const ProductCardItem = ({ currentItems }) => {
  return (
    <section className="product-list">
      {currentItems &&
        currentItems.map((currentItem) => (
          <Link to={currentItem._id} key={currentItem._id}>
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

const ProductCard = ({ itemsPerPage }) => {
  const [itemOffset, setItemOffset] = useState(0);
  const {
    productState: { products },
    getProducts,
  } = useContext(ProductContext);

  useEffect(() => {
    try {
      getProducts();
    } catch (error) {
      console.log(error);
    }
    // eslint-disable-next-line
  }, []);

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = products.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(products.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % products.length;
    setItemOffset(newOffset);
  };

  return (
    <>
      <ProductCardItem currentItems={currentItems} />
      <ReactPaginate
        breakLabel="..."
        nextLabel=">"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="<"
        renderOnZeroPageCount={null}
        className="pagination"
      />
    </>
  );
};

export default ProductCard;
