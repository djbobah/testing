import { createAction, createSlice } from "@reduxjs/toolkit";
import UserService from "../services/user.service";
import authService from "../services/auth.service";
import localStorageService from "../services/localStorage.service";
import { browserRouter } from "react-router";

// import history from "../utils/history";
// import { redirect, useNavigate } from "react-router-dom";

const usersSlice = createSlice({
  name: "users",
  initialState: {
    entities: null,
    isLoading: true,
    error: null,
    auth: null,
    currentUser: null,
    isLoggedIn: false,
    isDataLoaded: false,
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
    authRequestSuccess: (state, action) => {
      state.auth = action.payload.userId;
      state.currentUser = action.payload;
      state.isLoggedIn = true;
    },
    authRequestFailed: (state, action) => {
      state.error = action.payload;
    },
    loginRequestSuccess: (state, action) => {
      state.auth = action.payload.userId;
      state.currentUser = action.payload;
      // state.currentUser = {
      //   ...action.payload,
      //   ...state.users.entities.find((u) => u.id === action.payload.userId),
      // };
      state.isLoggedIn = true;
    },
    loginRequestFailed: (state, action) => {
      state.error = action.payload;
    },
    currentUsersRequested: (state) => {
      state.isLoading = true;
    },
    currentUsersRequestSucess: (state, action) => {
      state.currentUser = action.payload;
      // state.isDataLoaded = true;
      state.isLoading = false;
    },
    currentUsersRequestFiled: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    userLoggedOut: (state) => {
      state.entities = null;
      state.isLoggedIn = false;
      state.auth = null;
      state.isDataLoaded = false;
    },
  },
});

const { reducer: usersReducer, actions } = usersSlice;
const {
  usersRequested,
  usersRequestSucess,
  usersRequestFiled,
  authRequestSuccess,
  authRequestFailed,
  loginRequestSuccess,
  loginRequestFailed,
  currentUsersRequested,
  currentUsersRequestSucess,
  currentUsersRequestFiled,
  userLoggedOut,
} = actions;
const authRequested = createAction("users/authRequested");
const logInRequested = createAction("users/logInRequested");

export const loadUsers = () => async (dispatch) => {
  dispatch(usersRequested());
  try {
    const data = await UserService.get();
    dispatch(usersRequestSucess(data));
  } catch (error) {
    dispatch(usersRequestFiled(error.message));
  }
};

export const loadCurrentUser = () => async (dispatch) => {
  dispatch(currentUsersRequested());
  try {
    const data = await UserService.getCurrentUser();
    dispatch(currentUsersRequestSucess(data));
  } catch (error) {
    dispatch(currentUsersRequestFiled(error.message));
  }
};

export const getUserDataById = (userId) => (state) => {
  if (state.users.entities) {
    return state.users.entities.find((u) => u.id === userId);
  }
};
export const logIn = (payload, redirect) => async (dispatch, state) => {
  const { email, password } = payload;
  console.log("logIn payload", payload);
  dispatch(logInRequested());
  try {
    const data = await authService.login({ email, password });
    // const cur = getUserDataById(data.userId);
    console.log("logIn data", data);
    // if (!data) {
    dispatch(loginRequestSuccess(data));
    localStorageService.setTokens({ ...data, userId: data.id });
    // }

    // redirect("/main/home");
    // const navigate = useNavigate();

    redirect("/main/home");
  } catch (error) {
    dispatch(loginRequestFailed(error.message));
  }
};

export const logOut = (redirect) => (dispatch) => {
  localStorageService.removeAuthData();
  dispatch(userLoggedOut());
  redirect("/");
};

export const signUp = (newData, redirect) => async (dispatch) => {
  dispatch(authRequested());
  try {
    const data = await authService.register(newData);
    console.log("signUp data", data);

    localStorageService.setTokens(data);

    // dispatch(authRequestSuccess({ userId: data.userId }));
    dispatch(authRequestSuccess({ ...data, ...newData }));
    redirect("/main/home");
    // history.push("/main/home");
    // navigate("/main/home");
    // <Navigate to="/main/home" replace={true} />;
  } catch (error) {
    dispatch(authRequestFailed(error.message));
  }
};

export const getUsersList = () => (state) => state.users.entities;

export const getIsLoggedIn = () => (state) => {
  console.log("getIsLoggedIn", state.users.isLoggedIn);
  return state.users.isLoggedIn;
};

export const getCurrentUser = () => (state) => {
  // console.log("getCurrentUser store", localStorageService.getUserId());
  console.log("getCurrentUser store", state.users.entities);

  return state.users.entities.find(
    (u) => u.id === Number(localStorageService.getUserId())
  );
};
export const getDataStatus = () => (state) => state.users.isDataLoaded;

export default usersReducer;
