import axios from "axios";

// const apiUrl = process.env.API_URL;
const apiUrl = 'http://localhost:3000/api'



export const getEmployees = async (data) => {

    const response = await axios.get(`${apiUrl}/users/employee`);

    return response.data;
        
};