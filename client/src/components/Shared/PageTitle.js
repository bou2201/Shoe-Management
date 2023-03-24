import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { Badge, IconButton, Popover, useTheme } from "@mui/material";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import NotificationsActiveOutlinedIcon from "@mui/icons-material/NotificationsActiveOutlined";

import EmptyImage from "../../assets/empty.png";

const PageTitle = ({ title, name }) => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const { cart } = useSelector((state) => state.cart);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div className="dashboard-title">
      <div className="dashboard-title-content">
        <h1>{title}</h1>
        {name && (
          <p>
            Welcome back, <b>{name}!</b>
          </p>
        )}
      </div>
      <div className="dashboard-title-icon">
        <Link to="/dashboard/cart">
          <Badge color="primary" badgeContent={cart.length} max={9} showZero>
            <IconButton
              sx={{ color: theme.palette.mainColor.purple }}
              aria-label="cart"
            >
              <ShoppingBagOutlinedIcon fontSize="inherit" />
            </IconButton>
          </Badge>
        </Link>
        <IconButton
          sx={{ color: theme.palette.mainColor.purple }}
          aria-label="notify"
          aria-describedby={id}
          onClick={handleClick}
        >
          <NotificationsActiveOutlinedIcon fontSize="inherit" />
        </IconButton>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
        >
          <div className="notification">
            <h3>Notifications</h3>
            <hr />
            <img src={EmptyImage} alt="" />
          </div>
        </Popover>
      </div>
    </div>
  );
};

export default PageTitle;
