import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Avatar,
    Chip,

  } from "@material-tailwind/react";
  import React, { useEffect, useState } from 'react';
  import axios from 'axios';
  import Dialog from './dialog'
  import { Link, useNavigate } from "react-router-dom";
import { acceptCongee, getCongees, refuseCongee } from "../../api/congeeApi";


const typeCongeeList = [
  {
    label : 'Sick Leave',
    value : 'sick'
  },
  {
    label : 'Vacation Leave',
    value : 'vacation'
  },
  {
    label : 'Maternity Leave',
    value : 'maternity'
  },
  {
    label : 'Paternity Leave',
    value : 'paternity'
  },
  {
    label : 'Unpaid Leave',
    value : 'unpaid'
  },
]

const leaveTypes = [
  { value: "", label: "All" },
  // { value: "approved", label: "Approved" },
  // { value: "refused", label: "Refused" },
  // { value: "pending", label: "Pending" },
  { value: "sick", label: "Sick Leave" },
  { value: "vacation", label: "Vacation Leave" },
  { value: "maternity", label: "Maternity Leave" },
  { value: "paternity", label: "Paternity Leave" },
  { value: "unpaid", label: "Unpaid Leave"}
  ];

  
  export function Congees() {
    const [congees, setCongees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState(""); // State to store selected filter


  // const [open, setOpen] = useState(false);
 
  // const handleOpen = () => setOpen(!open);


  useEffect(() => {
    const fetchCongees = async () => {
      try {
        const token = localStorage.getItem('token'); 

        // const filters = {
        //   status: 'approved',
        //   typeCongee: 'vacation',
        //   startDate: '2024-01-01',
        //   endDate: '2024-01-31',
        // };
        const filters = {
          typeCongee : filter
        }
        const response = await getCongees({
          params : filters,
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        console.log(response)
        setCongees(response);
      } catch (err) {
        setCongees([])
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCongees();
  }, [filter]);


  const congeeRefuse = async (id) => {
    try {
        console.log("accept called")
        const token = localStorage.getItem('token'); 
  
        const response = await refuseCongee(id, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
  
        // Update congees list after successful update
        setCongees((prevCongees) =>
            prevCongees.map((congee) =>
              congee.id === id ? { ...congee, status: "refused" } : congee
            )
          );
  
        console.log(response)
        // alert('Congee deleted successfully');
        // handleClose();  // Close the dialog after successful deletion
      } catch (error) {
        console.error('Error refusing Congee:', error);
        alert('Failed to refuse Congee');
      }
  }


  const congeeAccept = async (id) => {
    try {
        console.log("accept called")
        const token = localStorage.getItem('token'); 
  
        const response = await acceptCongee(id, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
  
        // Update congees list after successful update
        setCongees((prevCongees) =>
            prevCongees.map((congee) =>
              congee.id === id ? { ...congee, status: "approved" } : congee
            )
          );
  
        console.log(response)
        // alert('Congee deleted successfully');
        // handleClose();  // Close the dialog after successful deletion
      } catch (error) {
        console.error('Error accepting Congee:', error);
        alert('Failed to accept Congee');
      }
  }
  const deleteCongee = async (id) => {
    try {
      console.log("delete called")
      const token = localStorage.getItem('token'); 

      const response = await axios.delete(`http://localhost:3000/api/congees/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      // Update congees list after successful deletion
      setCongees((prevCongees) => prevCongees.filter((emp) => emp.id !== id));

      console.log(response)
      // alert('Congee deleted successfully');
      // handleClose();  // Close the dialog after successful deletion
    } catch (error) {
      console.error('Error deleting Congee:', error);
      alert('Failed to delete Congee');
    }
  };



    return (
      <div className="mt-8 mb-8 flex flex-col gap-12">
        <Card>
          <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
            <div className="flex flex-row justify-between items-center">
            <Typography variant="h5" color="white">
              Congees Table
            </Typography>
            {/* Filter Dropdown */}
            <div className="px-6">
              
              {/* <label className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2">Filter Congees</label> */}
              <select
                className=" w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 focus:outline-none focus:border-[#98c01d]"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                {leaveTypes.map((leave) => (
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
                  {["Employee", "Begin/End date", "Type congee", "Nb days", "status"].map((el) => (
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
                {congees.length > 0 ? congees.map(
                  ({ id, user, debut, fin, typeCongee, nbJour,status }, key) => {
                    const className = `py-3 px-5 ${
                      key === congees.length - 1
                        ? ""
                        : "border-b border-blue-gray-50"
                    }`;
  
                    return (
                      <tr key={id}>
                        <td className={className}>
                          <div className="flex items-center gap-4">
                          
                            {user.imageUrl && <Avatar src={`http://localhost:3000${user.imageUrl}`} alt={user.fullname} size="md" variant="rounded" />}
                            {!user.imageUrl && <Avatar src={"/img/team-2.jpeg"} alt={user.fullname} size="md" variant="rounded" />}
                            <div>
                              <Typography
                                color="blue-gray"
                                className="text-lg font-bold"
                              >
                                {user.fullname}
                              </Typography>
                              <Typography className="text-lg font-normal text-blue-gray-500">
                                {user.email}
                              </Typography>
                            </div>
                          </div>
                        </td>
                        <td className={className}>
                          <Typography className="text-lg font-semibold text-blue-gray-600">
                            {debut}
                          </Typography>
                          <Typography className="text-lg font-normal text-blue-gray-500">
                            {fin}
                          </Typography>
                        </td>
                        <td className={className}>
                          {/* <Chip
                            variant="gradient"
                            color={online ? "green" : "blue-gray"}
                            value={online ? "online" : "offline"}
                            className="py-0.5 px-2 text-[11px] font-medium w-fit"
                          /> */}
                          <Chip
                            variant="gradient"
                            color="blue-gray"
                            value={typeCongee}
                            className="py-0.5 px-2 text-[11px] font-medium w-fit"
                          />
                        </td>
                        <td className={className}>
                          <Typography className="text-lg font-semibold text-blue-gray-600">
                            {nbJour}
                          </Typography>
                        </td>
                        <td className={className}>
                          <Chip
                            variant="gradient"
                            color={status === "approved" ? "green" : status === "refused" ? "red" : "orange"}
                            value={status}
                            className="py-0.5 px-2 text-[11px] font-medium w-fit"
                          />
                          
                        </td>
                        <td className={className}>
                          <Typography
                            as={Link}
                            onClick={() => congeeAccept(id)}
                            className="text-lg font-semibold text-blue-gray-600 mb-3 hover:text-green-600"
                          >
                            Accepter
                          </Typography>
                          <Typography
                            as="a"
                            href="#"
                            className="text-lg font-semibold text-blue-gray-600 hover:text-red-600"
                            onClick={() => congeeRefuse(id)}
                          >
                            Refuser
                          </Typography>
                          
                          
                        </td>
                      </tr>
                    );
                  }
                ) : (
                  <p>There are no congees</p>
              )}
              </tbody>
            </table>
          </CardBody>
        </Card>
      </div>
    );
  }
  
  export default Congees;
  