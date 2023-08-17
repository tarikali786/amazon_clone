import axios from 'axios';

export const instance = axios.create({
    baseURL: "http://localhost:5001/chanllenge-4b2b2/us-contrall/api" //THE API [cloud funcfion] URL
    
})