import React from 'react'
import Typography from "@mui/material/Typography";
import { Button, TextField } from "@mui/material";
import { Box, Card, CardActions, CardContent } from '@mui/material'
import { styled } from '@mui/material/styles';

const AddVehicleType = () => {
    const Input = styled("input")({
        display: "none",
    });
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
            <Card variant="outlined">
                <CardContent>
                    <Typography variant="h5" component="div">
                        Vehicle Type Name:
                    </Typography>
                    <TextField
                        label="Type Name"
                        name="typeName"
                        type="text"
                        variant="standard"
                        // value={vehicleTypeData.typeName}
                    // onChange={handleChange}
                    />
                </CardContent>
                <CardContent>
                    <Typography variant="h5" component="div">
                        Vehicle Type Image:
                    </Typography>
                    <label htmlFor="typeImage">
                        <Input
                            accept="image/*"
                            id="typeImage"
                            multiple
                            type="file"
                            name="typeImage"
                        //   onChange={handleImageChange}
                        />
                        <Button variant="contained" component="span">
                            Upload Image
                        </Button>
                    </label>
                </CardContent>
                <CardActions>
                    <Button type="submit" variant="contained" size="medium">
                        Add Vehicle Type
                    </Button>
                </CardActions>
            </Card>
        </Box>
    )
}

export default AddVehicleType