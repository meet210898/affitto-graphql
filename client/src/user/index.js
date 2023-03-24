import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import UserRegister from "./screens/UserRegister";
import Login from "./screens/Login";

const index = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/User/Login" element={<Login />} />
        <Route path="/user/register" element={<UserRegister />} />
      </Routes>
    </BrowserRouter>
  );
};

export default index;
