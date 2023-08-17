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
    console.log("create question payload", payload);
    const { data } = await httpService.post("/questions/create", payload);
    console.log("create question data", data);

    return data;
  },
  update: async (id, payload) => {
    console.log("update question payload", payload);
    const { data } = await httpService.path("/questions/" + id, payload);
    console.log("update question data", data);
    console.log("update question payload.answers", payload.answers);

    return data;
  },
  delete: async (id) => {
    await httpService.delete("/questions/" + id);
  },
};
export default QuestionsService;
