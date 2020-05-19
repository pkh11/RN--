import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://52.79.243.246:8080/',
    timeout: 1000,
    headers: { 'Authorization' : ''}
});


export default instance;