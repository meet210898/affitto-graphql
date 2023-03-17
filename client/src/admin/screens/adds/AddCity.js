import React from 'react'
import { GET_ALL_STATES } from '../../../gqloperations/queries';
import { useQuery } from '@apollo/client';
import Typography from "@mui/material/Typography";
import { Button, TextField, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { Box, Card, CardActions, CardContent } from '@mui/material'
import { styled } from '@mui/material/styles';

const AddCity = () => {
    const Input = styled("input")({
        display: "none",
    });

    const { error, data, loading } = useQuery(GET_ALL_STATES)
    if (loading) return <h1>Loading...</h1>
    return (
        <Box
            component="form"
            noValidate
            // onSubmit={handleSubmit}
            sx={{
                width: 400,
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
                        State:
                    </Typography>
                    <Box>
                        <FormControl fullWidth>
                            <InputLabel id="stateName">State</InputLabel>

                            <Select
                                labelId="stateName"
                                id="stateId"
                                name="stateId"
                                label="City"
                                // value={cityData.stateId}
                                // onChange={handleChange}
                                required
                            >
                                {data?.state.map((data) => (
                                    <MenuItem value={data._id}>{data.stateName}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
                </CardContent>
                <CardContent>
                    <Typography variant="h5" component="div">
                        City Name:
                    </Typography>
                    <TextField
                        label="City Name"
                        name="cityName"
                        type="text"
                        variant="standard"
                    // value={cityData.cityName}
                    // onChange={handleChange}
                    />
                </CardContent>
                <CardContent>
                    <Typography variant="h5" component="div">
                        City Image:
                    </Typography>
                    <label htmlFor="cityImage">
                        <Input
                            accept="image/*"
                            id="cityImage"
                            multiple
                            type="file"
                            name="cityImage"
                        //   onChange={handleImageChange}
                        />
                        <Button variant="contained" component="span">
                            Upload Image
                        </Button>
                    </label>
                </CardContent>
                <CardActions>
                    <Button type="submit" variant="contained" size="medium">
                        Add City
                    </Button>
                </CardActions>
            </Card>
        </Box>
    )
}

export default AddCity