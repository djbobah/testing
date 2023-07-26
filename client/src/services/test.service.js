import httpService from "./http.service";

const TestService = {
  getTests: async () => {
    const { data } = await httpService.get("/tests");
    // console.log("dep", data);

    return data;
  },
  getCurrentTest: async (idTest) => {
    const { data } = await httpService.get("/tests/" + idTest);
    // console.log("DeparmmentService data", data);

    return data;
  },
  create: async (newData) => {
    let { data } = await httpService.post("/tests/create", newData);
    return data;
  },
};
export default TestService;
