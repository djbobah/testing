import { createSlice } from "@reduxjs/toolkit";
import UserService from "../services/user.service";

const usersSlice = createSlice({
  name: "users",
  initialState: { entities: null, isLoading: true, error: null },
  reducers: {
    usersRequested: (state) => {
      state.isLoading = true;
    },
    usersRecived: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    usersRequestFiled: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

const { reducer: usersReducer, actions } = usersSlice;
const { usersRequested, usersRecived, usersRequestFiled } = actions;

export const loadUsers = () => async (dispatch) => {
  dispatch(usersRequested());
  try {
    const data = await UserService.get();
    dispatch(usersRecived(data));
  } catch (error) {
    dispatch(usersRequestFiled(error.message));
  }
};

export const getUsersList = () => (state) => state.users.entities;

export const getUserDataById = (userId) => (state) => {
  if (state.users.entities) {
    return state.users.entities.find((u) => u.id === userId);
  }
};

export default usersReducer;
