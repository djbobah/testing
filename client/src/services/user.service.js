import httpService from "./http.service";
import localStorageService from "./localStorage.service";

const userService = {
  get: async () => {
    const { data } = await httpService.get("/users");
    return data;
  },
  getCurrentUser: async () => {
    const data = await httpService.get(
      "/users/" + localStorageService.getUserId()
    );
    // console.log("user service data", data);
    return data;
  },
};
export default userService;
