import { createSlice } from "@reduxjs/toolkit";
import TypeOfAnswersService from "../services/typeOfAnswers.service";

const typeOfAnswersSlice = createSlice({
  name: "typeOfAnswers",
  initialState: { entities: null, isLoading: true, error: null },
  reducers: {
    typeOfAnswersRequested: (state) => {
      state.isLoading = true;
    },
    typeOfAnswersRecived: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    typeOfAnswersRequestFiled: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

const { reducer: typeOfAnswersReducer, actions } = typeOfAnswersSlice;
const {
  typeOfAnswersRequested,
  typeOfAnswersRecived,
  typeOfAnswersRequestFiled,
} = actions;
export const loadTypeOfAnswers = () => async (dispatch) => {
  dispatch(typeOfAnswersRequested());
  try {
    const data = await TypeOfAnswersService.getTypeOfAnswers();
    dispatch(typeOfAnswersRecived(data));
  } catch (error) {
    dispatch(typeOfAnswersRequestFiled(error.message));
  }
};

export const getTypeOfAnswers = () => (state) => state.typeOfAnswers.entities;

export const getTypeOfAnswersLoadingStatus = () => (state) =>
  state.typeOfAnswers.isLoading;

export default typeOfAnswersReducer;
