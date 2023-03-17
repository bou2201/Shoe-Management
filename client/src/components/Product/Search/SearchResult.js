import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import { useSelector } from "react-redux";

import PageTitle from "../../Shared/PageTitle";
import Empty from "../../Shared/Empty";
import CardItem from "../../Shared/CardItem";

const SearchResult = ({ itemsPerPage }) => {
  const productState = useSelector((state) => state.product);
  const { products } = productState;

  const [itemOffset, setItemOffset] = useState(0);

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = products.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(products.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % products.length;
    setItemOffset(newOffset);
  };

  return (
    <>
      <PageTitle title="Result searching" />
      <section className="search-page">
        <h4 className="content-title">All Shoes</h4>
        {products.length > 0 ? (
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
        ) : (
          <Empty />
        )}
      </section>
    </>
  );
};

export default SearchResult;
