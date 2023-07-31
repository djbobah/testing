import QuestionsService from "../services/questions.service";
import TestService from "../services/test.service";

const { createSlice } = require("@reduxjs/toolkit");

const testsSlice = createSlice({
  name: "tests",
  initialState: {
    entities: null,
    currentTest: null,
    questions: null,
    isLoading: true,
    isEdit: false,
  },
  reducers: {
    testsRequested: (state) => {
      state.isLoading = true;
    },
    testsRecived: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
      state.isEdit = false;
      state.currentTest = null;
    },
    testsRequestFiled: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    // currentTestRequested: (state) => {
    //   state.isLoading = true;
    // },
    currentTestRecived: (state, action) => {
      state.currentTest = action.payload;
      state.isLoading = false;
      state.isEdit = true;
    },
    // currentTestRequestFiled: (state, action) => {
    //   state.error = action.payload;
    //   state.isLoading = false;
    // },
    questionsRequested: (state) => {
      state.isLoading = true;
    },
    questionsRecived: (state, action) => {
      state.questions = action.payload;
      // state.questions =
      state.isLoading = false;
      // state.isEdit = false;
      // state.currentTest = null;
    },
    questionsRequestFiled: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

const { reducer: testsReducer, actions } = testsSlice;
const {
  testsRequested,
  testsRecived,
  testsRequestFiled,
  // currentTestRequested,
  currentTestRecived,
  // currentTestRequestFiled,
  questionsRequested,
  questionsRecived,
  questionsRequestFiled,
} = actions;

export const loadTests = () => async (dispatch) => {
  dispatch(testsRequested());
  try {
    const data = await TestService.getTests();
    dispatch(testsRecived(data));
  } catch (error) {
    dispatch(testsRequestFiled(error.message));
  }
};

const loadQuestions = (testId) => async (dispatch) => {
  dispatch(questionsRequested());
  try {
    const data = await QuestionsService.getQuestionsForTest(testId);
    dispatch(questionsRecived(data));
  } catch (error) {
    dispatch(questionsRequestFiled(error.message));
  }
};

export const getTests = () => (state) => state.tests.entities;

export const getTestsLoadingStatus = () => (state) => state.tests.isLoading;

export const setCurrentTest = (testId) => async (dispatch) => {
  dispatch(currentTestRecived(testId));
  dispatch(loadQuestions(testId));
  // dispatch(questionsRequested());
  // try {
  //   const data = await QuestionsService.getQuestionsForTest(testId);
  //   dispatch(questionsRecived(data));
  // } catch (error) {
  //   dispatch(questionsRequestFiled(error.message));
  // }
};
export const getCurrentTest = () => (state) => {
  if (state.tests.currentTest) {
    return state.tests.entities.find(
      (test) => test.id === state.tests.currentTest
    );
  }
};
export const getCurrentTestQuestions = () => (state) => {
  if (state.tests.currentTest) {
    return state.tests.questions;
  }
};

export const getIsEditTest = () => (state) => state.tests.isEdit;

export default testsReducer;
