import TestService from "../services/test.service";

const { createSlice } = require("@reduxjs/toolkit");

const testsSlice = createSlice({
  name: "tests",
  initialState: { entities: null, isLoading: true },
  reducers: {
    testsRequested: (state) => {
      state.isLoading = true;
    },
    testsRecived: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    testsRequestFiled: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

const { reducer: testsReducer, actions } = testsSlice;
const { testsRequested, testsRecived, testsRequestFiled } = actions;

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

export default testsReducer;
