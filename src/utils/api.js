import axios from "axios";

axios.defaults.withCredentials = true
export const API = axios.create({
  baseURL: 'https://api.oegaein.com:8080',
  // baseURL: '',
})