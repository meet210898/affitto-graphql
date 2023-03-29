import React, { useEffect, useState } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Tooltip,
  MenuItem,
  Avatar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

import jwt_decode from "jwt-decode";
import { NavLink } from "react-router-dom";

import logo from "../public/image/logo/logo.png";
import ProfileItem from "./profileItem";

import "../components/css/topbar.css";
import { styled } from "@mui/system";
import { useMutation } from "@apollo/client";
import { GET_USER_BY_ID } from "../../gqloperations/mutation";

const MyComponent = styled("root")({
  textTransform: "none",
  fontFamily: "Poppins",
});

const pages = [
  "Home",
  "Company",
  "Category",
  "Vehicles",
  "Register",
  "FAQ",
  "About us",
];

const TopBar = () => {
  const { REACT_APP_BASE_URL } = process.env;

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [userData, setUserData] = useState(null);

  const [userById] = useMutation(GET_USER_BY_ID, {
    onCompleted: (data) => setUserData(data.user),
  });

  const getUserById = (decodeUserId) => {
    userById({
      variables: {
        id: {
          _id: decodeUserId.userId,
        },
      },
    });
  };

  useEffect(() => {
    const userToken = localStorage.getItem("user-token") || "";
    if (userToken) {
      const decodeUserId = jwt_decode(userToken);
      getUserById(decodeUserId);
    }
  }, []);

  const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);

  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);

  const handleCloseNavMenu = () => setAnchorElNav(null);

  const handleCloseUserMenu = () => setAnchorElUser(null);

  return (
    <AppBar style={{ backgroundColor: "white" }} position="sticky">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
          >
            <NavLink
              style={{ color: "black", textDecoration: "none" }}
              to="/user/Home"
            >
              <img
                src={logo}
                style={{ objectFit: "cover" }}
                height="auto"
                width="150px"
                alt="blank"
              />
            </NavLink>
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
              style={{ color: "black" }}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page, index) => (
                <div key={`page-${index}`}>
                  {(localStorage.getItem("user-token") &&
                    page === "Register") ||
                  (!localStorage.getItem("user-token") &&
                    page === "My Booking") ? (
                    ""
                  ) : (
                    <NavLink
                      style={{ color: "black", textDecoration: "none" }}
                      to={`/user/${page.replace(/\s/g, "")}`}
                    >
                      <MyComponent>
                        <MenuItem
                          style={{
                            color: "black",
                            textTransform: "none",
                            fontFamily: "Poppins",
                          }}
                          key={page}
                          onClick={handleCloseNavMenu}
                        >
                          <Typography textAlign="center">{page}</Typography>
                        </MenuItem>
                      </MyComponent>
                    </NavLink>
                  )}
                </div>
              ))}
            </Menu>
          </Box>

          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
            style={{ color: "black" }}
          >
            <NavLink
              style={{ color: "black", textDecoration: "none" }}
              to="/user/Home"
            >
              <img
                src={logo}
                style={{ objectFit: "cover" }}
                height="auto"
                width="150px"
                alt="blank"
              />
            </NavLink>
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
            }}
          >
            {pages.map((page, index) =>
              (localStorage.getItem("user-token") && page === "Register") ||
              (!localStorage.getItem("user-token") && page === "My Booking") ? (
                ""
              ) : (
                <NavLink
                  key={`l-${index}`}
                  style={({ isActive }) =>
                    isActive
                      ? { textDecoration: "none", color: "#346DC1" }
                      : { textDecoration: "none", color: "black" }
                  }
                  to={`/user/${page.replace(/\s/g, "")}`}
                >
                  <b style={{ margin: "10px", fontSize: "18px" }}>{page}</b>
                </NavLink>
              )
            )}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {localStorage.getItem("user-token") ? (
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    alt="personalImage"
                    src={`${REACT_APP_BASE_URL}/${userData?.personalImage}`}
                  />
                </IconButton>
              </Tooltip>
            ) : (
              <NavLink
                style={{ color: "black", textDecoration: "none" }}
                to={`/user/Login`}
              >
                <MenuItem key="Login" onClick={handleCloseNavMenu}>
                  <b style={{ margin: "10px", fontSize: "18px" }}>Login</b>
                </MenuItem>
              </NavLink>
            )}

            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <ProfileItem
                setAnchorElUser={setAnchorElUser}
                site="mybooking"
                name="My Bookings"
              />
              <ProfileItem
                setAnchorElUser={setAnchorElUser}
                site="profile"
                name="Profile"
              />
              <ProfileItem
                setAnchorElUser={setAnchorElUser}
                site=""
                name="Logout"
              />
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default TopBar;
