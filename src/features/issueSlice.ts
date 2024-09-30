import { createSlice } from "@reduxjs/toolkit";

const issueSlice = createSlice({
    name: "issue",
    initialState: {
        issues: [],
        issue: null,
    },
    reducers: {
        setIssues: (state, action) => {
            state.issues = action.payload;
        },
        setIssue: (state, action) => {
            state.issue = action.payload;
        }
    }
});

export const { setIssues, setIssue } = issueSlice.actions;

export const issueReducer = issueSlice.reducer;

export const selectIssues = (state: any) => state.issue.issues;
export const selectIssue = (state: any) => state.issue.issue;