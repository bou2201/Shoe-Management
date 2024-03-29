import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from "@mui/material";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { useDispatch } from "react-redux";
import { removeShoe } from "../../../store/features/productSlice";

const DialogAlert = ({ _id, name }) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <IconButton onClick={handleClickOpen}>
        <DeleteRoundedIcon />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to delete this product? "}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Deleting a product: <b>"{name}"</b> may directly affect the data in
            the system.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ padding: "16px 24px" }}>
          <Button onClick={handleClose} variant="outlined">
            Not Sure
          </Button>
          <Button
            type="submit"
            variant="contained"
            onClick={() => dispatch(removeShoe(_id))}
          >
            Sure
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DialogAlert;
