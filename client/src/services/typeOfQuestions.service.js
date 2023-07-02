import httpService from "./http.service";

const TypeOfQuestionsService = {
  getTypeOfQuestions: async () => {
    const { data } = await httpService.get("/typeOfQuestions");
    // console.log("dep", data);

    return data;
  },
};
export default TypeOfQuestionsService;
