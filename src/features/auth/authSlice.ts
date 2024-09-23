import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        isLoggedIn: false,
        accessToken: null,
    },
    reducers: {
        setCredentials: (state, action) => {
            state.user = action.payload;
            
        },
        setIsLoggedIn: (state, action) => {
            state.isLoggedIn = action.payload;
        },
        setAccessToken: (state, action) => {
            state.accessToken = action.payload;
        },
        logOut: (state, action) => {
            state.user = null;
        }
    }
})

export const { setCredentials, setAccessToken, setIsLoggedIn, logOut } = authSlice.actions;

export const authReducer = authSlice.reducer;

export const selectCurrentUser = (state: any) => state.auth.user;
export const selectIsLoggedIn = (state: any) => state.auth.isLoggedIn;
export const selectAccessToken = (state: any) => state.auth.accessToken;
