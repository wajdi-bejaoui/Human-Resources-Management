import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import SignIn from './pages/auth/sign-in'
import SignUp from './pages/auth/sign-up'
import Employees from './pages/dashboard/employees';
import AddEmployeeForm from './pages/dashboard/add-employee-form';

import Home from './pages/dashboard/home';
import { Layout } from './layouts/layout';
import EditEmployeeForm from './pages/dashboard/edit-employee-form';



function routes() {
  return (
    
    // <Router>
    <Layout>
      <Routes>
        <Route path="/employees" element={<Employees />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/add-employee" element={<AddEmployeeForm />} />
        <Route path="/edit-employee/:id" element={<EditEmployeeForm />} />
        <Route path="/" element={<Home />} />
        {/* <Route path="/contact" element={<Contact />} /> */}
      </Routes>
    </Layout>
  // </Router>
  )
}

export default routes