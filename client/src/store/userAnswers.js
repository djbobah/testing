import { createAction, createSlice } from "@reduxjs/toolkit";

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
    // isLoading: true,
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
    clear: (state) => {
      // state.userId = null;
      // state.testId = null;
      // state.questionsForTest = [];
      // state.answersForTest = [];
      // state.userAnswers = [];
      // console.log(state.tests);
    },
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
  },
});

const { reducer: userAnswersReducer, actions } = userAnswersSlice;
const { clear, setUserId, setTestId, setQuestionsForTest, setAnswersForTest } =
  actions;
export const clearData = () => (dispatch) => {
  dispatch(clear());
};
export const loadData = (userId, testId, questions, answers) => (dispatch) => {
  dispatch(setUserId(userId));
  dispatch(setTestId(testId));
  dispatch(setQuestionsForTest(questions));
  // dispatch(setAnswersForTest(answers));
};

export default userAnswersReducer;
