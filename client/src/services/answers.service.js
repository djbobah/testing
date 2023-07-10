import httpService from "./http.service";

const AnswersService = {
  // getTests: async () => {
  //   const { data } = await httpService.get("/tests");
  //   // console.log("dep", data);

  //   return data;
  // },
  getAnswersCurrentQuestion: async (idQuestion) => {
    const { data } = await httpService.get("/answers/" + idQuestion);
    // console.log("DeparmmentService data", data);

    return data;
  },
};
export default AnswersService;
