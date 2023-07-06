import httpService from "./http.service";

const TypeOfAnswersService = {
  getTypeOfAnswers: async () => {
    const { data } = await httpService.get("/typeOfAnswers");
    // console.log("dep", data);

    return data;
  },
};
export default TypeOfAnswersService;
