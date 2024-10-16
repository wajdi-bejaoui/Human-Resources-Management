import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Chip,

  } from "@material-tailwind/react";
  import React, { useEffect, useState } from 'react';
  import { Link, useNavigate } from "react-router-dom";
import { deleteMyHoraires, getMyHoraires } from "../../api/horaireApi";

  
const months = [
    { value: "", label: 'All Months' },
    { value: 1, label: 'January' },
    { value: 2, label: 'February' },
    { value: 3, label: 'March' },
    { value: 4, label: 'April' },
    { value: 5, label: 'May' },
    { value: 6, label: 'June' },
    { value: 7, label: 'July' },
    { value: 8, label: 'August' },
    { value: 9, label: 'September' },
    { value: 10, label: 'October' },
    { value: 11, label: 'November' },
    { value: 12, label: 'December' },
  ];

  
  export function MyReportsList() {
    const [horaires, setHoraires] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState(""); // State to store selected filter


  // const [open, setOpen] = useState(false);
 
  // const handleOpen = () => setOpen(!open);


  useEffect(() => {
    const fetchHoraires = async () => {
      try {
        const filters = {
            month : filter
        }
        const token = localStorage.getItem('token'); 
        const response = await getMyHoraires({
          params : filters,
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        console.log(response)
        setHoraires(response);
      } catch (err) {
        setHoraires([])
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHoraires();
  }, [filter]);


  const deleteHoraire = async (id) => {
    try {
      console.log("delete called")
      const token = localStorage.getItem('token'); 

      const response = await deleteMyHoraires(id, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      // Update Horaires list after successful deletion
      setHoraires((prevHoraires) => prevHoraires.filter((emp) => emp.id !== id));

      console.log(response)
      // alert('Horaire deleted successfully');
      // handleClose();  // Close the dialog after successful deletion
    } catch (error) {
      console.error('Error deleting Horaire:', error);
      alert('Failed to delete Horaire');
    }
  };



    return (
      <div className="mt-8 mb-8 flex flex-col gap-12">
        <Card>
          <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
          <div className="flex flex-row justify-between items-center">
            <Typography variant="h5" color="white">
              Horaire Table
            </Typography>
            {/* Filter Dropdown */}
            <div className="px-6">
              
              {/* <label className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2">Filter Congees</label> */}
              <select
                className=" w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 focus:outline-none focus:border-[#98c01d]"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                {months.map((leave) => (
                <option key={leave.value} value={leave.value}>
                  {leave.label}
                </option>
              ))}
              </select>
            </div>
            </div>
          </CardHeader>
          <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
            <table className="w-full min-w-[640px] table-auto">
              <thead>
                <tr>
                {["Date", "Start/End Time", "Total Hours per Day"].map((el) => (
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
                {horaires.length > 0 ? horaires.map(
                  ({ id, date, startTime, endTime, status }, key) => {
                    const className = `py-3 px-5 ${
                      key === horaires.length - 1
                        ? ""
                        : "border-b border-blue-gray-50"
                    }`;
  
                    return (
                      <tr key={id}>
                        
                        <td className={className}>
                          <Typography className="text-lg font-semibold text-blue-gray-600">
                            {date}
                          </Typography>
                        </td>
                        <td className={className}>
                          <Typography className="text-lg font-semibold text-blue-gray-600">
                            {startTime}
                          </Typography>
                          <Typography className="text-lg font-normal text-blue-gray-500">
                            {endTime}
                          </Typography>
                        </td>
                        <td className={className}>
                            {(() => {
                                // Dummy date to associate with the times
                                //const dummyDate = '2024-01-01'; // Change this to any valid date

                                // Parse startTime and endTime with the dummy date
                                const startDate = new Date(`${date}T${startTime}`);
                                const endDate = new Date(`${date}T${endTime}`);

                                // Log the parsed dates for debugging
                                //console.log("Parsed Start Date:", startDate);
                                //console.log("Parsed End Date:", endDate);

                                // Check if the dates are valid
                                if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
                                return "Invalid Time"; // Handle invalid times gracefully
                                }

                                // Calculate the difference in milliseconds
                                const differenceInMilliseconds = endDate - startDate;

                                // Handle case where startTime is after endTime
                                if (differenceInMilliseconds < 0) {
                                return "End time is before start time";
                                }

                                const differenceInMinutes = Math.floor(differenceInMilliseconds / 60000); // Convert to minutes
                                
                                const hours = Math.floor(differenceInMinutes / 60); // Calculate hours
                                const minutes = differenceInMinutes % 60; // Calculate remaining minutes
                                return `${hours} hours ${minutes} minutes`;
                                // return `${differenceInMinutes} minutes`; // Return the formatted difference
                            })()}            
                        </td>
                        <td className={className}>
                          {/* <Typography
                            as={Link}
                            to={`/edit-horaire/${id}`}
                            className="text-lg font-semibold text-blue-gray-600 mb-3 hover:text-green-600"
                          >
                            Edit
                          </Typography> */}
                          
                          
                          
                        {/* <Typography
                            as="a"
                            href="#"
                            className="text-lg font-semibold text-blue-gray-600 hover:text-red-600"
                            onClick={() => deleteHoraire(id)}
                          >
                            Delete
                          </Typography> */}
                        </td>
                        
                      </tr>
                    );
                  }
                ) : (
                  <p>There are no horaires</p>
              )}
              </tbody>
            </table>
          </CardBody>
        </Card>
      </div>
    );
  }
  
  export default MyReportsList;
  