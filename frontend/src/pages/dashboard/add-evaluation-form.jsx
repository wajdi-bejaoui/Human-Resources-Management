// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Link } from "react-router-dom";
// import { addEvaluation } from '../../api/evaluationApi';



// function addEvaluationForm() {
//   const [evaluation, setEvaluation] = useState({
//     periodRated: '',
//     rate: '',
//   });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(null);


//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setEvaluation({ ...evaluation, [name]: value });
//   };

//   const handleImageChange = (e) => {
//     setEvaluation({ ...evaluation, image: e.target.files[0] });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
    
//     try {
//       const token = localStorage.getItem('token');  // Retrieve the token from localStorage

//       const formData = new FormData();
//       formData.append('debut', evaluation.debut);
//       formData.append('fin', evaluation.fin);
//       formData.append('typeEvaluation', evaluation.a);
//       formData.append('nbJour', evaluation.nbJour);
//       formData.append('file', evaluation.file);

      


//       const response = await addEvaluation( formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//           'Authorization': `Bearer ${token}`,  // Include the token in the Authorization header
//         },
//       });

//       setError()
//       setSuccess(response.message)

//       console.log(response);
//       setEvaluation({
//         debut: '',
//         fin: '',
//         typeEvaluation: '',
//         nbJour: '',
//         file: null,
//       })
//     } catch (err) {
//       setSuccess()
//       setError(err.response.data.message)
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="bg-gray-100 h-screen">
//       <div className="header bg-white h-16 px-10 py-8 border-b-2 border-gray-200 flex items-center justify-between">
//         <div className="flex items-center space-x-2 text-gray-400">
//           <span className="text-green-700 tracking-wider font-thin text-md">
//             <Link to="evaluations">Evaluations</Link>
//           </span>
//           <span>/</span>
//           <span className="tracking-wide text-md">
//             <span className="text-base">Add Evaluation</span>
//           </span>
//           <span>/</span>
//         </div>
//       </div>
//       <div className="flex flex-col px-3 pt-6 lg:flex-row h-full w-full bg-white">
//         <div className="w-full w-1/3 m-1">
//           <form className="w-full h-full bg-white shadow-md p-6 flex flex-col items-center justify-center" onSubmit={handleSubmit}>
//             <div className="header my-3 h-12 px-10 flex items-center justify-center">
//               <h1 className="font-medium text-2xl">Add Evaluation</h1>
//             </div>
//             {error && <p className="text-red-600 bg-red-100 border border-red-400 rounded p-2 mb-4">{error}</p>}
//             {success && <p className="text-green-600 bg-green-100 border border-green-400 rounded p-2 mb-4">{success}</p>}

//             <div className="flex flex-wrap -mx-3 mb-6 items-center justify-center">
//               <div className="w-full flex flex-row items-center justify-center">
//                 <div className="w-full max-w-96 px-3 mb-6">
//                   <label className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2">Begin Date</label>
//                   <input
//                     className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none focus:border-[#98c01d]"
//                     type="date"
//                     name="debut"
//                     placeholder="Begin date"
//                     value={evaluation.debut}
//                     onChange={handleInputChange}
//                     required
//                   />
//                 </div>

//                 <div className="w-full max-w-96 px-3 mb-6">
//                   <label className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2">End Date</label>
//                   <input
//                     className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none focus:border-[#98c01d]"
//                     type="date"
//                     name="fin"
//                     placeholder="End Date"
//                     value={evaluation.end}
//                     onChange={handleInputChange}
//                     required
//                   />
//                 </div>
//               </div>

//               <div className="w-full flex flex-row items-center justify-center">
//                 <div className="w-full max-w-96 px-3 mb-6">
//                   <label className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2">Type Evaluation</label>
//                   <input
//                     className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none focus:border-[#98c01d]"
//                     type="text"
//                     name="typeEvaluation"
//                     placeholder="Type Evaluation"
//                     value={evaluation.typeEvaluation}
//                     onChange={handleInputChange}
//                     required
//                   />
//                 </div>
//                 {/* <div className="w-full max-w-96 px-3 mb-6">
//                   <label className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2"></label>
//                   <input
//                     className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none focus:border-[#98c01d]"
//                     type="password"
//                     name="confirmPassword"
//                     placeholder="Password"
//                     value={Evaluation.confirmPassword}
//                     onChange={handleInputChange}
//                     required
//                   />
//                 </div> */}
//               </div>

              

//               <div className="w-full max-w-96 px-3 mb-6">

//                 <button 
//                 type="submit"
//                 // disabled={loading}
//                 // className='w-full bg-green-600 text-gray-100 font-bold border border-gray-200 rounded-lg py-3 px-3 hover:bg-green-900 transition duration-150 ease-in-out'
//                 className='w-full bg-green-600 font-bold py-3 px-3 border rounded-lg border-black hover:bg-green-900 transition duration-150 ease-in-out hover:text-gray-200 hover:border-0'
//                 >
//                   {/* {loading ? "Adding Evaluation..." : "Add Evaluation"} */}
//                   Add Evaluation

//                 </button>
//               </div>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default addEvaluationForm;
