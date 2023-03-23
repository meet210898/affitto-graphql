import React, { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { UPDATE_STATES, UPLOAD_FILE } from "../../../gqloperations/mutation";
import { GET_ALL_STATES } from "../../../gqloperations/queries";

import { Box, Typography, Modal } from "@mui/material";
import { Button, TextField, IconButton } from "@mui/material";
import PhotoCamera from "@mui/icons-material/CameraAlt";
import { styled } from "@mui/material/styles";

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
  // display: "none",
});

const ModalCall = ({ open, setOpen, editData }) => {
  const [selectedImage, setSelectedImage] = useState(
    editData?.stateImage || ""
  );
  const [stateData, setStateData] = useState({
    stateName: null,
    stateImage: "",
  });

  useEffect(() => {
    if (editData) {
      setStateData(editData);
    }
  }, [editData]);

  const [uploadFile] = useMutation(UPLOAD_FILE, {
    onCompleted: (data) => console.log("data==", data),
    onError: (err) => console.log("error in upload file", err),
  });

  const [updateState] = useMutation(UPDATE_STATES, {
    onCompleted: (data) => console.log("state data==", data),
    onError: (err) => console.log("error in state", err),
    refetchQueries: [GET_ALL_STATES, "states"],
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    if (stateData.stateImage !== editData.stateImage) {
      uploadFile({ variables: { file: selectedImage } });
    }
    updateState({
      variables: {
        stateUpdate: {
          _id: editData._id,
          stateName: stateData.stateName,
          stateImage: stateData.stateImage,
        },
      },
    });

    handleClose();
  };

  const handleClose = () => setOpen(false);

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
    setSelectedImage(files[0]);
  };

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
              label="State Name"
              name="stateName"
              type="text"
              variant="standard"
              defaultValue={editData && editData.stateName}
              onChange={handleChange}
            />
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <img
              src={
                selectedImage
                  ? URL.createObjectURL(selectedImage)
                  : `${REACT_APP_BASE_URL}/${editData && editData.stateImage}`
              }
              alt="state"
              height="120"
              width="120"
              style={{ borderRadius: "100%" }}
            />
            <label htmlFor="stateImage">
              <Input
                accept="image/*"
                id="stateImage"
                name="stateImage"
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
            <Button
              style={{
                marginRight: "8px",
                background: "#343E9A",
              }}
              type="submit"
              variant="contained"
            >
              Update
            </Button>
            <Button
              type="submit"
              onClick={handleClose}
              variant="contained"
              style={{ color: "black", background: "#FCE3E7" }}
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
