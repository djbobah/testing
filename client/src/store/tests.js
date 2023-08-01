import QuestionsService from "../services/questions.service";
import TestService from "../services/test.service";

const { createSlice, createAction } = require("@reduxjs/toolkit");

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

    currentTestRecived: (state, action) => {
      state.currentTest = action.payload;
      state.isLoading = false;
      state.isEdit = true;
    },

    questionsRequested: (state) => {
      state.isLoading = true;
    },
    questionsRecived: (state, action) => {
      state.questions = action.payload;
      state.isLoading = false;
    },
    questionsRequestFiled: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    createTestRequest: (state, action) => {
      if (!Array.isArray(state.entities)) {
        state.entities = [];
      }
      state.entities.push(action.payload);
    },
  },
});

const { reducer: testsReducer, actions } = testsSlice;
const {
  testsRequested,
  testsRecived,
  testsRequestFiled,
  currentTestRecived,
  questionsRequested,
  questionsRecived,
  questionsRequestFiled,
  createTestRequest,
} = actions;

const createTestRequested = createAction("tests/createTestRequested");
const createTestFailed = createAction("tests/createTestFailed");
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

export const createTest = (payload) => async (dispatch) => {
  dispatch(createTestRequested());
  try {
    // console.log("create test payload", payload);
    const data = await TestService.create(payload);
    // console.log("create test data", data.newTest);
    dispatch(createTestRequest(data.newTest));
    dispatch(setCurrentTest(data.newTest.id));
  } catch (error) {
    dispatch(createTestFailed(error.message));
  }
};

export default testsReducer;
