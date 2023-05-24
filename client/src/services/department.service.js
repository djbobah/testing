import httpService from "./http.service";

const DeparmmentService = {
  getDepartmments: async () => {
    const { data } = await httpService.get("/departments");
    // console.log("dep", data);

    return data;
  },
  getCurrentDepartment: async (idDep) => {
    const { data } = await httpService.get("/departments/" + idDep);
    // console.log("DeparmmentService data", data);

    return data;
  },
};
export default DeparmmentService;
