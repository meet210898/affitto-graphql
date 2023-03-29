import React, { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { useMutation, useQuery } from "@apollo/client";
import {
  GET_USER_BY_ID,
  UPDATE_USER_PROFILE,
  UPLOAD_FILE,
} from "../../gqloperations/mutation";
import {
  GET_ALL_CITIES,
  GET_ALL_STATES,
  GET_ALL_USERS,
} from "../../gqloperations/queries";

import Footer from "../components/footer";
import TopBar from "../components/Topbar";

import Grid from "@mui/material/Grid";
import { Typography, IconButton } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Container from "@mui/material/Container";
import EditIcon from "@mui/icons-material/Edit";
import { styled } from "@mui/material/styles";
import EditPopover from "../components/popover/index";

const theme = createTheme({
  typography: {
    button: {
      textTransform: "none",
    },
    color: "textPrimary",
  },
  fontFamily: "Sans-serif",
});
const Input = styled("input")({
  display: "none",
});

const UserProfile = () => {
  const { REACT_APP_BASE_URL } = process.env;

  const [value, setValue] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [type, setType] = useState("");
  const [name, setName] = useState("");
  const [label, setLabel] = useState("");
  const [infoArr, setInfoArr] = useState([]);
  const [user, setUser] = useState(null);

  const citiesInfo = useQuery(GET_ALL_CITIES);
  const statesInfo = useQuery(GET_ALL_STATES);

  const [userById] = useMutation(GET_USER_BY_ID, {
    onCompleted: (data) => setUser(data.user),
  });

  const [updateUser] = useMutation(UPDATE_USER_PROFILE, {
    onCompleted: (data) => console.log("user data==", data),
    onError: (err) => console.log("error in user", err),
    refetchQueries: [GET_ALL_USERS, "user"],
  });

  const [uploadFile] = useMutation(UPLOAD_FILE, {
    onCompleted: (data) => console.log("upload file data==", data),
    onError: (err) => console.log("error in upload file", err),
  });

  const userToken = localStorage.getItem("user-token") || "";
  const decodeUserId = jwt_decode(userToken);
  useEffect(() => {
    if (userToken) {
      getUserById(decodeUserId);
    }
  }, [userToken]);

  const getUserById = (decodeUserId) => {
    userById({
      variables: {
        id: {
          _id: decodeUserId.userId,
        },
      },
    });
  };

  let fullName = {
    firstName: user?.firstName,
    lastName: user?.lastName,
  };

  const open = Boolean(anchorEl);

  let popObj = {
    anchorEl: anchorEl,
    label: label,
    name: name,
    value: value,
    type: type,
    info: infoArr,
    setAnchorEl: setAnchorEl,
    fullName: fullName,
    currentStateId: user?.stateId._id,
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const changeImage = (event) => {
    event.preventDefault();

    const file = event.target.files[0];
    uploadFile({ variables: { file } });
    updateUser({
      variables: {
        userUpdate: {
          _id: decodeUserId.userId,
          firstName: user.firstName,
          lastName: user.lastName,
          phoneNumber: user.phoneNumber,
          stateId: user.stateId._id,
          cityId: user.cityId_id,
          username: user.username,
          email: user.email,
          personalImage: file.name,
        },
      },
    });
    getUserById(decodeUserId);
  };
  console.log("user", user);
  return (
    <>
      <Grid>
        <TopBar />
        <ThemeProvider theme={theme}>
          <Container style={{ padding: "20px" }} component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "20px",
                background: "white",
                boxShadow: "2px 1px 9px 2px #888888",
              }}
            >
              <Grid
                container
                display="flex"
                justifyContent="center"
                title="Click to change the Profile Picture"
              >
                <label htmlFor="personalImage">
                  <Input
                    accept="image/*"
                    id="personalImage"
                    name="personalImage"
                    type="file"
                    onChange={changeImage}
                  />
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                  >
                    <img
                      height="150px"
                      width="150px"
                      style={{ borderRadius: "100%" }}
                      src={`${REACT_APP_BASE_URL}${user?.personalImage}`}
                      alt="Personal profile"
                    />
                  </IconButton>
                </label>
              </Grid>
              <Grid container display="flex" justifyContent="center">
                <h3
                  style={{
                    display: "flex",
                    alignItems: "center",
                    margin: "0 0 0 8px",
                  }}
                >
                  {user?.firstName} {user?.lastName}{" "}
                  <IconButton
                    onClick={(event) => {
                      handleClick(event);
                      setValue(fullName);
                      setType("fullname");
                      setName("email");
                      setLabel("Email");
                    }}
                    aria-label="edit"
                    size="small"
                    color="primary"
                  >
                    <EditIcon fontSize="inherit" />
                  </IconButton>
                </h3>
              </Grid>

              <Grid container>
                <h2>Your Details</h2>
              </Grid>
              <Grid xs={12} container>
                <Grid display="block" xs={12}>
                  <Typography mt={2} style={{ margin: "0px" }} component="div">
                    <b>Email</b>{" "}
                  </Typography>
                </Grid>
                <Grid display="block" xs={6}>
                  <p style={{ margin: "0px" }}>{user?.email}</p>
                  <Typography marginTop="30px" mt={2} component="div">
                    <b>City</b>{" "}
                    <IconButton
                      onClick={(event) => {
                        handleClick(event);
                        setValue(user?.cityId?._id);
                        setType("citySelect");
                        setName("cityId");
                        setLabel("City");
                        setInfoArr(
                          citiesInfo?.data?.city?.map((data) => ({
                            stateId: data.stateId._id,
                            cityId: data._id,
                            cityName: data.cityName,
                          }))
                        );
                      }}
                      aria-label="edit"
                      size="small"
                      color="primary"
                    >
                      <EditIcon fontSize="inherit" />
                    </IconButton>
                  </Typography>
                  <p style={{ margin: "0px" }}>
                    {citiesInfo?.data?.city?.map((data) => {
                      return data._id === user?.cityId._id ? data.cityName : "";
                    })}
                  </p>
                  <Typography marginTop="30px" mt={2} component="div">
                    <b>Phone</b>{" "}
                    <IconButton
                      onClick={(event) => {
                        handleClick(event);
                        setValue(user?.phoneNumber);
                        setType("textField");
                        setName("phoneNumber");
                        setLabel("Contact Number");
                      }}
                      aria-label="edit"
                      size="small"
                      color="primary"
                    >
                      <EditIcon fontSize="inherit" />
                    </IconButton>
                  </Typography>
                  <p style={{ margin: "0px" }}>{user?.phoneNumber}</p>
                </Grid>
                <Grid style={{ marginTop: "20px" }} xs={6}>
                  <Typography mt={2} component="div">
                    <b>Username</b>{" "}
                    <IconButton
                      onClick={(event) => {
                        handleClick(event);
                        setValue(user?.username);
                        setType("textField");
                        setName("username");
                        setLabel("Username");
                      }}
                      aria-label="edit"
                      size="small"
                      color="primary"
                    >
                      <EditIcon fontSize="inherit" />
                    </IconButton>
                  </Typography>
                  <p style={{ margin: "0px" }}>{user?.username}</p>
                  <Typography marginTop="30px" mt={2} component="div">
                    <b>State</b>{" "}
                    <IconButton
                      onClick={(event) => {
                        handleClick(event);
                        setValue(user?.stateId._id);
                        setType("select");
                        setName("stateId");
                        setLabel("State");
                        setInfoArr(
                          statesInfo?.data?.state?.map((data) => ({
                            dataId: data._id,
                            dataName: data.stateName,
                          }))
                        );
                      }}
                      aria-label="edit"
                      size="small"
                      color="primary"
                    >
                      <EditIcon fontSize="inherit" />
                    </IconButton>
                  </Typography>
                  <p style={{ margin: "0px" }}>
                    {statesInfo?.data?.state?.map((data) => {
                      return data._id === user?.stateId._id
                        ? data.stateName
                        : "";
                    })}
                  </p>
                </Grid>
              </Grid>
            </Box>
            <EditPopover
              open={open}
              popObj={popObj}
              updateUser={updateUser}
              userById={userById}
              user={user}
            />
          </Container>
        </ThemeProvider>
      </Grid>
      <Footer />
    </>
  );
};

export default UserProfile;
