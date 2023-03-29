import React, { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";

import {
  Grid,
  Typography,
  TextField,
  Button,
  Popover,
  MenuItem,
  InputLabel,
  Select,
  FormControl,
  Box,
} from "@mui/material";

const EditPopover = ({ open, popObj, updateUser, userById, user }) => {
  const {
    anchorEl,
    label,
    name,
    value,
    type,
    info,
    setAnchorEl,
    fullName,
    currentStateId,
  } = popObj;

  const getUserById = (decodeUserId) => {
    userById({
      variables: {
        id: {
          _id: decodeUserId.userId,
        },
      },
    });
  };

  const userToken = localStorage.getItem("user-token") || "";
  const decodeUserId = jwt_decode(userToken);
  useEffect(() => {
    if (userToken) {
      getUserById(decodeUserId);
    }
  }, []);

  const { firstName, lastName } = fullName;

  const [profileData, setProfileData] = useState();

  useEffect(() => {
    setProfileData({
      firstName: user?.firstName,
      lastName: user?.lastName,
      email: user?.email,
      username: user?.username,
      cityId: user?.cityId._id,
      stateId: user?.stateId._id,
      phoneNumber: user?.phoneNumber,
    });
  }, [user, setProfileData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value,
    });
  };

  const checkCityId = () => {
    const infoData = info?.find(
      (data) =>
        currentStateId === data.stateId && profileData.cityId === data.cityId
    );
    return infoData ? infoData.cityId : "0";
  };

  const handleClose = () => setAnchorEl(null);

  const handleSubmit = (event) => {
    event.preventDefault();

    updateUser({
      variables: {
        userUpdate: {
          ...profileData,
          _id: decodeUserId.userId,
        },
      },
    });
    getUserById(decodeUserId);
    handleClose();
  };
  console.log("profileData", profileData);
  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <Popover
          open={open}
          onClose={handleClose}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        >
          <Grid container display="block">
            <Grid sx={12} padding="15px">
              {type === "fullname" ? (
                <Typography>
                  <TextField
                    label="firstName"
                    name="firstName"
                    type="text"
                    variant="standard"
                    defaultValue={firstName}
                    onChange={handleChange}
                  />
                  <Typography marginTop="8px">
                    <TextField
                      label="lastName"
                      name="lastName"
                      type="text"
                      variant="standard"
                      defaultValue={lastName}
                      onChange={handleChange}
                    />
                  </Typography>
                </Typography>
              ) : type === "textField" ? (
                <Typography>
                  <TextField
                    label={label}
                    name={name}
                    type="text"
                    variant="standard"
                    defaultValue={value}
                    onChange={handleChange}
                  />
                </Typography>
              ) : type === "citySelect" ? (
                <FormControl fullWidth>
                  {" "}
                  <InputLabel id={name}>{label}</InputLabel>
                  <Select
                    labelId={name}
                    id={name}
                    name={name}
                    label={label}
                    defaultValue="0"
                    value={checkCityId()}
                    onChange={handleChange}
                  >
                    <MenuItem value="0">please select</MenuItem>
                    {info
                      ?.filter((item) => currentStateId === item.stateId)
                      .map((data) => {
                        return (
                          <MenuItem value={data.cityId}>
                            {data.cityName}
                          </MenuItem>
                        );
                      })}
                  </Select>{" "}
                </FormControl>
              ) : (
                <FormControl fullWidth>
                  {" "}
                  <InputLabel id={name}>{label}</InputLabel>
                  <Select
                    labelId={name}
                    id={name}
                    name={name}
                    label={label}
                    defaultValue={value}
                    onChange={handleChange}
                  >
                    {info?.map((data) => (
                      <MenuItem value={data.dataId}>{data.dataName}</MenuItem>
                    ))}
                  </Select>{" "}
                </FormControl>
              )}

              <Grid marginTop="10px" display="flex" justifyContent="flex-end">
                <Button
                  style={{
                    marginLeft: "10px",
                    height: "22px",
                  }}
                  variant="contained"
                  size="small"
                  onClick={handleClose}
                >
                  Cancel
                </Button>
                <Button
                  style={{
                    marginLeft: "10px",
                    height: "22px",
                    width: "51px",
                  }}
                  type="submit"
                  variant="contained"
                  size="small"
                  onClick={(event) => handleSubmit(event)}
                >
                  Save
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Popover>
      </form>
    </Box>
  );
};

export default EditPopover;
