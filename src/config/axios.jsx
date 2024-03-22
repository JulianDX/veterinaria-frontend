import axios from "axios";

const axiosCliente = axios.create({
  baseURL: `/api/${import.meta.env.VITE_BACKEND_URL}`,
});

export default axiosCliente;
