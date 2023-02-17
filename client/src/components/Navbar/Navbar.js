import React, { useEffect, useState } from "react";
import { Menu, MenuItem, Sidebar, useProSidebar } from "react-pro-sidebar";
import { Link, useLocation } from "react-router-dom";

import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import SearchIcon from "@mui/icons-material/Search";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import FeaturedPlayListIcon from "@mui/icons-material/FeaturedPlayList";
import HistoryIcon from "@mui/icons-material/History";

import SearchModal from "./SearchModal";
import ToggleCollapse from "./ToggleCollapse";
import ToggleMenu from "./ToggleMenu";

const Navbar = () => {
  const location = useLocation();
  const [activeCollapse, setActiveCollapse] = useState(true);
  const [pathname, setPathname] = useState("/dashboard");
  const { collapseSidebar, toggleSidebar, broken } = useProSidebar();

  useEffect(() => {
    if (location.pathname) {
      return setPathname(location.pathname);
    }
  }, [location.pathname]);

  return (
    <div className="sidebar-pos">
      <Sidebar
        customBreakPoint="800px"
        backgroundColor="#6f6af8"
        rootStyles={{ border: 0 }}
      >
        <Menu rootStyles={{ color: "#fff" }}>
          <span className="label-sidebar">Main</span>
          <MenuItem icon={<SearchIcon />} component={<SearchModal />}>
            Search
          </MenuItem>
          <MenuItem
            icon={<DashboardRoundedIcon />}
            component={<Link to="/dashboard" />}
            active={pathname === "/dashboard"}
          >
            Dashboard
          </MenuItem>
          <MenuItem
            icon={<AnalyticsIcon />}
            component={<Link to="product" />}
            active={pathname === "/dashboard/product"}
          >
            Product
          </MenuItem>
          <MenuItem
            icon={<FeaturedPlayListIcon />}
            component={<Link to="orders" />}
            active={pathname === "/dashboard/orders"}
          >
            Orders
          </MenuItem>
          <MenuItem
            icon={<HistoryIcon />}
            component={<Link to="history" />}
            active={pathname === "/dashboard/history"}
          >
            History
          </MenuItem>
        </Menu>
        <div className="space">
          <hr className="space-style" />
        </div>
        <Menu rootStyles={{ color: "#fff" }}>
          <span className="label-sidebar">User</span>
          <MenuItem
            icon={<AddCircleIcon />}
            component={<Link to="register" />}
            active={pathname === "/dashboard/register"}
          >
            Register
          </MenuItem>
          <MenuItem icon={<LogoutIcon />}> Logout</MenuItem>
        </Menu>
      </Sidebar>
      <main>
        {!broken && (
          <ToggleCollapse
            collapseSidebar={collapseSidebar}
            activeCollapse={activeCollapse}
            setActiveCollapse={setActiveCollapse}
          />
        )}
        {broken && <ToggleMenu toggleSidebar={toggleSidebar} />}
      </main>
    </div>
  );
};

export default Navbar;
