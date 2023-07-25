const { createSlice } = require("@reduxjs/toolkit");

const testsSlice = createSlice({
  name: "tests",
  initialState: { entities: null, isLoading: true },
});

const { reducer: testsReducer } = testsSlice;

export default testsReducer;
