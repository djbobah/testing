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
    usersRequested: (state) => {
      state.isLoading = true;
    },
    usersRequestSucess: (state, action) => {
      state.entities = action.payload;
      state.isDataLoaded = true;
      state.isLoading = false;
    },
    usersRequestFiled: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

const { reducer: userAnswersReducer, actions } = userAnswersSlice;
const { usersRequested, usersRequestSucess, usersRequestFiled } = actions;

export default userAnswersReducer;
