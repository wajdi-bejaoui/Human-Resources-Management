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
import { acceptHoraire, refuseHoraire, getHoraires } from "../../api/horaireApi";

  


  
  export function HoraireList() {
    const [horaires, setHoraires] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // const [open, setOpen] = useState(false);
 
  // const handleOpen = () => setOpen(!open);


  useEffect(() => {
    const fetchHoraires = async () => {
      try {
        const token = localStorage.getItem('token'); 
        const response = await getHoraires({
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
  }, []);


  const horaireRefuse = async (id) => {
    try {
        console.log("accept called")
        const token = localStorage.getItem('token'); 
  
        const response = await refuseHoraire(id, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
  
        // Update Horaires list after successful update
        setHoraires((prevHoraires) =>
            prevHoraires.map((horaire) =>
                horaire.id === id ? { ...horaire, status: "refused" } : horaire
            )
          );
  
        console.log(response)
        // alert('Horaire deleted successfully');
        // handleClose();  // Close the dialog after successful deletion
      } catch (error) {
        console.error('Error refusing Horaire:', error);
        alert('Failed to refuse Horaire');
      }
  }

  const horaireAccept = async (id) => {
    try {
        console.log("accept called")
        const token = localStorage.getItem('token'); 
  
        const response = await acceptHoraire(id, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
  
        // Update Horaires list after successful update
        setHoraires((prevHoraires) =>
            prevHoraires.map((horaire) =>
                horaire.id === id ? { ...horaire, status: "confirmed" } : horaire
            )
          );
  
        console.log(response)
        // alert('Horaire deleted successfully');
        // handleClose();  // Close the dialog after successful deletion
      } catch (error) {
        console.error('Error accepting Horaire:', error);
        alert('Failed to accept Horaire');
      }
  }



    return (
      <div className="mt-8 mb-8 flex flex-col gap-12">
        <Card>
          <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
            <Typography variant="h5" color="white">
              Horaires Table
            </Typography>
          </CardHeader>
          <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
            <table className="w-full min-w-[640px] table-auto">
              <thead>
                <tr>
                  {["Employee", "Date", "Start/End Time", "Status"].map((el) => (
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
                  ({ id, User, date, startTime, endTime, status }, key) => {
                    const className = `py-3 px-5 ${
                      key === horaires.length - 1
                        ? ""
                        : "border-b border-blue-gray-50"
                    }`;
  
                    return (
                      <tr key={id}>
                        <td className={className}>
                          <div className="flex items-center gap-4">
                          
                            {/* {user.imageUrl && <Avatar src={`http://localhost:3000${user.imageUrl}`} alt={user.fullname} size="md" variant="rounded" />} */}
                            {/* {!user.imageUrl && <Avatar src={"/img/team-2.jpeg"} alt={user.fullname} size="md" variant="rounded" />} */}
                            <div>
                              <Typography
                                color="blue-gray"
                                className="text-lg font-bold"
                              >
                                {User.fullname}
                              </Typography>
                              <Typography className="text-lg font-normal text-blue-gray-500">
                                {User.email}
                              </Typography>
                            </div>
                          </div>
                        </td>
                        
                        
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
                          <Chip
                            variant="gradient"
                            color={status === "confirmed" ? "green" : status === "refused" ? "red" : "orange"}
                            value={status==0 ? "null" : status}
                            className="py-0.5 px-2 text-[11px] font-medium w-fit"
                          />
                          
                        </td>
                        <td className={className}>
                          <Typography
                            as={Link}
                            className="text-lg font-semibold text-blue-gray-600 mb-3 hover:text-green-600"
                            onClick={() => horaireAccept(id)}

                          >
                            Confirm
                          </Typography>
                          
                          
                          
                        <Typography
                            as="a"
                            href="#"
                            className="text-lg font-semibold text-blue-gray-600 hover:text-red-600"
                            onClick={() => horaireRefuse(id)}
                          >
                            Refuse
                          </Typography>
                        </td>
                        
                      </tr>
                    );
                  }
                ) : (
                  <p>There are no Horaires</p>
              )}
              </tbody>
            </table>
          </CardBody>
        </Card>
      </div>
    );
  }
  
  export default HoraireList;
  