import departmentsReducer from "./departments";
import testsReducer from "./tests";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import typeOfAnswersReducer from "./typeOfAnswers";
import questionsReducer from "./questions";

const rootReducer = combineReducers({
  tests: testsReducer,
  departments: departmentsReducer,
  typeOfAnswers: typeOfAnswersReducer,
  questions: questionsReducer,
});
export function createStore() {
  return configureStore({ reducer: rootReducer });
}
