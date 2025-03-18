import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  section : null,
  loading: false,
  token: localStorage.getItem("token")
};

const sectionSlice = createSlice({
  name: "section",
  initialState: initialState,
  reducers: {
    setSection(state, value) {
      state.section = value.payload;
    },
    setLoading(state, value) {
      state.loading = value.payload;
    },
    setToken(state, value) {
      state.token = value.payload;
    },
  },
});

export const { setSection, setLoading, setToken } = sectionSlice.actions;

export default sectionSlice.reducer;