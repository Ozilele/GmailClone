import { createSlice } from '@reduxjs/toolkit';

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    theme: "dark",
  },
  reducers: {
    toggleTheme: (state, action) => {
      state.theme = state.theme === "dark" ? "light" : "dark"; 
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
    }
  },
});

export const { toggleTheme, setTheme } = appSlice.actions;

export const selectAppTheme = (state) => state.app.theme;

export default appSlice.reducer;