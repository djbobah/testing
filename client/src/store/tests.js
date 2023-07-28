import TestService from "../services/test.service";

const { createSlice } = require("@reduxjs/toolkit");

const testsSlice = createSlice({
  name: "tests",
  initialState: {
    entities: null,
    currentTest: null,
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
    currentTestRequested: (state) => {
      state.isLoading = true;
    },
    currentTestRecived: (state, action) => {
      state.currentTest = action.payload;
      state.isLoading = false;
      state.isEdit = true;
    },
    currentTestRequestFiled: (state, action) => {
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
  currentTestRequested,
  currentTestRecived,
  currentTestRequestFiled,
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

export const getTests = () => (state) => state.tests.entities;

export const getTestsLoadingStatus = () => (state) => state.tests.isLoading;

export const setCurrentTest = (testId) => async (dispatch) => {
  dispatch(currentTestRequested());

  try {
    const data = await TestService.getCurrentTest(testId);
    dispatch(currentTestRecived(data));
  } catch (error) {
    dispatch(currentTestRequestFiled(error.message));
  }
};

export const getCurrentTest = () => (state) => state.tests.currentTest;
export const getIsEditTest = () => (state) => state.tests.isEdit;

export default testsReducer;
