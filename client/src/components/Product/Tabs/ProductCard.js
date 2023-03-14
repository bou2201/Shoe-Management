import React, { useContext, useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { ProductContext } from "../../../contexts/ProductContext";
import CardItem from "../../Shared/CardItem";

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
      <CardItem currentItems={currentItems}/>
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
