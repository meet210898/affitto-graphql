import React, { useEffect, useState } from "react";
import { Box, Typography, Modal } from "@mui/material";
import { Button, TextField, IconButton } from "@mui/material";
import PhotoCamera from "@mui/icons-material/CameraAlt";
import { styled } from "@mui/material/styles";
import {
  UPDATE_VEHICLE_TYPES,
  UPLOAD_FILE,
} from "../../../gqloperations/mutation";
import { useMutation } from "@apollo/client";
import { GET_ALL_VEHICLETYPES } from "../../../gqloperations/queries";

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
  const [selectedImage, setSelectedImage] = useState(editData?.typeImage || "");
  const [vehicleTypeData, setVehicleTypeData] = useState({
    typeName: null,
    typeImage: "",
  });

  useEffect(() => {
    if (editData) {
      setVehicleTypeData(editData);
    }
  }, [editData]);

  const [uploadFile] = useMutation(UPLOAD_FILE, {
    onCompleted: (data) => console.log("upload file data==", data),
    onError: (err) => console.log("error in upload file", err),
  });

  const [updateVehicleType] = useMutation(UPDATE_VEHICLE_TYPES, {
    onCompleted: (data) => console.log("vehicle type data==", data),
    onError: (err) => console.log("error in vehicle type", err),
    refetchQueries: [GET_ALL_VEHICLETYPES, "vehicleTypes"],
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    if (vehicleTypeData.typeImage !== editData.typeImage) {
      uploadFile({ variables: { file: selectedImage } });
    }
    updateVehicleType({
      variables: {
        vehicleTypeUpdate: {
          _id: editData._id,
          typeName: vehicleTypeData.typeName,
          typeImage: vehicleTypeData.typeImage,
        },
      },
    });

    handleClose();
  };

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
    setSelectedImage(files[0]);
  };

  const handleClose = () => setOpen(false);
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        onSubmit={handleSubmit}
        component="form"
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <TextField
              label="Type Name"
              name="typeName"
              type="text"
              variant="standard"
              onChange={handleChange}
              defaultValue={editData && editData.typeName}
            />
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <img
              src={
                selectedImage
                  ? URL.createObjectURL(selectedImage)
                  : `${REACT_APP_BASE_URL}/${editData && editData.typeImage}`
              }
              alt="city"
              height="120"
              width="120"
              style={{ borderRadius: "100%" }}
            />
            <label htmlFor="typeImage">
              <Input
                accept="image/*"
                id="typeImage"
                name="typeImage"
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
    </div>
  );
};

export default ModalCall;
