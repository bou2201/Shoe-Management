import React, { useContext, useState } from "react";
import ReactPaginate from "react-paginate";

import { ProductContext } from "../../../contexts/ProductContext";
import PageTitle from "../../Shared/PageTitle";
import Empty from "../../Shared/Empty";
import CardItem from "../../Shared/CardItem";

const SearchResult = ({ itemsPerPage }) => {
  const {
    productState: { products },
  } = useContext(ProductContext);

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
            {/* <SearchCard currentItems={currentItems} /> */}
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
        ) : (
          <Empty />
        )}
      </section>
    </>
  );
};

export default SearchResult;
