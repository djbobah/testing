import httpService from "./http.service";

const AnswersService = {
  // getTests: async () => {
  //   const { data } = await httpService.get("/tests");
  //   // console.log("dep", data);

  //   return data;
  // },
  getAnswersCurrentTest: async (idTest) => {
    const { data } = await httpService.get("/answers/" + idTest);
    // console.log("DeparmmentService data", data);

    return data;
  },
  create: async (payload) => {
    // console.log("create question payload", payload);
    const { data } = await httpService.post("/answers/create", payload);
    // console.log("create answer data", data);

    return data;
  },
  update: async (payload) => {
    console.log("update answer payload", payload);
    const { data } = await httpService.patch("/answers", payload);
    console.log("update answer data", data);
    // console.log("update question payload.answers", payload.answers);

    return data;
  },
  delete: async (id) => {
    await httpService.delete("/answers/" + id);
  },
};
export default AnswersService;
