import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from "react-router-dom";

function EditEmployeeForm() {
  const { id } = useParams(); // Get employee ID from the URL
  const [employee, setEmployee] = useState({
    fullname: '',
    email: '',
    password: '',
    confirmPassword: '',
    image: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    // Fetch the employee data using the ID
    const fetchEmployee = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:3000/api/employees/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const { fullname, email } = response.data;
        setEmployee((prev) => ({ ...prev, fullname, email }));
      } catch (err) {
        setError('Failed to fetch employee data');
      }
    };
    fetchEmployee();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  const handleImageChange = (e) => {
    setEmployee({ ...employee, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem('token'); 

      const formData = new FormData();
      console.log(employee.fullname)
      formData.append('fullname', employee.fullname);
      formData.append('email', employee.email);
      if (employee.password)
        formData.append('password', employee.password);
      if (employee.image) {
        formData.append('image', employee.image);
      }

      for (let pair of formData.entries()) {
        console.log(`${pair[0]}: ${pair[1]}`);
      }

      const response = await axios.patch(`http://localhost:3000/api/employees/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
        },
      });

      setError(null);
      setSuccess(response.data.message);

      console.log(response.data);
    } catch (err) {
      setSuccess(null);
      setError(err.response?.data?.message || 'Failed to update employee');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 h-screen">
      <div className="header bg-white h-16 px-10 py-8 border-b-2 border-gray-200 flex items-center justify-between">
        <div className="flex items-center space-x-2 text-gray-400">
          <span className="text-green-700 tracking-wider font-thin text-md">
            <Link to="/employees">Employees</Link>
          </span>
          <span>/</span>
          <span className="tracking-wide text-md">
            <span className="text-base">Edit Employee</span>
          </span>
        </div>
      </div>
      <div className="flex flex-col px-3 pt-6 lg:flex-row h-full w-full bg-white">
        <div className="w-full w-1/3 m-1">
          <form className="w-full h-full bg-white shadow-md p-6 flex flex-col items-center justify-center" onSubmit={handleSubmit}>
            <div className="header my-3 h-12 px-10 flex items-center justify-center">
              <h1 className="font-medium text-2xl">Edit Employee</h1>
            </div>
            {error && <p className="text-red-600 bg-red-100 border border-red-400 rounded p-2 mb-4">{error}</p>}
            {success && <p className="text-green-600 bg-green-100 border border-green-400 rounded p-2 mb-4">{success}</p>}

            <div className="flex flex-wrap -mx-3 mb-6 items-center justify-center">
              <div className="w-full flex flex-row items-center justify-center">
                <div className="w-full max-w-96 px-3 mb-6">
                  <label className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2">Full name</label>
                  <input
                    className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none focus:border-[#98c01d]"
                    type="text"
                    name="fullname"
                    placeholder="Full Name"
                    value={employee.fullname}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="w-full max-w-96 px-3 mb-6">
                  <label className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2">Email</label>
                  <input
                    className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none focus:border-[#98c01d]"
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={employee.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="w-full flex flex-row items-center justify-center">
                <div className="w-full max-w-96 px-3 mb-6">
                  <label className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2">Password</label>
                  <input
                    className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none focus:border-[#98c01d]"
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={employee.password}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="w-full max-w-96 px-3 mb-6">
                  <label className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2">Repeat Password</label>
                  <input
                    className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none focus:border-[#98c01d]"
                    type="password"
                    name="confirmPassword"
                    placeholder="Password"
                    value={employee.confirmPassword}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="w-full px-3 mb-8">
                <label
                  className="mx-auto cursor-pointer flex w-full max-w-lg flex-col items-center justify-center rounded-xl border-2 border-dashed border-green-400 bg-white p-6 text-center"
                  htmlFor="dropzone-file"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  {!employee.image && <h2 className="mt-4 text-xl font-medium text-gray-700 tracking-wide">Employee image</h2>}
                  {employee.image && <h2 className="mt-4 text-xl font-medium text-gray-700 tracking-wide">Image Selected</h2>}
                  <p className="mt-2 text-gray-500 tracking-wide">Reupload or drag & drop your file SVG, PNG, JPG, or GIF.</p>
                  <input
                    id="dropzone-file"
                    type="file"
                    className="hidden"
                    name="image"
                    accept="image/png, image/jpeg, image/webp"
                    onChange={handleImageChange}
                  />
                </label>
              </div>

              <div className="w-full max-w-96 px-3 mb-6">
                <button
                  type="submit"
                  className='w-full bg-green-600 font-bold py-3 px-3 border rounded-lg border-black hover:bg-green-900 transition duration-150 ease-in-out hover:text-gray-200 hover:border-0'
                  disabled={loading}
                >
                  {loading ? 'Updating...' : 'Update Employee'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditEmployeeForm;
