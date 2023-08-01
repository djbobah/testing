import httpService from "./http.service";

const QuestionsService = {
  // getTests: async () => {
  //   const { data } = await httpService.get("/tests");
  //   // console.log("dep", data);

  //   return data;
  // },
  getQuestionsForTest: async (idTest) => {
    const { data } = await httpService.get("/questions/" + idTest);
    // console.log("DeparmmentService data", data);

    return data;
  },
  create: async (payload) => {
    const { data } = await httpService.post("/questions/create", payload);
    return data;
  },
};
export default QuestionsService;
