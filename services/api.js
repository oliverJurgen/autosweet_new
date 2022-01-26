import axios from 'axios';
import { REACT_APP_BASE_URL } from '../config';

export default axios.create({
    baseURL: REACT_APP_BASE_URL,
    withCredentials:true
});
