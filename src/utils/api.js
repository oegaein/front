import axios from "axios";
import useAuthStore from '@store/authStore'

const accessToken = useAuthStore.getState().accessToken
axios.defaults.withCredentials = true
// axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

export const API = axios.create({
  // baseURL: 'https://api.oegaein.com:8080',
  baseURL: '',
})