import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import SignIn from './pages/auth/sign-in'
import SignUp from './pages/auth/sign-up'
import Employees from './pages/dashboard/employees';
import AddEmployeeForm from './pages/dashboard/add-employee-form';

import Home from './pages/dashboard/home';
import { Layout } from './layouts/layout';
import EditEmployeeForm from './pages/dashboard/edit-employee-form';
import { Congees } from './pages/dashboard/congees';
import AddMyCongeeForm from './pages/dashboard/add-my-congee-form';
import MyCongeesList from './pages/dashboard/my-congees-list';



function routes() {
  return (
    
    // <Router>
    <Layout>
      <Routes>
        <Route path="/login" element={<SignIn />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/employees" element={<Employees />} />
        <Route path="/add-employee" element={<AddEmployeeForm />} />
        <Route path="/edit-employee/:id" element={<EditEmployeeForm />} />
        <Route path="/congees" element={<Congees />} />
        <Route path="/add-my-congee" element={<AddMyCongeeForm />} />
        <Route path="/my-congees-list" element={<MyCongeesList />} />
        {/* <Route path="/edit-congee/:id" element={<EditEmployeeForm />} /> */}
        <Route path="/" element={<Home />} />
        {/* <Route path="/contact" element={<Contact />} /> */}
      </Routes>
    </Layout>
  // </Router>
  )
}

export default routes