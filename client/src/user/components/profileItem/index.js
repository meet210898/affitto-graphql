import * as React from "react";
import Typography from "@mui/material/Typography";
import { NavLink } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";

const ProfileItem = ({ setAnchorElUser, site, name }) => {

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const logoutHandler = () => {
    handleCloseUserMenu();
  };
  return (
    <NavLink
      style={{ color: "black", textDecoration: "none" }}
      to={name === "Logout" ? "/user/Home" : `/user/${site}`}
    >
      <MenuItem
        onClick={name === "Logout" ? logoutHandler : handleCloseUserMenu}
      >
        <Typography
          textAlign="center"
          style={{ fontSize: "18px", fontWeight: "bold" }}
        >
          {name}
        </Typography>
      </MenuItem>
    </NavLink>
  );
};

export default ProfileItem;
