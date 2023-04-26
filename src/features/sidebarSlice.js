import { createSlice } from '@reduxjs/toolkit';

export const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState: {
    isRolled: false,
  },
  reducers: {
    toggleSidebar: (state, action) => {
      state.isRolled = !state.isRolled;
    },
    setSidebar: (state, action) => {
      state.isRolled = action.payload;
    }
  },
});

export const { toggleSidebar, setSidebar } = sidebarSlice.actions;

export const selectSidebar = (state) => state.sidebar.isRolled;

export default sidebarSlice.reducer;