import React, { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import useRazorpay from "react-razorpay";
import {
  CREATE_BOOKING,
  GET_USER_BY_ID,
  VEHICLES_DETAILS,
} from "../../gqloperations/mutation";

import Topbar from "../components/Topbar";
import Footer from "../components/footer";

import { Typography } from "@mui/material";
import { Button, Grid } from "@mui/material";
import logo from "../public/image/logo/logo.png";

const BookingScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  console.log("location", location);
  const { vehicleId, startDate, endDate, payableAmount, startTime, endTime } =
    location.state;

  const [user, setUser] = useState();
  const [vehicle, setVehicle] = useState([]);

  const userToken = localStorage.getItem("user-token") || "";
  const decodeUserId = jwt_decode(userToken);
  console.log("decodeUserId", decodeUserId);

  const [userById] = useMutation(GET_USER_BY_ID, {
    onCompleted: (data) => {
      console.log("data===", data);
      setUser(data.user);
    },
  });

  const [vehicleDetails] = useMutation(VEHICLES_DETAILS, {
    onCompleted: (data) => setVehicle(data),
    onError: (err) => console.log("error in vehicle by company", err),
  });

  const [createBooking] = useMutation(CREATE_BOOKING, {
    onError: (err) => console.log("error in company", err),
  });

  useEffect(() => {
    if (userToken) {
      getUserById(decodeUserId);
    }
    if (vehicleId) {
      getVehicleById(vehicleId);
    }
  }, [vehicleId]);

  const getUserById = (decodeUserId) => {
    userById({
      variables: {
        id: {
          _id: decodeUserId.userId,
        },
      },
    });
  };

  const getVehicleById = (vehicleId) => {
    vehicleDetails({
      variables: {
        id: vehicleId,
      },
    });
  };

  const bookingData = {
    userId: decodeUserId.userId,
    companyId: vehicle?.vehicle?.companyId?._id,
    vehicleId: vehicleId,
    startDate: startDate,
    endDate: endDate,
    payment: payableAmount,
    status: true,
  };
  const Razorpay = useRazorpay();

  const paymentHandler = () => {
    const options = {
      key: "KEY",
      amount: bookingData.payment * 100,
      name: "Booking Payment",
      image: logo,
      prefill: {
        name: user.firstName + " " + user.lastName,
        email: user.email,
        contact: user.phoneNumber,
      },
      notes: {
        address: user.address,
      },
      theme: {
        color: "#1b6dc1",
      },
      handler(response) {
        const paymentId = response.razorpay_payment_id;
        const url =
          "http://localhost:3000/api/v1/rzp_capture/" +
          paymentId +
          "/" +
          bookingData.payment;
        // Using my server endpoints to capture the payment
        fetch(url, {
          method: "get",
          headers: {
            "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
          },
        })
          .then(function (data) {
            //api call insert booking
            console.log("inside then");
            createBooking({
              variables: {
                bookingNew: bookingData,
              },
              // update(cache, { data: { company } }) {
              //   const recruit = cache.readQuery({
              //     query: GET_ALL_COMPANIES,
              //   });
              //   cache.writeQuery({
              //     query: GET_ALL_COMPANIES,
              //     data: {
              //       company: [company, ...recruit.company],
              //     },
              //   });
              // },
            });
            navigate("/user/MyBooking");
          })
          .catch(function (error) {
            //error booking
            console.log("Request failed", error);
          });
      },
    };
    const rzp1 = new Razorpay(options);
    rzp1.open();
  };

  return (
    <>
      <Topbar />
      <Grid container marginTop="20px">
        <Grid xs={1} md={3}></Grid>

        <Grid
          xs={10}
          md={6}
          style={{
            background: "white",
            padding: "20px",
            boxShadow: "2px 1px 9px 2px #888888",
          }}
        >
          <Grid xs={12} md={12}>
            <h1 style={{ margin: "0px" }}>Confirmation</h1>
          </Grid>
          {/* user detail */}
          <Grid container>
            <Grid xs={6} md={6}>
              <Typography mt={2} component="div">
                <b>Name</b>
              </Typography>
              {user?.firstName} {user?.lastName}
            </Grid>
            <Grid xs={6} md={6}>
              <Typography mt={2} component="div">
                <b>Username</b>
              </Typography>
              {user?.username}
            </Grid>
          </Grid>
          <Grid container>
            <Grid xs={12} md={6}>
              <Typography mt={2} component="div">
                <b>Email</b>
              </Typography>
              {user?.email}
            </Grid>
            <Grid xs={12} md={6}>
              <Typography mt={2} component="div">
                <b>Phone Number</b>
              </Typography>
              {user?.phoneNumber}
            </Grid>
          </Grid>

          {/* vehicle detail */}
          <Grid container>
            <Grid xs={6} md={6}>
              <Typography mt={2} component="div">
                <b>Company</b>
              </Typography>
              {/* {companiesInfo?.map((data) => {
                return data._id === vehicle?.companyId ? data.companyName : "";
              })} */}
              {vehicle?.vehicle?.companyId?.companyName}
            </Grid>
            <Grid xs={6} md={6}>
              <Typography mt={2} component="div">
                <b>Vehicle Name</b>
              </Typography>
              {vehicle?.vehicle?.vehicleName}
            </Grid>
          </Grid>
          <Grid container>
            <Grid xs={6} md={6}>
              <Typography mt={2} component="div">
                <b>Start Date</b>
              </Typography>
              {startDate}
            </Grid>
            <Grid xs={6} md={6}>
              <Typography mt={2} component="div">
                <b>End Date</b>
              </Typography>
              {endDate}
            </Grid>
          </Grid>
          <Grid container>
            <Grid xs={6} md={6}>
              <Typography mt={2} component="div">
                <b>Pick up Time</b>
              </Typography>
              {startTime}
            </Grid>
            <Grid xs={6} md={6}>
              <Typography mt={2} component="div">
                <b>Deliver Time</b>
              </Typography>
              {endTime}
            </Grid>
          </Grid>
          <Grid container>
            <Grid xs={12} md={12}>
              <Typography mt={2} style={{ fontSize: "20px" }} component="div">
                <b>Payable Amount</b>
                <p style={{ margin: "0px" }}>{payableAmount}</p>
              </Typography>
            </Grid>
          </Grid>
          <Grid container>
            <Grid xs={12} md={12}>
              <Typography mt={2} style={{ fontSize: "20px" }} component="div">
                <Button onClick={paymentHandler} variant="contained">
                  Pay Now
                </Button>
                <Button
                  style={{ marginLeft: "10px", background: "red" }}
                  onClick={() => navigate("/user/vehicles")}
                  variant="contained"
                >
                  Cancel
                </Button>
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        <Grid xs={1} md={3}></Grid>
      </Grid>
      <Footer />
    </>
  );
};

export default BookingScreen;
