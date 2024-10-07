import { Routes, Route } from "react-router-dom";
import { Cog6ToothIcon } from "@heroicons/react/24/solid";
import { IconButton } from "@material-tailwind/react";
import {
  DashboardNavbar,
  Configurator,
  Footer,
} from "../widgets/layout";
import routes from "../routes";
// import { useMaterialTailwindController, setOpenConfigurator } from "../context";
import Employees from "../pages/dashboard/employees";
import Navbar from './navbar'
import Sidebar from './sidebar'


export function EmployeesDashboard() {
  // const [controller, dispatch] = useMaterialTailwindController();
  // const { sidenavType } = controller;

  return (
    <div className="flex h-screen">
    <div className="w-80">
      <Sidebar  />
    </div>
    <div className="flex-1 min-h-screen bg-blue-gray-50/50">
        <Navbar />
        <Employees />
      </div>
      </div>
  );
}


export default EmployeesDashboard;
