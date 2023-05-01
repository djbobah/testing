import axios from "axios";
// import { toast } from "react-toastify";
import configFile from "../config.json";
import localStorageService from "./localStorage.service";
import { httpAuth } from "../components/hooks/useAuth";

const http = axios.create({ baseURL: configFile.apiEndpoint });
// axios.defaults.baseURL = config.apiEndpoint;

http.interceptors.request.use(
  async function (config) {
    const expiresDate = localStorageService.getTokenExpiresDate();
    const refreshToken = localStorageService.getRefreshToken();
    console.log("data", config.url);
    console.log(expiresDate);
    console.log(Date.now());

    if (refreshToken && expiresDate > Date.now()) {
      const { data } = await httpAuth.post("/auth/token", {
        refreshToken,
      });
      console.log("data auth token", data);
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  (res) => {
    // console.log("res.data", res.data);
    return res;
  },
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
