import React, { useEffect, useState } from "react";
import moment from "moment";
import jwt_decode from "jwt-decode";
import { useNavigate, NavLink } from "react-router-dom";

import Topbar from "../components/Topbar";
import Footer from "../components/footer";
import GridDesign from "../components/grid";
import ModalCall from "./Modals/CancelBooking";

import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import { Button, Grid } from "@mui/material";
import {
  BOOKING_BY_USERID,
  GET_USER_BY_ID,
} from "../../gqloperations/mutation";
import { useMutation } from "@apollo/client";

const { REACT_APP_HOST } = process.env;

const MyBooking = () => {
  const navigate = useNavigate();

  const userToken = localStorage.getItem("user-token") || "";
  const decodeUserId = jwt_decode(userToken);
  const [openEdit, setOpenEdit] = useState(false);
  const [editData, setEditData] = useState(null);
  const [bookingsByUser, setBookingsByUser] = useState();
  const [user, setUser] = useState();
  const chkDate = new Date();

  const [userById] = useMutation(GET_USER_BY_ID, {
    onCompleted: (data) => {
      console.log("data===", data);
      setUser(data.user);
    },
  });

  const [bookingByUserId] = useMutation(BOOKING_BY_USERID, {
    onCompleted: (data) => {
      console.log("data===", data);
      setBookingsByUser(data.booking);
    },
  });

  useEffect(() => {
    if (!localStorage.getItem("user-token")) {
      navigate("/user/Home");
    }
  }, [navigate]);

  useEffect(() => {
    if (userToken) {
      getUserById(decodeUserId);
      getBookingsByUserId(decodeUserId);
    }
  }, [userToken]);

  const getUserById = (decodeUserId) => {
    userById({
      variables: {
        id: {
          _id: decodeUserId.userId,
        },
      },
    });
  };

  const getBookingsByUserId = (decodeUserId) => {
    console.log("decodeUserId", decodeUserId.userId);
    bookingByUserId({
      variables: {
        id: decodeUserId.userId,
      },
    });
  };

  // const bookingDelete = useSelector((state) => state.bookingDelete);
  // const { deleteSuccess } = bookingDelete;

  // useEffect(() => {
  //   dispatch(getCompany(0));
  //   dispatch(listVehicle(0));
  //   dispatch(listBookingByUserId(decodeUserId._id));
  //   dispatch(listUserDetails(decodeUserId._id));
  // }, [dispatch, decodeUserId._id, deleteSuccess]);

  // const bookingByUser = useSelector((state) => state.bookingByUser);
  // const { bookingsByUserInfo } = bookingByUser;

  // const companyList = useSelector((state) => state.companyList);
  // const { companiesInfo } = companyList;

  // const vehicleList = useSelector((state) => state.vehicleList);
  // const { vehiclesInfo } = vehicleList;

  // const userDetails = useSelector((state) => state.userDetails);
  // const { user } = userDetails;

  const bookHandler = (bookingId) => {
    navigate(`/user/modifyBooking/${bookingId}`);
  };

  return (
    <>
      <Topbar />
      <ModalCall open={openEdit} setOpen={setOpenEdit} editData={editData} />
      <GridDesign name="Your Bookings" />

      <Grid container>
        <Grid xs={1} md={1}></Grid>
        <Grid xs={10} md={10}>
          {bookingsByUser?.length === 0 ? (
            <center>
              <h1>Oops! You don't have any bookings</h1>
              <NavLink style={{ textDecoration: "none" }} to="/user">
                <Button variant="contained">Go to Home Page</Button>
              </NavLink>
            </center>
          ) : (
            bookingsByUser?.map((data) => (
              <Card
                style={{ padding: "20px 30px", marginBottom: "20px" }}
                variant="outlined"
              >
                <Grid container>
                  <Grid xs={8} md={10}>
                    <h3 style={{ margin: "0px" }}>
                      {data.companyId.companyName}
                    </h3>{" "}
                    <p style={{ margin: "0px" }}>
                      {data.vehicleId.vehicleName}
                    </p>
                  </Grid>
                  <Grid xs={4} md={2}>
                    <Button
                      variant="outlined"
                      style={{
                        cursor: "default",
                        height: "auto",
                        width: "auto",
                        fontWeight: "bold",
                        fontSize: "16px",
                      }}
                      color={
                        data.status === true && chkDate > new Date(data.endDate)
                          ? "warning"
                          : data.status === true
                          ? "success"
                          : ""
                      }
                    >
                      <b>
                        {data.status === true &&
                        chkDate > new Date(data.endDate)
                          ? "Completed"
                          : data.status === true
                          ? "Booked"
                          : ""}
                      </b>
                    </Button>
                  </Grid>
                </Grid>

                <Grid container style={{ marginTop: "10px" }}>
                  <Grid xs={12} md={3}>
                    {/* {vehiclesInfo
                      ?.filter((item) => item._id === data.vehicleId)
                      .map((vehicle) => {
                        return (
                          <CardMedia
                            component="img"
                            height="auto"
                            image={`${REACT_APP_HOST}/${vehicle.vehicleImage}`}
                            alt="company"
                          />
                        );
                      })} */}
                  </Grid>
                  <Grid
                    style={{ marginLeft: "10px" }}
                    xs={12}
                    md={8}
                    display="flex"
                  >
                    <Grid xs={12} md={6}>
                      <p
                        style={{
                          marginTop: "0px",
                          marginBottom: "0px",
                          color: "rgba(0, 0, 0, 0.6)",
                        }}
                      >
                        Pick up
                      </p>
                      <p style={{ margin: "0px" }} display="flex">
                        {moment(data.startDate).format("LL")}{" "}
                        {moment(data.startDate).format("LT")}
                      </p>

                      <p
                        style={{
                          marginBottom: "0px",
                          color: "rgba(0, 0, 0, 0.6)",
                        }}
                      >
                        Name
                      </p>
                      <p style={{ margin: "0px" }}>
                        {user.firstName} {user.lastName}
                      </p>
                      <h3>Payment: {data.payment}</h3>
                    </Grid>

                    <Grid xs={12} md={6}>
                      <p
                        style={{
                          marginTop: "0px",
                          marginBottom: "0px",
                          color: "rgba(0, 0, 0, 0.6)",
                        }}
                      >
                        Drop Date
                      </p>
                      <p style={{ margin: "0px" }}>
                        {moment(data.endDate).format("LL")}{" "}
                        {moment(data.endDate).format("LT")}
                      </p>

                      <p
                        style={{
                          marginBottom: "0px",
                          color: "rgba(0, 0, 0, 0.6)",
                        }}
                      >
                        Mobile
                      </p>
                      <p style={{ margin: "0px" }}>{user.phoneNumber}</p>
                    </Grid>
                  </Grid>
                  <Grid justifyContent="right" xs={12} md={12} display="flex">
                    <Button
                      onClick={() => {
                        setEditData(data._id);
                        setOpenEdit(true);
                      }}
                      style={{ background: "red" }}
                      variant="contained"
                    >
                      Cancel
                    </Button>
                    <Button
                      style={{ marginLeft: "10px" }}
                      onClick={() => {
                        bookHandler(data._id);
                      }}
                      variant="contained"
                    >
                      Modify
                    </Button>
                  </Grid>
                </Grid>
              </Card>
            ))
          )}
        </Grid>
        <Grid xs={1} md={1}></Grid>
      </Grid>
      <Footer />
    </>
  );
};

export default MyBooking;
