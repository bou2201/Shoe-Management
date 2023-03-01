import React, { useContext } from "react";
import { DataGrid } from "@mui/x-data-grid";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import AutoFixHighRoundedIcon from "@mui/icons-material/AutoFixHighRounded";
import LocalMallRoundedIcon from "@mui/icons-material/LocalMallRounded";
import { ProductContext } from "../../contexts/ProductContext";
import { IconButton } from "@mui/material";

const ProductTable = () => {
  const {
    productState: { products },
  } = useContext(ProductContext);

  const handleDelete = () => {};

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
          <IconButton onClick={() => handleDelete(params.row.id)}>
            <AutoFixHighRoundedIcon />
          </IconButton>
          <IconButton onClick={() => handleDelete(params.row.id)}>
            <LocalMallRoundedIcon />
          </IconButton>
          <IconButton onClick={() => handleDelete(params.row.id)}>
            <DeleteRoundedIcon />
          </IconButton>
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
