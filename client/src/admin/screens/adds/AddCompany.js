import React from "react";
import { GET_ALL_VEHICLETYPES } from "../../../gqloperations/queries";
import { CREATE_COMPANIES, UPLOAD_FILE } from "../../../gqloperations/mutation";
import { useMutation, useQuery } from "@apollo/client";
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

const AddCompany = () => {
  const Input = styled("input")({
    display: "none",
  });

  const [companyData, setCompanyData] = React.useState({
    typeId: "",
    companyName: null,
    companyLogo: "",
  });

  const [createCompany] = useMutation(CREATE_COMPANIES, {
    onCompleted: (data) => console.log("company data==", data),
    onError: (err) => console.log("error in company", err),
  });

  const [uploadFile] = useMutation(UPLOAD_FILE, {
    onCompleted: (data) => console.log("data==", data),
    onError: (err) => console.log("error in upload file", err),
  });

  const { error, data, loading } = useQuery(GET_ALL_VEHICLETYPES);
  if (loading) return <h1>Loading...</h1>;

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
    const file = files[0];
    if (!file) return;
    uploadFile({ variables: { file } });
  };

  const handleSubmit = () => {
    createCompany({
      variables: {
        companyNew: companyData,
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
      {error && <div className="red card-panel">{error.message}</div>}
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h5" component="div">
            Vehicle Type:
          </Typography>
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="vehicleTypeName">Vehicle Type</InputLabel>

              <Select
                labelId="vehicleTypeName"
                id="typeId"
                name="typeId"
                label="Vehicle Type"
                value={companyData.typeId}
                onChange={handleChange}
              >
                {data?.vehicleType?.map((data) => (
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
          <TextField
            label="Company Name"
            name="companyName"
            type="text"
            variant="standard"
            value={companyData.cityName}
            onChange={handleChange}
          />
        </CardContent>
        <CardContent>
          <Typography variant="h5" component="div">
            Company Logo:
          </Typography>
          <label htmlFor="companyLogo">
            <Input
              accept="image/*"
              id="companyLogo"
              multiple
              type="file"
              name="companyLogo"
              onChange={handleImageChange}
            />
            <Button variant="contained" component="span">
              Upload Image
            </Button>
          </label>
        </CardContent>
        <CardActions>
          <Button type="submit" variant="contained" size="medium">
            Add Company
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};

export default AddCompany;
