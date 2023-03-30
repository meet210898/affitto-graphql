import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { UPLOAD_FILE, CREATE_STATES } from "../../../gqloperations/mutation";
import { GET_ALL_STATES } from "../../../gqloperations/queries";
import { useNavigate } from "react-router-dom";

import Typography from "@mui/material/Typography";
import { Button, TextField, IconButton } from "@mui/material";
import { Box, Card, CardActions, CardContent } from "@mui/material";
import { styled } from "@mui/material/styles";
import { PhotoCamera } from "@mui/icons-material";

const AddState = () => {
  const navigate = useNavigate();

  const Input = styled("input")({
    // display: "none",
  });

  const [stateData, setStateData] = useState({
    stateName: null,
    stateImage: "",
  });

  const [uploadFile] = useMutation(UPLOAD_FILE, {
    onCompleted: (data) => console.log("data==", data),
    onError: (err) => console.log("error in upload file", err),
  });

  const [createState] = useMutation(CREATE_STATES, {
    onCompleted: () => navigate("/Admin/viewState"),
    onError: (err) => console.log("error in state", err),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStateData({
      ...stateData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const { name, files } = e.target;
    setStateData({
      ...stateData,
      [name]: files[0].name,
    });
    const file = files[0];
    if (!file) return;
    uploadFile({ variables: { file } });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    createState({
      variables: {
        stateNew: stateData,
      },
      update(cache, { data: { states } }) {
        const recruit = cache.readQuery({
          query: GET_ALL_STATES,
        });
        cache.writeQuery({
          query: GET_ALL_STATES,
          data: {
            state: [states, ...recruit.state],
          },
        });
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
            State Name:
          </Typography>
          <TextField
            label="State Name"
            name="stateName"
            type="text"
            variant="standard"
            // value={stateData.stateName}
            onChange={handleChange}
          />
        </CardContent>
        <CardContent>
          <Typography variant="h5" component="div">
            State Image:
          </Typography>
          <label htmlFor="stateImage">
            <Input
              accept="image/*"
              id="stateImage"
              name="stateImage"
              onChange={handleImageChange}
              style={{ width: "80%" }}
              type="file"
            />
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="span"
            >
              <PhotoCamera />
            </IconButton>
          </label>
        </CardContent>
        <CardActions>
          <Button type="submit" variant="contained" size="medium">
            Add State
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};

export default AddState;
