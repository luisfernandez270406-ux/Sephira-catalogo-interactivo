import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentView: "landing",
  sidebarOpen: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setView: (state, action) => {
      state.currentView = action.payload;
      state.sidebarOpen = false;
    },
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    closeSidebar: (state) => {
      state.sidebarOpen = false;
    },
  },
});

export const { setView, toggleSidebar, closeSidebar } = uiSlice.actions;
export default uiSlice.reducer;