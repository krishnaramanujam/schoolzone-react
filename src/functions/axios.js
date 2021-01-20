import axios from 'axios';

// base URL to make requests to the movie database
const instance  = axios.create({
 baseURL : 'http://localhost:4001', 
});

export default instance;