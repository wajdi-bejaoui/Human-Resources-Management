import axios from "axios";

// const apiUrl = process.env.API_URL;
const apiUrl = 'http://localhost:3000/api/congees'



export const addMyCongee = async (data, headers) => {

    // Log FormData entries
for (let [key, value] of data.entries()) {
    console.log(`${key}: ${value}`);
  }

    const response = await axios.post(`${apiUrl}/myCongee`, data, headers);

    return response.data;
        
};

export const getCongees = async (data, headers) => {

    const response = await axios.get(`${apiUrl}`, headers);

    return response.data;
        
};

export const getMyCongees = async (headers) => {

    const response = await axios.get(`${apiUrl}/myCongee`, headers);

    return response.data;
        
};

export const deleteMyCongees = async (id,headers) => {

    const response = await axios.delete(`${apiUrl}/myCongee/${id}`, headers);

    return response.data;
        
};
