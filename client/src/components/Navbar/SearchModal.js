import React, { useContext, useState, memo, useEffect } from "react";
import {
  Button,
  Modal,
  Typography,
  Box,
  FormControl,
  InputLabel,
  Input,
} from "@mui/material";
import { useFormik } from "formik";
import { useLocation, useNavigate } from "react-router-dom";
import { ProductContext } from "../../contexts/ProductContext";

const styleBox = {
  position: "absolute",
  top: "30%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: "rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;",
  p: 4,
  borderRadius: 3,
  width: { lg: 600, md: 500, sm: 400 },
};

const styleButton = {
  color: "#fff",
  textTransform: "capitalize",
  justifyContent: "flex-start",
  padding: "0 20px",
  fontSize: 16,
  height: "50px",
  width: "100%",
  textAlign: "start",
  position: "relative",
};

const SearchModal = (props) => {
  const { searchProducts } = useContext(ProductContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useState(
    new URLSearchParams(location.search)
  );
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleSearch = async () => {
    try {
      const params = searchParams.toString();
      await searchProducts(params);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setSearchParams(new URLSearchParams(location.search));
    handleSearch();
  }, [location.search]);

  const formik = useFormik({
    initialValues: {
      name: "",
      brand: "",
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        const params = new URLSearchParams();
        if (values.name) {
          params.set("name", values.name);
        }
        if (values.brand) {
          params.set("brand", values.brand);
        }

        const queryString = params.toString();
        setSearchParams(params);

        navigate(`/dashboard/product/search?${queryString}`);
      } catch (error) {
        console.log(error);
      }
      resetForm({
        values: {
          name: "",
          brand: "",
        },
      });
      handleClose();
    },
  });

  return (
    <>
      <Button className="search-hover" onClick={handleOpen} sx={styleButton}>
        {props.children}
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleBox}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Searching
          </Typography>
          <form onSubmit={formik.handleSubmit}>
            <FormControl fullWidth sx={{ mt: 2 }} variant="standard">
              <InputLabel htmlFor="standard-adornment-search">Name</InputLabel>
              <Input
                id="standard-adornment-search"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                sx={{ padding: "5px 0" }}
              />
            </FormControl>
            <FormControl fullWidth sx={{ mt: 2 }} variant="standard">
              <InputLabel htmlFor="standard-adornment-search">Brand</InputLabel>
              <Input
                id="standard-adornment-search"
                name="brand"
                value={formik.values.brand}
                onChange={formik.handleChange}
                sx={{ padding: "5px 0" }}
              />
            </FormControl>
            <Button
              type="submit"
              variant="contained"
              sx={{
                textAlign: "center",
                display: "block",
                mt: 5,
                ml: "auto",
                mr: "auto",
              }}
            >
              Search
            </Button>
          </form>
        </Box>
      </Modal>
    </>
  );
};

export default memo(SearchModal);
