import httpService from "./http.service";
import localStorageService from "./localStorage.service";

const userEndpoint = "users/";

const UserService = {
  get: async () => {
    const { data } = await httpService.get(userEndpoint);
    return data;
  },
  getCurrentUser: async () => {
    const data = await httpService.get(
      userEndpoint + localStorageService.getUserId()
    );
    // console.log("user service data", data);
    return data;
  },
  getUserDataById: async (userId) => {
    const { data } = await httpService.get(userEndpoint + userId);
    // console.log("getUserDataById", data);
    return data;
  },
  update: async (payload) => {
    const { data } = await httpService.patch(
      userEndpoint + localStorageService.getUserId(),
      payload
    );
    return data;
  },
};
export default UserService;
