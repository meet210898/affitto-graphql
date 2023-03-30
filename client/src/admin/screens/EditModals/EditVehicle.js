import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import {
  GET_ALL_COMPANIES,
  GET_ALL_VEHICLES,
  GET_ALL_VEHICLETYPES,
} from "../../../gqloperations/queries";
import { UPDATE_VEHICLES, UPLOAD_FILE } from "../../../gqloperations/mutation";

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

const { REACT_APP_BASE_URL } = process.env;
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  height: 500,
  overflow: "scroll",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Input = styled("input")({
  display: "none",
});

const ModalCall = ({ open, setOpen, editData }) => {
  const [vehicleData, setVehicleData] = useState({
    typeId: "",
    companyId: "",
    vehicleName: "",
    vehicleImage: "",
    description: "",
    seats: "",
    door: "",
    ac: "",
    rcImage: "",
    rcNumber: "",
    pucImage: "",
    priceperday: "",
    insuranceImage: "",
  });
  const [selectedImage, setSelectedImage] = useState({
    vehicleImage: editData?.vehicleImage || "",
    rcImage: editData?.rcImage || "",
    pucImage: editData?.pucImage || "",
    insuranceImage: editData?.insuranceImage || "",
  });

  const vehicleTypeInfo = useQuery(GET_ALL_VEHICLETYPES);
  const companiesInfo = useQuery(GET_ALL_COMPANIES);

  useEffect(() => {
    if (editData) {
      setVehicleData(editData);
    }
  }, [editData]);

  const [uploadFile] = useMutation(UPLOAD_FILE, {
    onCompleted: (data) => console.log("data==", data),
    onError: (err) => console.log("error in upload file", err),
  });

  const [updateVehicle] = useMutation(UPDATE_VEHICLES, {
    onCompleted: (data) => console.log("vehicle data==", data),
    onError: (err) => console.log("error in vehicle", err),
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    delete vehicleData.__typename;
    if (vehicleData.vehicleImage !== editData.vehicleImage) {
      uploadFile({ variables: { file: selectedImage.vehicleImage } });
    }
    if (vehicleData.rcImage !== editData.rcImage) {
      uploadFile({ variables: { file: selectedImage.rcImage } });
    }
    if (vehicleData.pucImage !== editData.pucImage) {
      uploadFile({ variables: { file: selectedImage.pucImage } });
    }
    if (vehicleData.insuranceImage !== editData.insuranceImage) {
      uploadFile({ variables: { file: selectedImage.insuranceImage } });
    }

    updateVehicle({
      variables: {
        vehicleUpdate: {
          ...vehicleData,
          companyId:
            vehicleData.companyId !== editData.companyId
              ? vehicleData.companyId
              : vehicleData.companyId._id,
          typeId:
            vehicleData.typeId !== editData.typeId
              ? vehicleData.typeId
              : vehicleData.typeId._id,
          _id: editData._id,
        },
      },
      update(cache, { data: { vehicle } }) {
        const recruit = cache.readQuery({
          query: GET_ALL_VEHICLES,
        });
        let vehicleArr = [...recruit.vehicle];
        const updateFaqIndex = vehicleArr.findIndex(
          (data) => data._id === vehicle._id
        );
        vehicleArr.splice(updateFaqIndex, 1, vehicle);
        cache.writeQuery({
          query: GET_ALL_VEHICLES,
          data: {
            faq: [...vehicleArr],
          },
        });
      },
    });

    handleClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVehicleData({
      ...vehicleData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const { name, files } = e.target;
    setVehicleData({
      ...vehicleData,
      [name]: files[0].name,
    });
    setSelectedImage({
      ...selectedImage,
      [name]: files[0],
    });
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
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-evenly",
          }}
        >
          <div>
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="typeName">Vehicle Type</InputLabel>

                <Select
                  labelId="typeName"
                  id="typeId"
                  name="typeId"
                  label="Vehicle Type"
                  defaultValue={editData && editData.typeId._id}
                  onChange={handleChange}
                >
                  {vehicleTypeInfo?.data?.vehicleType?.map((data) => (
                    <MenuItem value={data._id}>{data.typeName}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="companyName">Company</InputLabel>

                <Select
                  labelId="companyName"
                  id="companyId"
                  name="companyId"
                  label="Company"
                  onChange={handleChange}
                  defaultValue={editData && editData.companyId._id}
                >
                  {companiesInfo?.data?.company
                    ?.filter((item) =>
                      editData?.typeId !== vehicleData.typeId
                        ? vehicleData?.typeId === item.typeId._id
                        : vehicleData?.typeId._id === item.typeId._id
                    )
                    .map((data) => {
                      return (
                        <MenuItem value={data._id}>{data.companyName}</MenuItem>
                      );
                    })}
                </Select>
              </FormControl>
            </Box>

            <Typography id="modal-modal-title" variant="h6" component="h2">
              <TextField
                label="Vehicle Name"
                name="vehicleName"
                type="text"
                variant="standard"
                defaultValue={editData && editData.vehicleName}
                onChange={handleChange}
              />
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <img
                src={
                  selectedImage.vehicleImage
                    ? URL.createObjectURL(selectedImage.vehicleImage)
                    : `${REACT_APP_BASE_URL}/${
                        editData && editData.vehicleImage
                      }`
                }
                alt="vehicle"
                height="120"
                width="120"
                style={{ borderRadius: "100%" }}
              />
              <label htmlFor="vehicleImage">
                <Input
                  accept="image/*"
                  id="vehicleImage"
                  name="vehicleImage"
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
            <Typography id="modal-modal-title" variant="h6" component="h2">
              <TextField
                label="Description"
                name="description"
                type="text"
                variant="standard"
                onChange={handleChange}
                defaultValue={editData && editData.description}
              />
            </Typography>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              <TextField
                label="Seats"
                name="seats"
                type="text"
                variant="standard"
                onChange={handleChange}
                defaultValue={editData && editData.seats}
              />
            </Typography>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              <TextField
                label="Door"
                name="door"
                type="text"
                variant="standard"
                onChange={handleChange}
                defaultValue={editData && editData.door}
              />
            </Typography>
          </div>
          <div>
            <Typography variant="h5" component="div">
              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <InputLabel id="ac">AC/Non-AC</InputLabel>

                  <Select
                    labelId="ac"
                    id="ac"
                    name="ac"
                    label="ac"
                    defaultValue={editData && editData.ac}
                    onChange={handleChange}
                  >
                    <MenuItem value="true">AC</MenuItem>
                    <MenuItem value="false">Non-AC</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <img
                src={
                  selectedImage.rcImage
                    ? URL.createObjectURL(selectedImage.rcImage)
                    : `${REACT_APP_BASE_URL}/${editData && editData.rcImage}`
                }
                alt="rc"
                height="120"
                width="120"
                style={{ borderRadius: "100%" }}
              />
              <label htmlFor="rcImage">
                <Input
                  accept="image/*"
                  id="rcImage"
                  name="rcImage"
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
            <Typography id="modal-modal-title" variant="h6" component="h2">
              <TextField
                label="RC Number"
                name="rcNumber"
                type="text"
                variant="standard"
                onChange={handleChange}
                defaultValue={editData && editData.rcNumber}
              />
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <img
                src={
                  selectedImage.pucImage
                    ? URL.createObjectURL(selectedImage.pucImage)
                    : `${REACT_APP_BASE_URL}/${editData && editData.pucImage}`
                }
                alt="puc"
                height="120"
                width="120"
                style={{ borderRadius: "100%" }}
              />
              <label htmlFor="pucImage">
                <Input
                  accept="image/*"
                  id="pucImage"
                  name="pucImage"
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
            <Typography id="modal-modal-title" variant="h6" component="h2">
              <TextField
                label="Price/Day"
                name="priceperday"
                type="text"
                variant="standard"
                onChange={handleChange}
                defaultValue={editData && editData.priceperday}
              />
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <img
                src={
                  selectedImage.insuranceImage
                    ? URL.createObjectURL(selectedImage.insuranceImage)
                    : `${REACT_APP_BASE_URL}/${
                        editData && editData.insuranceImage
                      }`
                }
                alt="city"
                height="120"
                width="120"
                style={{ borderRadius: "100%" }}
              />
              <label htmlFor="insuranceImage">
                <Input
                  accept="image/*"
                  id="insuranceImage"
                  name="insuranceImage"
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
          </div>
        </div>
        <div>
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
        </div>
      </Box>
    </Modal>
  );
};

export default ModalCall;
