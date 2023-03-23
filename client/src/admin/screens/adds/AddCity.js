import React, { useState } from "react";
import { GET_ALL_CITIES, GET_ALL_STATES } from "../../../gqloperations/queries";
import { CREATE_CITIES, UPLOAD_FILE } from "../../../gqloperations/mutation";
import { useMutation, useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";

import Typography from "@mui/material/Typography";
import {
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { Box, Card, CardActions, CardContent } from "@mui/material";
import { styled } from "@mui/material/styles";

const AddCity = () => {
  const navigate = useNavigate();

  const Input = styled("input")({
    display: "none",
  });

  const [cityData, setCityData] = useState({
    stateId: null,
    cityName: null,
    cityImage: "",
  });

  const [createCity] = useMutation(CREATE_CITIES, {
    onCompleted: () => navigate("/Admin/viewCity"),
    onError: (err) => console.log("error in state", err),
    refetchQueries: [GET_ALL_CITIES, "city"],
  });

  const [uploadFile] = useMutation(UPLOAD_FILE, {
    onCompleted: (data) => console.log("data==", data),
    onError: (err) => console.log("error in upload file", err),
  });

  const { error, data, loading } = useQuery(GET_ALL_STATES);
  if (loading) return <h1>Loading...</h1>;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCityData({
      ...cityData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const { name, files } = e.target;
    setCityData({
      ...cityData,
      [name]: files[0].name,
    });
    const file = files[0];
    if (!file) return;
    uploadFile({ variables: { file } });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    createCity({
      variables: {
        cityNew: cityData,
      },
    });
  };

  return (
    <Box
      component="form"
      noValidate
      onSubmit={handleSubmit}
      sx={{
        width: 400,
        margin: "0px",
        padding: "20px",
        boxShadow: "2px 1px 9px 2px #888888",
        background: "white",
      }}
    >
      {error && <div className="red card-panel">{error.message}</div>}
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h5" component="div">
            State:
          </Typography>
          <Box>
            <FormControl fullWidth>
              <InputLabel id="stateName">State</InputLabel>

              <Select
                labelId="stateName"
                id="stateId"
                name="stateId"
                label="City"
                value={cityData.stateId}
                onChange={handleChange}
                required
              >
                {data?.state.map((data) => (
                  <MenuItem value={data._id}>{data.stateName}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </CardContent>
        <CardContent>
          <Typography variant="h5" component="div">
            City Name:
          </Typography>
          <TextField
            label="City Name"
            name="cityName"
            type="text"
            variant="standard"
            value={cityData.cityName}
            onChange={handleChange}
          />
        </CardContent>
        <CardContent>
          <Typography variant="h5" component="div">
            City Image:
          </Typography>
          <label htmlFor="cityImage">
            <Input
              accept="image/*"
              id="cityImage"
              multiple
              type="file"
              name="cityImage"
              onChange={handleImageChange}
            />
            <Button variant="contained" component="span">
              Upload Image
            </Button>
          </label>
        </CardContent>
        <CardActions>
          <Button type="submit" variant="contained" size="medium">
            Add City
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};

export default AddCity;
