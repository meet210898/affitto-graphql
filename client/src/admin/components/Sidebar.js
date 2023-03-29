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
import { Button, Grid } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import BookOnlineIcon from "@mui/icons-material/BookOnline";
import PersonIcon from "@mui/icons-material/Person";
import logo from "../public/logo/logo4.png";

const drawerWidth = 240;

const Sidebar = (props) => {
  const navigate = useNavigate();
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const [, { client }] = useMutation(SIGNIN_USER);

  const pages = [
    {
      page: "Dashboard",
      icon: <DashboardIcon style={{ color: "white" }} />,
      text: "Dashboard",
    },
    {
      page: "User",
      icon: <PersonIcon style={{ color: "white" }} />,
      text: "User",
    },
    {
      page: "Booking",
      icon: <BookOnlineIcon style={{ color: "white" }} />,
      text: "Booking",
    },
    {
      page: "viewState",
      icon: <AddLocationAltIcon style={{ color: "white" }} />,
      text: "State",
    },
    {
      page: "viewCity",
      icon: <LocationCityIcon style={{ color: "white" }} />,
      text: "City",
    },
    {
      page: "viewVehicleType",
      icon: <CarRentalIcon style={{ color: "white" }} />,
      text: "Vehicle Type",
    },
    {
      page: "viewCompany",
      icon: <HouseIcon style={{ color: "white" }} />,
      text: "Company",
    },
    {
      page: "viewVehicle",
      icon: <DirectionsCarIcon style={{ color: "white" }} />,
      text: "Vehicle",
    },
    {
      page: "viewFaq",
      icon: <QuestionAnswerIcon style={{ color: "white" }} />,
      text: "FAQ",
    },
    {
      page: "viewFaqCategory",
      icon: <CategoryIcon style={{ color: "white" }} />,
      text: "FAQ Category",
    },
  ];

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
        {pages.map((item) => (
          <Link to={`/Admin/${item.page}`} style={{ textDecoration: "none" }}>
            <ListItem key={`${item.page}`} disablePadding>
              <ListItemButton role={undefined} dense>
                <ListItemIcon style={{ color: "white" }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  id={`${item.page}`}
                  primary={`${item.text}`}
                  style={{ color: "white" }}
                />
              </ListItemButton>
            </ListItem>
          </Link>
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
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
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
