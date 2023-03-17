import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { DataGrid } from "@mui/x-data-grid";
import AutoFixHighRoundedIcon from "@mui/icons-material/AutoFixHighRounded";
import LocalMallRoundedIcon from "@mui/icons-material/LocalMallRounded";
import { IconButton } from "@mui/material";

import DialogAlert from "../Delete/DialogAlert";
import { ProductContext } from "../../../contexts/ProductContext";

const ProductTable = () => {
  // const {
  //   productState: { products },
  //   deleteProduct,
  // } = useContext(ProductContext);

  const productState = useSelector((state) => state.product);
  const dispatch = useDispatch();

  const { products } = productState;

  const columns = [
    { field: "no", headerName: "No", width: 70 },
    { field: "name", headerName: "Name Product", width: 300 },
    { field: "brand", headerName: "Brand", width: 150 },
    { field: "price", headerName: "Price ($)", width: 150 },
    { field: "status", headerName: "Status", width: 150 },
    { field: "id", headerName: "ID", width: 100 },
    {
      field: "options",
      headerName: "Options",
      width: 200,
      renderCell: (params) => (
        <>
          <Link to={`/dashboard/product/${params.row.id}`}>
            <IconButton>
              <LocalMallRoundedIcon />
            </IconButton>
          </Link>
          <Link to={`/dashboard/product/update/${params.row.id}`}>
            <IconButton>
              <AutoFixHighRoundedIcon />
            </IconButton>
          </Link>
          <DialogAlert _id={params.row.id} name={params.row.name} />
        </>
      ),
    },
  ];

  const rows = products.map((product, i) => ({
    no: i + 1,
    name: product.name,
    brand: product.brand,
    price: product.price,
    status: product.status,
    id: product._id,
  }));

  return (
    <div
      style={{
        height: 600,
        width: "100%",
        background: "#f2f2fd",
        borderRadius: 20,
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        sx={{
          borderRadius: 5,
          border: "none",
          boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
          padding: "0 20px",
        }}
      />
    </div>
  );
};

export default ProductTable;
