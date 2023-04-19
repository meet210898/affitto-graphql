import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import Topbar from "../components/Topbar";

import img from "../public/image/aboutus/aboutus.jpg";
import registerUser from "../public/image/aboutus/registerUser.png";
import vehicleType from "../public/image/aboutus/type.jpg";
import selectVehicle from "../public/image/aboutus/selectVehicle.png";

import Card from "@mui/material/Card";
import { Grid } from "@mui/material";
import "../components/css/imgTxt.css";
import Footer from "../components/footer";

const AboutUs = () => {
  const { t } = useTranslation("common");

  const [isReadMorePurpose, setIsReadMorePurpose] = useState(true);
  const [isReadMoreGoal, setIsReadMoreGoal] = useState(true);
  const toggleReadMorePurpose = () => {
    setIsReadMorePurpose(!isReadMorePurpose);
  };

  const toggleReadMoreGoal = () => {
    setIsReadMoreGoal(!isReadMoreGoal);
  };
  const purpose = `An online vehicle rental system allows a person to book/reserve a vehicle
  with online payment on one end while the company staff handles the
  transactions, on the other via the Internet. The User can Upload their
  personal Vehicle for rent and can earn through it. The Users can also book
  Vehicle of other Users and Agencies available on the Website. Famous
  companies from United Kingdom, has gained popularity since the business
  used the technologies available to expand and provide more facilities to
  their customers`;

  const goal = `The basic functions of an online vehicle rental system are to keep
  tracks of vehicles, staff, customers and booking. It provides
  useful information to the staff such as giving daily reports of
  vehicles to be delivered/picked up and acts as a vehicle
  management system by monitoring the use and price of the vehicles.`;

  return (
    <>
      <Topbar />
      <div className="imgsettingAbout ">
        <div className="imgWrapper diagonal-gradient ">
          <img
            src={img}
            style={{ objectFit: "cover" }}
            height="400px"
            width="100%"
            alt="blank"
          />
          <Grid container>
            <Grid xs={10} md={6}>
              <h1 className="imgTitleAbout">{t("ABOUT_US.WHO_WE_ARE")}</h1>
            </Grid>
          </Grid>
          <Grid xs={8} md={8}>
            <p className="descriptionAbout">{t("ABOUT_US.GO_FAST_SLOW")}</p>
          </Grid>
        </div>
      </div>
      <Grid container>
        <Grid md={1}></Grid>
        <Grid xs={12} md={5} style={{ padding: "10px" }}>
          <Card
            style={{
              padding: "20px 30px",
              minHeight: "150px",
              height: "auto",
            }}
            variant="outlined"
          >
            <p style={{ marginTop: "0px" }} className="myfont">
              {t("ABOUT_US.MAIN_PURPOSE")}
            </p>
            {isReadMorePurpose ? purpose.slice(0, 150) : purpose}
            <span onClick={toggleReadMorePurpose} className="read-or-hide">
              {isReadMorePurpose ? "...Read more" : " ...Show less"}
            </span>
          </Card>
        </Grid>
        <Grid xs={12} md={5} style={{ padding: "10px" }}>
          <Card
            style={{
              padding: "20px 30px",
              minHeight: "150px",
              height: "auto",
            }}
            variant="outlined"
          >
            <p style={{ marginTop: "0px" }} className="myfont">
              {t("ABOUT_US.OUR_GOAL")}
            </p>
            {isReadMoreGoal ? goal.slice(0, 150) : goal}
            <span onClick={toggleReadMoreGoal} className="read-or-hide">
              {isReadMoreGoal ? "...Read more" : " ...Show less"}
            </span>
            <p></p>
          </Card>
        </Grid>
        <Grid md={1}></Grid>
      </Grid>
      <Grid container marginBottom="20px">
        <Grid xs={12} md={12} justifyContent="center" display="flex">
          <h2>{t("ABOUT_US.HOW_IT_WORKS")}</h2>
        </Grid>
        <Grid xs={1} md={2}></Grid>
        <Grid xs={10} md={8}>
          <Grid container>
            <Grid xs={3} md={3}>
              <img
                src={registerUser}
                alt="register"
                height="auto"
                width="80px"
                className="center"
              />
            </Grid>
            <Grid xs={9} md={9}>
              <Card style={{ padding: "15px" }} variant="outlined">
                <p className="myfont" style={{ margin: "0px" }}>
                  {t("ABOUT_US.REGISTER_ACCOUNT")}
                </p>
                <p>{t("ABOUT_US.REGISTER_USER")}</p>
                <b>{t("ABOUT_US.REGISTER_NEW_USER")}</b>
              </Card>
            </Grid>
          </Grid>
          <Grid container style={{ marginTop: "20px" }}>
            <Grid xs={3} md={3}>
              <img
                src={vehicleType}
                alt="register"
                height="auto"
                width="80px"
                className="center"
              />
            </Grid>
            <Grid xs={9} md={9}>
              <Card style={{ padding: "15px" }} variant="outlined">
                <p className="myfont" style={{ margin: "0px" }}>
                  {t("ABOUT_US.CHOOSE_TYPE")}
                </p>
                <p>{t("ABOUT_US.DIFFERENT_TYPE_VEHICLE")}</p>
                <b>{t("ABOUT_US.CHOOSE_TYPE")}</b>
              </Card>
            </Grid>
          </Grid>
          <Grid container style={{ marginTop: "20px" }}>
            <Grid xs={3} md={3}>
              <img
                src={selectVehicle}
                alt="register"
                height="auto"
                width="80px"
                className="center"
              />
            </Grid>
            <Grid xs={9} md={9}>
              <Card style={{ padding: "15px" }} variant="outlined">
                <p className="myfont" style={{ margin: "0px" }}>
                  {t("ABOUT_US.SELECT_VEHICLE")}
                </p>
              </Card>
            </Grid>
          </Grid>
        </Grid>
        <Grid xs={1} md={2}></Grid>
      </Grid>
      <Footer />
    </>
  );
};

export default AboutUs;
