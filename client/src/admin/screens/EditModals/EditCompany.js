import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { UPDATE_COMPANIES, UPLOAD_FILE } from "../../../gqloperations/mutation";
import {
  GET_ALL_COMPANIES,
  GET_ALL_VEHICLETYPES,
} from "../../../gqloperations/queries";

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
  const [selectedImage, setSelectedImage] = useState(
    editData?.companyLogo || ""
  );
  const [companyData, setCompanyData] = useState({
    typeId: null,
    companyName: null,
    companyLogo: "",
  });

  useEffect(() => {
    if (editData) {
      setCompanyData(editData);
    }
  }, [editData]);

  const [uploadFile] = useMutation(UPLOAD_FILE, {
    onCompleted: (data) => console.log("data==", data),
    onError: (err) => console.log("error in upload file", err),
  });

  const [updateCompany] = useMutation(UPDATE_COMPANIES, {
    onCompleted: (data) => console.log("company data==", data),
    onError: (err) => console.log("error in company", err),
    refetchQueries: [GET_ALL_COMPANIES, "company"],
  });

  const { error, data, loading } = useQuery(GET_ALL_VEHICLETYPES);
  if (loading) return <h1>Loading...</h1>;

  const handleSubmit = (event) => {
    event.preventDefault();

    if (companyData.companyLogo !== editData.companyLogo) {
      uploadFile({ variables: { file: selectedImage } });
    }
    updateCompany({
      variables: {
        companyUpdate: {
          _id: editData._id,
          typeId:
            companyData.typeId !== editData.typeId
              ? companyData.typeId
              : companyData.typeId._id,
          companyName: companyData.companyName,
          companyLogo: companyData.companyLogo,
        },
      },
    });

    handleClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCompanyData({
      ...companyData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const { name, files } = e.target;
    setCompanyData({
      ...companyData,
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
            <InputLabel id="typeName">Vehicle Type</InputLabel>
            <Select
              labelId="typeName"
              id="typeId"
              name="typeId"
              label="Vehicle Type"
              defaultValue={editData && editData.typeId._id}
              onChange={handleChange}
            >
              {data?.vehicleType?.map((data) => (
                <MenuItem value={data._id}>{data.typeName}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Typography id="modal-modal-title" variant="h6" component="h2">
          <TextField
            label="Company Name"
            name="companyName"
            type="text"
            variant="standard"
            onChange={handleChange}
            defaultValue={editData && editData.companyName}
          />
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <img
            src={
              selectedImage
                ? URL.createObjectURL(selectedImage)
                : `${REACT_APP_BASE_URL}/${editData && editData.companyLogo}`
            }
            alt="city"
            height="120"
            width="120"
            style={{ borderRadius: "100%" }}
          />
          <label htmlFor="companyLogo">
            <Input
              accept="image/*"
              id="companyLogo"
              name="companyLogo"
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
