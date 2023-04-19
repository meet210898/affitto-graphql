import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import UserRegister from "./screens/UserRegister";
import Login from "./screens/Login";
import Home from "./screens/Home";
import Faq from "./screens/Faq";
import AboutUs from "./screens/AboutUs";
import UserProfile from "./screens/UserProfile";
import Company from "./screens/Company";
import Vehicle from "./screens/Vehicle";
import Category from "./screens/Category";
import VehicleByCompany from "./screens/VehicleByCompany";
import VehicleByType from "./screens/VehicleByType";
import ComingSoon from "./screens/ComingSoon";
import VehicleDetails from "./screens/VehicleDetails";
import Booking from "./screens/Booking";
import BookingConfirm from "./screens/BookingConfirm";
import MyBooking from "./screens/MyBooking";

const index = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/User/Login" element={<Login />} />
        <Route path="/user/register" element={<UserRegister />} />
        <Route path="/user/home" element={<Home />} />
        <Route path="/user/faq" element={<Faq />} />
        <Route path="/user/aboutus" element={<AboutUs />} />
        <Route path="/user/profile" element={<UserProfile />} />
        <Route path="/user/company" element={<Company />} />
        <Route path="/user/vehicles" element={<Vehicle />} />
        <Route path="/user/category" element={<Category />} />
        <Route path="/user/comingsoon" element={<ComingSoon />} />
        <Route path="/user/booking/:vehicleId" element={<Booking />} />
        <Route path="/user/confirmBooking" element={<BookingConfirm />} />
        <Route path="/user/mybooking" element={<MyBooking />} />
        <Route
          path="/user/vehicledetails/:vehicleId"
          element={<VehicleDetails />}
        />
        <Route
          path="/user/vehicles/:companyId"
          element={<VehicleByCompany />}
        />
        <Route
          path="/user/vehiclesByType/:typeId"
          element={<VehicleByType />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default index;
