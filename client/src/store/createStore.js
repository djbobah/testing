import departmentsReducer from "./departments";
import testsReducer from "./tests";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import typeOfAnswersReducer from "./typeOfAnswers";

const rootReducer = combineReducers({
  tests: testsReducer,
  departments: departmentsReducer,
  typeOfAnswers: typeOfAnswersReducer,
});
export function createStore() {
  return configureStore({ reducer: rootReducer });
}
