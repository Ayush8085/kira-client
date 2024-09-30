import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "../features/auth/authSlice";
import { projectReducer } from "@/features/projectSlice";
import { issueReducer } from "@/features/issueSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        project: projectReducer,
        issue: issueReducer,
    }
})