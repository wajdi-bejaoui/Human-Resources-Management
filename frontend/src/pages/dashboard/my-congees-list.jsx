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
import { deleteMyCongees, getMyCongees } from "../../api/congeeApi";

  


  
  export function MyCongeesList() {
    const [congees, setCongees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // const [open, setOpen] = useState(false);
 
  // const handleOpen = () => setOpen(!open);


  useEffect(() => {
    const fetchCongees = async () => {
      try {
        const token = localStorage.getItem('token'); 
        const response = await getMyCongees({
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
  }, []);


  const deleteCongee = async (id) => {
    try {
      console.log("delete called")
      const token = localStorage.getItem('token'); 

      const response = await deleteMyCongees(id, {
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
            <Typography variant="h5" color="white">
              Congees Table
            </Typography>
          </CardHeader>
          <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
            <table className="w-full min-w-[640px] table-auto">
              <thead>
                <tr>
                  {["Begin/End date", "Type congee", "Nb days", "Status"].map((el) => (
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
                  ({ id, debut, fin, typeCongee, nbJour,status }, key) => {
                    const className = `py-3 px-5 ${
                      key === congees.length - 1
                        ? ""
                        : "border-b border-blue-gray-50"
                    }`;
  
                    return (
                      <tr key={id}>
                        
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
                            value={status==0 ? "null" : status}
                            className="py-0.5 px-2 text-[11px] font-medium w-fit"
                          />
                          
                        </td>
                        <td className={className}>
                          <Typography
                            as={Link}
                            to={`/edit-congee/${id}`}
                            className="text-lg font-semibold text-blue-gray-600 mb-3 hover:text-green-600"
                          >
                            Edit
                          </Typography>
                          
                          
                          
                        <Typography
                            as="a"
                            href="#"
                            className="text-lg font-semibold text-blue-gray-600 hover:text-red-600"
                            onClick={() => deleteCongee(id)}
                          >
                            Delete
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
  
  export default MyCongeesList;
  