import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  Chip,
  Input // Import Input component for search
} from "@material-tailwind/react";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from 'react-redux';
import { fetchEmployees,deleteEmployee,clearStatus } from '../../store/employees/employeeSlice';


export function Employees() {

  const dispatch = useDispatch();
  const { data: employees, status, error } = useSelector((state) => state.employees);

  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    console.log(employees)

    if (status === 'idle') {
      dispatch(fetchEmployees());
    }
  }, [dispatch, status]);

  useEffect(() => {
    setFilteredEmployees(employees);
  }, [employees]);

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);

    const filtered = employees.filter((employee) =>
      employee.fullname.toLowerCase().includes(value) ||
      employee.email.toLowerCase().includes(value)
    );
    setFilteredEmployees(filtered);
  };

  const handleDeleteEmployee = (id) => {
    console.log("handleDeleteEmployee called")
    dispatch(deleteEmployee(id));
  };

  useEffect(() => {
    // Cleanup function to clear error and success state on unmount
    return () => {
      dispatch(clearStatus());
    };
  }, [dispatch]);

  if (status === 'loading') return <div>Loading...</div>;
  if (status === 'failed') return <div>Error: {error}</div>;

  return (
    <div className="mt-8 mb-8 flex flex-col gap-12">
      <Card>
      <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
        <div className="flex flex-row justify-between items-center"> 
          <Typography variant="h5" color="white">
            Employees Table
          </Typography>
          {/* Search input */}
          <div className="relative flex items-center lg:ml-4 sm:mr-0 mr-2">
            <span className="absolute ml-4 leading-none -translate-y-1/2 top-1/2 text-muted">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"></path>
              </svg>
            </span>
            <input
              onChange={handleSearch}
              value={searchTerm}
              className="block w-full min-w-[70px] py-3 pl-12 pr-4 text-base font-medium leading-normal bg-white border border-solid outline-none appearance-none placeholder:text-gray-400 text-gray-900 border-gray-500 bg-clip-padding rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search..."
              type="text"
              style={{ color: 'black', caretColor: 'black' }} // Ensure the text and caret (cursor) are visible
            />
            {/* <span className="absolute right-0 left-auto mr-4 leading-none -translate-y-1/2 peer-placeholder-shown:hidden top-1/2 hover:text-primary text-muted cursor-pointer" onClick={() => setSearchTerm('')}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </span> */}
          </div>
        </div>
      </CardHeader>



        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["Employee", "function", "status", "employed", ""].map((el) => (
                  <th
                    key={el}
                    className="border-b border-blue-gray-50 py-3 px-5 text-left"
                  >
                    <Typography
                      variant="small"
                      className="text-[13px] font-bold uppercase text-blue-gray-400"
                    >
                      {el}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.length > 0 ? filteredEmployees.map(
                ({ id, imageUrl, fullname, email, role, online, date }, key) => {
                  const className = `py-3 px-5 ${
                    key === employees.length - 1 ? "" : "border-b border-blue-gray-50"
                  }`;

                  return (
                    <tr key={id}>
                      <td className={className}>
                        <div className="flex items-center gap-4">
                          {imageUrl && (
                            <Avatar
                              src={`http://localhost:3000${imageUrl}`}
                              alt={fullname}
                              size="md"
                              variant="rounded"
                            />
                          )}
                          {!imageUrl && (
                            <Avatar
                              src={"/img/team-2.jpeg"}
                              alt={fullname}
                              size="md"
                              variant="rounded"
                            />
                          )}
                          <div>
                            <Typography color="blue-gray" className="text-lg font-bold">
                              {fullname}
                            </Typography>
                            <Typography className="text-lg font-normal text-blue-gray-500">
                              {email}
                            </Typography>
                          </div>
                        </div>
                      </td>
                      <td className={className}>
                        <Typography className="text-lg font-semibold text-blue-gray-600">
                          {role}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Chip
                          variant="gradient"
                          color={online ? "green" : "blue-gray"}
                          value={online ? "online" : "offline"}
                          className="py-0.5 px-2 text-[11px] font-medium w-fit"
                        />
                      </td>
                      <td className={className}>
                        <Typography className="text-lg font-semibold text-blue-gray-600">
                          19/19/2024
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography
                          as={Link}
                          to={`/add-evaluation/${id}`}
                          className="text-lg font-semibold text-blue-gray-600 mb-3 hover:text-green-600"
                        >
                          Add Evaluation
                        </Typography>
                        <Typography
                          as={Link}
                          to={`/edit-employee/${id}`}
                          className="text-lg font-semibold text-blue-gray-600 mb-3 hover:text-green-600"
                        >
                          Edit
                        </Typography>
                        <Typography
                          as="a"
                          href="#"
                          className="text-lg font-semibold text-blue-gray-600 hover:text-red-600"
                          onClick={() => handleDeleteEmployee(id)}
                        >
                          Delete
                        </Typography>
                      </td>
                    </tr>
                  );
                }
              ) : (
                <tr>
                  <td colSpan="5">
                    <Typography className="text-center">No employees found</Typography>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </div>
  );
}

export default Employees;
