import React from "react";
import { Link } from "react-router-dom";

import { Badge, Button, IconButton, Typography, useTheme } from "@mui/material";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import NotificationsActiveOutlinedIcon from "@mui/icons-material/NotificationsActiveOutlined";

const Popover = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <Button aria-describedby={id} variant="contained" onClick={handleClick}>
        {props.children}
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
      >
        <Typography sx={{ p: 2 }}>The content of the Popover.</Typography>
      </Popover>
    </div>
  );
};

const PageTitle = ({ title }) => {
  const theme = useTheme();

  return (
    <div className="dashboard-title">
      <div className="dashboard-title-content">
        <h1>{title}</h1>
      </div>
      <div className="dashboard-title-icon">
        <Link to="/dashboard/cart">
          <Badge color="primary" badgeContent={0} max={9} showZero>
            <IconButton
              sx={{ color: theme.palette.mainColor.purple }}
              aria-label="cart"
            >
              <ShoppingBagOutlinedIcon fontSize="inherit" />
            </IconButton>
          </Badge>
        </Link>
        <Popover>
          <IconButton
            sx={{ color: theme.palette.mainColor.purple }}
            aria-label="notify"
          >
            <NotificationsActiveOutlinedIcon fontSize="inherit" />
          </IconButton>
        </Popover>
      </div>
    </div>
  );
};

export default PageTitle;
