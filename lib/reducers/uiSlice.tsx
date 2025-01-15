import { createSlice } from "@reduxjs/toolkit";

interface UIState {
  isOpen: boolean;
  isModalLogoutOpen: boolean;
  headerName: string;
}

const initialState: UIState = {
  isOpen: false,
  isModalLogoutOpen: false,
  headerName: "",
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    open: (state) => {
      state.isOpen = true;
    },
    close: (state) => {
      state.isOpen = false;
    },
    toggle: (state) => {
      state.isOpen = !state.isOpen;
    },
    openModalLogout: (state) => {
      state.isModalLogoutOpen = !state.isModalLogoutOpen;
    },
    change: (state, action) => {
      state.headerName = action.payload;
    }
  },
});

export const { open, close, toggle, openModalLogout, change } = uiSlice.actions;

export default uiSlice.reducer;
