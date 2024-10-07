import React from 'react'

import { Link, useNavigate } from "react-router-dom";


function addEmployeeForm() {
  return (
    <div class="bg-gray-100 h-screen">
    <div class="header bg-white h-16 px-10 py-8 border-b-2 border-gray-200 flex items-center justify-between">
        <div class="flex items-center space-x-2 text-gray-400">
            <span class="text-green-700 tracking-wider font-thin text-md"><Link to="employees">Employees</Link></span>
            <span>/</span>
            <span class="tracking-wide text-md">
                <span class="text-base">Add Employee</span>
            </span>
            <span>/</span>
        </div>
    </div>
    <div class="flex flex-col mx-3 mt-6 lg:flex-row h-full w-full">
        <div class="w-full w-1/3 m-1">
            <form class="w-full h-full bg-white shadow-md p-6 flex flex-col items-center justify-center">
                <div class="header my-3 h-12 px-10 flex items-center justify-center">
                    <h1 class="font-medium text-2xl">Add Employee</h1>
                </div>
                <div class="flex flex-wrap -mx-3 mb-6 items-center justify-center">
                    <div class="w-full flex flex-row items-center justify-center">
                        <div class="w-full max-w-96  px-3 mb-6">
                            <label class="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2">Full name</label>
                            <input class="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none focus:border-[#98c01d]" type="text" name="name" placeholder="Full Name" required />
                        </div>

                        <div class="w-full max-w-96 px-3 mb-6">
                            <label class="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2">Email</label>
                            <input class="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none focus:border-[#98c01d]" type="email" name="email" placeholder="Email" required />
                        </div>
                    </div>

                    <div class="w-full flex flex-row items-center justify-center">
                      <div class="w-full max-w-96 md:w-full px-3 mb-6">
                          <label class="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2">Password</label>
                          <input class="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none focus:border-[#98c01d]" type="password" name="password" placeholder="Password" required />
                      </div>
                      <div class="w-full max-w-96 md:w-full px-3 mb-6">
                          <label class="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2">Repeat Password</label>
                          <input class="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none focus:border-[#98c01d]" type="password" name="password" placeholder="Password" required />
                      </div>
                    </div>

                    

                    

                    <div class="w-full px-3 mb-8">
                        <label class="mx-auto cursor-pointer flex w-full max-w-lg flex-col items-center justify-center rounded-xl border-2 border-dashed border-green-400 bg-white p-6 text-center" htmlFor="dropzone-file">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-green-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                            </svg>

                            <h2 class="mt-4 text-xl font-medium text-gray-700 tracking-wide">Employee image</h2>

                            <p class="mt-2 text-gray-500 tracking-wide">Upload or drag & drop your file SVG, PNG, JPG, or GIF.</p>

                            <input id="dropzone-file" type="file" class="hidden" name="category_image" accept="image/png, image/jpeg, image/webp" />
                        </label>
                    </div>

                    <div class="w-full max-w-96 px-3 mb-6">
                        <button class="appearance-none block w-full bg-green-700 text-gray-100 font-bold border border-gray-200 rounded-lg py-3 px-3 leading-tight hover:bg-green-600 focus:outline-none focus:bg-white focus:border-gray-500">Add Employee</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>

  )
}

export default addEmployeeForm



{/* <div class="w-full px-3 mb-8">
                        <label class="mx-auto cursor-pointer flex w-full max-w-lg flex-col items-center justify-center rounded-xl border-2 border-dashed border-green-400 bg-white p-6 text-center" htmlFor="dropzone-file">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-green-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                            </svg>

                            <h2 class="mt-4 text-xl font-medium text-gray-700 tracking-wide">Employee image</h2>

                            <p class="mt-2 text-gray-500 tracking-wide">Upload or drag & drop your file SVG, PNG, JPG, or GIF.</p>

                            <input id="dropzone-file" type="file" class="hidden" name="category_image" accept="image/png, image/jpeg, image/webp" />
                        </label>
                    </div> */}