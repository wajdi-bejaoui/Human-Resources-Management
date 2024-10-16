import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import { addMyCongee } from '../../api/congeeApi';



function AddMyCongeeForm() {
  const [congee, setCongee] = useState({
    debut: '',
    fin: '',
    typeCongee: '',
    nbJour: '',
    file: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCongee({ ...congee, [name]: value });
  };

  const handleImageChange = (e) => {
    setCongee({ ...congee, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem('token');  // Retrieve the token from localStorage

      const formData = new FormData();
      formData.append('debut', congee.debut);
      formData.append('fin', congee.fin);
      formData.append('typeCongee', congee.typeCongee);
      formData.append('nbJour', congee.nbJour);
      formData.append('file', congee.file);

      


      const response = await addMyCongee( formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,  // Include the token in the Authorization header
        },
      });

      setError()
      setSuccess(response.message)

      console.log(response);
      setCongee({
        debut: '',
        fin: '',
        typeCongee: '',
        nbJour: '',
        file: null,
      })
    } catch (err) {
      setSuccess()
      setError(err.response.data.message)
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 h-screen">
      <div className="header bg-white h-16 px-10 py-8 border-b-2 border-gray-200 flex items-center justify-between">
        <div className="flex items-center space-x-2 text-gray-400">
          <span className="text-green-700 tracking-wider font-thin text-md">
            <Link to="congees">Congees</Link>
          </span>
          <span>/</span>
          <span className="tracking-wide text-md">
            <span className="text-base">Add Congee</span>
          </span>
          <span>/</span>
        </div>
      </div>
      <div className="flex flex-col px-3 pt-6 lg:flex-row h-full w-full bg-white">
        <div className="w-full w-1/3 m-1">
          <form className="w-full h-full bg-white shadow-md p-6 flex flex-col items-center justify-center" onSubmit={handleSubmit}>
            <div className="header my-3 h-12 px-10 flex items-center justify-center">
              <h1 className="font-medium text-2xl">Add Congee</h1>
            </div>
            {error && <p className="text-red-600 bg-red-100 border border-red-400 rounded p-2 mb-4">{error}</p>}
            {success && <p className="text-green-600 bg-green-100 border border-green-400 rounded p-2 mb-4">{success}</p>}

            <div className="flex flex-wrap -mx-3 mb-6 items-center justify-center">
              <div className="w-full flex flex-row items-center justify-center">
                <div className="w-full max-w-96 px-3 mb-6">
                  <label className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2">Begin Date</label>
                  <input
                    className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none focus:border-[#98c01d]"
                    type="date"
                    name="debut"
                    placeholder="Begin date"
                    value={congee.debut}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="w-full max-w-96 px-3 mb-6">
                  <label className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2">End Date</label>
                  <input
                    className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none focus:border-[#98c01d]"
                    type="date"
                    name="fin"
                    placeholder="End Date"
                    value={congee.end}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="w-full flex flex-row items-center justify-center">
                <div className="w-full max-w-96 px-3 mb-6">
                  <label className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2">Type Congee</label>
                  <select
                    className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none focus:border-[#98c01d]"
                    name="typeCongee"
                    value={congee.typeCongee}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="" disabled>-- Select Type of Congee --</option>
                    <option value="sick">Sick Leave</option>
                    <option value="vacation">Vacation Leave</option>
                    <option value="maternity">Maternity Leave</option>
                    <option value="paternity">Paternity Leave</option>
                    <option value="unpaid">Unpaid Leave</option>
                  </select>
                </div>

                {/* <div className="w-full max-w-96 px-3 mb-6">
                  <label className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2"></label>
                  <input
                    className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none focus:border-[#98c01d]"
                    type="password"
                    name="confirmPassword"
                    placeholder="Password"
                    value={congee.confirmPassword}
                    onChange={handleInputChange}
                    required
                  />
                </div> */}
              </div>

              <div className="w-full px-3 mb-8">
                <label
                  className="mx-auto cursor-pointer flex w-full max-w-lg flex-col items-center justify-center rounded-xl border-2 border-dashed border-green-400 bg-white p-6 text-center"
                  htmlFor="dropzone-file"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  {!congee.image &&<h2 className="mt-4 text-xl font-medium text-gray-700 tracking-wide">Select Congee File</h2>}
                  {congee.image &&<h2 className="mt-4 text-xl font-medium text-gray-700 tracking-wide">File Selected</h2>}
                  

                  <p className="mt-2 text-gray-500 tracking-wide">Reupload or drag & drop your file (PDF, DOCX, SVG, PNG, JPG, GIF).</p>
                  <input
                    id="dropzone-file"
                    type="file"
                    className="hidden"
                    name="image"
                    accept="application/pdf, application/vnd.openxmlformats-officedocument.wordprocessingml.document, image/png, image/jpeg, image/webp, image/svg+xml"
                    onChange={handleImageChange}
                  />
                </label>
              </div>

              <div className="w-full max-w-96 px-3 mb-6">

                <button 
                type="submit"
                // disabled={loading}
                // className='w-full bg-green-600 text-gray-100 font-bold border border-gray-200 rounded-lg py-3 px-3 hover:bg-green-900 transition duration-150 ease-in-out'
                className='w-full bg-green-600 font-bold py-3 px-3 border rounded-lg border-black hover:bg-green-900 transition duration-150 ease-in-out hover:text-gray-200 hover:border-0'
                >
                  {/* {loading ? "Adding Congee..." : "Add Congee"} */}
                  Add Congee

                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddMyCongeeForm;
