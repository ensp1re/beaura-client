import { IAuthRedux } from "@/interfaces/auth.interface";
import { createSlice } from "@reduxjs/toolkit";



const initialState: IAuthRedux = {
    _id: "",
    username: "",
    email: "",
    role: "",
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state._id = action.payload._id;
            state.username = action.payload.username;
            state.email = action.payload.email;
            state.role = action.payload.role;
        },
        logout: (state) => {
            state._id = "";
            state.username = "";
            state.email = "";
            state.role = "";
        },
    },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;