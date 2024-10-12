import axios from "axios";

// const apiUrl = process.env.API_URL;
const apiUrl = 'http://localhost:3000/api/evaluations'


export const addEvaluation = async (data,headers) => {

    const response = await axios.post(`${apiUrl}`,data , headers);

    return response.data;
        
};


export const getEvaluations = async (headers) => {

    const response = await axios.get(`${apiUrl}`, headers);

    return response.data;
        
};

export const getMyEvaluation = async (headers) => {

    const response = await axios.get(`${apiUrl}/myEvaluation`, headers);

    return response.data;
        
};

export const deleteEvaluation = async (id,headers) => {

    const response = await axios.delete(`${apiUrl}/${id}`, headers);

    return response.data;
        
};

