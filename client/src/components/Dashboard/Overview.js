import React from "react";
import { IconButton } from "@mui/material";
import {
  MdOutlineCollectionsBookmark,
  MdOutlinePendingActions,
} from "react-icons/md";
import { RiBillLine, RiUser5Line } from "react-icons/ri";

import MoreVertIcon from "@mui/icons-material/MoreVert";

const Overview = () => {
  return (
    <div className="dashboard-content-overview">
      <h4 className="content-title">Overview</h4>
      <div className="content-box">
        <div className="content-box-item">
          <div className="item-icons">
            <MdOutlineCollectionsBookmark />
            <IconButton
              sx={{ color: "#000", padding: 0 }}
              aria-label="add to shopping cart"
            >
              <MoreVertIcon />
            </IconButton>
          </div>
          <h2>$ 253.24</h2>
          <p>Total Earnings</p>
        </div>
        <div className="content-box-item">
          <div className="item-icons">
            <RiBillLine />
            <IconButton
              sx={{ color: "#000", padding: 0 }}
              aria-label="add to shopping cart"
            >
              <MoreVertIcon />
            </IconButton>
          </div>
          <h2>54</h2>
          <p>Orders</p>
        </div>
        <div className="content-box-item">
          <div className="item-icons">
            <RiUser5Line />
            <IconButton
              sx={{ color: "#000", padding: 0 }}
              aria-label="add to shopping cart"
            >
              <MoreVertIcon />
            </IconButton>
          </div>
          <h2>124</h2>
          <p>Customers</p>
        </div>
        <div className="content-box-item">
          <div className="item-icons">
            <MdOutlinePendingActions />
            <IconButton
              sx={{ color: "#000", padding: 0 }}
              aria-label="add to shopping cart"
            >
              <MoreVertIcon />
            </IconButton>
          </div>
          <h2>8</h2>
          <p>Orders Pending</p>
        </div>
      </div>
    </div>
  );
};

export default Overview;
