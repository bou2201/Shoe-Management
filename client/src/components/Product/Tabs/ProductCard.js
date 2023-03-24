import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useSelector, useDispatch } from "react-redux";

import { getShoes } from "../../../store/features/productSlice";
import CardItem from "../../Shared/CardItem";

const ProductCard = ({ itemsPerPage }) => {
  const [itemOffset, setItemOffset] = useState(0);
  const productState = useSelector((state) => state.product);
  const dispatch = useDispatch();

  const { products } = productState;

  useEffect(() => {
    dispatch(getShoes());
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
      <CardItem currentItems={currentItems} />
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
