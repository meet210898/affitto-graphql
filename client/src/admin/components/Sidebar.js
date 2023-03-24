import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { SIGNIN_USER } from "../../gqloperations/mutation";

import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import HouseIcon from "@mui/icons-material/House";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import CarRentalIcon from "@mui/icons-material/CarRental";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import CategoryIcon from "@mui/icons-material/Category";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Button, Collapse, Grid } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import BookOnlineIcon from "@mui/icons-material/BookOnline";
import PersonIcon from "@mui/icons-material/Person";
import logo from "../public/logo/logo4.png";

const drawerWidth = 240;

const Sidebar = (props) => {
  const navigate = useNavigate();
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const [open, setOpen] = React.useState({
    State: false,
    City: false,
    VehicleType: false,
    Company: false,
    Vehicle: false,
  });

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const [, { client }] = useMutation(SIGNIN_USER);

  const pages = [
    { page: "State", icon: <AddLocationAltIcon style={{ color: "white" }} /> },
    { page: "City", icon: <LocationCityIcon style={{ color: "white" }} /> },
    { page: "VehicleType", icon: <CarRentalIcon style={{ color: "white" }} /> },
    { page: "Company", icon: <HouseIcon style={{ color: "white" }} /> },
    { page: "Vehicle", icon: <DirectionsCarIcon style={{ color: "white" }} /> },
    { page: "Faq", icon: <QuestionAnswerIcon style={{ color: "white" }} /> },
    { page: "FaqCategory", icon: <CategoryIcon style={{ color: "white" }} /> },
  ];

  const handleClick = (page) => {
    setOpen({ ...open, [page]: !open[page] });
  };

  const drawer = (
    <div>
      <center>
        <img
          src={logo}
          style={{
            objectFit: "cover",
            height: "55px",
            width: "180px",
          }}
          height="auto"
          width="150px"
          alt="blank"
        />
      </center>
      <Divider style={{ backgroundColor: "white", width: "100%" }} />
      <List>
        <Link to={"/Admin/Dashboard"} style={{ textDecoration: "none" }}>
          <ListItem key="Dashboard" disablePadding>
            {/* <ListItemButton role={undefined} onClick={handleToggle(value)} dense> */}
            <ListItemButton role={undefined} dense>
              <ListItemIcon style={{ color: "white" }}>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText
                id="Dashboard"
                primary={`Dashboard`}
                style={{ color: "white" }}
              />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link to={"/Admin/User"} style={{ textDecoration: "none" }}>
          <ListItem key="User" disablePadding>
            {/* <ListItemButton role={undefined} onClick={handleToggle(value)} dense> */}
            <ListItemButton role={undefined} dense>
              <ListItemIcon style={{ color: "white" }}>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText
                id="User"
                primary={`User`}
                style={{ color: "white" }}
              />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link to={"/Admin/Booking"} style={{ textDecoration: "none" }}>
          <ListItem key="Booking" disablePadding>
            <ListItemButton role={undefined} dense>
              <ListItemIcon style={{ color: "white" }}>
                <BookOnlineIcon />
              </ListItemIcon>
              <ListItemText
                id="Booking"
                primary={`Booking`}
                style={{ color: "white" }}
              />
            </ListItemButton>
          </ListItem>
        </Link>

        {pages.map((item) => (
          <>
            <ListItemButton
              className="navListItem"
              onClick={() => handleClick(item.page)}
            >
              <ListItemIcon className="icon">{item.icon}</ListItemIcon>
              <ListItemText style={{ color: "white" }} primary={item.page} />
              {open[item.page] ? (
                <ExpandLess style={{ color: "white" }} />
              ) : (
                <ExpandMore style={{ color: "white" }} />
              )}
            </ListItemButton>
            <Collapse in={open[item.page]} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton sx={{ pl: 4 }}>
                  <Link
                    to={`/Admin/add${item.page}`}
                    style={{ textDecoration: "none" }}
                  >
                    <ListItem key={`add${item.page}`} disablePadding>
                      <ListItemButton role={undefined} dense>
                        <ListItemIcon style={{ color: "white" }}>
                          <ArrowForwardIcon />
                        </ListItemIcon>
                        <ListItemText
                          id={`add${item.page}`}
                          primary={`Add ${item.page}`}
                          style={{ color: "white" }}
                        />
                      </ListItemButton>
                    </ListItem>
                  </Link>
                </ListItemButton>
                <ListItemButton sx={{ pl: 4 }}>
                  <Link
                    to={`/Admin/view${item.page}`}
                    style={{ textDecoration: "none" }}
                  >
                    <ListItem key={`view${item.page}`} disablePadding>
                      <ListItemButton role={undefined} dense>
                        <ListItemIcon style={{ color: "white" }}>
                          <ArrowForwardIcon />
                        </ListItemIcon>
                        <ListItemText
                          id={`view${item.page}`}
                          primary={`View ${item.page}`}
                          style={{ color: "white" }}
                        />
                      </ListItemButton>
                    </ListItem>
                  </Link>
                </ListItemButton>
              </List>
            </Collapse>
          </>
        ))}
      </List>
      <Divider style={{ backgroundColor: "white" }} />
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const logoutHandler = () => {
    client.clearStore();
    localStorage.removeItem("adminToken");
    navigate("/");
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          backgroundColor: "black",
          borderLeft: "1px solid",
        }}
      >
        <Toolbar>
          <Grid container>
            <Grid xs={2}>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { sm: "none" } }}
              >
                <MenuIcon />
              </IconButton>
            </Grid>
            <Grid xs={8} md={8} display="flex"></Grid>
            <Grid
              style={{ display: "flex", justifyContent: "right" }}
              xs={2}
              md={2}
            >
              <Button
                onClick={logoutHandler}
                sx={{ color: "white", fontSize: "1rem" }}
              >
                <b>Logout</b>
              </Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: "black",
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};

Sidebar.propTypes = {
  window: PropTypes.func,
};

export default Sidebar;
