import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from './screens/Login';
import StateList from './screens/StateList';
import Sidebar from './components/Sidebar';

const index = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/Admin" element={<Sidebar />} >
              <Route path="viewState" element={<StateList />} />
            </Route>
        </Routes>
    </BrowserRouter>
  )
}

export default index