import httpService from "./http.service";

const TestResultsService = {
  create: async (payload) => {
    console.log("create TestResultsService payload", payload);
    const { data } = await httpService.post("/testResults/create", payload);
    console.log("create TestResultsService data", data);

    return data;
  },
};

export default TestResultsService;
