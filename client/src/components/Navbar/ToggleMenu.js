import React from "react";
import { IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const ToggleMenu = ({ toggleSidebar }) => {
  return (
    <div className="toggle-menu">
      <IconButton
        aria-label="toggle menu"
        onClick={() => toggleSidebar()}
        size="large"
        sx={{ color: "#fff", background: "#6f6af8" }}
      >
        <MenuIcon />
      </IconButton>
    </div>
  );
};

export default ToggleMenu;
