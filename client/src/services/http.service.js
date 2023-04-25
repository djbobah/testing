import axios from "axios";
// import { toast } from "react-toastify";
import config from "../config.json";

const http = axios.create({ baseURL: config.apiEndpoint });
// axios.defaults.baseURL = config.apiEndpoint;

http.interceptors.response.use(
  (res) => res,
  (error) => {
    const expectedErrors =
      error.response && error.response.status >= 400 && error.status < 500;
    if (!expectedErrors) {
      console.log(error);
      // toast.error("Somthing went wrong. Try it later... ");
      // toast("Unexpected error");
    }
    return Promise.reject(error);
  }
);

const httpService = {
  get: http.get,
  post: http.post,
  put: http.put,
  delete: http.delete,
  path: http.patch,
};

export default httpService;
