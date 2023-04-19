import * as React from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  GET_ALL_COMPANIES,
  GET_ALL_VEHICLES,
  GET_ALL_VEHICLETYPES,
} from "../../gqloperations/queries";
import { useQuery } from "@apollo/client";

import Topbar from "../components/Topbar";
import Footer from "../components/footer";

import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ListSubheader from "@mui/material/ListSubheader";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
// import { makeStyles } from "@mui/styles";

const { REACT_APP_BASE_URL } = process.env;
// const useStyles = makeStyles((theme) => ({
//   root: {
//     position: "relative",
//   },
//   font: {
//     position: "absolute",
//     bottom: "1%",
//     width: "50%",
//     textAlign: "left",
//     color: "white",
//     fontSize: "20px",
//     fontFamily: "Sans-serif",
//   },
// }));

const Category = () => {
  const { t } = useTranslation("common");
  const vehicleTypesInfo = useQuery(GET_ALL_VEHICLETYPES);
  const vehiclesInfo = useQuery(GET_ALL_VEHICLES);
  const companiesInfo = useQuery(GET_ALL_COMPANIES);

  return (
    <>
      <Topbar />
      <Grid container>
        <Grid xs={1} md={1}></Grid>
        <Grid xs={10} md={10}>
          <ImageList>
            <ImageListItem key="Subheader">
              <ListSubheader component="div" style={{ background: "none" }}>
                {t("CATEGORY.CATEGORY")}
              </ListSubheader>
            </ImageListItem>
          </ImageList>
        </Grid>
        <Grid xs={1} md={1}></Grid>
      </Grid>
      <Grid container>
        <Grid xs={1} md={1}></Grid>
        <Grid xs={10} md={8}>
          <Grid container display="flex" justifyContent="space-between">
            {vehicleTypesInfo?.data?.vehicleType.map((data) => (
              <Grid md={6}>
                <NavLink to={`/user/vehiclesByType/${data._id}`}>
                  <Card sx={{ maxWidth: 300, height: "auto", margin: "20px" }}>
                    <CardMedia
                      component="img"
                      height="140"
                      image={`${REACT_APP_BASE_URL}/${data.typeImage}`}
                      alt="typeLogo"
                    />
                    <CardContent>
                      <center>
                        <b style={{ textTransform: "uppercase" }}>
                          {data.typeName}
                        </b>
                      </center>
                    </CardContent>
                  </Card>
                </NavLink>
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid xs={10} md={2}>
          <Grid container>
            <Grid xs={1}></Grid>
            <Grid xs={10} md={12} style={{ position: "relative" }}>
              <h3 style={{ margin: "0px" }}>{t("CATEGORY.EXPLORE_VEHICLE")}</h3>
              <Grid container display="flex">
                {vehiclesInfo?.data?.vehicle.slice(0, 2).map((row) => (
                  <NavLink to={`/user/VehicleDetails/${row._id}`}>
                    <Card
                      sx={{
                        height: "auto",
                        width: "70%",
                        marginTop: "20px",
                        padding: "20px",
                        boxShadow: "2px 1px 9px 2px #888888",
                      }}
                    >
                      <CardContent style={{ padding: "0px" }}>
                        <center>
                          <h3 style={{ margin: "0px" }}>
                            {companiesInfo?.data?.company.map((data) => {
                              return data._id === row.companyId
                                ? data.companyName
                                : "";
                            })}{" "}
                            {row.vehicleName}
                          </h3>
                        </center>
                      </CardContent>
                      <CardMedia
                        component="img"
                        height="auto"
                        image={`${REACT_APP_BASE_URL}/${row.vehicleImage}`}
                        alt="company"
                        style={{ marginTop: "15px" }}
                      />

                      <Grid
                        xs={12}
                        style={{
                          padding: "0px",
                          marginTop: "15px",
                          fontSize: "14px",
                          borderTop: "1px solid #a2a2a3",
                          justifyContent: "center",
                          display: "flex",
                        }}
                      >
                        <b>
                          {t("CATEGORY.RS")} {row.priceperday}{" "}
                          {t("CATEGORY.PRICE_PER_DAY")}
                        </b>
                      </Grid>
                    </Card>
                  </NavLink>
                ))}
              </Grid>
            </Grid>
            <Grid xs={1}></Grid>
          </Grid>
        </Grid>
        <Grid xs={1} md={1}></Grid>
      </Grid>
      <Footer />
    </>
  );
};

export default Category;
