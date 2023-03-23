import React, { useEffect, useState } from "react";
import { Box, Typography, Modal, FormControl } from "@mui/material";
import {
  Button,
  TextField,
  IconButton,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import PhotoCamera from "@mui/icons-material/CameraAlt";
import { styled } from "@mui/material/styles";
import { useMutation, useQuery } from "@apollo/client";
import { GET_ALL_CITIES, GET_ALL_STATES } from "../../../gqloperations/queries";
import { UPDATE_CITIES, UPLOAD_FILE } from "../../../gqloperations/mutation";

const { REACT_APP_BASE_URL } = process.env;
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Input = styled("input")({
  display: "none",
});

const ModalCall = ({ open, setOpen, editData }) => {
  const [selectedImage, setSelectedImage] = useState(editData?.cityImage || "");
  const [cityData, setCityData] = useState({
    stateId: null,
    cityName: null,
    cityImage: "",
  });

  useEffect(() => {
    if (editData) {
      setCityData(editData);
    }
  }, [editData]);

  const [uploadFile] = useMutation(UPLOAD_FILE, {
    onCompleted: (data) => console.log("data==", data),
    onError: (err) => console.log("error in upload file", err),
  });

  const [updateCity] = useMutation(UPDATE_CITIES, {
    onCompleted: (data) => console.log("city data==", data),
    onError: (err) => console.log("error in city", err),
    refetchQueries: [GET_ALL_CITIES, "city"],
  });

  const { error, data, loading } = useQuery(GET_ALL_STATES);
  if (loading) return <h1>Loading...</h1>;

  const handleSubmit = (event) => {
    event.preventDefault();

    if (cityData.cityImage !== editData.cityImage) {
      uploadFile({ variables: { file: selectedImage } });
    }
    updateCity({
      variables: {
        cityUpdate: {
          _id: editData._id,
          stateId:
            cityData.stateId !== editData.stateId
              ? cityData.stateId
              : cityData.stateId._id,
          cityName: cityData.cityName,
          cityImage: cityData.cityImage,
        },
      },
    });

    handleClose();
  };

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
    setSelectedImage(files[0]);
  };

  const handleClose = () => setOpen(false);
  return (
    <Modal
      open={open}
      onClose={handleClose}
      onSubmit={handleSubmit}
      component="form"
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        {error && <div className="red card-panel">{error.message}</div>}
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="stateName">State</InputLabel>
            <Select
              labelId="stateName"
              id="stateId"
              name="stateId"
              label="City"
              defaultValue={editData && editData.stateId._id}
              onChange={handleChange}
            >
              {data?.state?.map((data) => (
                <MenuItem value={data._id}>{data.stateName}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Typography id="modal-modal-title" variant="h6" component="h2">
          <TextField
            label="City Name"
            name="cityName"
            type="text"
            variant="standard"
            onChange={handleChange}
            defaultValue={editData && editData.cityName}
          />
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <img
            src={
              selectedImage
                ? URL.createObjectURL(selectedImage)
                : `${REACT_APP_BASE_URL}/${editData && editData.cityImage}`
            }
            alt="city"
            height="120"
            width="120"
            style={{ borderRadius: "100%" }}
          />
          <label htmlFor="cityImage">
            <Input
              accept="image/*"
              id="cityImage"
              name="cityImage"
              type="file"
              onChange={handleImageChange}
            />
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="span"
            >
              <PhotoCamera />
            </IconButton>
          </label>
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <Button type="submit" variant="contained" size="medium">
            Update
          </Button>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Button
            type="submit"
            onClick={handleClose}
            variant="contained"
            size="medium"
          >
            Close
          </Button>
        </Typography>
      </Box>
    </Modal>
  );
};

export default ModalCall;
