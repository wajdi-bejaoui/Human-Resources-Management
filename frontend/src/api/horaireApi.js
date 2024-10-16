import axios from "axios";

// const apiUrl = process.env.API_URL;
const apiUrl = 'http://localhost:3000/api/horaires'



export const addMyHoraire = async (data, headers) => {


    const response = await axios.post(`${apiUrl}/myHoraire`, data, headers);

    return response.data;
        
};

export const getHoraires = async (headers) => {
    console.log(headers)
    const response = await axios.get(`${apiUrl}`, headers);

    return response.data;
        
};

export const getMyHoraires = async ({ params, headers }) => {

    const response = await axios.get(`${apiUrl}/myHoraire`, { params, headers });

    return response.data;
        
};

export const deleteMyHoraires = async (id,headers) => {

    const response = await axios.delete(`${apiUrl}/myHoraire/${id}`, headers);

    return response.data;
        
};

export const acceptHoraire = async (id,headers) => {

    const response = await axios.get(`${apiUrl}/confirm/${id}`, headers);

    return response.data;
        
};

export const refuseHoraire = async (id,headers) => {

    const response = await axios.get(`${apiUrl}/reject/${id}`, headers);

    return response.data;
        
};
