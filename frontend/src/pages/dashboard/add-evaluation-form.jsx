import React, { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import { addEvaluation } from '../../api/evaluationApi';
import { Rating } from "@material-tailwind/react";


const years = [2021, 2022, 2023, 2024, 2025]; // You can adjust or dynamically generate this list
const periods = ['Q1', 'Q2', 'Q3', 'Q4', 'Full Year'];


function AddEvaluationForm() {
    const { id } = useParams(); // Get employee ID from the URL
  const [evaluation, setEvaluation] = useState({
    periodRated: '',
    rate: 0,
    year: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEvaluation({ ...evaluation, [name]: value });
  };

   // Handle year and period selection change
   const handlePeriodRatedChange = (e) => {
    const value = e.target.value;
    setEvaluation({ ...evaluation, periodRated: value });
  };

  const handleRatingChange = (newValue) => {
    setEvaluation({ ...evaluation, rate: newValue });
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const token = localStorage.getItem('token');  // Retrieve the token from localStorage

      evaluation.userId=id
      console.log(evaluation)
      const response = await addEvaluation( evaluation, {
        headers: {
          'Authorization': `Bearer ${token}`,  // Include the token in the Authorization header
        },
      });

      setError()
      setSuccess(response.message)

      console.log(response);
      setEvaluation({
        periodRated: '',
        rate: 0,
        year: ''
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
            <Link to="evaluations">Evaluations</Link>
          </span>
          <span>/</span>
          <span className="tracking-wide text-md">
            <span className="text-base">Add Evaluation</span>
          </span>
          <span>/</span>
        </div>
      </div>
      <div className="flex flex-col px-3 pt-6 lg:flex-row h-full w-full bg-white">
        <div className="w-full w-1/3 m-1">
          <form className="w-full h-full bg-white shadow-md p-6 flex flex-col items-center justify-center" onSubmit={handleSubmit}>
            <div className="header my-3 h-12 px-10 flex items-center justify-center">
              <h1 className="font-medium text-2xl">Add Evaluation</h1>
            </div>
            {error && <p className="text-red-600 bg-red-100 border border-red-400 rounded p-2 mb-4">{error}</p>}
            {success && <p className="text-green-600 bg-green-100 border border-green-400 rounded p-2 mb-4">{success}</p>}

            <div className="flex flex-wrap -mx-3 mb-6 items-center justify-center">
              <div className="w-full flex flex-row items-center justify-center">
                <div className="w-full max-w-96 px-3 mb-6">
                  <label className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2">Select Year :</label>
                  <select
          name="year"
          className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none focus:border-[#98c01d]"
          value={evaluation.year}
          onChange={handleInputChange}
        >
          <option value="">--Select Year--</option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
                </div>

                <div className="w-full max-w-96 px-3 mb-6">
                  <label className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2">Select Period :</label>
                  <select
          name="periodRated"
          className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none focus:border-[#98c01d]"
          value={evaluation.periodRated}
          onChange={handlePeriodRatedChange}
        >
          <option value="">--Select Period--</option>
          {periods.map((period) => (
            <option key={period} value={period}>
              {period}
            </option>
          ))}
        </select>
              </div>
              </div>

              <div className="w-full flex flex-row items-center justify-center">
                <div className="w-full max-w-96 px-1 mb-6">
                  <label className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2">Type Evaluation</label>
                  <Rating value={evaluation.rate}  onChange={handleRatingChange}/>
                </div>
                {/* <div className="w-full max-w-96 px-3 mb-6">
                  <label className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2"></label>
                  <input
                    className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none focus:border-[#98c01d]"
                    type="password"
                    name="confirmPassword"
                    placeholder="Password"
                    value={Evaluation.confirmPassword}
                    onChange={handleInputChange}
                    required
                  />
                </div> */}
              </div>
              

              

              <div className="w-full max-w-96 px-3 mb-6">

                <button 
                type="submit"
                // disabled={loading}
                // className='w-full bg-green-600 text-gray-100 font-bold border border-gray-200 rounded-lg py-3 px-3 hover:bg-green-900 transition duration-150 ease-in-out'
                className='w-full bg-green-600 font-bold py-3 px-3 border rounded-lg border-black hover:bg-green-900 transition duration-150 ease-in-out hover:text-gray-200 hover:border-0'
                >
                  {/* {loading ? "Adding Evaluation..." : "Add Evaluation"} */}
                  Add Evaluation

                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddEvaluationForm;
