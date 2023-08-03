import { toast } from "react-toastify";
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
      state.questions = action.payload.map((q) => ({ ...q, save: true }));
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
    createQuestionRequest: (state, action) => {
      if (!Array.isArray(state.questions)) {
        state.questions = [];
      }
      state.questions.push({ ...action.payload, save: false });
    },
    changeQuestionSave: (state, action) => {
      console.log("changeQuestionSave", action.payload);
      const idx = state.questions.findIndex((i) => i.id === action.payload);
      state.questions[idx].save = !state.questions[idx].save;
    },
    updateQuestionRequest: (state, action) => {
      const idx = state.questions.findIndex(
        (i) => i.id === Number(action.payload.questionId)
      );
      state.questions[idx].question = action.payload.question;
      state.questions[idx].typeOfAnswers = Number(action.payload.typeOfAnswers);
    },
    updateTestRequest: (state, action) => {
      console.log("updateTestRequest");
      // const idx = state.questions.findIndex(
      //   (i) => i.id === Number(action.payload.questionId)
      // );
      // state.questions[idx].question = action.payload.question;
      // state.questions[idx].typeOfAnswers = Number(action.payload.typeOfAnswers);
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
  createQuestionRequest,
  changeQuestionSave,
  updateTestRequest,
  updateQuestionRequest,
} = actions;

const createTestRequested = createAction("tests/createTestRequested");
const createTestFailed = createAction("tests/createTestFailed");
const createQuestionRequested = createAction("tests/createQuestionRequested");
const createQuestionFailed = createAction("tests/createQuestionFailed");
const updateTestRequested = createAction("tests/updateTestRequested");
const updateTestFailed = createAction("tests/updateTestFailed");
const updateQuestionRequested = createAction("tests/updateQuestionRequested");
const updateQuestionFailed = createAction("tests/updateQuestionFailed");
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
export const createQuestion = (payload) => async (dispatch) => {
  dispatch(createQuestionRequested());
  try {
    // console.log("create test payload", payload);
    const data = await QuestionsService.create(payload);

    console.log("create question data", data);
    dispatch(createQuestionRequest(data));
    // dispatch(setCurrentTest(data.newTest.id));
  } catch (error) {
    dispatch(createQuestionFailed(error.message));
  }
};

export const changeQuestion = (id) => (dispatch) => {
  dispatch(changeQuestionSave(id));
};
export const updateTest = (payload) => async (dispatch) => {
  dispatch(updateTestRequested());
  try {
    const data = await TestService.update(payload);
    dispatch(updateTestRequest(data));
    toast("Тест сохранен");
  } catch (error) {
    dispatch(updateTestFailed(error.message));
  }
};
export const updateQuestion = (id, payload) => async (dispatch) => {
  dispatch(updateQuestionRequested());
  try {
    const data = await QuestionsService.update(id, payload);
    dispatch(updateQuestionRequest(data));
    toast("Вопрос сохранен");
  } catch (error) {
    dispatch(updateQuestionFailed(error.message));
  }
};
export default testsReducer;
