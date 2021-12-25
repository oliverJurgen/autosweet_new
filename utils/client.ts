import axios from "axios";
import { REACT_APP_BASE_URL } from "../config";

const client = axios.create({
  baseURL: REACT_APP_BASE_URL,
});

export default client;
