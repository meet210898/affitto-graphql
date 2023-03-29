import * as React from "react";
import { NavLink } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_ALL_COMPANIES } from "../../gqloperations/queries";

import Topbar from "../components/Topbar";
import Footer from "../components/footer";

import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ListSubheader from "@mui/material/ListSubheader";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

const { REACT_APP_BASE_URL } = process.env;
const Company = () => {
  const { error, data, loading } = useQuery(GET_ALL_COMPANIES);
  if (loading) return <h1>Loading...</h1>;
  if (error) {
    console.log("error", error);
  }

  return (
    <>
      <Topbar />
      <Grid container>
        <Grid xs={1}></Grid>
        <Grid xs={10}>
          <ImageList>
            <ImageListItem key="Subheader">
              <ListSubheader component="div" style={{ background: "none" }}>
                Company
              </ListSubheader>
            </ImageListItem>
          </ImageList>
        </Grid>
        <Grid xs={1}></Grid>
      </Grid>
      <Grid container>
        <Grid xs={1}></Grid>
        <Grid xs={10} display="flex">
          <Grid container display="flex">
            {data?.company?.map((data) => (
              <Grid md={4}>
                <NavLink
                  style={{ textDecoration: "none" }}
                  to={`/user/vehicles/${data._id}`}
                >
                  <Card sx={{ maxWidth: 300, height: "auto", margin: "20px" }}>
                    <CardMedia
                      component="img"
                      height="140"
                      image={`${REACT_APP_BASE_URL}/${data.companyLogo}`}
                      alt="company"
                    />
                    <CardContent>
                      <center>
                        <b>{data.companyName}</b>
                      </center>
                    </CardContent>
                  </Card>
                </NavLink>
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

export default Company;
