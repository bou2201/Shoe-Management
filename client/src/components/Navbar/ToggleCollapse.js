import React from "react";
import { IconButton } from "@mui/material";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

const styleToggle = {
  position: "absolute",
  top: "80px",
  right: "-16px",
  zIndex: 9999,
  background: "#fff",
  color: "#6f6af8",
  boxShadow:
    "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
};

const ToggleCollapse = ({ collapseSidebar, activeCollapse, setActiveCollapse }) => {
  return (
    <IconButton
      onClick={() => [collapseSidebar(), setActiveCollapse(!activeCollapse)]}
      size="small"
      aria-label="collapse sidebar"
      sx={styleToggle}
    >
      {activeCollapse ? <KeyboardArrowLeftIcon /> : <KeyboardArrowRightIcon />}
    </IconButton>
  );
};

export default ToggleCollapse;
