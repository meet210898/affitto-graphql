import React from "react";
import {
  CREATE_VEHICLE_TYPES,
  UPLOAD_FILE,
} from "../../../gqloperations/mutation";
import { useMutation } from "@apollo/client";
import Typography from "@mui/material/Typography";
import { Button, TextField } from "@mui/material";
import { Box, Card, CardActions, CardContent } from "@mui/material";
import { styled } from "@mui/material/styles";

const AddVehicleType = () => {
  const Input = styled("input")({
    display: "none",
  });

  const [vehicleTypeData, setVehicleTypeData] = React.useState({
    typeName: null,
    typeImage: "",
  });

  const [createVehicleType] = useMutation(CREATE_VEHICLE_TYPES, {
    onCompleted: (data) => console.log("vehicle type data==", data),
    onError: (err) => console.log("error in state", err),
  });

  const [uploadFile] = useMutation(UPLOAD_FILE, {
    onCompleted: (data) => console.log("upload file data==", data),
    onError: (err) => console.log("error in upload file", err),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVehicleTypeData({
      ...vehicleTypeData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const { name, files } = e.target;
    setVehicleTypeData({
      ...vehicleTypeData,
      [name]: files[0].name,
    });
    const file = files[0];
    if (!file) return;
    uploadFile({ variables: { file } });
  };

  const handleSubmit = () => {
    createVehicleType({
      variables: {
        vehicleTypeNew: vehicleTypeData,
      },
    });
  };

  return (
    <Box
      component="form"
      noValidate
      onSubmit={handleSubmit}
      sx={{
        maxWidth: 300,
        margin: "0px",
        padding: "20px",
        boxShadow: "2px 1px 9px 2px #888888",
        background: "white",
      }}
    >
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h5" component="div">
            Vehicle Type Name:
          </Typography>
          <TextField
            label="Type Name"
            name="typeName"
            type="text"
            variant="standard"
            value={vehicleTypeData.typeName}
            onChange={handleChange}
          />
        </CardContent>
        <CardContent>
          <Typography variant="h5" component="div">
            Vehicle Type Image:
          </Typography>
          <label htmlFor="typeImage">
            <Input
              accept="image/*"
              id="typeImage"
              multiple
              type="file"
              name="typeImage"
              onChange={handleImageChange}
            />
            <Button variant="contained" component="span">
              Upload Image
            </Button>
          </label>
        </CardContent>
        <CardActions>
          <Button type="submit" variant="contained" size="medium">
            Add Vehicle Type
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};

export default AddVehicleType;
