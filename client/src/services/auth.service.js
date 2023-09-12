import axios from "axios";
import config from "../config.json";

const httpAuth = axios.create({ baseURL: config.apiEndpoint });

const authService = {
  register: async (newData) => {
    const { data } = await httpAuth.post("/auth/signUp", newData);
    return data;
  },
};

export default authService;
