import { createAction, createSlice } from "@reduxjs/toolkit";
import TestResultsService from "../services/testResults.service";

// import history from "../utils/history";
// import { redirect, useNavigate } from "react-router-dom";

const userAnswersSlice = createSlice({
  name: "userAnswers",
  initialState: {
    userId: null,
    testId: null,
    questionsForTest: [],
    answersForTest: [],
    userAnswers: [],
    isLoading: true,
    error: null,
  },
  reducers: {
    // usersRequested: (state) => {
    //   state.isLoading = true;
    // },
    // usersRequestSucess: (state, action) => {
    //   state.entities = action.payload;
    //   state.isDataLoaded = true;
    //   state.isLoading = false;
    // },
    // usersRequestFiled: (state, action) => {
    //   state.error = action.payload;
    //   state.isLoading = false;
    // },
    // clear: (state) => {
    // state.userId = null;
    // state.testId = null;
    // state.questionsForTest = [];
    // state.answersForTest = [];
    // state.userAnswers = [];
    // console.log(state.tests);
    // },
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
    setTestId: (state, action) => {
      state.testId = action.payload;
    },
    setQuestionsForTest: (state, action) => {
      state.questionsForTest = action.payload;
    },
    setAnswersForTest: (state, action) => {
      state.answersForTest = action.payload;
    },
    createUserAnswersRequested: (state) => {
      state.isLoading = true;
    },
    createUserAnswersRecived: (state, action) => {
      state.isLoading = false;
    },
    createUserAnswersFiled: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

const { reducer: userAnswersReducer, actions } = userAnswersSlice;
const {
  clear,
  setUserId,
  setTestId,
  setQuestionsForTest,
  setAnswersForTest,
  createUserAnswersRequested,
  createUserAnswersRecived,
  createUserAnswersFiled,
} = actions;
// export const clearData = () => (dispatch) => {
//   dispatch(clear());
// };
export const loadData =
  (userId, testId, questions, answers) => async (dispatch) => {
    dispatch(setUserId(userId));
    dispatch(setTestId(testId));
    dispatch(setQuestionsForTest(questions));
    dispatch(setAnswersForTest(answers));
    dispatch(createUserAnswersRequested());
    try {
      await TestResultsService.create({
        idUser: userId,
        idTest: testId,
        questionsForTest: JSON.stringify(questions),
        answersForTest: JSON.stringify(answers),
        userAnswers: "",
      });
    } catch (error) {
      dispatch(createUserAnswersFiled());
    }
  };

export default userAnswersReducer;
