import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { VEHICLES_DETAILS } from "../../gqloperations/mutation";
import { GET_ALL_VEHICLES } from "../../gqloperations/queries";
import { useTranslation } from "react-i18next";

import Topbar from "../components/Topbar";
import Footer from "../components/footer";

import Grid from "@mui/material/Grid";

const { REACT_APP_BASE_URL } = process.env;
const VehicleDetails = () => {
  const { vehicleId } = useParams("id");
  const [vehicleDetailsData, setVehicleDetailsData] = useState([]);
  const { t } = useTranslation("common");

  const [vehicleDetails] = useMutation(VEHICLES_DETAILS, {
    onCompleted: (data) => setVehicleDetailsData(data),
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

  return (
    <>
      <Topbar />
      <Grid container>
        <Grid xs={1}></Grid>
        <Grid xs={10}>
          <Grid container>
            <Grid xs={12}>
              <h1 style={{ padding: "0", margin: "0", marginTop: "15px" }}>
                {vehicleDetailsData?.vehicle?.companyId.companyName}
              </h1>
            </Grid>
            <Grid xs={12}>
              <p
                style={{
                  padding: "0",
                  margin: "0",
                  marginTop: "5px",
                  fontSize: "20px",
                }}
              >
                {vehicleDetailsData?.vehicle?.vehicleName}
              </p>
            </Grid>
            <Grid container>
              <Grid xs={12} md={8} marginTop={2}>
                <img
                  src={`${REACT_APP_BASE_URL}/${vehicleDetailsData?.vehicle?.vehicleImage}`}
                  style={{ height: "100%", maxWidth: "700px", width: "100%" }}
                  alt="tata"
                />
              </Grid>
              <Grid
                xs={12}
                md={4}
                sx={{
                  border: "0px",
                  width: { xs: "100%", md: "100%", marginTop: "16px" },
                }}
              >
                <iframe
                  title="Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3721.1735673577796!2d72.75939917848156!3d21.1454898688498!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xd67f67bac901ac43!2zMjHCsDA4JzQ5LjYiTiA3MsKwNDUnMzMuNCJF!5e0!3m2!1sen!2sin!4v1653031491432!5m2!1sen!2sin"
                  allowfullscreen=""
                  width="100%"
                  height="100%"
                  style={{ border: "0px" }}
                  loading="lazy"
                ></iframe>
              </Grid>
            </Grid>
            <Grid xs={12} display="flex">
              <Grid xs={12}>
                <h3>{t("VEHICLE_DETAILS.ABOUT_TITLE")}</h3>

                <ul
                  style={{
                    listStyleType: "none",
                    padding: "0",
                    fontSize: "14px",
                  }}
                >
                  <b>
                    <li>
                      {t("VEHICLE_DETAILS.PRICE_PER_DAY")}:{" "}
                      {vehicleDetailsData?.vehicle?.priceperday}
                      /-
                    </li>
                  </b>
                  <li>
                    <p>{vehicleDetailsData?.vehicle?.description}</p>
                  </li>
                </ul>
                <h3>{t("VEHICLE_DETAILS.FEATURES")}</h3>
                <b>
                  <ul
                    style={{
                      fontSize: "14px",
                      paddingLeft: "15px",
                    }}
                  >
                    <li style={{ padding: "5px" }}>
                      {t("VEHICLE_DETAILS.SEATS")}:{" "}
                      {vehicleDetailsData?.vehicle?.seats}
                    </li>
                    <li style={{ padding: "5px" }}>
                      {t("VEHICLE_DETAILS.DOORS")}:{" "}
                      {vehicleDetailsData?.vehicle?.door}
                    </li>
                    <li style={{ padding: "5px" }}>
                      {t("VEHICLE_DETAILS.AC")}:{" "}
                      {vehicleDetailsData?.vehicle?.ac === true
                        ? "AC"
                        : "Non-AC"}
                    </li>
                    <li style={{ padding: "5px" }}>
                      {t("VEHICLE_DETAILS.RC")}:{" "}
                      {vehicleDetailsData?.vehicle?.rcNumber !== ""
                        ? "YES"
                        : "NO"}
                    </li>
                    <li style={{ padding: "5px" }}>
                      {t("VEHICLE_DETAILS.PUC")}:{" "}
                      {vehicleDetailsData?.vehicle?.pucImage !== null
                        ? "YES"
                        : "NO"}
                    </li>
                    <li style={{ padding: "5px" }}>
                      {t("VEHICLE_DETAILS.INSURANCE")}:{" "}
                      {vehicleDetailsData?.vehicle?.insuranceImage !== null
                        ? "YES"
                        : "NO"}
                    </li>
                  </ul>
                </b>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid xs={1}></Grid>
      </Grid>
      <Footer />
    </>
  );
};

export default VehicleDetails;
