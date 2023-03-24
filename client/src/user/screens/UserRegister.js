import React, { useState } from "react";
import { Grid } from "@mui/material";
import Topbar from "../components/Topbar";
import { NavLink, useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { GET_ALL_CITIES, GET_ALL_STATES } from "../../gqloperations/queries";
import { SINGUP_USER, UPLOAD_FILE } from "../../gqloperations/mutation";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" to="">
        AFFITTO
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

const UserRegisterScreen = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    address: "",
    pincode: "",
    stateId: "",
    cityId: "",
    username: "",
    email: "",
    password: "",
    personalImage: "",
  });

  const [signUpUser] = useMutation(SINGUP_USER, {
    onCompleted: () => navigate("/User/Login"),
    onError: (err) => console.log("error in state", err),
  });

  const [uploadFile] = useMutation(UPLOAD_FILE, {
    onCompleted: (data) => console.log("file upload data==", data),
    onError: (err) => console.log("error in upload file", err),
  });

  const citiesInfo = useQuery(GET_ALL_CITIES);
  const statesInfo = useQuery(GET_ALL_STATES);

  if (citiesInfo.loading) return <h1>Loading...</h1>;
  if (citiesInfo.error) {
    console.log("error", citiesInfo.error);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const { name, files } = e.target;
    setUserData({
      ...userData,
      [name]: files[0].name,
    });
    const file = files[0];
    if (!file) return;
    uploadFile({ variables: { file } });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    signUpUser({
      variables: {
        userNew: userData,
      },
    });
  };
  console.log("userData", userData);
  return (
    <>
      <Topbar />
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: "20px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "#1b6dc1" }}>
              <PersonAddIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              <b>Register</b>
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                    style={{ background: "white" }}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
                    style={{ background: "white" }}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="phoneNumber"
                    label="Phone Number"
                    name="phoneNumber"
                    autoComplete="family-name"
                    style={{ background: "white" }}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    multiline
                    rows={5}
                    fullWidth
                    id="address"
                    label="Address"
                    name="address"
                    autoComplete="family-name"
                    style={{ background: "white" }}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="pincode"
                    label="Pincode"
                    name="pincode"
                    autoComplete="family-name"
                    style={{ background: "white" }}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                      <InputLabel id="stateName">State</InputLabel>
                      <Select
                        labelId="stateName"
                        id="stateId"
                        name="stateId"
                        label="State"
                        value={userData.stateId}
                        style={{ background: "white" }}
                        defaultValue=""
                        onChange={handleChange}
                      >
                        {statesInfo?.data?.state?.map((data) => (
                          <MenuItem key={data._id} value={data._id}>
                            {data.stateName}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                      <InputLabel id="cityId">City</InputLabel>
                      <Select
                        labelId="cityId"
                        id="cityId"
                        name="cityId"
                        label="City"
                        defaultValue=""
                        style={{ background: "white" }}
                        value={userData.cityId}
                        onChange={handleChange}
                      >
                        {citiesInfo?.data?.city
                          ?.filter(
                            (item) => userData.stateId === item.stateId._id
                          )
                          .map((data) => {
                            return (
                              <MenuItem key={data._id} value={data._id}>
                                {data.cityName}
                              </MenuItem>
                            );
                          })}
                      </Select>
                    </FormControl>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    autoComplete="username"
                    style={{ background: "white" }}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    style={{ background: "white" }}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    style={{ background: "white" }}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="confirmPassword"
                    label="Confirm Password"
                    type="password"
                    id="confirmPassword"
                    autoComplete="new-password"
                    style={{ background: "white" }}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button variant="contained" component="label">
                    Personal Image
                    <input
                      type="file"
                      name="personalImage"
                      onChange={handleImageChange}
                      hidden
                    />
                  </Button>
                  {userData.personalImage.name}
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Register
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <NavLink
                    to="/user/login"
                    style={{ color: "#1b6dc1" }}
                    variant="body2"
                  >
                    Already have an account? Sign in
                  </NavLink>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 5 }} />
        </Container>
      </ThemeProvider>
    </>
  );
};

export default UserRegisterScreen;
