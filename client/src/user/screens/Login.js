import React, { useState } from "react";
import Topbar from "../components/Topbar";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { SIGNIN_USER } from "../../gqloperations/mutation";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import PersonIcon from "@mui/icons-material/Person";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <NavLink color="inherit" style={{ color: "#00000099" }} to="/user">
        AFFITTO
      </NavLink>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

const UserLoginScreen = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({});

  const [userSignin, { loading, error }] = useMutation(SIGNIN_USER, {
    onCompleted(data) {
      localStorage.setItem("user-token", data.user.token);
      navigate("/user/home");
    },
  });

  if (loading) return <h1>Loading...</h1>;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    userSignin({
      variables: {
        userSignin: formData,
      },
    });
  };

  return (
    <>
      <Topbar />
      <ThemeProvider theme={theme}>
        {error && <div className="red card-panel">{error.message}</div>}
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginTop: "20px",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "#1b6dc1" }}>
              <PersonIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                style={{ background: "white" }}
                onChange={handleChange}
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                style={{ background: "white" }}
                autoComplete="current-password"
                onChange={handleChange}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <NavLink
                    to="/user/forgetpassword"
                    style={{ color: "#1b6dc1" }}
                    variant="body2"
                  >
                    Forgot password?
                  </NavLink>
                </Grid>
                <Grid item>
                  <NavLink
                    to="/user/register"
                    style={{ color: "#1b6dc1" }}
                    variant="body2"
                  >
                    Don't have an account? Sign Up
                  </NavLink>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      </ThemeProvider>
    </>
  );
};

export default UserLoginScreen;
