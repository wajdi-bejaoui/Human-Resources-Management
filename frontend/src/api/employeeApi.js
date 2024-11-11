import axios from "axios";

// const apiUrl = process.env.API_URL;
const apiUrl = 'http://localhost:3000/api'



export const getEmployees = async (data) => {

    const response = await axios.get(`${apiUrl}/users/employee`);

    return response.data;
        
};

export const deleteEmployees = async (id) => {
    const token = localStorage.getItem('token');

    const response = await axios.delete(`http://localhost:3000/api/employees/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

    return response;   
};


export const updateEmployees = async (id,formData) => {
    const token = localStorage.getItem('token');

    const response = await axios.patch(`http://localhost:3000/api/employees/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

    return response;   
};