import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://diagnostic-center-management-server-smoky.vercel.app",
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
