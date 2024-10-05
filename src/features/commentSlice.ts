import { createSlice } from "@reduxjs/toolkit";

const commentSlice = createSlice({
    name: "comment",
    initialState: {
        comments: [],
        comment: null,
    },
    reducers: {
        setComments: (state, action) => {
            state.comments = action.payload;
        },
        setCommnet: (state, action) => {
            state.comment = action.payload;
        }
    }
})

export const { setComments, setCommnet } = commentSlice.actions;

export const commentReducer = commentSlice.reducer;

export const selectComments = (state: any) => state.comment.comments;
export const selectComment = (state: any) => state.comment.comment;