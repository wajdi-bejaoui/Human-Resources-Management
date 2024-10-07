// import {
//     Card,
//     CardHeader,
//     CardBody,
//     Typography,
//     Avatar,
//     Chip,
//     Tooltip,
//     Progress,
//   } from "@material-tailwind/react";
//   import { employeesTableData, projectsTableData } from "../../data";
//   import React, { useEffect, useState } from 'react';
//   import axios from 'axios';


// function congees() {
//     const [congees, setCongees] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     return (
//         <div className="mt-8 mb-8 flex flex-col gap-12">
//           <Card>
//             <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
//               <Typography variant="h5" color="white">
//                 Employees Table
//               </Typography>
//             </CardHeader>
//             <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
//               <table className="w-full min-w-[640px] table-auto">
//                 <thead>
//                   <tr>
//                     {["Employee", "function", "status", "employed", ""].map((el) => (
//                       <th
//                         key={el}
//                         className="border-b border-blue-gray-50 py-3 px-5 text-left"
//                       >
//                         <Typography
//                           variant="small"
//                           className="text-[13px] font-bold uppercase text-blue-gray-400"
//                         >
//                           {el}
//                         </Typography>
//                       </th>
//                     ))}
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {employees.map(
//                     ({ id, fullname, email, role, online, date }, key) => {
//                       const className = `py-3 px-5 ${
//                         key === employees.length - 1
//                           ? ""
//                           : "border-b border-blue-gray-50"
//                       }`;
    
//                       return (
//                         <tr key={id}>
//                           <td className={className}>
//                             <div className="flex items-center gap-4">
//                               <Avatar src={"/img/team-2.jpeg"} alt={fullname} size="md" variant="rounded" />
//                               <div>
//                                 <Typography
//                                   color="blue-gray"
//                                   className="text-lg font-bold"
//                                 >
//                                   {fullname}
//                                 </Typography>
//                                 <Typography className="text-lg font-normal text-blue-gray-500">
//                                   {email}
//                                 </Typography>
//                               </div>
//                             </div>
//                           </td>
//                           <td className={className}>
//                             <Typography className="text-lg font-semibold text-blue-gray-600">
//                               {role}
//                             </Typography>
//                             {/* <Typography className="text-xs font-normal text-blue-gray-500">
//                               {role}
//                             </Typography> */}
//                           </td>
//                           <td className={className}>
//                             {/* <Chip
//                               variant="gradient"
//                               color={online ? "green" : "blue-gray"}
//                               value={online ? "online" : "offline"}
//                               className="py-0.5 px-2 text-[11px] font-medium w-fit"
//                             /> */}
//                             <Chip
//                               variant="gradient"
//                               color="blue-gray"
//                               value="offline"
//                               className="py-0.5 px-2 text-[11px] font-medium w-fit"
//                             />
//                           </td>
//                           <td className={className}>
//                             <Typography className="text-lg font-semibold text-blue-gray-600">
//                               {/* {date} */}19/19/2024
//                             </Typography>
//                           </td>
//                           <td className={className}>
//                             <Typography
//                               as="a"
//                               href="#"
//                               className="text-lg font-semibold text-blue-gray-600 mb-3"
//                             >
//                               Edit
//                             </Typography>
//                             <Typography
//                               as="a"
//                               href="#"
//                               className="text-lg font-semibold text-blue-gray-600"
//                             >
//                               Delete
//                             </Typography>
//                           </td>
//                         </tr>
//                       );
//                     }
//                   )}
//                 </tbody>
//               </table>
//             </CardBody>
//           </Card>
//         </div>
//       );
// }

// export default congees