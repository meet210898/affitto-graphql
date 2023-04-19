import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate, useParams } from "react-router-dom";
import { useMutation } from "@apollo/client";
import moment from "moment";
import { VEHICLES_DETAILS } from "../../gqloperations/mutation";
import { GET_ALL_VEHICLES } from "../../gqloperations/queries";

import Topbar from "../components/Topbar";
import Footer from "../components/footer";

import TextField from "@mui/material/TextField";
import { Button, Grid } from "@mui/material";

import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDateTimePicker } from "@mui/x-date-pickers/StaticDateTimePicker";

const Booking = () => {
  const navigate = useNavigate();
  const { vehicleId } = useParams("id");

  const [startDate, setStartDate] = useState(moment(new Date()));
  const [endDate, setEndDate] = useState(moment(new Date()));
  const [vehicleData, setVehicleData] = useState();

  const [vehicleDetails] = useMutation(VEHICLES_DETAILS, {
    onCompleted: (data) => setVehicleData(data),
    onError: (err) => console.log("error in vehicle by company", err),
    refetchQueries: [GET_ALL_VEHICLES, "vehicle"],
  });

  useEffect(() => {
    if (vehicleId) {
      vehicleDetails({
        variables: {
          id: vehicleId,
        },
      });
    }
  }, [vehicleId]);

  const time_difference =
    moment(endDate).valueOf() - moment(startDate).valueOf();
  const days_difference = time_difference / (1000 * 60 * 60 * 24);

  let payableAmount = 0;
  if (payableAmount > 0 && payableAmount < 1) {
    payableAmount = vehicleData?.vehicle?.priceperday;
  } else {
    payableAmount =
      vehicleData?.vehicle?.priceperday * Math.trunc(days_difference);
  }

  const data = {
    vehicleId: vehicleId,
    startDate: moment(startDate).format("LL"),
    startTime: moment(startDate).format("LT"),
    endTime: moment(endDate).format("LT"),
    endDate: moment(endDate).format("LL"),
    payableAmount: payableAmount,
  };
  console.log("data", data);
  return (
    <>
      <Topbar />
      <Grid container md={12} justifyContent="center">
        <h1>Book your vehicle</h1>
      </Grid>
      <Grid container>
        <Grid xs={1} md={3}></Grid>
        <Grid xs={10} md={6}>
          <Grid container>
            <Grid xs={12}>
              <h2 style={{ padding: "0", margin: "0", marginTop: "15px" }}>
                {vehicleData?.vehicle?.companyId.companyName}
              </h2>
            </Grid>
          </Grid>
          <Grid container>
            <Grid xs={12}>
              <p
                style={{
                  padding: "0",
                  margin: "0",
                  marginTop: "5px",
                  fontSize: "16px",
                }}
              >
                {vehicleData?.vehicle?.vehicleName}
              </p>
            </Grid>
          </Grid>
          <Grid container>
            <Grid
              xs={12}
              md={5}
              display="block"
              style={{ marginTop: "10px", maxWidth: "100%" }}
            >
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <StaticDateTimePicker
                  orientation="landscape"
                  renderInput={(props) => (
                    <TextField
                      style={{ backgroundColor: "white" }}
                      {...props}
                    />
                  )}
                  label="Start Date"
                  style={{ margin: "10px" }}
                  minDate={moment(new Date())}
                  defaultValue={startDate}
                  onAccept={(date) => setStartDate(date)}
                  onClose={() => {
                    setStartDate(moment(new Date()));
                    setEndDate(moment(new Date()));
                  }}
                />
              </LocalizationProvider>
            </Grid>
            <Grid xs={12} md={1}></Grid>
            <Grid
              xs={12}
              md={5}
              display="block"
              style={{ marginTop: "10px", maxWidth: "100%" }}
            >
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <StaticDateTimePicker
                  orientation="landscape"
                  renderInput={(props) => (
                    <TextField
                      style={{ backgroundColor: "white" }}
                      {...props}
                    />
                  )}
                  label="End Date"
                  style={{ margin: "10px" }}
                  minDate={moment(new Date())}
                  defaultValue={endDate}
                  onAccept={(date) => setEndDate(date)}
                  onClose={() => {
                    setStartDate(moment(new Date()));
                    setEndDate(moment(new Date()));
                  }}
                />
              </LocalizationProvider>
            </Grid>
            <Grid
              xs={12}
              md={12}
              style={{ fontSize: "20px", marginTop: "10px" }}
            >
              {/* <b>Payable Amount:{payableAmount}</b> */}
              {moment(endDate).milliseconds() === 0 ? (
                <b>Payable Amount:{payableAmount}</b>
              ) : (
                ""
              )}
            </Grid>

            <Grid
              xs={12}
              md={12}
              justifyContent="center"
              style={{ marginTop: "10px" }}
            >
              {/* <NavLink
                style={{ textDecoration: "none" }}
                to={`/user/confirmBooking`}
                // state={{ data: data }}
                state={{ data: data }}
              > */}
              <Button
                variant="contained"
                onClick={() => {
                  console.log("in click", data);
                  navigate("/user/confirmBooking", {
                    state: { ...data },
                  });
                }}
              >
                Book
              </Button>
              {/* </NavLink> */}
            </Grid>
          </Grid>
        </Grid>
        <Grid xs={1} md={3}></Grid>
      </Grid>
      <Footer />
    </>
  );
};

export default Booking;
