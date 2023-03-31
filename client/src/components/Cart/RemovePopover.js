import React, { useState } from "react";
import { Button, IconButton, Popover, Stack, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch } from "react-redux";

import { removeFromCart } from "../../store/features/cartSlice";

const RemovePopover = ({ adminId, _id }) => {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <>
      <IconButton
        aria-describedby={id}
        variant="contained"
        onClick={handleClick}
        sx={{ p: 0 }}
      >
        <DeleteIcon />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Stack direction="column" gap={2} sx={{ p: 2 }}>
          <Typography>Are you sure remove this item?</Typography>
          <Button
            variant="contained"
            onClick={() => dispatch(removeFromCart(adminId, _id))}
          >
            Sure
          </Button>
        </Stack>
      </Popover>
    </>
  );
};

export default RemovePopover;
