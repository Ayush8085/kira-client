import { createSlice } from "@reduxjs/toolkit";

const projectSlice = createSlice({
    name: "project",
    initialState: {
        projects: [],
        project: null,
    },
    reducers: {
        setProjects: (state, action) => {
            state.projects = action.payload;
        },
        setProject: (state, action) => {
            state.project = action.payload;
        },
    },
});

export const { setProjects, setProject } = projectSlice.actions;

export const projectReducer = projectSlice.reducer;

export const selectProjects = (state: any) => state.project.projects;
export const selectProject = (state: any) => state.project.project;