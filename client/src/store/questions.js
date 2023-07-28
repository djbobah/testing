import { createSlice } from "@reduxjs/toolkit";
import QuestionsService from "../services/questions.service";

const questionsSlice = createSlice({
  name: "questions",
  initialState: { entities: null, isLoading: true, error: null },
  reducers: {
    questionsRequested: (state) => {
      state.isLoading = true;
    },
    questionsRecived: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    questionsRequestFiled: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

const { reducer: questionsReducer, actions } = questionsSlice;
const { questionsRequested, questionsRecived, questionsRequestFiled } = actions;

export const loadQuestions = (testId) => async (dispatch) => {
  dispatch(questionsRequested());
  try {
    const data = await QuestionsService.getQuestionsForTest(testId);
    dispatch(questionsRecived(data));
  } catch (error) {
    dispatch(questionsRequestFiled(error.message));
  }
};

export const getQuestions = () => (state) => state.questions.entities;

export const getQuestionsLoadingStatus = () => (state) =>
  state.questions.isLoading;

export default questionsReducer;
