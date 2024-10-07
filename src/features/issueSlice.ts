import { createSlice } from "@reduxjs/toolkit";

const issueSlice = createSlice({
    name: "issue",
    initialState: {
        issues: [],
        issue: null,
        attachment: null,
    },
    reducers: {
        setIssues: (state, action) => {
            state.issues = action.payload;
        },
        setIssue: (state, action) => {
            state.issue = action.payload;
        },
        setAttachment: (state, action) => {
            state.attachment = action.payload;
        }
    }
});

export const { setIssues, setIssue, setAttachment } = issueSlice.actions;

export const issueReducer = issueSlice.reducer;

export const selectIssues = (state: any) => state.issue.issues;
export const selectIssue = (state: any) => state.issue.issue;
export const selectAttachment = (state: any) => state.issue.attachment;