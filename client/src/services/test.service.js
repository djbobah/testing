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
  update: async (payload) => {
    console.log("update test payload", payload);
    const { data } = await httpService.patch("/tests/" + payload.id, payload);
    console.log("update test data", data);
    return data;
  },
};
export default TestService;
