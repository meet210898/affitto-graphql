import React from 'react'
import Typography from "@mui/material/Typography";
import { Button, TextField, IconButton } from "@mui/material";
import { Box, Card, CardActions, CardContent } from '@mui/material'
import { styled } from "@mui/material/styles";
import { PhotoCamera } from '@mui/icons-material';

const AddState = () => {
    const Input = styled("input")({
        // display: "none",
    });

    const [stateData, setStateData] = React.useState({
        stateName: null,
        stateImage: "",
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
        console.log(name, "e.target");
        console.log('files',files)
        setStateData({
            ...stateData,
            [name]: files[0],
        });
    };

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
    )
}

export default AddState