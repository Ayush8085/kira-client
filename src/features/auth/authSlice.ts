import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        accessToken: localStorage.getItem("accessToken") || null,
    },
    reducers: {
        setCredentials: (state, action) => {
            const { user, accessToken } = action.payload;
            state.user = user;
            state.accessToken = accessToken;
        },
        setAccessToken: (state, action) => {
            const { accessToken } = action.payload;
            state.accessToken = accessToken;
        },
        logOut: (state, action) => {
            state.user = null;
            state.accessToken = null;
        }
    }
})

export const { setCredentials, setAccessToken, logOut } = authSlice.actions;

export const authReducer = authSlice.reducer;

export const selectCurrentUser = (state: any) => state.auth.user;
export const selectCurrentToken = (state: any) => state.auth.accessToken;
