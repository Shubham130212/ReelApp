import React from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Register from '../pages/auth/Register';
import Login from '../pages/auth/Login'
import Home from '../pages/general/Home';
import Landing from '../pages/general/Landing';
import CreateFood from '../pages/food-partner/CreateFoodPartner';
import Profile from '../pages/food-partner/Profile';

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing/>} />
        <Route path="/user/register" element={<Register/>} />
        <Route path="/user/login" element={<Login/>} />
        <Route path="/feed" element={<Home/>} />
        <Route path="/food-partner/create-food-partner" element={<CreateFood/>} />
        <Route path="/food-partner/my-profile" element={<Profile/>} />
      </Routes>
    </Router>
  )
}

export default AppRoutes