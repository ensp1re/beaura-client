import { createSlice } from "@reduxjs/toolkit";

interface UIState {
  isOpen: boolean;
  isModalLogoutOpen: boolean;
}

const initialState: UIState = {
  isOpen: false,
  isModalLogoutOpen: false,
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
  },
});

export const { open, close, toggle, openModalLogout } = uiSlice.actions;

export default uiSlice.reducer;
