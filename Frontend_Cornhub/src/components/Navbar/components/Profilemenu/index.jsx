import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";

import { useAuthContext } from "../../../../hooks/useAuthContext";

export default function Profilemenu() {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (route) => {
    setAnchorEl(null);
    if (route) {
      navigate(route);
    }
  };

  const menuItems = [
    {
      icon: <Settings />,
      label: "Settings",
      route: "/settings",
    },
    {
      icon: <Logout />,
      label: "Logout",
      route: "/logout",
    },
  ];

  return (
    <>
      <Avatar className="cursor-pointer" onMouseOver={handleClick} />
      <Menu
        className="cursor-pointer"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        MenuListProps={{ onMouseLeave: handleClose }}
        sx={{
          elevation: 0,
          overflow: "visible",
          filter: "drop-shadow(0px 2px 8px rgba(66, 55, 55, 0.32))",
          mt: 1.5,
          "& .MuiAvatar-root": {
            width: 40,
            height: 40,
            ml: -0.5,
            mr: 1,
          },
          "&:before": {
            content: '""',
            display: "block",
            position: "absolute",
            top: 0,
            right: 14,
            width: 10,
            height: 10,
            bgcolor: "background.paper",
            transform: "translateY(-50%) rotate(45deg)",
            zIndex: 0,
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <a href="/user-profile-editing">
          <MenuItem onClick={handleClose}>
            <Avatar sx={{ width: 24, height: 24 }} className="mr-3" />
            {user.firstName} {user.lastName}
          </MenuItem>{" "}
        </a>
        <Divider className="mt-5" />
        {menuItems.map((item, index) => (
          <MenuItem key={index} onClick={() => handleClose(item.route)}>
            {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
            {item.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}