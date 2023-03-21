import React from "react";
import {
  GET_ALL_COMPANIES,
  GET_ALL_VEHICLETYPES,
} from "../../../gqloperations/queries";
import { CREATE_VEHICLES, UPLOAD_FILE } from "../../../gqloperations/mutation";
import { useMutation, useQuery } from "@apollo/client";
import Typography from "@mui/material/Typography";
import {
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
} from "@mui/material";
import { Box, Card, CardActions, CardContent } from "@mui/material";
import { styled } from "@mui/material/styles";

const AddVehicle = () => {
  const Input = styled("input")({
    display: "none",
  });

  const [vehicleData, setVehicleData] = React.useState({
    typeId: "",
    companyId: "",
    vehicleName: "",
    vehicleImage: "",
    description: "",
    seats: null,
    door: null,
    ac: null,
    rcImage: "",
    rcNumber: "",
    pucImage: "",
    priceperday: "",
    insuranceImage: "",
  });

  const [createVehicle] = useMutation(CREATE_VEHICLES, {
    onCompleted: (data) => console.log("vehicle data==", data),
    onError: (err) => console.log("error in vehicle", err),
  });

  const [uploadFile] = useMutation(UPLOAD_FILE, {
    onCompleted: (data) => console.log("data==", data),
    onError: (err) => console.log("error in upload file", err),
  });

  const vehicleTypeInfo = useQuery(GET_ALL_VEHICLETYPES);
  const companiesInfo = useQuery(GET_ALL_COMPANIES);

  if (vehicleTypeInfo?.loading) return <h1>Loading...</h1>;
  console.log("vehicleData", vehicleData);
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "seats" || name === "door" || name === "priceperday") {
      setVehicleData({
        ...vehicleData,
        [name]: parseFloat(value),
      });
    } else if (name === "ac") {
      const isAc = value === "true";
      setVehicleData({
        ...vehicleData,
        [name]: isAc,
      });
    } else {
      setVehicleData({
        ...vehicleData,
        [name]: value,
      });
    }
  };

  const handleImageChange = (e) => {
    const { name, files } = e.target;
    setVehicleData({
      ...vehicleData,
      [name]: files[0].name,
    });
    const file = files[0];
    if (!file) return;
    uploadFile({ variables: { file } });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    createVehicle({
      variables: {
        vehicleNew: vehicleData,
      },
    });
  };

  return (
    <Box
      component="form"
      noValidate
      onSubmit={handleSubmit}
      style={{ width: "100%" }}
      sx={{
        margin: "0px",
        padding: "20px",
        boxShadow: "2px 1px 9px 2px #888888",
        background: "white",
      }}
    >
      {vehicleTypeInfo?.error && (
        <div className="red card-panel">{vehicleTypeInfo?.error.message}</div>
      )}
      <Card variant="outlined">
        <Grid container display="flex">
          <Grid xs={12} md={6}>
            <CardContent>
              <Typography variant="h5" component="div">
                Vehicle Type:
              </Typography>
              <Box sx={{ width: "60%" }}>
                <FormControl fullWidth>
                  <InputLabel id="typeName">Vehicle Type</InputLabel>
                  <Select
                    labelId="typeName"
                    id="typeId"
                    name="typeId"
                    defaultValue=""
                    // value={vehicleData?.typeId}
                    label="vehicleType"
                    onChange={handleChange}
                  >
                    {vehicleTypeInfo?.data?.vehicleType?.map((data) => (
                      <MenuItem value={data._id}>{data.typeName}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </CardContent>
            <CardContent>
              <Typography variant="h5" component="div">
                Company Name:
              </Typography>
              <Box sx={{ width: "60%" }}>
                <FormControl fullWidth>
                  <InputLabel id="companyName">Company</InputLabel>

                  <Select
                    labelId="companyName"
                    id="companyId"
                    name="companyId"
                    value={vehicleData?.companyId}
                    label="company"
                    onChange={handleChange}
                  >
                    {companiesInfo?.data?.company
                      ?.filter(
                        (item) => vehicleData?.typeId === item.typeId._id
                      )
                      .map((data) => {
                        return (
                          <MenuItem value={data._id}>
                            {data.companyName}
                          </MenuItem>
                        );
                      })}
                  </Select>
                </FormControl>
              </Box>
            </CardContent>
            <CardContent>
              <Typography variant="h5" component="div">
                Vehicle Name:
              </Typography>
              <TextField
                label="Vehicle Name"
                name="vehicleName"
                type="text"
                variant="standard"
                onChange={handleChange}
                style={{ width: "60%" }}
              />
            </CardContent>
            <CardContent>
              <Typography variant="h5" component="div">
                Vehicle Image:
              </Typography>
              <label htmlFor="vehicleImage">
                <Input
                  accept="image/*"
                  id="vehicleImage"
                  multiple
                  type="file"
                  name="vehicleImage"
                  onChange={handleImageChange}
                />
                <Button variant="contained" component="span">
                  Upload Image
                </Button>
              </label>
            </CardContent>
            <CardContent>
              <Typography variant="h5" component="div">
                Description:
              </Typography>
              <TextField
                label="Description"
                name="description"
                type="text"
                variant="standard"
                onChange={handleChange}
                style={{ width: "60%" }}
              />
            </CardContent>
            <CardContent>
              <Typography variant="h5" component="div">
                Seats:
              </Typography>
              <TextField
                label="Seats"
                name="seats"
                type="text"
                variant="standard"
                onChange={handleChange}
                style={{ width: "60%" }}
              />
            </CardContent>
            <CardContent>
              <Typography variant="h5" component="div">
                Door:
              </Typography>
              <TextField
                label="Door"
                name="door"
                type="text"
                variant="standard"
                onChange={handleChange}
                style={{ width: "60%" }}
              />
            </CardContent>
          </Grid>
          <Grid xs={12} md={6}>
            <CardContent>
              <Typography variant="h5" component="div">
                AC/Non-AC:
              </Typography>
              <Box sx={{ width: "60%" }}>
                <FormControl fullWidth>
                  <InputLabel id="ac">AC/Non-AC</InputLabel>
                  <Select
                    labelId="ac"
                    id="ac"
                    name="ac"
                    // value={ac}
                    label="ac"
                    onChange={handleChange}
                  >
                    <MenuItem value="true">AC</MenuItem>
                    <MenuItem value="false">Non-AC</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </CardContent>
            <CardContent>
              <Typography variant="h5" component="div">
                Transmission:
              </Typography>
              <Box sx={{ width: "60%" }}>
                <FormControl fullWidth>
                  <InputLabel id="transmission">Transmission</InputLabel>

                  <Select
                    labelId="transmission"
                    id="transmission"
                    name="transmission"
                    // value={ac}
                    label="Transmission"
                    onChange={handleChange}
                  >
                    <MenuItem value="Automatic">AUTO</MenuItem>
                    <MenuItem value="Manual">MANUAL</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </CardContent>
            <CardContent>
              <Typography variant="h5" component="div">
                Fuel Type:
              </Typography>
              <Box sx={{ width: "60%" }}>
                <FormControl fullWidth>
                  <InputLabel id="fuelType">Fuel Type</InputLabel>

                  <Select
                    labelId="fuelType"
                    id="fuelType"
                    name="fuelType"
                    // value={ac}
                    label="fuelType"
                    onChange={handleChange}
                  >
                    <MenuItem value="Petrol">Petrol</MenuItem>
                    <MenuItem value="Diesel">Diesel</MenuItem>
                    <MenuItem value="CNG">CNG</MenuItem>
                    <MenuItem value="LPG">LPG</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </CardContent>
            <CardContent>
              <Typography variant="h5" component="div">
                RC Image:
              </Typography>
              <label htmlFor="rcImage">
                <Input
                  accept="image/*"
                  id="rcImage"
                  multiple
                  type="file"
                  name="rcImage"
                  onChange={handleImageChange}
                />
                <Button variant="contained" component="span">
                  Upload Image
                </Button>
              </label>
            </CardContent>
            <CardContent>
              <Typography variant="h5" component="div">
                RC Number:
              </Typography>
              <TextField
                label="RC Number"
                name="rcNumber"
                type="text"
                variant="standard"
                onChange={handleChange}
                style={{ width: "60%" }}
              />
            </CardContent>
            <CardContent>
              <Typography variant="h5" component="div">
                PUC Image:
              </Typography>
              <label htmlFor="pucImage">
                <Input
                  accept="image/*"
                  id="pucImage"
                  multiple
                  type="file"
                  name="pucImage"
                  onChange={handleImageChange}
                />
                <Button variant="contained" component="span">
                  Upload Image
                </Button>
              </label>
            </CardContent>
            <CardContent>
              <Typography variant="h5" component="div">
                Price Per Day:
              </Typography>
              <TextField
                label="Price Per Day"
                name="priceperday"
                type="text"
                variant="standard"
                onChange={handleChange}
                style={{ width: "60%" }}
              />
            </CardContent>
            <CardContent>
              <Typography variant="h5" component="div">
                Insurance Image:
              </Typography>
              <label htmlFor="insuranceImage">
                <Input
                  accept="image/*"
                  id="insuranceImage"
                  multiple
                  type="file"
                  name="insuranceImage"
                  onChange={handleImageChange}
                />
                <Button variant="contained" component="span">
                  Upload Image
                </Button>
              </label>
            </CardContent>
          </Grid>
          <Grid
            xs={12}
            md={12}
            container
            display="flex"
            justifyContent="center"
          >
            <CardActions>
              <Button type="submit" variant="contained" size="large">
                Add Vehicle
              </Button>
            </CardActions>
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
};

export default AddVehicle;
