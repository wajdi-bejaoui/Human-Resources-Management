import axios from "axios";

// const apiUrl = process.env.API_URL;
const apiUrl = 'http://localhost:3000/api/auth'



export const login = async (data) => {

    const response = await axios.post(`${apiUrl}/login`, data);

    return response.data;
        
};

export const register = async (data) => {

    const response = await axios.post(`${apiUrl}/register`, data)

    return response
};

