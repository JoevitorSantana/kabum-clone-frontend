import axios from 'axios';

export const api = axios.create({
    baseURL: 'http://52.90.4.236:4000'
})