import axios from "axios";
import { toast } from "react-toastify";
import config from "../config.json";

axios.defaults.baseURL = config.apiEndpoint;

axios.interceptors.response.use(
  (res) => res,
  (error) => {
    const expectedErrors =
      error.response && error.response.status >= 400 && error.status < 500;
    if (!expectedErrors) {
      console.log(error);
      toast.error("Somthing went wrong. Try it later... ");
      // toast("Unexpected error");
    }
    return Promise.reject(error);
  }
);

const httpService = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  path: axios.patch,
};

export default httpService;
