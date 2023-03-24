import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Sidebar from './components/Sidebar';

import Login from './screens/Login';
import AddState from './screens/adds/AddState';
import AddCity from './screens/adds/AddCity';
import AddVehicleType from './screens/adds/AddVehicleType';
import AddCompany from './screens/adds/AddCompany';
import AddVehicle from './screens/adds/AddVehicle';
import AddFaqCategory from './screens/adds/AddFaqCategory';
import AddFaq from './screens/adds/AddFaq';

import AdminDashboard from './screens/views/AdminDashboard';
import UserList from './screens/views/UserList';
import BookingList from './screens/views/BookingList';
import StateList from './screens/views/StateList';
import CityList from './screens/views/CityList';
import VehicleTypeList from './screens/views/VehicleTypeList';
import CompanyList from './screens/views/CompanyList';
import VehicleList from './screens/views/VehicleList';
import FaqCategoryList from './screens/views/FaqCategoryList';
import FaqList from './screens/views/FaqList';

const index = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/Admin" element={<Sidebar />} >
              <Route path="addState" element={<AddState />} />
              <Route path="addCity" element={<AddCity />} />
              <Route path="addVehicleType" element={<AddVehicleType />} />
              <Route path="addCompany" element={<AddCompany />} />
              <Route path="addVehicle" element={<AddVehicle />} />
              <Route path="addFaqCategory" element={<AddFaqCategory />} />
              <Route path="addFaq" element={<AddFaq />} />

              <Route path="Dashboard" element={<AdminDashboard />} />
              <Route path="User" element={<UserList />} />
              <Route path="Booking" element={<BookingList />} />
              <Route path="viewState" element={<StateList />} />
              <Route path="viewCity" element={<CityList />} />
              <Route path="viewVehicleType" element={<VehicleTypeList />} />
              <Route path="viewCompany" element={<CompanyList />} />
              <Route path="viewVehicle" element={<VehicleList />} />
              <Route path="viewFaqCategory" element={<FaqCategoryList />} />
              <Route path="viewFaq" element={<FaqList />} />
            </Route>
        </Routes>
    </BrowserRouter>
  )
}

export default index