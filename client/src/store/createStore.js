import departmentsReducer from "./departments";
import testsReducer from "./tests";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import typeOfAnswersReducer from "./typeOfAnswers";
import usersReducer from "./users";

const rootReducer = combineReducers({
  tests: testsReducer,
  departments: departmentsReducer,
  typeOfAnswers: typeOfAnswersReducer,
  users: usersReducer,
});
export function createStore() {
  return configureStore({ reducer: rootReducer });
}
