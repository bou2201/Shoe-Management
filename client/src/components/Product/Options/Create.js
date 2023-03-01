import { Box, FormControl, Grid, InputAdornment, InputLabel, MenuItem, OutlinedInput, TextField } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ProductContext } from "../../../contexts/ProductContext";
import PageTitle from "../../PageTitle";

const initialState = {
  name: "",
  description: "",
  brand: "",
  price: "",
  variants: [{}],
  image: [],
};

const brands = [
  {
    value: "Nike",
    label: "Nike",
  },
  {
    value: "MLB",
    label: "MLB",
  },
  {
    value: "Vans",
    label: "Vans",
  },
  {
    value: "Unknown",
    label: "Unknown",
  },
];

const CreateForm = ({
  handleSubmit,
  handleOnChange,
  name,
  description,
  brand,
  price,
  variants,
  image,
}) => {
  return (
    <form className="create-product-form" onClick={handleSubmit}>
      <Grid container spacing={{ md: 3, xs: 2 }} columns={12}>
        <Grid item md={4} xs={12}>
          <TextField
            label="Name"
            name="name"
            value={name}
            onChange={handleOnChange}
            id="outlined-start-adornment"
            placeholder="Name Product ..."
            fullWidth
          />
        </Grid>
        <Grid item md={4} xs={12}>
          <TextField
            id="outlined-select-brand"
            name="brand"
            value={brand}
            select
            label="Brand"
            fullWidth
          >
            {brands.map((brand) => (
              <MenuItem key={brand.value} value={brand.value}>
                {brand.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item md={4} xs={12}>
          <FormControl fullWidth>
            <InputLabel htmlFor="outlined-adornment-amount">Price</InputLabel>
            <OutlinedInput
              id="outlined-adornment-amount"
              startAdornment={
                <InputAdornment position="start">$</InputAdornment>
              }
              label="Amount"
              type="number"
              name="price"
              value={price}
            />
          </FormControl>
        </Grid>
        <Grid item md={7} xs={12}>
          <TextField
            id="outlined-multiline-flexible"
            value={description}
            name="description"
            label="Description"
            multiline
            maxRows={4}
            fullWidth
          />
        </Grid>
        <Grid item md={5} xs={12}>
          
        </Grid>
      </Grid>
    </form>
  );
};

const Create = () => {
  const location = useLocation();

  useEffect(() => {
    document.title = "Create Product - Shoe Management";
  }, [location]);

  const { createProduct } = useContext(ProductContext);
  const [newProduct, setNewProduct] = useState(initialState);

  const { name, description, brand, price, variants, image } = newProduct;

  const handleOnChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  return (
    <>
      <PageTitle title="Create" />
      <section className="product-content">
        <h4 className="content-title">Add new product</h4>
        <CreateForm />
      </section>
    </>
  );
};

export default Create;
