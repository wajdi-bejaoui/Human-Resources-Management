import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Cog6ToothIcon } from "@heroicons/react/24/solid";
import { IconButton } from "@material-tailwind/react";
import {
  DashboardNavbar,
  Configurator,
  Footer,
} from "../widgets/layout";
import routes from "../routes";
import Employees from "../pages/dashboard/employees";
import Navbar from './navbar'
import Sidebar from './sidebar'


export function Layout({ children }) {
// const Layout = ({ children }) => {
  const location = useLocation();

  // Check if the current path is login or register
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  return (
    <div className="flex h-screen">
      {/* Conditionally render Sidebar */}
      {!isAuthPage && (
        <div className="w-80 fixed top-0 h-full">
          <Sidebar className="border-3 m-3" />
        </div>
      )}

      {/* Main Section */}
      <div className={`flex-1 ${!isAuthPage ? 'ml-80' : ''} min-h-screen bg-blue-gray-50/50`}>
        {/* Conditionally render Navbar */}
        {!isAuthPage && <Navbar />}

        {/* Page Content */}
        {children}
      </div>
    </div>
  );
};



export default Layout;
