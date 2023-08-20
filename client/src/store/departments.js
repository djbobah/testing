import { createSlice } from "@reduxjs/toolkit";
import DeparmmentService from "../services/department.service";

const departmentsSlice = createSlice({
  name: "departments",
  initialState: { entities: null, isLoading: true, error: null },
  reducers: {
    departmentsRequested: (state) => {
      state.isLoading = true;
    },
    departmentsRecived: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    departmentsRequestFiled: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

const { reducer: departmentsReducer, actions } = departmentsSlice;
const { departmentsRequested, departmentsRecived, departmentsRequestFiled } =
  actions;
export const loadDepartments = () => async (dispatch) => {
  dispatch(departmentsRequested());
  try {
    const data = await DeparmmentService.getDepartmments();
    dispatch(departmentsRecived(data));
  } catch (error) {
    dispatch(departmentsRequestFiled(error.message));
  }
};

export const getDepartmments = () => (state) => state.departments.entities;

export const getDepartmmentsLoadingStatus = () => (state) =>
  state.deparpments.isLoading;

export default departmentsReducer;
