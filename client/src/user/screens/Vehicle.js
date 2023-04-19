import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { useTranslation } from "react-i18next";
import {
  GET_ALL_COMPANIES,
  GET_ALL_VEHICLES,
} from "../../gqloperations/queries";

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

const { REACT_APP_BASE_URL } = process.env;
const Vehicle = () => {
  const navigate = useNavigate();
  const { t } = useTranslation("common");

  const companiesInfo = useQuery(GET_ALL_COMPANIES);
  const vehiclesInfo = useQuery(GET_ALL_VEHICLES);

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
                {t("VEHICLE_TYPE.VEHICLE")}
              </ListSubheader>
            </ImageListItem>
          </ImageList>
          <Grid container display="flex">
            {vehiclesInfo?.data?.vehicle.slice(0, 6).map((row) => (
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
                      <span>
                        {row.seats} {t("VEHICLE_TYPE.SEATS")}
                      </span>
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
                    <b>
                      {t("VEHICLE_TYPE.RS")} {row.priceperday}{" "}
                      {t("VEHICLE_TYPE.PRICE_PER_DAY")}
                    </b>
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
                        {t("VEHICLE_TYPE.BOOK")}
                      </Button>
                      <Button
                        style={{ margin: "5px" }}
                        variant="contained"
                        color="secondary"
                        onClick={() => {
                          detailHandler(row._id);
                        }}
                      >
                        {t("VEHICLE_TYPE.DETAILS")}
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

export default Vehicle;
