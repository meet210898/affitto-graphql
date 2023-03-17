import React from 'react'
import { GET_ALL_VEHICLETYPES } from '../../../gqloperations/queries'
import { useQuery } from '@apollo/client';
import Typography from "@mui/material/Typography";
import { Button, TextField, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { Box, Card, CardActions, CardContent } from '@mui/material'
import { styled } from '@mui/material/styles';

const AddCompany = () => {
    const Input = styled("input")({
        display: "none",
    });

    const { error, data, loading } = useQuery(GET_ALL_VEHICLETYPES)
    if (loading) return <h1>Loading...</h1>

    return (
        <Box
            component="form"
            noValidate
            //   onSubmit={handleSubmit}
            sx={{
                maxWidth: 300,
                margin: "0px",
                padding: "20px",
                boxShadow: "2px 1px 9px 2px #888888",
                background: "white",
            }}
        >
            {
                error && <div className="red card-panel">{error.message}</div>
            }
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
                            // value={companyData.typeId}
                            // onChange={handleChange}
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
                    // value={companyData.cityName}
                    // onChange={handleChange}
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
                        //   onChange={handleImageChange}
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
    )
}

export default AddCompany