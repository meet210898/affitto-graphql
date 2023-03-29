import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Topbar from "../components/Topbar";
import Footer from "../components/footer";

import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ListSubheader from "@mui/material/ListSubheader";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

import carSeat from "../public/image/svgs/car-seat.webp";
import carGear from "../public/image/svgs/car-gear.webp";
import carFuel from "../public/image/svgs/car-fuel.webp";
import { useMutation } from "@apollo/client";
import { VEHICLES_BY_COMPANY } from "../../gqloperations/mutation";
import { GET_ALL_VEHICLES } from "../../gqloperations/queries";

const { REACT_APP_BASE_URL } = process.env;
const VehicleByCompany = () => {
  const navigate = useNavigate();
  const [vehicleByCompanyData, setVehicleByCompanyData] = useState([]);

  const { companyId } = useParams("id");

  const [vehicleByCompany] = useMutation(VEHICLES_BY_COMPANY, {
    onCompleted: (data) => setVehicleByCompanyData(data),
    onError: (err) => console.log("error in vehicle by company", err),
    refetchQueries: [GET_ALL_VEHICLES, "vehicle"],
  });

  useEffect(() => {
    if (companyId) {
      vehicleByCompany({
        variables: {
          id: companyId,
        },
      });
    }
  }, [companyId]);
  console.log("vehicleByCompanyData", vehicleByCompanyData);
  const detailHandler = (vehicleId) => {
    navigate(`/user/VehicleDetails/${vehicleId}`);
  };

  const bookHandler = (vehicleId) => {
    navigate(`/user/Booking/${vehicleId}`);
  };

  return (
    <>
      <Topbar />
      <Grid container>
        <Grid xs={1}></Grid>
        <Grid xs={10}>
          <ImageList>
            <ImageListItem key="Subheader">
              <ListSubheader component="div" style={{ background: "none" }}>
                Vehicles
              </ListSubheader>
            </ImageListItem>
          </ImageList>
          <Grid container display="flex">
            {vehicleByCompanyData?.vehicle?.map((row) => (
              <Grid md={4} style={{ width: "100%" }}>
                <Card
                  sx={{
                    maxWidth: "400px",
                    height: "auto",
                    width: "auto",
                    margin: "20px",
                    padding: "20px",
                    boxShadow: "2px 1px 9px 2px #888888",
                  }}
                >
                  <CardContent style={{ padding: "0px" }}>
                    <center>
                      <h3 style={{ margin: "0px" }}>
                        {/* {companiesInfo?.map((data) => {
                          return data._id === row.companyId
                            ? data.companyName
                            : "";
                        })}{" "} */}
                        {row.companyId.companyName} {row.vehicleName}
                      </h3>
                    </center>
                  </CardContent>
                  <CardMedia
                    component="img"
                    height="180"
                    image={`${REACT_APP_BASE_URL}/${row.vehicleImage}`}
                    alt="company"
                    style={{ marginTop: "15px" }}
                  />
                  <Grid
                    container
                    direction="row"
                    justifyContent="space-around"
                    alignItems="center"
                    marginTop="15px"
                  >
                    <Grid display="flex" xs={4}>
                      <img
                        src={carFuel}
                        height="20px"
                        width="20px"
                        alt="gear"
                      />
                      <span>{row.fuelType}</span>
                    </Grid>
                    <Grid display="flex" xs={4}>
                      <img
                        src={carGear}
                        height="15px"
                        width="15px"
                        style={{ marginLeft: "10px" }}
                        alt="gear"
                      />{" "}
                      <span>{row.transmission}</span>
                    </Grid>
                    <Grid display="flex" xs={4}>
                      <img
                        src={carSeat}
                        height="15px"
                        width="15px"
                        style={{ marginLeft: "10px" }}
                        alt="seat"
                      />
                      <span>{row.seats} seats</span>
                    </Grid>
                  </Grid>

                  <Grid
                    xs={12}
                    style={{
                      padding: "0px",
                      marginTop: "15px",
                      fontSize: "20px",
                      borderTop: "1px solid #a2a2a3",
                      justifyContent: "center",
                      display: "flex",
                    }}
                  >
                    <b>Rs. {row.priceperday} Price/Day</b>
                  </Grid>

                  <Grid container marginTop="15px">
                    <Grid xs={12} display="flex" justifyContent="center">
                      <Button
                        style={{ margin: "5px" }}
                        variant="contained"
                        onClick={() => {
                          bookHandler(row._id);
                        }}
                      >
                        Book
                      </Button>
                      <Button
                        style={{ margin: "5px" }}
                        variant="contained"
                        color="secondary"
                        onClick={() => {
                          detailHandler(row._id);
                        }}
                      >
                        Details
                      </Button>
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid xs={1}></Grid>
      </Grid>
      <Footer />
    </>
  );
};

export default VehicleByCompany;
