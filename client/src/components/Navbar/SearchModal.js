import {
  Button,
  Modal,
  Typography,
  Box,
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React, { useState } from "react";

const styleBox = {
  position: "absolute",
  top: "30%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: "rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;",
  p: 4,
  borderRadius: 3,
  width: { lg: 600, md: 500, sm: 300 },
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
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
            Search Product
          </Typography>
          <FormControl fullWidth sx={{ mt: 2 }} variant="standard">
            <InputLabel htmlFor="standard-adornment-search">
              Name or ID
            </InputLabel>
            <Input
              id="standard-adornment-search"
              startAdornment={
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              }
              sx={{ padding: "5px 0" }}
            />
          </FormControl>
        </Box>
      </Modal>
    </>
  );
};

export default SearchModal;
