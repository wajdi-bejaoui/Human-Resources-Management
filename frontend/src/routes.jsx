import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import SignIn from './pages/auth/sign-in'
import SignUp from './pages/auth/sign-up'
import Employees from './pages/dashboard/employees';
import Home from './pages/dashboard/home';
import { EmployeesDashboard } from './layouts/EmployeesDashboard';



function routes() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<SignIn />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/employees" element={<EmployeesDashboard />} />
        {/* <Route path="/" element={<Home />} /> */}
        {/* <Route path="/contact" element={<Contact />} /> */}
      </Routes>
    </Router>
  )
}

export default routes