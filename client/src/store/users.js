import { createAction, createSlice } from "@reduxjs/toolkit";
import UserService from "../services/user.service";
import authService from "../services/auth.service";
import localStorageService from "../services/localStorage.service";

const usersSlice = createSlice({
  name: "users",
  initialState: {
    entities: null,
    isLoading: true,
    error: null,
    auth: null,
    // isLoggedIn: false,
  },
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
    authRequestSuccess: (state, action) => {
      state.auth = { ...action.payload, isLoggedIn: true };
    },
    authRequestFailed: (state, action) => {
      state.error = action.payload;
    },
  },
});

const { reducer: usersReducer, actions } = usersSlice;
const {
  usersRequested,
  usersRecived,
  usersRequestFiled,
  authRequestSuccess,
  authRequestFailed,
} = actions;
const authRequested = createAction("users/authRequested");

export const loadUsers = () => async (dispatch) => {
  dispatch(usersRequested());
  try {
    const data = await UserService.get();
    dispatch(usersRecived(data));
  } catch (error) {
    dispatch(usersRequestFiled(error.message));
  }
};
export const signUp = (newData) => async (dispatch) => {
  dispatch(authRequested());
  try {
    const data = await authService.register(newData);
    localStorageService.setTokens(data);
    dispatch(authRequestSuccess({ userId: data.userId }));
  } catch (error) {
    dispatch(authRequestFailed(error.message));
  }
};

export const getUsersList = () => (state) => state.users.entities;

export const getUserDataById = (userId) => (state) => {
  if (state.users.entities) {
    return state.users.entities.find((u) => u.id === userId);
  }
};

export default usersReducer;
